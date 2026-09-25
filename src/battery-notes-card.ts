import { LitElement, html, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  BatteryNotesCardConfig,
  BatteryDeviceItem,
  HassEntity,
  LovelaceCardEditor,
} from './types';
import { cardStyles } from './styles';
import { localize } from './localize';
import { BatteryNotesCardEditor } from './battery-notes-card-editor';

// Register editor element
if (!customElements.get('battery-notes-card-editor')) {
  customElements.define('battery-notes-card-editor', BatteryNotesCardEditor);
}

export class BatteryNotesCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: BatteryNotesCardConfig;
  @state() private _searchQuery = '';
  @state() private _activeFilter: 'all' | 'low' | 'critical' = 'all';
  @state() private _sortBy: 'battery' | 'name' | 'type' | 'last_replaced' | 'status' = 'battery';
  @state() private _sortDirection: 'asc' | 'desc' = 'asc';
  @state() private _recentlyReplaced = new Set<string>();

  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('battery-notes-card-editor') as LovelaceCardEditor;
  }

  public static getStubConfig(): Partial<BatteryNotesCardConfig> {
    return {
      type: 'custom:battery-notes-card',
      title: 'Battery Notes',
      icon: 'mdi:battery-heart-variant',
      sort_by: 'battery',
      sort_direction: 'asc',
      show_header: true,
      show_summary: true,
      show_search: true,
      show_filters: true,
      compact: false,
      confirm_replace: true,
      columns: {
        name: true,
        battery: true,
        type: true,
        last_replaced: true,
        status: true,
        note: false,
        actions: true,
      },
    };
  }

  public setConfig(config: BatteryNotesCardConfig): void {
    if (!config) {
      throw new Error('Invalid configuration');
    }
    this._config = {
      title: 'Battery Notes',
      icon: 'mdi:battery-heart-variant',
      show_header: true,
      show_summary: true,
      show_search: true,
      show_filters: true,
      compact: false,
      confirm_replace: true,
      sort_by: 'battery',
      sort_direction: 'asc',
      ...config,
      columns: {
        name: true,
        battery: true,
        type: true,
        last_replaced: true,
        status: true,
        note: false,
        actions: true,
        ...(config.columns || {}),
      },
    };

    if (this._config.sort_by) {
      this._sortBy = this._config.sort_by;
    }
    if (this._config.sort_direction) {
      this._sortDirection = this._config.sort_direction;
    }
    if (this._config.filter_low_only) {
      this._activeFilter = 'low';
    }
  }

  public getCardSize(): number {
    return 6;
  }

  static styles = cardStyles;

  /**
   * Scans and aggregates all battery-powered devices managed by Battery Notes
   */
  private _getBatteryDevices(): BatteryDeviceItem[] {
    if (!this.hass || !this.hass.states) return [];

    const states = this.hass.states;
    const itemsMap = new Map<string, Partial<BatteryDeviceItem> & { relatedEntities: HassEntity[] }>();

    const getOrCreate = (key: string) => {
      if (!itemsMap.has(key)) {
        itemsMap.set(key, { relatedEntities: [] });
      }
      return itemsMap.get(key)!;
    };

    // Collect all Battery Notes entities
    for (const [entityId, entity] of Object.entries(states)) {
      const attrs = entity.attributes || {};
      const isBatteryType = entityId.endsWith('_battery_type');
      const isBatteryPlus = entityId.endsWith('_battery_plus');
      const isBatteryReplaced = entityId.endsWith('_battery_last_replaced');
      const isBatteryLow = entityId.endsWith('_battery_low');
      const isBatteryButton = entityId.endsWith('_battery_replaced') && entityId.startsWith('button.');
      const hasBatteryNotesAttrs = attrs.battery_type !== undefined || attrs.battery_type_and_quantity !== undefined;

      if (!isBatteryType && !isBatteryPlus && !isBatteryReplaced && !isBatteryLow && !isBatteryButton && !hasBatteryNotesAttrs) {
        continue;
      }

      // Group key: prefer device_id, then source_entity_id, then base prefix
      let key = attrs.device_id || attrs.source_entity_id;
      if (!key) {
        key = entityId.replace(/_(battery_type|battery_plus|battery_last_replaced|battery_low|battery_replaced)$/, '');
      }

      const item = getOrCreate(key);
      item.relatedEntities.push(entity);

      if (attrs.device_id) item.deviceId = attrs.device_id;
      if (attrs.source_entity_id) item.sourceEntityId = attrs.source_entity_id;
      if (isBatteryButton) item.buttonEntityId = entityId;

      // Extract details from attributes if available
      if (attrs.battery_type) item.batteryType = attrs.battery_type;
      if (attrs.battery_quantity) item.batteryQuantity = Number(attrs.battery_quantity);
      if (attrs.battery_type_and_quantity) item.batteryTypeAndQuantity = attrs.battery_type_and_quantity;
      if (attrs.device_name) item.name = attrs.device_name;
      if (attrs.note) item.note = attrs.note;

      if (attrs.battery_last_replaced) {
        item.lastReplacedStr = attrs.battery_last_replaced;
        const d = new Date(attrs.battery_last_replaced);
        if (!isNaN(d.getTime())) item.lastReplaced = d;
      }

      if (isBatteryReplaced && entity.state && entity.state !== 'unavailable' && entity.state !== 'unknown') {
        item.lastReplacedStr = entity.state;
        const d = new Date(entity.state);
        if (!isNaN(d.getTime())) item.lastReplaced = d;
      }

      if (isBatteryLow && entity.state === 'on') {
        item.isLow = true;
      }

      if (attrs.battery_low === true) {
        item.isLow = true;
      }

      // Battery level resolution
      if (isBatteryPlus && !isNaN(parseFloat(entity.state))) {
        item.batteryLevel = parseFloat(entity.state);
        item.entityId = entityId;
      }

      if (isBatteryType) {
        if (!item.batteryType && entity.state && entity.state !== 'unknown' && entity.state !== 'unavailable') {
          item.batteryType = entity.state;
        }
        if (!item.entityId) item.entityId = entityId;
      }
    }

    // Second pass: fill in missing levels, names, and finalize items
    const result: BatteryDeviceItem[] = [];
    const excludeSet = new Set(this._config.exclude_entities || []);

    for (const [key, raw] of itemsMap.entries()) {
      if (excludeSet.has(key)) continue;

      let primaryEntity = raw.relatedEntities.find(e => e.entity_id.endsWith('_battery_plus')) ||
                          raw.relatedEntities.find(e => e.entity_id.endsWith('_battery_type')) ||
                          raw.relatedEntities[0];

      if (!primaryEntity) continue;
      if (excludeSet.has(primaryEntity.entity_id)) continue;

      let batteryLevel = raw.batteryLevel ?? null;
      let isUnavailable = primaryEntity.state === 'unavailable';

      // If battery level is not yet found, check source entity or device battery sensor
      if (batteryLevel === null && raw.sourceEntityId && states[raw.sourceEntityId]) {
        const sourceEntity = states[raw.sourceEntityId];
        const val = parseFloat(sourceEntity.state);
        if (!isNaN(val)) batteryLevel = val;
        if (sourceEntity.state === 'unavailable') isUnavailable = true;
      }

      // If still not found, check attributes
      if (batteryLevel === null && primaryEntity.attributes.battery_last_reported_level !== undefined) {
        const val = Number(primaryEntity.attributes.battery_last_reported_level);
        if (!isNaN(val)) batteryLevel = val;
      }

      // Device Name resolution
      let name = raw.name || primaryEntity.attributes.device_name;
      if (!name) {
        if (raw.deviceId && this.hass.devices && this.hass.devices[raw.deviceId]?.name) {
          name = this.hass.devices[raw.deviceId].name;
        } else if (raw.sourceEntityId && states[raw.sourceEntityId]?.attributes.friendly_name) {
          name = states[raw.sourceEntityId].attributes.friendly_name;
        } else if (primaryEntity.attributes.friendly_name) {
          name = primaryEntity.attributes.friendly_name
            .replace(/\s+(Battery Plus|Battery Type|Battery Level|Battery)$/i, '')
            .trim();
        } else {
          name = primaryEntity.entity_id;
        }
      }

      // Battery Type & Quantity resolution
      const bType = raw.batteryType || primaryEntity.attributes.battery_type || '';
      const bQty = raw.batteryQuantity || primaryEntity.attributes.battery_quantity || 1;
      let bTypeAndQty = raw.batteryTypeAndQuantity || primaryEntity.attributes.battery_type_and_quantity || '';
      if (!bTypeAndQty && bType) {
        bTypeAndQty = bQty > 1 ? `${bQty}x ${bType}` : bType;
      }

      // Low battery calculation
      const threshold = this._config.filter_threshold ?? 20;
      const isLow = raw.isLow || (batteryLevel !== null && batteryLevel <= threshold);

      const deviceItem: BatteryDeviceItem = {
        id: key,
        deviceId: raw.deviceId,
        sourceEntityId: raw.sourceEntityId,
        entityId: primaryEntity.entity_id,
        name: name || key,
        batteryLevel,
        batteryType: bType,
        batteryQuantity: bQty,
        batteryTypeAndQuantity: bTypeAndQty || '-',
        lastReplaced: raw.lastReplaced || null,
        lastReplacedStr: raw.lastReplacedStr || '',
        lastReported: raw.lastReported || null,
        isLow: Boolean(isLow),
        note: raw.note || primaryEntity.attributes.note,
        buttonEntityId: raw.buttonEntityId,
        isUnavailable,
        state: primaryEntity.state,
      };

      result.push(deviceItem);
    }

    return result;
  }

  private _formatRelativeTime(date: Date | null, lang: string): string {
    if (!date) return localize('time_never', lang);

    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return localize('time_today', lang);

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays === 0) return localize('time_today', lang);
    if (diffDays === 1) return localize('time_yesterday', lang);
    if (diffDays < 14) return localize('time_days_ago', lang, { n: diffDays });
    if (diffDays < 60) return localize('time_weeks_ago', lang, { n: Math.floor(diffDays / 7) });
    if (diffDays < 365) return localize('time_months_ago', lang, { n: Math.floor(diffDays / 30) });
    return localize('time_years_ago', lang, { n: Math.floor(diffDays / 365) });
  }

  private _getBatteryIcon(level: number | null): string {
    if (level === null || isNaN(level)) return 'mdi:battery-unknown';
    if (level <= 5) return 'mdi:battery-alert';
    if (level <= 15) return 'mdi:battery-10';
    if (level <= 25) return 'mdi:battery-20';
    if (level <= 35) return 'mdi:battery-30';
    if (level <= 45) return 'mdi:battery-40';
    if (level <= 55) return 'mdi:battery-50';
    if (level <= 65) return 'mdi:battery-60';
    if (level <= 75) return 'mdi:battery-70';
    if (level <= 85) return 'mdi:battery-80';
    if (level <= 95) return 'mdi:battery-90';
    return 'mdi:battery';
  }

  private _getLevelClass(level: number | null): string {
    if (level === null || isNaN(level)) return 'unknown';
    if (level <= 15) return 'critical';
    if (level <= 25) return 'warning';
    if (level <= 50) return 'medium';
    return 'good';
  }

  private _handleSort(column: 'battery' | 'name' | 'type' | 'last_replaced' | 'status'): void {
    if (this._sortBy === column) {
      this._sortDirection = this._sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this._sortBy = column;
      this._sortDirection = 'asc';
    }
  }

  private _handleOpenEntity(entityId: string): void {
    const event = new CustomEvent('hass-more-info', {
      detail: { entityId },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private async _handleReplaceBattery(item: BatteryDeviceItem): Promise<void> {
    const lang = this.hass?.language || 'en';

    if (this._config.confirm_replace) {
      const confirmMsg = localize('confirm_replace_msg', lang, { name: item.name });
      if (!window.confirm(confirmMsg)) {
        return;
      }
    }

    try {
      if (item.buttonEntityId) {
        await this.hass.callService('button', 'press', {
          entity_id: item.buttonEntityId,
        });
      } else {
        const serviceData: Record<string, any> = {};
        if (item.deviceId) {
          serviceData.device_id = item.deviceId;
        } else if (item.sourceEntityId) {
          serviceData.source_entity_id = item.sourceEntityId;
        } else {
          serviceData.source_entity_id = item.entityId;
        }
        await this.hass.callService('battery_notes', 'set_battery_replaced', serviceData);
      }

      // Visual feedback
      this._recentlyReplaced = new Set(this._recentlyReplaced).add(item.id);
      this.requestUpdate();

      setTimeout(() => {
        this._recentlyReplaced.delete(item.id);
        this._recentlyReplaced = new Set(this._recentlyReplaced);
        this.requestUpdate();
      }, 3000);
    } catch (err) {
      console.error('Failed to mark battery as replaced:', err);
      alert(`Error replacing battery: ${err instanceof Error ? err.message : String(err)}`);
    }
  }

  protected render(): TemplateResult {
    if (!this.hass) {
      return html``;
    }

    const lang = this.hass.language || 'en';
    const allDevices = this._getBatteryDevices();

    // Summary counters
    const totalCount = allDevices.length;
    const lowCount = allDevices.filter(d => d.isLow).length;
    const okCount = totalCount - lowCount;

    // Filter devices
    let filtered = allDevices.filter(device => {
      // Hide unavailable
      if (this._config.hide_unavailable && device.isUnavailable) {
        return false;
      }

      // Quick Filter Pills
      if (this._activeFilter === 'low' && !device.isLow) {
        return false;
      }
      if (this._activeFilter === 'critical') {
        if (device.batteryLevel === null || device.batteryLevel > 10) return false;
      }

      // Search Query
      if (this._searchQuery.trim()) {
        const query = this._searchQuery.toLowerCase();
        const matchesName = device.name.toLowerCase().includes(query);
        const matchesType = device.batteryTypeAndQuantity.toLowerCase().includes(query);
        const matchesNote = device.note?.toLowerCase().includes(query) || false;
        if (!matchesName && !matchesType && !matchesNote) return false;
      }

      return true;
    });

    // Sort devices
    filtered.sort((a, b) => {
      let comparison = 0;
      switch (this._sortBy) {
        case 'battery':
          const levelA = a.batteryLevel ?? (this._sortDirection === 'asc' ? 999 : -1);
          const levelB = b.batteryLevel ?? (this._sortDirection === 'asc' ? 999 : -1);
          comparison = levelA - levelB;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'type':
          comparison = a.batteryTypeAndQuantity.localeCompare(b.batteryTypeAndQuantity);
          break;
        case 'last_replaced':
          const timeA = a.lastReplaced?.getTime() ?? 0;
          const timeB = b.lastReplaced?.getTime() ?? 0;
          comparison = timeA - timeB;
          break;
        case 'status':
          comparison = (a.isLow ? 0 : 1) - (b.isLow ? 0 : 1);
          break;
      }
      return this._sortDirection === 'asc' ? comparison : -comparison;
    });

    // Pagination / Max rows
    if (this._config.max_rows && this._config.max_rows > 0) {
      filtered = filtered.slice(0, this._config.max_rows);
    }

    const cols = {
      name: true,
      battery: true,
      type: true,
      last_replaced: true,
      status: true,
      note: false,
      actions: true,
      ...(this._config.columns || {}),
    };

    const isCompact = Boolean(this._config.compact);

    return html`
      <ha-card class="${isCompact ? 'compact' : ''}">
        <div class="card-container">
          <!-- Card Header -->
          ${this._config.show_header !== false
            ? html`
                <div class="card-header">
                  <div class="header-title-container">
                    <ha-icon
                      class="header-icon"
                      icon="${this._config.icon || 'mdi:battery-heart-variant'}"
                    ></ha-icon>
                    <span>${this._config.title || localize('card_title', lang)}</span>
                  </div>

                  ${this._config.show_summary !== false
                    ? html`
                        <div class="summary-chips">
                          <span class="chip total">
                            ${localize('summary_total', lang)}: ${totalCount}
                          </span>
                          ${lowCount > 0
                            ? html`
                                <span class="chip low">
                                  ${localize('summary_low', lang)}: ${lowCount}
                                </span>
                              `
                            : ''}
                          <span class="chip ok">
                            ${localize('summary_ok', lang)}: ${okCount}
                          </span>
                        </div>
                      `
                    : ''}
                </div>
              `
            : ''}

          <!-- Controls: Search bar & Quick Filters -->
          ${(this._config.show_search !== false || this._config.show_filters !== false)
            ? html`
                <div class="controls-row">
                  ${this._config.show_search !== false
                    ? html`
                        <div class="search-wrapper">
                          <ha-icon class="search-icon-left" icon="mdi:magnify"></ha-icon>
                          <input
                            type="text"
                            class="search-input"
                            .value=${this._searchQuery}
                            placeholder=${localize('search_placeholder', lang)}
                            @input=${(e: InputEvent) =>
                              (this._searchQuery = (e.target as HTMLInputElement).value)}
                          />
                          ${this._searchQuery
                            ? html`
                                <button
                                  class="search-clear-btn"
                                  @click=${() => (this._searchQuery = '')}
                                >
                                  <ha-icon icon="mdi:close-circle"></ha-icon>
                                </button>
                              `
                            : ''}
                        </div>
                      `
                    : ''}
                  ${this._config.show_filters !== false
                    ? html`
                        <div class="filter-pills">
                          <button
                            class="filter-btn ${this._activeFilter === 'all' ? 'active' : ''}"
                            @click=${() => (this._activeFilter = 'all')}
                          >
                            ${localize('filter_all', lang)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter === 'low' ? 'active' : ''}"
                            @click=${() => (this._activeFilter = 'low')}
                          >
                            ${localize('filter_low', lang)} ${lowCount > 0 ? `(${lowCount})` : ''}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter === 'critical' ? 'active' : ''}"
                            @click=${() => (this._activeFilter = 'critical')}
                          >
                            ${localize('filter_critical', lang)}
                          </button>
                        </div>
                      `
                    : ''}
                </div>
              `
            : ''}

          <!-- Table Content -->
          ${filtered.length > 0
            ? html`
                <div class="table-wrapper">
                  <table class="battery-table">
                    <thead>
                      <tr>
                        ${cols.name
                          ? html`
                              <th class="sortable" @click=${() => this._handleSort('name')}>
                                <div class="th-content">
                                  <span>${localize('col_name', lang)}</span>
                                  ${this._sortBy === 'name'
                                    ? html`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection === 'asc'
                                          ? 'mdi:arrow-up'
                                          : 'mdi:arrow-down'}"
                                      ></ha-icon>`
                                    : ''}
                                </div>
                              </th>
                            `
                          : ''}
                        ${cols.battery
                          ? html`
                              <th class="sortable" @click=${() => this._handleSort('battery')}>
                                <div class="th-content">
                                  <span>${localize('col_battery', lang)}</span>
                                  ${this._sortBy === 'battery'
                                    ? html`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection === 'asc'
                                          ? 'mdi:arrow-up'
                                          : 'mdi:arrow-down'}"
                                      ></ha-icon>`
                                    : ''}
                                </div>
                              </th>
                            `
                          : ''}
                        ${cols.type
                          ? html`
                              <th class="sortable hide-on-small" @click=${() => this._handleSort('type')}>
                                <div class="th-content">
                                  <span>${localize('col_type', lang)}</span>
                                  ${this._sortBy === 'type'
                                    ? html`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection === 'asc'
                                          ? 'mdi:arrow-up'
                                          : 'mdi:arrow-down'}"
                                      ></ha-icon>`
                                    : ''}
                                </div>
                              </th>
                            `
                          : ''}
                        ${cols.last_replaced
                          ? html`
                              <th class="sortable hide-on-medium" @click=${() => this._handleSort('last_replaced')}>
                                <div class="th-content">
                                  <span>${localize('col_last_replaced', lang)}</span>
                                  ${this._sortBy === 'last_replaced'
                                    ? html`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection === 'asc'
                                          ? 'mdi:arrow-up'
                                          : 'mdi:arrow-down'}"
                                      ></ha-icon>`
                                    : ''}
                                </div>
                              </th>
                            `
                          : ''}
                        ${cols.status
                          ? html`
                              <th class="sortable hide-on-medium" @click=${() => this._handleSort('status')}>
                                <div class="th-content">
                                  <span>${localize('col_status', lang)}</span>
                                  ${this._sortBy === 'status'
                                    ? html`<ha-icon
                                        class="sort-icon"
                                        icon="${this._sortDirection === 'asc'
                                          ? 'mdi:arrow-up'
                                          : 'mdi:arrow-down'}"
                                      ></ha-icon>`
                                    : ''}
                                </div>
                              </th>
                            `
                          : ''}
                        ${cols.note
                          ? html`<th class="hide-on-medium">${localize('col_note', lang)}</th>`
                          : ''}
                        ${cols.actions
                          ? html`<th>${localize('col_actions', lang)}</th>`
                          : ''}
                      </tr>
                    </thead>
                    <tbody>
                      ${filtered.map(item => {
                        const levelClass = this._getLevelClass(item.batteryLevel);
                        const isRecentlyReplaced = this._recentlyReplaced.has(item.id);

                        return html`
                          <tr class="${item.isLow ? 'row-low' : ''}">
                            <!-- Name -->
                            ${cols.name
                              ? html`
                                  <td>
                                    <div class="device-cell">
                                      <button
                                        class="device-name-btn"
                                        @click=${() => this._handleOpenEntity(item.entityId)}
                                        title="${item.name}"
                                      >
                                        ${item.name}
                                      </button>
                                      ${item.note && !cols.note
                                        ? html`<span class="device-subtext">${item.note}</span>`
                                        : ''}
                                    </div>
                                  </td>
                                `
                              : ''}

                            <!-- Battery Level -->
                            ${cols.battery
                              ? html`
                                  <td>
                                    <div class="battery-level-cell">
                                      <ha-icon
                                        class="battery-icon level-${levelClass}"
                                        icon="${this._getBatteryIcon(item.batteryLevel)}"
                                      ></ha-icon>
                                      <div class="battery-bar-container">
                                        <div
                                          class="battery-bar-fill bar-${levelClass}"
                                          style="width: ${Math.min(
                                            Math.max(item.batteryLevel ?? 0, 0),
                                            100
                                          )}%;"
                                        ></div>
                                      </div>
                                      <span class="battery-percent-text level-${levelClass}">
                                        ${item.batteryLevel !== null
                                          ? `${Math.round(item.batteryLevel)}%`
                                          : '-'}
                                      </span>
                                    </div>
                                  </td>
                                `
                              : ''}

                            <!-- Battery Type -->
                            ${cols.type
                              ? html`
                                  <td class="hide-on-small">
                                    <span class="type-badge">
                                      <ha-icon icon="mdi:battery-charging-outline"></ha-icon>
                                      ${item.batteryTypeAndQuantity}
                                    </span>
                                  </td>
                                `
                              : ''}

                            <!-- Last Replaced -->
                            ${cols.last_replaced
                              ? html`
                                  <td class="hide-on-medium">
                                    <div
                                      class="last-replaced-cell"
                                      title="${item.lastReplaced?.toLocaleString() || item.lastReplacedStr || ''}"
                                    >
                                      <ha-icon icon="mdi:calendar-clock"></ha-icon>
                                      <span>${this._formatRelativeTime(item.lastReplaced, lang)}</span>
                                    </div>
                                  </td>
                                `
                              : ''}

                            <!-- Status -->
                            ${cols.status
                              ? html`
                                  <td class="hide-on-medium">
                                    ${item.isUnavailable
                                      ? html`<span class="status-badge unavailable">${localize('status_unavailable', lang)}</span>`
                                      : item.isLow
                                      ? html`<span class="status-badge low">${localize('status_low', lang)}</span>`
                                      : html`<span class="status-badge ok">${localize('status_ok', lang)}</span>`}
                                  </td>
                                `
                              : ''}

                            <!-- Note -->
                            ${cols.note
                              ? html`
                                  <td class="hide-on-medium">
                                    <span class="note-text" title="${item.note || ''}">${item.note || '-'}</span>
                                  </td>
                                `
                              : ''}

                            <!-- Action -->
                            ${cols.actions
                              ? html`
                                  <td>
                                    <button
                                      class="action-btn ${isRecentlyReplaced ? 'success' : ''}"
                                      @click=${() => this._handleReplaceBattery(item)}
                                      title="${localize('action_mark_replaced', lang)}"
                                    >
                                      <ha-icon
                                        icon="${isRecentlyReplaced
                                          ? 'mdi:check-bold'
                                          : 'mdi:battery-sync'}"
                                      ></ha-icon>
                                      <span>${isRecentlyReplaced
                                        ? localize('action_replaced', lang)
                                        : localize('action_mark_replaced', lang)}</span>
                                    </button>
                                  </td>
                                `
                              : ''}
                          </tr>
                        `;
                      })}
                    </tbody>
                  </table>
                </div>
              `
            : html`
                <div class="empty-state">
                  <ha-icon icon="mdi:battery-check"></ha-icon>
                  <span>
                    ${allDevices.length === 0
                      ? localize('no_devices', lang)
                      : localize('no_results', lang)}
                  </span>
                </div>
              `}
        </div>
      </ha-card>
    `;
  }
}

// Register custom element
if (!customElements.get('battery-notes-card')) {
  customElements.define('battery-notes-card', BatteryNotesCard);
}

// Register for Lovelace card picker UI
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'battery-notes-card',
  name: 'Battery Notes Card',
  description: 'A customizable Lovelace table card for Home Assistant Battery Notes integration.',
  preview: true,
  documentationURL: 'https://github.com/vitals5/battery-notes-card',
});
