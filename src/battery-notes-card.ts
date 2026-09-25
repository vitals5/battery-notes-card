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
   * Extracts the base name from a Battery Notes entity id by stripping domain and suffixes
   */
  private _getBaseName(entityId: string): string {
    const objectId = entityId.includes('.') ? entityId.split('.')[1] : entityId;
    return objectId
      .replace(/_battery_last_replaced$/, '')
      .replace(/_battery_type$/, '')
      .replace(/_battery_plus_low$/, '')
      .replace(/_battery_low$/, '')
      .replace(/_battery_replaced$/, '')
      .replace(/_battery_plus$/, '');
  }

  /**
   * Cleans trailing Battery Notes suffixes from friendly names
   */
  private _cleanDeviceName(name: string): string {
    return name
      .replace(
        /\s+(Battery Type|Batterietyp|Battery Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Zuletzt gewechselt|Battery Replaced|Battery Low|Batterie schwach|Battery|Batterie)$/i,
        ''
      )
      .trim();
  }

  /**
   * Scans and aggregates all battery-powered devices managed by Battery Notes
   * Ensures that multiple entities belonging to the same physical device are grouped into 1 row.
   */
  private _getBatteryDevices(): BatteryDeviceItem[] {
    if (!this.hass || !this.hass.states) return [];

    const states = this.hass.states;
    const groups = new Map<string, { baseName: string; entities: HassEntity[] }>();

    // 1. Collect all Battery Notes entities and group by base name
    for (const [entityId, entity] of Object.entries(states)) {
      const attrs = entity.attributes || {};
      const isBatteryType = entityId.startsWith('sensor.') && entityId.endsWith('_battery_type');
      const isBatteryPlus = entityId.startsWith('sensor.') && entityId.endsWith('_battery_plus');
      const isBatteryReplaced =
        entityId.startsWith('sensor.') && entityId.endsWith('_battery_last_replaced');
      const isBatteryLow =
        entityId.startsWith('binary_sensor.') &&
        (entityId.endsWith('_battery_low') || entityId.endsWith('_battery_plus_low'));
      const isBatteryButton =
        entityId.startsWith('button.') && entityId.endsWith('_battery_replaced');
      const hasBatteryNotesAttrs =
        attrs.battery_type !== undefined || attrs.battery_type_and_quantity !== undefined;

      if (
        !isBatteryType &&
        !isBatteryPlus &&
        !isBatteryReplaced &&
        !isBatteryLow &&
        !isBatteryButton &&
        !hasBatteryNotesAttrs
      ) {
        continue;
      }

      const baseName = this._getBaseName(entityId);
      if (!groups.has(baseName)) {
        groups.set(baseName, { baseName, entities: [] });
      }
      groups.get(baseName)!.entities.push(entity);
    }

    const result: BatteryDeviceItem[] = [];
    const excludeSet = new Set(this._config.exclude_entities || []);

    // Filter by explicitly specified entities if configured
    let baseNamesToProcess = Array.from(groups.keys());
    if (this._config.entities && this._config.entities.length > 0) {
      const allowedBases = new Set(this._config.entities.map(id => this._getBaseName(id)));
      baseNamesToProcess = baseNamesToProcess.filter(base => allowedBases.has(base));
    }

    // 2. Build one unified BatteryDeviceItem per device
    for (const baseName of baseNamesToProcess) {
      const group = groups.get(baseName)!;
      const entities = group.entities;

      const typeSensor = entities.find(
        e => e.entity_id.startsWith('sensor.') && e.entity_id.endsWith('_battery_type')
      );
      const plusSensor = entities.find(
        e => e.entity_id.startsWith('sensor.') && e.entity_id.endsWith('_battery_plus')
      );
      const replacedSensor = entities.find(
        e => e.entity_id.startsWith('sensor.') && e.entity_id.endsWith('_battery_last_replaced')
      );
      const lowSensor = entities.find(
        e =>
          e.entity_id.startsWith('binary_sensor.') &&
          (e.entity_id.endsWith('_battery_low') || e.entity_id.endsWith('_battery_plus_low'))
      );
      const buttonEntity = entities.find(
        e => e.entity_id.startsWith('button.') && e.entity_id.endsWith('_battery_replaced')
      );

      // Merge attributes across related entities
      const allAttrs: Record<string, any> = {};
      for (const e of entities) {
        if (e.attributes) {
          Object.assign(allAttrs, e.attributes);
        }
      }

      // Check deviceId
      let deviceId: string | undefined = allAttrs.device_id;
      if (!deviceId && this.hass.entities) {
        for (const e of entities) {
          const reg = this.hass.entities[e.entity_id];
          if (reg?.device_id) {
            deviceId = reg.device_id;
            break;
          }
        }
      }

      // Exclusion checks
      if (excludeSet.has(baseName) || (deviceId && excludeSet.has(deviceId))) {
        continue;
      }
      if (entities.some(e => excludeSet.has(e.entity_id))) {
        continue;
      }

      // Primary entity for more-info click
      const primaryEntity = plusSensor || typeSensor || entities[0];

      // Battery level resolution
      let batteryLevel: number | null = null;
      if (plusSensor && !isNaN(parseFloat(plusSensor.state))) {
        batteryLevel = parseFloat(plusSensor.state);
      } else if (
        allAttrs.source_entity_id &&
        states[allAttrs.source_entity_id] &&
        !isNaN(parseFloat(states[allAttrs.source_entity_id].state))
      ) {
        batteryLevel = parseFloat(states[allAttrs.source_entity_id].state);
      } else if (
        states[`sensor.${baseName}_battery`] &&
        !isNaN(parseFloat(states[`sensor.${baseName}_battery`].state))
      ) {
        batteryLevel = parseFloat(states[`sensor.${baseName}_battery`].state);
      } else if (
        states[`sensor.${baseName}`] &&
        states[`sensor.${baseName}`].attributes?.device_class === 'battery' &&
        !isNaN(parseFloat(states[`sensor.${baseName}`].state))
      ) {
        batteryLevel = parseFloat(states[`sensor.${baseName}`].state);
      } else if (
        allAttrs.battery_last_reported_level !== undefined &&
        !isNaN(Number(allAttrs.battery_last_reported_level))
      ) {
        batteryLevel = Number(allAttrs.battery_last_reported_level);
      } else if (deviceId && this.hass.entities) {
        for (const [eId, reg] of Object.entries(this.hass.entities)) {
          if (
            reg.device_id === deviceId &&
            eId.startsWith('sensor.') &&
            !eId.endsWith('_battery_type') &&
            !eId.endsWith('_battery_last_replaced')
          ) {
            const st = states[eId];
            if (st && st.attributes?.device_class === 'battery' && !isNaN(parseFloat(st.state))) {
              batteryLevel = parseFloat(st.state);
              break;
            }
          }
        }
      }

      // Device Name resolution
      let name = '';
      if (deviceId && this.hass.devices?.[deviceId]?.name_by_user) {
        name = this.hass.devices[deviceId].name_by_user!;
      } else if (allAttrs.device_name) {
        name = allAttrs.device_name;
      } else if (deviceId && this.hass.devices?.[deviceId]?.name) {
        name = this.hass.devices[deviceId].name!;
      } else if (typeSensor?.attributes?.friendly_name) {
        name = this._cleanDeviceName(typeSensor.attributes.friendly_name);
      } else if (plusSensor?.attributes?.friendly_name) {
        name = this._cleanDeviceName(plusSensor.attributes.friendly_name);
      } else if (
        allAttrs.source_entity_id &&
        states[allAttrs.source_entity_id]?.attributes?.friendly_name
      ) {
        name = this._cleanDeviceName(states[allAttrs.source_entity_id].attributes.friendly_name!);
      } else {
        name = baseName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      }

      // Battery Type & Quantity resolution
      let bType = allAttrs.battery_type || '';
      if (
        !bType &&
        typeSensor &&
        typeSensor.state &&
        typeSensor.state !== 'unknown' &&
        typeSensor.state !== 'unavailable'
      ) {
        bType = typeSensor.state;
      }
      const bQty = Number(allAttrs.battery_quantity) || 1;
      let bTypeAndQty = allAttrs.battery_type_and_quantity || '';
      if (!bTypeAndQty && bType) {
        bTypeAndQty = bQty > 1 ? `${bQty}x ${bType}` : bType;
      }

      // Last Replaced resolution
      let lastReplaced: Date | null = null;
      let lastReplacedStr = '';
      const rawDate = replacedSensor?.state || allAttrs.battery_last_replaced;
      if (rawDate && rawDate !== 'unavailable' && rawDate !== 'unknown') {
        lastReplacedStr = rawDate;
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          lastReplaced = d;
        }
      }

      // Low Battery status
      const threshold = this._config.filter_threshold ?? 20;
      const isLow = Boolean(
        lowSensor?.state === 'on' ||
          allAttrs.battery_low === true ||
          (batteryLevel !== null && batteryLevel <= threshold)
      );

      // Button Entity
      let buttonEntityId = buttonEntity?.entity_id;
      if (!buttonEntityId && states[`button.${baseName}_battery_replaced`]) {
        buttonEntityId = `button.${baseName}_battery_replaced`;
      }

      const isUnavailable =
        typeSensor?.state === 'unavailable' || plusSensor?.state === 'unavailable';

      result.push({
        id: baseName,
        deviceId,
        sourceEntityId: allAttrs.source_entity_id,
        entityId: primaryEntity.entity_id,
        name: name || baseName,
        batteryLevel,
        batteryType: bType,
        batteryQuantity: bQty,
        batteryTypeAndQuantity: bTypeAndQty || '-',
        lastReplaced,
        lastReplacedStr,
        lastReported: allAttrs.battery_last_reported ? new Date(allAttrs.battery_last_reported) : null,
        isLow,
        note: allAttrs.note,
        buttonEntityId,
        isUnavailable,
        state: primaryEntity.state,
      });
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
      if (item.buttonEntityId && this.hass.states[item.buttonEntityId]) {
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
          ${this._config.show_search !== false || this._config.show_filters !== false
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
                              <th
                                class="col-name-th sortable"
                                @click=${() => this._handleSort('name')}
                              >
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
                              <th
                                class="col-battery-th sortable"
                                @click=${() => this._handleSort('battery')}
                              >
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
                              <th
                                class="col-type-th sortable"
                                @click=${() => this._handleSort('type')}
                              >
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
                              <th
                                class="col-last-replaced-th sortable"
                                @click=${() => this._handleSort('last_replaced')}
                              >
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
                              <th
                                class="col-status-th sortable"
                                @click=${() => this._handleSort('status')}
                              >
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
                          ? html`<th class="col-note-th">${localize('col_note', lang)}</th>`
                          : ''}
                        ${cols.actions
                          ? html`<th class="col-actions-th">${localize('col_actions', lang)}</th>`
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
                                  <td class="col-name-td">
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
                                  <td class="col-battery-td">
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
                                  <td class="col-type-td">
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
                                  <td class="col-last-replaced-td">
                                    <div
                                      class="last-replaced-cell"
                                      title="${item.lastReplaced?.toLocaleString() ||
                                      item.lastReplacedStr ||
                                      ''}"
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
                                  <td class="col-status-td">
                                    ${item.isUnavailable
                                      ? html`<span class="status-badge unavailable"
                                          >${localize('status_unavailable', lang)}</span
                                        >`
                                      : item.isLow
                                      ? html`<span class="status-badge low"
                                          >${localize('status_low', lang)}</span
                                        >`
                                      : html`<span class="status-badge ok"
                                          >${localize('status_ok', lang)}</span
                                        >`}
                                  </td>
                                `
                              : ''}

                            <!-- Note -->
                            ${cols.note
                              ? html`
                                  <td class="col-note-td">
                                    <span class="note-text" title="${item.note || ''}"
                                      >${item.note || '-'}</span
                                    >
                                  </td>
                                `
                              : ''}

                            <!-- Action -->
                            ${cols.actions
                              ? html`
                                  <td class="col-actions-td">
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
                                      <span
                                        >${isRecentlyReplaced
                                          ? localize('action_replaced', lang)
                                          : localize('action_mark_replaced', lang)}</span
                                      >
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
