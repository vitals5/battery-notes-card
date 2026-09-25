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

const GENERIC_NAMES = new Set([
  'batterie fast leer',
  'batterie-typ',
  'batterietyp',
  'letzter batteriewechsel',
  'batterie zuletzt ersetzt',
  'batterie ersetzt',
  'batterie+',
  'batterie',
  'battery low',
  'battery type',
  'battery last replaced',
  'battery replaced',
  'battery+',
  'battery',
]);

interface DeviceGroup {
  id: string;
  deviceId?: string;
  baseName: string;
  entities: HassEntity[];
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
   * Extracts the base device name from an entity id by stripping domain and suffixes
   * Supports both English and German Battery Notes suffixes
   */
  private _getBaseName(entityId: string): string {
    const objectId = entityId.includes('.') ? entityId.split('.')[1] : entityId;
    return objectId
      .replace(/_battery_last_replaced$/, '')
      .replace(/_letzter_batteriewechsel$/, '')
      .replace(/_batterie_zuletzt_ersetzt$/, '')
      .replace(/_battery_type$/, '')
      .replace(/_batterie_typ$/, '')
      .replace(/_batterie_art$/, '')
      .replace(/_battery_plus_low$/, '')
      .replace(/_battery_low$/, '')
      .replace(/_batterie_fast_leer$/, '')
      .replace(/_batterie_schwach$/, '')
      .replace(/_niedriger_batteriestand$/, '')
      .replace(/_battery_replaced$/, '')
      .replace(/_batterie_ersetzt$/, '')
      .replace(/_battery_plus$/, '')
      .replace(/_batterie_plus$/, '')
      .replace(/_battery$/, '')
      .replace(/_batterie$/, '');
  }

  private _isGenericName(name: string): boolean {
    if (!name) return true;
    return GENERIC_NAMES.has(name.toLowerCase().trim());
  }

  /**
   * Cleans trailing Battery Notes suffixes from friendly names
   */
  private _cleanDeviceName(name: string): string {
    return name
      .replace(
        /\s+(Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery|Batterie)$/i,
        ''
      )
      .trim();
  }

  private _isTypeSensor(e: HassEntity): boolean {
    if (!e.entity_id.startsWith('sensor.')) return false;
    const reg = this.hass.entities?.[e.entity_id];
    if (reg?.translation_key === 'battery_type') return true;
    const id = e.entity_id;
    return (
      id.endsWith('_battery_type') ||
      id.endsWith('_batterie_typ') ||
      id.endsWith('_batterie_art') ||
      (e.attributes.battery_type !== undefined && !e.attributes.device_class)
    );
  }

  private _isPlusSensor(e: HassEntity): boolean {
    if (!e.entity_id.startsWith('sensor.')) return false;
    const reg = this.hass.entities?.[e.entity_id];
    if (reg?.translation_key === 'battery_plus') return true;
    const id = e.entity_id;
    return id.endsWith('_battery_plus') || id.endsWith('_batterie_plus');
  }

  private _isReplacedSensor(e: HassEntity): boolean {
    if (!e.entity_id.startsWith('sensor.')) return false;
    const reg = this.hass.entities?.[e.entity_id];
    if (reg?.translation_key === 'battery_last_replaced') return true;
    const id = e.entity_id;
    return (
      id.endsWith('_battery_last_replaced') ||
      id.endsWith('_letzter_batteriewechsel') ||
      id.endsWith('_batterie_zuletzt_ersetzt')
    );
  }

  private _isLowSensor(e: HassEntity): boolean {
    if (!e.entity_id.startsWith('binary_sensor.')) return false;
    const reg = this.hass.entities?.[e.entity_id];
    if (reg?.translation_key === 'battery_low') return true;
    const id = e.entity_id;
    return (
      id.endsWith('_battery_low') ||
      id.endsWith('_battery_plus_low') ||
      id.endsWith('_batterie_fast_leer') ||
      id.endsWith('_batterie_schwach') ||
      id.endsWith('_niedriger_batteriestand') ||
      e.attributes.device_class === 'battery'
    );
  }

  private _isButtonEntity(e: HassEntity): boolean {
    if (!e.entity_id.startsWith('button.')) return false;
    const reg = this.hass.entities?.[e.entity_id];
    if (reg?.translation_key === 'battery_replaced') return true;
    const id = e.entity_id;
    return id.endsWith('_battery_replaced') || id.endsWith('_batterie_ersetzt');
  }

  /**
   * Scans and aggregates all battery-powered devices managed by Battery Notes
   * Ensures that multiple entities belonging to the same physical device are grouped into 1 row.
   */
  private _getBatteryDevices(): BatteryDeviceItem[] {
    if (!this.hass || !this.hass.states) return [];

    const states = this.hass.states;
    let groups: DeviceGroup[] = [];
    const deviceMap = new Map<string, DeviceGroup>();
    const baseNameMap = new Map<string, DeviceGroup>();

    // 1. Collect all Battery Notes entities and group by device_id and baseName
    for (const [entityId, entity] of Object.entries(states)) {
      const attrs = entity.attributes || {};
      const reg = this.hass.entities?.[entityId];

      const isBatteryEntity =
        reg?.platform === 'battery_notes' ||
        this._isTypeSensor(entity) ||
        this._isPlusSensor(entity) ||
        this._isReplacedSensor(entity) ||
        this._isLowSensor(entity) ||
        this._isButtonEntity(entity) ||
        attrs.battery_type !== undefined ||
        attrs.battery_type_and_quantity !== undefined;

      if (!isBatteryEntity) {
        continue;
      }

      const deviceId: string | undefined = reg?.device_id || attrs.device_id;
      const baseName = this._getBaseName(entityId);

      let group: DeviceGroup | null = null;

      // Grouping priority: deviceId match first, then baseName match
      if (deviceId && deviceMap.has(deviceId)) {
        group = deviceMap.get(deviceId)!;
      } else if (baseName && baseNameMap.has(baseName)) {
        group = baseNameMap.get(baseName)!;
      }

      if (!group) {
        group = {
          id: deviceId ? `dev_${deviceId}` : `base_${baseName}`,
          deviceId,
          baseName,
          entities: [],
        };
        groups.push(group);
      } else if (deviceId && !group.deviceId) {
        // Group discovered previously via baseName, now associating deviceId
        if (deviceMap.has(deviceId)) {
          const existingGroup = deviceMap.get(deviceId)!;
          if (existingGroup !== group) {
            // Merge group into existingGroup
            existingGroup.entities.push(...group.entities);
            groups = groups.filter(g => g !== group);
            group = existingGroup;
          }
        } else {
          group.deviceId = deviceId;
        }
      }

      if (deviceId) {
        deviceMap.set(deviceId, group);
      }
      if (baseName) {
        baseNameMap.set(baseName, group);
      }

      group.entities.push(entity);
    }

    const result: BatteryDeviceItem[] = [];
    const excludeSet = new Set(this._config.exclude_entities || []);

    // Filter by explicitly specified entities if configured
    let groupsToProcess = groups;
    if (this._config.entities && this._config.entities.length > 0) {
      const allowedBases = new Set(this._config.entities.map(id => this._getBaseName(id)));
      const allowedEntities = new Set(this._config.entities);
      groupsToProcess = groupsToProcess.filter(
        g =>
          allowedBases.has(g.baseName) ||
          (g.deviceId && allowedEntities.has(g.deviceId)) ||
          g.entities.some(e => allowedEntities.has(e.entity_id))
      );
    }

    // 2. Build one unified BatteryDeviceItem per device
    for (const group of groupsToProcess) {
      const entities = group.entities;
      const deviceId = group.deviceId;
      const baseName = group.baseName;

      // Exclusion checks
      if (excludeSet.has(baseName) || (deviceId && excludeSet.has(deviceId))) {
        continue;
      }
      if (entities.some(e => excludeSet.has(e.entity_id))) {
        continue;
      }

      // Classify role entities
      const typeSensor = entities.find(e => this._isTypeSensor(e));
      const plusSensor = entities.find(e => this._isPlusSensor(e));
      const replacedSensor = entities.find(e => this._isReplacedSensor(e));
      const lowSensor = entities.find(e => this._isLowSensor(e));
      const buttonEntity = entities.find(e => this._isButtonEntity(e));

      // Merge attributes across all related entities
      const allAttrs: Record<string, any> = {};
      for (const e of entities) {
        if (e.attributes) {
          Object.assign(allAttrs, e.attributes);
        }
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
        for (const [eId, r] of Object.entries(this.hass.entities)) {
          if (
            r.device_id === deviceId &&
            eId.startsWith('sensor.') &&
            !eId.endsWith('_battery_type') &&
            !eId.endsWith('_batterie_typ') &&
            !eId.endsWith('_battery_last_replaced') &&
            !eId.endsWith('_letzter_batteriewechsel')
          ) {
            const st = states[eId];
            if (st && st.attributes?.device_class === 'battery' && !isNaN(parseFloat(st.state))) {
              batteryLevel = parseFloat(st.state);
              break;
            }
          }
        }
      }

      // Device Name resolution: Avoid generic sensor names like "Batterie fast leer" or "Batterie-Typ"
      let name = '';
      if (
        deviceId &&
        this.hass.devices?.[deviceId]?.name_by_user &&
        !this._isGenericName(this.hass.devices[deviceId].name_by_user!)
      ) {
        name = this.hass.devices[deviceId].name_by_user!;
      } else if (
        deviceId &&
        this.hass.devices?.[deviceId]?.name &&
        !this._isGenericName(this.hass.devices[deviceId].name!)
      ) {
        name = this.hass.devices[deviceId].name!;
      } else if (allAttrs.device_name && !this._isGenericName(allAttrs.device_name)) {
        name = allAttrs.device_name;
      }

      if (!name) {
        // Try to get a non-generic friendly name from any related entity
        for (const e of entities) {
          const rawFriendly = e.attributes?.friendly_name;
          if (rawFriendly) {
            const cleaned = this._cleanDeviceName(rawFriendly);
            if (cleaned && !this._isGenericName(cleaned)) {
              name = cleaned;
              break;
            }
          }
        }
      }

      if (!name && allAttrs.source_entity_id && states[allAttrs.source_entity_id]?.attributes?.friendly_name) {
        const cleaned = this._cleanDeviceName(states[allAttrs.source_entity_id].attributes.friendly_name!);
        if (cleaned && !this._isGenericName(cleaned)) {
          name = cleaned;
        }
      }

      if (!name) {
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
      } else if (!buttonEntityId && states[`button.${baseName}_batterie_ersetzt`]) {
        buttonEntityId = `button.${baseName}_batterie_ersetzt`;
      }

      const isUnavailable =
        typeSensor?.state === 'unavailable' || plusSensor?.state === 'unavailable';

      result.push({
        id: group.id,
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
