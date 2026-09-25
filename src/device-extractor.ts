import type { HomeAssistant, BatteryNotesCardConfig, BatteryDeviceItem, HassEntity } from './types.ts';

export const GENERIC_NAMES = new Set([
  'batterie fast leer',
  'batterie-typ',
  'batterie - typ',
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

export function isGenericName(name: string | null | undefined): boolean {
  if (!name) return true;
  const n = name.toLowerCase().trim();
  if (GENERIC_NAMES.has(n)) return true;
  if (
    /^(?:battery|batterie)[_\-\s]*(?:type|typ|low|fast[_\-\s]*leer|replaced|ersetzt|last[_\-\s]*replaced|plus|\+)*(?:[_\-\s]*\d+)?$/i.test(
      n
    )
  ) {
    return true;
  }
  return false;
}

export function cleanDeviceName(name: string | null | undefined): string {
  if (!name) return '';
  return name
    .replace(
      /\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery|Batterie)\s*\)?$/i,
      ''
    )
    .replace(
      /\s+(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery|Batterie)$/i,
      ''
    )
    .replace(/[\s\-_:–—()]+$/g, '')
    .trim();
}

export function getBaseName(entityId: string): string {
  const objectId = entityId.includes('.') ? entityId.split('.')[1] : entityId;
  return objectId
    .replace(/(?:_|-)(?:battery_last_replaced|letzter_batteriewechsel|batterie_zuletzt_ersetzt)$/i, '')
    .replace(/(?:_|-)(?:battery_type|batterie_typ|batterie-typ|batterietyp|batterie_art)$/i, '')
    .replace(/(?:_|-)(?:battery_plus_low|battery_low|batterie_fast_leer|batterie_schwach|niedriger_batteriestand)$/i, '')
    .replace(/(?:_|-)(?:battery_replaced|batterie_ersetzt)$/i, '')
    .replace(/(?:_|-)(?:battery_plus|batterie_plus|battery\+|batterie\+)$/i, '')
    .replace(/(?:_|-)(?:battery_level|batteriestand|batterie_stand|battery|batterie)$/i, '')
    .replace(/_battery$/, '')
    .replace(/_batterie$/, '');
}

export function isTypeSensor(e: HassEntity, reg?: any): boolean {
  if (!e.entity_id.startsWith('sensor.')) return false;
  if (reg?.translation_key === 'battery_type') return true;
  const id = e.entity_id.toLowerCase();
  return (
    id.endsWith('_battery_type') ||
    id.endsWith('_batterie_typ') ||
    id.endsWith('_batterie-typ') ||
    id.endsWith('_batterie_art') ||
    id.endsWith('_batterietyp') ||
    id === 'sensor.battery_type' ||
    id === 'sensor.batterie_typ' ||
    /^sensor\.batterie[_\-]typ(?:_\d+)?$/i.test(id) ||
    /^sensor\.battery[_\-]type(?:_\d+)?$/i.test(id) ||
    (e.attributes.battery_type !== undefined && !e.attributes.device_class)
  );
}

export function isPlusSensor(e: HassEntity, reg?: any): boolean {
  if (!e.entity_id.startsWith('sensor.')) return false;
  if (reg?.translation_key === 'battery_plus') return true;
  const id = e.entity_id.toLowerCase();
  return (
    id.endsWith('_battery_plus') ||
    id.endsWith('_batterie_plus') ||
    id.endsWith('_battery+') ||
    id.endsWith('_batterie+')
  );
}

export function isReplacedSensor(e: HassEntity, reg?: any): boolean {
  if (!e.entity_id.startsWith('sensor.')) return false;
  if (reg?.translation_key === 'battery_last_replaced') return true;
  const id = e.entity_id.toLowerCase();
  return (
    id.endsWith('_battery_last_replaced') ||
    id.endsWith('_letzter_batteriewechsel') ||
    id.endsWith('_batterie_zuletzt_ersetzt')
  );
}

export function isLowSensor(e: HassEntity, reg?: any): boolean {
  if (!e.entity_id.startsWith('binary_sensor.')) return false;
  if (reg?.translation_key === 'battery_low') return true;
  const id = e.entity_id.toLowerCase();
  return (
    id.endsWith('_battery_low') ||
    id.endsWith('_battery_plus_low') ||
    id.endsWith('_batterie_fast_leer') ||
    id.endsWith('_batterie_schwach') ||
    id.endsWith('_niedriger_batteriestand') ||
    e.attributes.device_class === 'battery'
  );
}

export function isButtonEntity(e: HassEntity, reg?: any): boolean {
  if (!e.entity_id.startsWith('button.')) return false;
  if (reg?.translation_key === 'battery_replaced') return true;
  const id = e.entity_id.toLowerCase();
  return id.endsWith('_battery_replaced') || id.endsWith('_batterie_ersetzt');
}

interface DeviceGroup {
  id: string;
  deviceId?: string;
  baseName: string;
  entities: HassEntity[];
}

export function extractBatteryDevices(
  hass: HomeAssistant,
  config: BatteryNotesCardConfig
): BatteryDeviceItem[] {
  if (!hass || !hass.states) return [];

  const states = hass.states;
  let groups: DeviceGroup[] = [];
  const deviceMap = new Map<string, DeviceGroup>();
  const baseNameMap = new Map<string, DeviceGroup>();

  // 1. Collect all Battery Notes entities and group by deviceId or baseName
  for (const [entityId, entity] of Object.entries(states)) {
    const attrs = entity.attributes || {};
    const reg = hass.entities?.[entityId];

    const isBattery =
      reg?.platform === 'battery_notes' ||
      isTypeSensor(entity, reg) ||
      isPlusSensor(entity, reg) ||
      isReplacedSensor(entity, reg) ||
      isLowSensor(entity, reg) ||
      isButtonEntity(entity, reg) ||
      attrs.battery_type !== undefined ||
      attrs.battery_type_and_quantity !== undefined;

    if (!isBattery) {
      continue;
    }

    const deviceId: string | undefined = reg?.device_id || attrs.device_id;

    // Determine baseName: prefer source_entity_id if baseName of entityId would be generic
    let rawBase = getBaseName(entityId);
    if (attrs.source_entity_id && (isGenericName(rawBase) || !rawBase)) {
      rawBase = getBaseName(attrs.source_entity_id);
    }
    if (attrs.device_name && (isGenericName(rawBase) || !rawBase)) {
      rawBase = getBaseName(attrs.device_name);
    }

    const baseName = rawBase;

    let group: DeviceGroup | null = null;

    if (deviceId && deviceMap.has(deviceId)) {
      group = deviceMap.get(deviceId)!;
    } else if (baseName && !isGenericName(baseName) && baseNameMap.has(baseName)) {
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
      if (deviceMap.has(deviceId)) {
        const existingGroup = deviceMap.get(deviceId)!;
        if (existingGroup !== group) {
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
    if (baseName && !isGenericName(baseName)) {
      baseNameMap.set(baseName, group);
    }

    group.entities.push(entity);
  }

  const result: BatteryDeviceItem[] = [];
  const excludeSet = new Set(config.exclude_entities || []);

  let groupsToProcess = groups;
  if (config.entities && config.entities.length > 0) {
    const allowedBases = new Set(config.entities.map(id => getBaseName(id)));
    const allowedEntities = new Set(config.entities);
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

    if (excludeSet.has(baseName) || (deviceId && excludeSet.has(deviceId))) {
      continue;
    }
    if (entities.some(e => excludeSet.has(e.entity_id))) {
      continue;
    }

    const typeSensor = entities.find(e => isTypeSensor(e, hass.entities?.[e.entity_id]));
    const plusSensor = entities.find(e => isPlusSensor(e, hass.entities?.[e.entity_id]));
    const replacedSensor = entities.find(e => isReplacedSensor(e, hass.entities?.[e.entity_id]));
    const lowSensor = entities.find(e => isLowSensor(e, hass.entities?.[e.entity_id]));
    const buttonEntity = entities.find(e => isButtonEntity(e, hass.entities?.[e.entity_id]));

    const allAttrs: Record<string, any> = {};
    for (const e of entities) {
      if (e.attributes) {
        Object.assign(allAttrs, e.attributes);
      }
    }

    const primaryEntity = plusSensor || typeSensor || entities[0];

    // Find original / companion battery sensor in hass.states
    let companionBatterySensor: HassEntity | undefined;
    const candidates = [
      `sensor.${baseName}_battery`,
      `sensor.${baseName}_batterie`,
      `sensor.${baseName}_battery_level`,
      `sensor.${baseName}_batteriestand`,
      `sensor.${baseName}_batterie_stand`,
      `sensor.${baseName}`,
    ];
    for (const c of candidates) {
      if (states[c]) {
        companionBatterySensor = states[c];
        break;
      }
    }

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
    } else if (companionBatterySensor && !isNaN(parseFloat(companionBatterySensor.state))) {
      batteryLevel = parseFloat(companionBatterySensor.state);
    } else if (
      allAttrs.battery_last_reported_level !== undefined &&
      !isNaN(Number(allAttrs.battery_last_reported_level))
    ) {
      batteryLevel = Number(allAttrs.battery_last_reported_level);
    } else if (deviceId && hass.entities) {
      for (const [eId, r] of Object.entries(hass.entities)) {
        if (
          r.device_id === deviceId &&
          eId.startsWith('sensor.') &&
          !isTypeSensor(states[eId] || { entity_id: eId, state: '', attributes: {} }, r) &&
          !isReplacedSensor(states[eId] || { entity_id: eId, state: '', attributes: {} }, r)
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
    if (
      deviceId &&
      hass.devices?.[deviceId]?.name_by_user &&
      !isGenericName(hass.devices[deviceId].name_by_user!)
    ) {
      name = hass.devices[deviceId].name_by_user!;
    } else if (
      deviceId &&
      hass.devices?.[deviceId]?.name &&
      !isGenericName(hass.devices[deviceId].name!)
    ) {
      name = hass.devices[deviceId].name!;
    } else if (allAttrs.device_name && !isGenericName(allAttrs.device_name)) {
      name = allAttrs.device_name;
    }

    if (!name && companionBatterySensor?.attributes?.friendly_name) {
      const cleaned = cleanDeviceName(companionBatterySensor.attributes.friendly_name);
      if (cleaned && !isGenericName(cleaned)) {
        name = cleaned;
      }
    }

    if (!name) {
      for (const e of entities) {
        const rawFriendly = e.attributes?.friendly_name;
        if (rawFriendly) {
          const cleaned = cleanDeviceName(rawFriendly);
          if (cleaned && !isGenericName(cleaned)) {
            name = cleaned;
            break;
          }
        }
      }
    }

    if (!name && allAttrs.source_entity_id && states[allAttrs.source_entity_id]?.attributes?.friendly_name) {
      const cleaned = cleanDeviceName(states[allAttrs.source_entity_id].attributes.friendly_name!);
      if (cleaned && !isGenericName(cleaned)) {
        name = cleaned;
      }
    }

    if (!name && !isGenericName(baseName)) {
      name = baseName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // Safety: If name is still generic (e.g. "Batterie-Typ" or empty), do NOT show it as a device!
    if (isGenericName(name)) {
      continue;
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
    const threshold = config.filter_threshold ?? 20;
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
      name,
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
