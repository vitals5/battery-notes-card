import type {
  HomeAssistant,
  BatteryNotesCardConfig,
  BatteryDeviceItem,
  HassEntity,
  HomeAssistantRegistries,
} from './types.ts';

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
  'batterie plus',
  'batterie-plus',
  'battery low',
  'battery type',
  'battery last replaced',
  'battery replaced',
  'battery+',
  'battery',
  'battery plus',
  'battery-plus',
  'battery status',
  'batteriestatus',
  'batterie status',
]);

export function isGenericName(name: string | null | undefined): boolean {
  if (!name) return true;
  const n = name.toLowerCase().trim();
  if (GENERIC_NAMES.has(n)) return true;
  if (
    /^(?:battery|batterie)[_\-\s]*(?:type|typ|low|fast[_\-\s]*leer|replaced|ersetzt|last[_\-\s]*replaced|plus|\+|status)*(?:[_\-\s]*\d+)?$/i.test(
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
      /\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Battery|Batterie)\s*\)?$/i,
      ''
    )
    .replace(
      /\s+(?:Battery Type|Batterietyp|Batterie-Typ|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteriestand|Battery Level|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Battery Replaced|Batterie ersetzt|Battery Low|Batterie fast leer|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Battery|Batterie)$/i,
      ''
    )
    .replace(/[\s\-_:–—()]+$/g, '')
    .trim();
}

/**
 * Cleans trailing entity-specific role nouns from friendly names of sibling entities
 * (e.g. "Rauchmelder Flur Rauchalarm" -> "Rauchmelder Flur")
 */
export function cleanSiblingDeviceName(name: string | null | undefined): string {
  if (!name) return '';
  let cleaned = cleanDeviceName(name);
  if (!cleaned) return '';

  const rolePattern = /(?:\s+|-)(?:Rauchalarm|Rauch|Sabotagekontakt|Sabotage|Status|State|Alarm|Detection)$/i;
  while (rolePattern.test(cleaned)) {
    const next = cleaned.replace(rolePattern, '').trim();
    if (next.length >= 3 && !isGenericName(next)) {
      cleaned = next;
    } else {
      break;
    }
  }

  return cleaned;
}

/**
 * Converts technical object IDs (e.g. smoke_alarm_sbs50148a0d90_00000001) into clean, human-readable names
 * (e.g. "Smoke Alarm 1")
 */
export function formatTechnicalDeviceName(baseName: string): string {
  if (!baseName) return '';
  // 1. Normalize zero-padded numbers e.g. _00000001 -> _1
  let cleaned = baseName.replace(/([_-])0+([1-9]\d*)\b/g, '$1$2');
  // 2. Strip hardware MAC/serial tokens e.g. sbs50148a0d90 or hex hashes
  cleaned = cleaned.replace(/([_-])(?:sbs\d+[a-f0-9]+|[a-f0-9]*[a-f][a-f0-9]{5,})/gi, '');
  cleaned = cleaned.replace(/^_+|_+$/g, '').replace(/_+/g, ' ');
  return cleaned.replace(/\b\w/g, l => l.toUpperCase()).trim() || baseName;
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
    id.endsWith('_batterie+') ||
    id === 'sensor.battery_plus' ||
    id === 'sensor.batterie_plus'
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
  if (reg?.translation_key === 'battery_low' || reg?.translation_key === 'battery_plus_low') return true;
  if (reg?.platform === 'battery_notes') return true;
  const id = e.entity_id.toLowerCase();
  return (
    id.endsWith('_battery_low') ||
    id.endsWith('_battery_plus_low') ||
    id.endsWith('_batterie_fast_leer') ||
    id.endsWith('_batterie_schwach') ||
    id.endsWith('_niedriger_batteriestand')
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
  config: BatteryNotesCardConfig,
  registries?: HomeAssistantRegistries
): BatteryDeviceItem[] {
  if (!hass || !hass.states) return [];

  const states = hass.states;
  let groups: DeviceGroup[] = [];
  const deviceMap = new Map<string, DeviceGroup>();
  const baseNameMap = new Map<string, DeviceGroup>();

  // 1. Collect all Battery Notes entities and group by deviceId or baseName
  for (const [entityId, entity] of Object.entries(states)) {
    const attrs = entity.attributes || {};
    const reg = registries?.entities?.get(entityId) || hass.entities?.[entityId];

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
    const baseWithoutSub = baseName.replace(/([_-])0*[0-9a-f]{6,}\b/i, '');

    if (excludeSet.has(baseName) || (deviceId && excludeSet.has(deviceId))) {
      continue;
    }
    if (entities.some(e => excludeSet.has(e.entity_id))) {
      continue;
    }

    const typeSensor = entities.find(e => isTypeSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));
    const plusSensor = entities.find(e => isPlusSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));
    const replacedSensor = entities.find(e => isReplacedSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));
    const lowSensor = entities.find(e => isLowSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));
    const buttonEntity = entities.find(e => isButtonEntity(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));

    const allAttrs: Record<string, any> = {};
    for (const e of entities) {
      if (e.attributes) {
        Object.assign(allAttrs, e.attributes);
      }
    }

    // Device Qualification:
    // In automatic discovery mode (when config.entities is not specified or empty),
    // a device MUST qualify as a genuine Battery Notes device.
    // Every Battery Notes device has a sensor.*_battery_plus entity (isPlusSensor),
    // or has a battery_type sensor/attribute or platform === 'battery_notes'.
    // Standalone binary sensors or generic entities without Battery Notes backing are strictly discarded.
    const isExplicitlyAllowed = Boolean(config.entities && config.entities.length > 0);
    const hasPlusSensor = Boolean(plusSensor);
    const hasBatteryNotesSignature =
      Boolean(
        typeSensor &&
          (allAttrs.battery_type !== undefined ||
            allAttrs.battery_type_and_quantity !== undefined ||
            (typeSensor.state && typeSensor.state !== 'unknown' && typeSensor.state !== 'unavailable'))
      ) ||
      Boolean(allAttrs.battery_type !== undefined || allAttrs.battery_type_and_quantity !== undefined) ||
      entities.some(e => {
        const r = registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id];
        return r?.platform === 'battery_notes';
      });

    if (!isExplicitlyAllowed && !hasPlusSensor && !hasBatteryNotesSignature) {
      continue;
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
    if (baseWithoutSub && baseWithoutSub !== baseName) {
      candidates.push(
        `sensor.${baseWithoutSub}_battery`,
        `sensor.${baseWithoutSub}_batterie`,
        `sensor.${baseWithoutSub}_battery_level`,
        `sensor.${baseWithoutSub}_batteriestand`,
        `sensor.${baseWithoutSub}`
      );
    }
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
    } else if (deviceId) {
      const entRegMap = registries?.entities;
      for (const [eId, st] of Object.entries(states)) {
        if (!eId.startsWith('sensor.')) continue;
        const r = entRegMap?.get(eId) || hass.entities?.[eId];
        if (r?.device_id === deviceId) {
          if (st && st.attributes?.device_class === 'battery' && !isNaN(parseFloat(st.state))) {
            batteryLevel = parseFloat(st.state);
            break;
          }
        }
      }
    }

    // Device Registry check
    const devReg = deviceId
      ? registries?.devices?.get(deviceId) || hass.devices?.[deviceId]
      : undefined;

    const primaryAreaId =
      devReg?.area_id ||
      (primaryEntity
        ? registries?.entities?.get(primaryEntity.entity_id)?.area_id ||
          hass.entities?.[primaryEntity.entity_id]?.area_id
        : undefined);

    const areaName = primaryAreaId
      ? registries?.areas?.get(primaryAreaId)?.name || hass.areas?.[primaryAreaId]?.name
      : undefined;

    let name = '';

    // 1. Manual override in card configuration
    if (config.device_names) {
      name =
        config.device_names[baseName] ||
        (deviceId ? config.device_names[deviceId] : '') ||
        '';
    }

    // 2. Device Registry name_by_user (user-renamed device in HA)
    if (!name && devReg?.name_by_user && !isGenericName(devReg.name_by_user)) {
      name = devReg.name_by_user;
    }

    // 3. Device Registry default name
    if (!name && devReg?.name && !isGenericName(devReg.name)) {
      name = devReg.name;
    }

    // 4. device_name attribute from Battery Notes
    if (!name && allAttrs.device_name && !isGenericName(allAttrs.device_name)) {
      name = allAttrs.device_name;
    }

    // 5. Entity registry custom name
    if (!name && primaryEntity) {
      const entReg = registries?.entities?.get(primaryEntity.entity_id) || hass.entities?.[primaryEntity.entity_id];
      if (entReg?.name && !isGenericName(entReg.name)) {
        name = entReg.name;
      }
    }

    // 6. Companion battery sensor friendly_name
    if (!name && companionBatterySensor?.attributes?.friendly_name) {
      const cleaned = cleanDeviceName(companionBatterySensor.attributes.friendly_name);
      if (cleaned && !isGenericName(cleaned)) {
        name = cleaned;
      }
    }

    // 7. Group entities friendly_name
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

    // 8. source_entity_id friendly_name
    if (!name && allAttrs.source_entity_id && states[allAttrs.source_entity_id]?.attributes?.friendly_name) {
      const cleaned = cleanDeviceName(states[allAttrs.source_entity_id].attributes.friendly_name!);
      if (cleaned && !isGenericName(cleaned)) {
        name = cleaned;
      }
    }

    // 9. Sibling entities with the same base prefix in hass.states (e.g. smoke alarm, status, etc.)
    if (!name && baseName && !isGenericName(baseName)) {
      const basePrefix = baseName.toLowerCase();
      const baseNoSub = baseWithoutSub.toLowerCase();

      for (const [sId, sEntity] of Object.entries(states)) {
        if (!entities.some(e => e.entity_id === sId) && sEntity.attributes?.friendly_name) {
          const sObjId = sId.includes('.') ? sId.split('.')[1].toLowerCase() : sId.toLowerCase();
          if (sObjId.startsWith(basePrefix) || (baseNoSub.length >= 6 && sObjId.startsWith(baseNoSub))) {
            const cleaned = cleanSiblingDeviceName(sEntity.attributes.friendly_name);
            if (cleaned && !isGenericName(cleaned)) {
              name = cleaned;
              break;
            }
          }
        }
      }
    }

    // 10. Combine with areaName if areaName is known
    if (areaName) {
      if (!name) {
        name = `${areaName} Rauchmelder`;
      } else if (!name.toLowerCase().includes(areaName.toLowerCase())) {
        if (/^(?:smoke[_\-\s]*alarm|rauchmelder|sensor|alarm)$/i.test(name.trim())) {
          name = `${areaName} ${name}`;
        }
      }
    }

    // 11. Format technical device name fallback (e.g. "Smoke Alarm 1")
    if (!name && !isGenericName(baseName)) {
      name = formatTechnicalDeviceName(baseName);
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
    } else if (!buttonEntityId && baseWithoutSub && states[`button.${baseWithoutSub}_battery_replaced`]) {
      buttonEntityId = `button.${baseWithoutSub}_battery_replaced`;
    } else if (!buttonEntityId && baseWithoutSub && states[`button.${baseWithoutSub}_batterie_ersetzt`]) {
      buttonEntityId = `button.${baseWithoutSub}_batterie_ersetzt`;
    }

    const isUnavailable =
      typeSensor?.state === 'unavailable' || plusSensor?.state === 'unavailable';

    result.push({
      id: group.id,
      deviceId,
      sourceEntityId: allAttrs.source_entity_id,
      entityId: primaryEntity.entity_id,
      name,
      area: areaName,
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

export interface PaginationState {
  effectiveLimit: number;
  remainingCount: number;
  nextStep: number;
  canShowMore: boolean;
  canShowLess: boolean;
}

export function computePagination(
  totalMatching: number,
  displayedRows: number,
  initialRows?: number,
  stepRows?: number,
  maxRows?: number
): PaginationState {
  const init = initialRows && initialRows > 0 ? initialRows : 0;
  const step = stepRows && stepRows > 0 ? stepRows : (init > 0 ? init : 10);

  let effectiveLimit = totalMatching;
  if (init > 0) {
    effectiveLimit = displayedRows > 0 ? displayedRows : init;
  }

  if (maxRows && maxRows > 0) {
    effectiveLimit = Math.min(effectiveLimit, maxRows);
  }

  effectiveLimit = Math.min(totalMatching, effectiveLimit);

  const visibleCount = effectiveLimit;
  const remainingCount = Math.max(0, totalMatching - visibleCount);
  const nextStep = Math.min(step, remainingCount);
  const canShowMore = remainingCount > 0 && (!maxRows || visibleCount < maxRows);
  const canShowLess = init > 0 && visibleCount > init;

  return {
    effectiveLimit,
    remainingCount,
    nextStep,
    canShowMore,
    canShowLess,
  };
}
