import { LitElement, html, TemplateResult } from 'lit';
import { property, state } from 'lit/decorators.js';
import {
  HomeAssistant,
  BatteryNotesCardConfig,
  BatteryDeviceItem,
  LovelaceCardEditor,
  HomeAssistantRegistries,
} from './types';
import { cardStyles } from './styles';
import { localize } from './localize';
import { BatteryNotesCardEditor } from './battery-notes-card-editor';
import { extractBatteryDevices, computePagination } from './device-extractor.ts';

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
  @state() private _displayedRows = 0;

  private _registriesLoaded = false;
  private _registries: HomeAssistantRegistries = {};

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
    if (this._config.initial_rows && this._config.initial_rows > 0) {
      this._displayedRows = this._config.initial_rows;
    } else {
      this._displayedRows = 0;
    }
  }

  public getCardSize(): number {
    return 6;
  }

  static styles = cardStyles;

  public connectedCallback(): void {
    super.connectedCallback();
    this._fetchRegistries();
  }

  protected updated(changedProperties: Map<string | number | symbol, unknown>): void {
    super.updated(changedProperties);
    if (changedProperties.has('hass') && !this._registriesLoaded) {
      this._fetchRegistries();
    }
  }

  private async _fetchRegistries(): Promise<void> {
    if (this._registriesLoaded || !this.hass?.connection) return;
    this._registriesLoaded = true;

    try {
      const [entities, devices, areas] = await Promise.all([
        this.hass.connection.sendMessagePromise<any[]>({ type: 'config/entity_registry/list' }).catch(() => []),
        this.hass.connection.sendMessagePromise<any[]>({ type: 'config/device_registry/list' }).catch(() => []),
        this.hass.connection.sendMessagePromise<any[]>({ type: 'config/area_registry/list' }).catch(() => []),
      ]);

      this._registries = {
        entities: entities?.length ? new Map(entities.map(e => [e.entity_id, e])) : undefined,
        devices: devices?.length ? new Map(devices.map(d => [d.id, d])) : undefined,
        areas: areas?.length ? new Map(areas.map(a => [a.area_id, a])) : undefined,
      };

      this.requestUpdate();
    } catch {
      // Non-admin or WebSocket unavailable
    }
  }

  /**
   * Scans and aggregates all battery-powered devices managed by Battery Notes
   */
  private _getBatteryDevices(): BatteryDeviceItem[] {
    return extractBatteryDevices(this.hass, this._config, this._registries);
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

  private _handleShowMore(step: number): void {
    const initialRows = this._config.initial_rows && this._config.initial_rows > 0
      ? this._config.initial_rows
      : 10;
    const current = this._displayedRows > 0 ? this._displayedRows : initialRows;
    this._displayedRows = current + step;
  }

  private _handleShowLess(): void {
    this._displayedRows = this._config.initial_rows && this._config.initial_rows > 0
      ? this._config.initial_rows
      : 0;
  }

  private _handleShowAll(total: number): void {
    this._displayedRows = total;
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
    const totalMatching = filtered.length;
    const pagination = computePagination(
      totalMatching,
      this._displayedRows,
      this._config.initial_rows,
      this._config.step_rows,
      this._config.max_rows
    );

    const visibleItems = filtered.slice(0, pagination.effectiveLimit);

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
                            @input=${(e: InputEvent) => {
                              this._searchQuery = (e.target as HTMLInputElement).value;
                              if (this._config.initial_rows && this._config.initial_rows > 0) {
                                this._displayedRows = this._config.initial_rows;
                              }
                            }}
                          />
                          ${this._searchQuery
                            ? html`
                                <button
                                  class="search-clear-btn"
                                  @click=${() => {
                                    this._searchQuery = '';
                                    if (this._config.initial_rows && this._config.initial_rows > 0) {
                                      this._displayedRows = this._config.initial_rows;
                                    }
                                  }}
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
                            @click=${() => {
                              this._activeFilter = 'all';
                              if (this._config.initial_rows && this._config.initial_rows > 0) {
                                this._displayedRows = this._config.initial_rows;
                              }
                            }}
                          >
                            ${localize('filter_all', lang)}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter === 'low' ? 'active' : ''}"
                            @click=${() => {
                              this._activeFilter = 'low';
                              if (this._config.initial_rows && this._config.initial_rows > 0) {
                                this._displayedRows = this._config.initial_rows;
                              }
                            }}
                          >
                            ${localize('filter_low', lang)} ${lowCount > 0 ? `(${lowCount})` : ''}
                          </button>
                          <button
                            class="filter-btn ${this._activeFilter === 'critical' ? 'active' : ''}"
                            @click=${() => {
                              this._activeFilter = 'critical';
                              if (this._config.initial_rows && this._config.initial_rows > 0) {
                                this._displayedRows = this._config.initial_rows;
                              }
                            }}
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
          ${visibleItems.length > 0
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
                                @click=${() => this._handleSort('battery')}>
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
                      ${visibleItems.map(item => {
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
                                      ${item.area && !item.name.toLowerCase().includes(item.area.toLowerCase())
                                        ? html`<span class="device-subtext"><ha-icon icon="mdi:map-marker-outline" style="--mdc-icon-size: 12px; margin-right: 2px;"></ha-icon>${item.area}</span>`
                                        : ''}
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

                ${pagination.canShowMore || pagination.canShowLess
                  ? html`
                      <div class="pagination-container">
                        ${pagination.canShowMore
                          ? html`
                              <button
                                class="pagination-btn primary"
                                @click=${() => this._handleShowMore(pagination.nextStep)}
                              >
                                <ha-icon icon="mdi:chevron-down"></ha-icon>
                                <span>
                                  ${localize('show_more_remaining', lang, {
                                    count: pagination.nextStep,
                                    remaining: pagination.remainingCount,
                                  })}
                                </span>
                              </button>
                            `
                          : ''}
                        ${pagination.canShowMore && pagination.remainingCount > pagination.nextStep
                          ? html`
                              <button
                                class="pagination-btn secondary"
                                @click=${() => this._handleShowAll(totalMatching)}
                              >
                                <ha-icon icon="mdi:unfold-more-horizontal"></ha-icon>
                                <span>
                                  ${localize('show_all', lang, {
                                    count: totalMatching,
                                  })}
                                </span>
                              </button>
                            `
                          : ''}
                        ${pagination.canShowLess
                          ? html`
                              <button
                                class="pagination-btn secondary"
                                @click=${this._handleShowLess}
                              >
                                <ha-icon icon="mdi:chevron-up"></ha-icon>
                                <span>${localize('show_less', lang)}</span>
                              </button>
                            `
                          : ''}
                      </div>
                    `
                  : ''}
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
