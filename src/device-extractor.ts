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
  'batteri lav',
  'batteri-type',
  'batteri type',
  'batteritype',
  'batteri',
  'batteriniveau',
  'batteristand',
  'batteri udskiftet',
  'sidst udskiftet',
  'batterij bijna leeg',
  'batterij-type',
  'batterij type',
  'batterijtype',
  'batterij',
  'batterijniveau',
  'batterijstand',
  'batterij vervangen',
  'laatst vervangen',
]);

export function isGenericName(name: string | null | undefined): boolean {
  if (!name) return true;
  const n = name.toLowerCase().trim();
  if (GENERIC_NAMES.has(n)) return true;
  if (
    /^(?:battery|batterie|batteri|batterij)[_\-\s]*(?:type|typ|low|lav|bijna[_\-\s]*leeg|fast[_\-\s]*leer|replaced|ersetzt|udskiftet|vervangen|last[_\-\s]*replaced|plus|\+|status)*(?:[_\-\s]*\d+)?$/i.test(
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
      /\s*(?:[-–—:]|\()\s*(?:Battery Type|Batterietyp|Batterie-Typ|Batteritype|Batteri Type|Batterijtype|Batterij Type|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteri\+|Batterij\+|Batteriestand|Battery Level|Batteriniveau|Batterijniveau|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Sidst udskiftet|Laatst vervangen|Battery Replaced|Batterie ersetzt|Batteri udskiftet|Batterij vervangen|Battery Low|Batterie fast leer|Batteri lav|Batterij bijna leeg|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Batteri|Battery|Batterie|Batterij)\s*\)?$/i,
      ''
    )
    .replace(
      /\s+(?:Battery Type|Batterietyp|Batterie-Typ|Batteritype|Batteri Type|Batterijtype|Batterij Type|Battery Plus|Batterie Plus|Batterie-Plus|Battery\+|Batterie\+|Batteri\+|Batterij\+|Batteriestand|Battery Level|Batteriniveau|Batterijniveau|Last Replaced|Letzter Batteriewechsel|Zuletzt gewechselt|Sidst udskiftet|Laatst vervangen|Battery Replaced|Batterie ersetzt|Batteri udskiftet|Batterij vervangen|Battery Low|Batterie fast leer|Batteri lav|Batterij bijna leeg|Batterie schwach|Battery Status|Batteriestatus|Batterie Status|Batteri|Battery|Batterie|Batterij)$/i,
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
    .replace(/(?:_|-)(?:battery_last_replaced|letzter_batteriewechsel|batterie_zuletzt_ersetzt|sidst_udskiftet|laatst_vervangen)$/i, '')
    .replace(/(?:_|-)(?:battery_type|batterie_typ|batterie-typ|batterietyp|batterie_art|batteritype|batterijtype)$/i, '')
    .replace(/(?:_|-)(?:battery_plus_low|battery_low|batterie_fast_leer|batterie_schwach|niedriger_batteriestand|batteri_lav|batterij_bijna_leeg)$/i, '')
    .replace(/(?:_|-)(?:battery_replaced|batterie_ersetzt|batterie_ersetzen|batteri_udskiftet|batterij_vervangen)$/i, '')
    .replace(/(?:_|-)(?:battery_plus|batterie_plus|battery\+|batterie\+|batteri_plus|batterij_plus)$/i, '')
    .replace(/(?:_|-)(?:battery_level|batteriestand|batterie_stand|batteriniveau|batterijniveau|battery|batterie|batteri|batterij)$/i, '')
    .replace(/_battery$/, '')
    .replace(/_batterie$/, '')
    .replace(/_batteri$/, '')
    .replace(/_batterij$/, '');
}

export function isTypeSensor(e: HassEntity, reg?: any): boolean {
  if (!e.entity_id.startsWith('sensor.')) return false;
  if (reg?.platform && reg.platform !== 'battery_notes') return false;
  if (reg?.translation_key === 'battery_type') return true;
  const id = e.entity_id.toLowerCase();
  return (
    id.endsWith('_battery_type') ||
    id.endsWith('_batterie_typ') ||
    id.endsWith('_batterie-typ') ||
    id.endsWith('_batterie_art') ||
    id.endsWith('_batterietyp') ||
    id.endsWith('_batteritype') ||
    id.endsWith('_batterijtype') ||
    id === 'sensor.battery_type' ||
    id === 'sensor.batterie_typ' ||
    id === 'sensor.batteritype' ||
    id === 'sensor.batterijtype' ||
    /^sensor\.(?:battery|batterie|batteri|batterij)[_\-]typ(?:e)?(?:_\d+)?$/i.test(id) ||
    (e.attributes.battery_type !== undefined && !e.attributes.device_class && (!reg?.platform || reg.platform === 'battery_notes'))
  );
}

export function isPlusSensor(e: HassEntity, reg?: any): boolean {
  if (!e.entity_id.startsWith('sensor.')) return false;
  if (reg?.platform && reg.platform !== 'battery_notes') return false;
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
  if (reg?.platform && reg.platform !== 'battery_notes') return false;
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
  if (reg?.platform && reg.platform !== 'battery_notes') return false;
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
  if (reg?.platform && reg.platform !== 'battery_notes') return false;
  if (reg?.translation_key === 'battery_replaced') return true;
  const id = e.entity_id.toLowerCase();
  return (
    id.endsWith('_battery_replaced') ||
    id.endsWith('_batterie_ersetzt') ||
    id.endsWith('_batterie_ersetzen')
  );
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
  const baseNameMap = new Map<string, DeviceGroup>();
  const sourceEntityMap = new Map<string, DeviceGroup>();
  const deviceGroupsMap = new Map<string, DeviceGroup[]>();

  // Helper function to register a group in maps
  const registerGroup = (g: DeviceGroup) => {
    if (g.deviceId) {
      if (!deviceGroupsMap.has(g.deviceId)) {
        deviceGroupsMap.set(g.deviceId, []);
      }
      const list = deviceGroupsMap.get(g.deviceId)!;
      if (!list.includes(g)) {
        list.push(g);
      }
    }
    if (g.baseName && !isGenericName(g.baseName) && !baseNameMap.has(g.baseName)) {
      baseNameMap.set(g.baseName, g);
    }
    for (const e of g.entities) {
      const src = e.attributes?.source_entity_id;
      if (src && !sourceEntityMap.has(src)) {
        sourceEntityMap.set(src, g);
      }
    }
  };

  // Classify all entities into Anchors (plusSensor, typeSensor, sourceEntityId) and Helpers (button, binary_sensor, last_replaced)
  const anchorEntities: { entityId: string; entity: HassEntity; reg: any }[] = [];
  const helperEntities: { entityId: string; entity: HassEntity; reg: any }[] = [];

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

    const isHelper =
      isButtonEntity(entity, reg) ||
      isLowSensor(entity, reg) ||
      isReplacedSensor(entity, reg);

    if (isHelper) {
      helperEntities.push({ entityId, entity, reg });
    } else {
      anchorEntities.push({ entityId, entity, reg });
    }
  }

  // PASS 1: Group all Primary / Anchor entities
  for (const { entityId, entity, reg } of anchorEntities) {
    const attrs = entity.attributes || {};
    const deviceId: string | undefined = reg?.device_id || attrs.device_id;
    const sourceEntityId: string | undefined = attrs.source_entity_id;

    let rawBase = getBaseName(entityId);
    if (sourceEntityId && (isGenericName(rawBase) || !rawBase)) {
      rawBase = getBaseName(sourceEntityId);
    }
    if (attrs.device_name && (isGenericName(rawBase) || !rawBase)) {
      rawBase = getBaseName(attrs.device_name);
    }

    const baseName = rawBase;
    let group: DeviceGroup | null = null;

    if (sourceEntityId && sourceEntityMap.has(sourceEntityId)) {
      group = sourceEntityMap.get(sourceEntityId)!;
    } else if (baseName && !isGenericName(baseName) && baseNameMap.has(baseName)) {
      group = baseNameMap.get(baseName)!;
    } else if (deviceId && deviceGroupsMap.has(deviceId)) {
      const existingList = deviceGroupsMap.get(deviceId)!;
      const genericGroup = existingList.find(g => isGenericName(g.baseName));
      if (genericGroup) {
        group = genericGroup;
        if (baseName && !isGenericName(baseName)) {
          genericGroup.baseName = baseName;
          baseNameMap.set(baseName, genericGroup);
        }
      } else if (existingList.length === 1) {
        // Single-battery device: combine level and type sensors into the same group
        const g0 = existingList[0];
        const g0HasPlus = g0.entities.some(e => isPlusSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));
        const g0HasType = g0.entities.some(e => isTypeSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));
        const thisIsPlus = isPlusSensor(entity, reg);
        const thisIsType = isTypeSensor(entity, reg);

        if ((g0HasPlus && thisIsType && !g0HasType) || (g0HasType && thisIsPlus && !g0HasPlus)) {
          const g0Src = g0.entities.find(e => e.attributes?.source_entity_id)?.attributes?.source_entity_id;
          if (!g0Src || !sourceEntityId || g0Src === sourceEntityId) {
            group = g0;
          }
        } else if (isGenericName(baseName) || isGenericName(g0.baseName)) {
          group = g0;
        } else if (baseName.startsWith(g0.baseName) || g0.baseName.startsWith(baseName)) {
          group = g0;
        }
      } else {
        const match = existingList.find(
          g => baseName && (baseName.startsWith(g.baseName) || g.baseName.startsWith(baseName))
        );
        if (match) {
          group = match;
        }
      }
    }

    if (!group) {
      const groupId =
        deviceId && baseName && !isGenericName(baseName)
          ? `dev_${deviceId}_${baseName}`
          : deviceId
          ? `dev_${deviceId}`
          : `base_${baseName}`;

      group = {
        id: groupId,
        deviceId,
        baseName,
        entities: [],
      };
      groups.push(group);
      registerGroup(group);
    } else if (deviceId && !group.deviceId) {
      group.deviceId = deviceId;
      registerGroup(group);
    }

    if (sourceEntityId && !sourceEntityMap.has(sourceEntityId)) {
      sourceEntityMap.set(sourceEntityId, group);
    }
    if (baseName && !isGenericName(baseName) && !baseNameMap.has(baseName)) {
      baseNameMap.set(baseName, group);
    }

    group.entities.push(entity);
  }

  // PASS 2: Attach Helper Entities (Button, Low Sensor, Last Replaced Sensor)
  for (const { entityId, entity, reg } of helperEntities) {
    const attrs = entity.attributes || {};
    const deviceId: string | undefined = reg?.device_id || attrs.device_id;
    const sourceEntityId: string | undefined = attrs.source_entity_id;

    let rawBase = getBaseName(entityId);
    if (sourceEntityId && (isGenericName(rawBase) || !rawBase)) {
      rawBase = getBaseName(sourceEntityId);
    }
    if (attrs.device_name && (isGenericName(rawBase) || !rawBase)) {
      rawBase = getBaseName(attrs.device_name);
    }

    const baseName = rawBase;
    let group: DeviceGroup | null = null;

    if (sourceEntityId && sourceEntityMap.has(sourceEntityId)) {
      group = sourceEntityMap.get(sourceEntityId)!;
    } else if (baseName && !isGenericName(baseName) && baseNameMap.has(baseName)) {
      group = baseNameMap.get(baseName)!;
    } else if (deviceId && deviceGroupsMap.has(deviceId)) {
      const existingList = deviceGroupsMap.get(deviceId)!;
      if (existingList.length === 1) {
        group = existingList[0];
      } else {
        const match = existingList.find(
          g => baseName && (baseName.startsWith(g.baseName) || g.baseName.startsWith(baseName))
        );
        group = match || existingList[0];
      }
    } else if (baseName && !isGenericName(baseName)) {
      const match = groups.find(
        g => g.baseName && (baseName.startsWith(g.baseName) || g.baseName.startsWith(baseName))
      );
      if (match) {
        group = match;
      }
    }

    if (!group) {
      const groupId =
        deviceId && baseName && !isGenericName(baseName)
          ? `dev_${deviceId}_${baseName}`
          : deviceId
          ? `dev_${deviceId}`
          : `base_${baseName}`;

      group = {
        id: groupId,
        deviceId,
        baseName,
        entities: [],
      };
      groups.push(group);
      registerGroup(group);
    }

    group.entities.push(entity);
  }

  // POST-PROCESSING MERGE:
  // Ensure that no single device has two separate groups where one has only plusSensor and the other has only typeSensor!
  for (const [, devGroups] of deviceGroupsMap.entries()) {
    if (devGroups.length <= 1) continue;

    for (let i = 0; i < devGroups.length; i++) {
      const g1 = devGroups[i];
      if (!groups.includes(g1)) continue;

      const g1Plus = g1.entities.find(e => isPlusSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));
      const g1Type = g1.entities.find(e => isTypeSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));

      for (let j = i + 1; j < devGroups.length; j++) {
        const g2 = devGroups[j];
        if (!groups.includes(g2)) continue;

        const g2Plus = g2.entities.find(e => isPlusSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));
        const g2Type = g2.entities.find(e => isTypeSensor(e, registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id]));

        const complementary = (g1Plus && !g1Type && g2Type && !g2Plus) || (g1Type && !g1Plus && g2Plus && !g2Type);

        if (complementary) {
          const g1Src = g1.entities.find(e => e.attributes?.source_entity_id)?.attributes?.source_entity_id;
          const g2Src = g2.entities.find(e => e.attributes?.source_entity_id)?.attributes?.source_entity_id;

          const sameSource = !g1Src || !g2Src || g1Src === g2Src;
          const compatibleBase =
            isGenericName(g1.baseName) ||
            isGenericName(g2.baseName) ||
            g1.baseName === g2.baseName ||
            g1.baseName.startsWith(g2.baseName) ||
            g2.baseName.startsWith(g1.baseName);

          if (sameSource && (compatibleBase || devGroups.length === 2)) {
            g1.entities.push(...g2.entities);
            if (isGenericName(g1.baseName) && !isGenericName(g2.baseName)) {
              g1.baseName = g2.baseName;
            }
            groups = groups.filter(g => g !== g2);
            devGroups.splice(j, 1);
            j--;
          }
        }
      }
    }
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
    // Standalone binary sensors or button entities without a plusSensor or typeSensor are strictly discarded.
    const isExplicitlyAllowed = Boolean(config.entities && config.entities.length > 0);
    const hasPlusSensor = Boolean(plusSensor);

    const primaryEntity = plusSensor || typeSensor || entities[0];
    if (!plusSensor && !typeSensor && !isExplicitlyAllowed) {
      continue;
    }

    const regPrimary = registries?.entities?.get((primaryEntity || entities[0]).entity_id) || hass.entities?.[(primaryEntity || entities[0]).entity_id];

    const hasBatteryNotesSignature =
      hasPlusSensor ||
      Boolean(
        typeSensor &&
          (allAttrs.battery_type !== undefined ||
            allAttrs.battery_type_and_quantity !== undefined ||
            typeSensor.attributes?.battery_type !== undefined ||
            regPrimary?.platform === 'battery_notes')
      ) ||
      Boolean(allAttrs.battery_type !== undefined || allAttrs.battery_type_and_quantity !== undefined) ||
      regPrimary?.platform === 'battery_notes';

    if (!isExplicitlyAllowed && !hasBatteryNotesSignature) {
      continue;
    }

    // Find original / companion battery sensor in hass.states
    let companionBatterySensor: HassEntity | undefined;
    const candidates = [
      `sensor.${baseName}_battery`,
      `sensor.${baseName}_batterie`,
      `sensor.${baseName}_batteri`,
      `sensor.${baseName}_batterij`,
      `sensor.${baseName}_battery_level`,
      `sensor.${baseName}_batteriestand`,
      `sensor.${baseName}_batterie_stand`,
      `sensor.${baseName}_batteriniveau`,
      `sensor.${baseName}_batterijniveau`,
      `sensor.${baseName}`,
    ];
    if (baseWithoutSub && baseWithoutSub !== baseName) {
      candidates.push(
        `sensor.${baseWithoutSub}_battery`,
        `sensor.${baseWithoutSub}_batterie`,
        `sensor.${baseWithoutSub}_batteri`,
        `sensor.${baseWithoutSub}_batterij`,
        `sensor.${baseWithoutSub}_battery_level`,
        `sensor.${baseWithoutSub}_batteriestand`,
        `sensor.${baseWithoutSub}`
      );
    }
    if (allAttrs.source_entity_id) {
      const srcBase = getBaseName(allAttrs.source_entity_id);
      if (srcBase && srcBase !== baseName) {
        candidates.push(
          `sensor.${srcBase}_battery`,
          `sensor.${srcBase}_batterie`,
          `sensor.${srcBase}_batteri`,
          `sensor.${srcBase}_battery_level`,
          `sensor.${srcBase}_batteriestand`,
          `sensor.${srcBase}_batteriniveau`,
          `sensor.${srcBase}`
        );
      }
    }
    for (const c of candidates) {
      if (states[c]) {
        companionBatterySensor = states[c];
        break;
      }
    }

    // Device Registry check
    let resolvedDeviceId = deviceId;
    if (!resolvedDeviceId) {
      for (const e of entities) {
        const entReg = registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id];
        if (entReg?.device_id) {
          resolvedDeviceId = entReg.device_id;
          break;
        }
      }
    }
    if (!resolvedDeviceId && allAttrs.source_entity_id) {
      const srcReg = registries?.entities?.get(allAttrs.source_entity_id) || hass.entities?.[allAttrs.source_entity_id];
      if (srcReg?.device_id) {
        resolvedDeviceId = srcReg.device_id;
      }
    }
    if (!resolvedDeviceId && companionBatterySensor) {
      const compReg = registries?.entities?.get(companionBatterySensor.entity_id) || hass.entities?.[companionBatterySensor.entity_id];
      if (compReg?.device_id) {
        resolvedDeviceId = compReg.device_id;
      }
    }

    const devReg = resolvedDeviceId
      ? registries?.devices?.get(resolvedDeviceId) || hass.devices?.[resolvedDeviceId]
      : undefined;

    // Check if this device hosts multiple batteries (e.g. Danfoss Icon master controller with multiple room thermostats)
    const isMultiBatteryDevice = Boolean(
      (deviceId && (deviceGroupsMap.get(deviceId)?.length ?? 0) > 1) ||
      (resolvedDeviceId && (deviceGroupsMap.get(resolvedDeviceId)?.length ?? 0) > 1)
    );

    // Battery level resolution
    let batteryLevel: number | null = null;
    let deviceBatterySensor: HassEntity | undefined;
    if (deviceId && !isMultiBatteryDevice) {
      const entRegMap = registries?.entities;
      for (const [eId, st] of Object.entries(states)) {
        if (!eId.startsWith('sensor.')) continue;
        const r = entRegMap?.get(eId) || hass.entities?.[eId];
        if (r?.device_id === deviceId && st && st.attributes?.device_class === 'battery') {
          deviceBatterySensor = st;
          break;
        }
      }
    }

    if (plusSensor && !isNaN(parseFloat(plusSensor.state))) {
      batteryLevel = parseFloat(plusSensor.state);
    } else if (allAttrs.source_entity_id && states[allAttrs.source_entity_id]) {
      const src = states[allAttrs.source_entity_id];
      if (src.attributes?.battery_level !== undefined && !isNaN(Number(src.attributes.battery_level))) {
        batteryLevel = Number(src.attributes.battery_level);
      } else if (src.attributes?.battery !== undefined && !isNaN(Number(src.attributes.battery))) {
        batteryLevel = Number(src.attributes.battery);
      } else if (src.attributes?.battery_percentage !== undefined && !isNaN(Number(src.attributes.battery_percentage))) {
        batteryLevel = Number(src.attributes.battery_percentage);
      } else if (!isNaN(parseFloat(src.state))) {
        batteryLevel = parseFloat(src.state);
      }
    }

    if (batteryLevel === null) {
      for (const e of entities) {
        if (e.attributes?.battery_level !== undefined && !isNaN(Number(e.attributes.battery_level))) {
          batteryLevel = Number(e.attributes.battery_level);
          break;
        }
        if (e.attributes?.battery !== undefined && !isNaN(Number(e.attributes.battery))) {
          batteryLevel = Number(e.attributes.battery);
          break;
        }
        if (e.attributes?.battery_percentage !== undefined && !isNaN(Number(e.attributes.battery_percentage))) {
          batteryLevel = Number(e.attributes.battery_percentage);
          break;
        }
      }
    }

    if (batteryLevel === null && companionBatterySensor) {
      if (companionBatterySensor.attributes?.battery_level !== undefined && !isNaN(Number(companionBatterySensor.attributes.battery_level))) {
        batteryLevel = Number(companionBatterySensor.attributes.battery_level);
      } else if (!isNaN(parseFloat(companionBatterySensor.state))) {
        batteryLevel = parseFloat(companionBatterySensor.state);
      }
    }

    if (
      batteryLevel === null &&
      allAttrs.battery_last_reported_level !== undefined &&
      !isNaN(Number(allAttrs.battery_last_reported_level))
    ) {
      batteryLevel = Number(allAttrs.battery_last_reported_level);
    } else if (batteryLevel === null && deviceBatterySensor && !isNaN(parseFloat(deviceBatterySensor.state))) {
      batteryLevel = parseFloat(deviceBatterySensor.state);
    }

    // Home Assistant entity area_id explicitly overrides device area_id if set
    let primaryAreaId: string | undefined;

    if (primaryEntity) {
      const entReg = registries?.entities?.get(primaryEntity.entity_id) || hass.entities?.[primaryEntity.entity_id];
      if (entReg?.area_id) {
        primaryAreaId = entReg.area_id;
      }
    }

    if (!primaryAreaId) {
      for (const e of entities) {
        const entReg = registries?.entities?.get(e.entity_id) || hass.entities?.[e.entity_id];
        if (entReg?.area_id) {
          primaryAreaId = entReg.area_id;
          break;
        }
      }
    }

    if (!primaryAreaId && allAttrs.source_entity_id) {
      const srcReg = registries?.entities?.get(allAttrs.source_entity_id) || hass.entities?.[allAttrs.source_entity_id];
      if (srcReg?.area_id) {
        primaryAreaId = srcReg.area_id;
      }
    }

    if (!primaryAreaId && companionBatterySensor) {
      const compReg = registries?.entities?.get(companionBatterySensor.entity_id) || hass.entities?.[companionBatterySensor.entity_id];
      if (compReg?.area_id) {
        primaryAreaId = compReg.area_id;
      }
    }

    if (!primaryAreaId) {
      primaryAreaId = devReg?.area_id || undefined;
    }

    let areaName = primaryAreaId
      ? registries?.areas?.get(primaryAreaId)?.name || hass.areas?.[primaryAreaId]?.name
      : undefined;

    if (!areaName && (allAttrs.area || allAttrs.area_name)) {
      areaName = allAttrs.area_name || allAttrs.area;
    }

    let name = '';

    // 1. Manual override in card configuration
    if (config.device_names) {
      name =
        config.device_names[baseName] ||
        (allAttrs.source_entity_id ? config.device_names[allAttrs.source_entity_id] : '') ||
        (!isMultiBatteryDevice && deviceId ? config.device_names[deviceId] : '') ||
        '';
    }

    // If Battery Notes was attached to a specific source entity (e.g. climate.danfoss_office),
    // the source entity's friendly name represents the actual unit/room!
    if (!name && allAttrs.source_entity_id && states[allAttrs.source_entity_id]?.attributes?.friendly_name) {
      const cleaned = cleanDeviceName(states[allAttrs.source_entity_id].attributes.friendly_name!);
      if (cleaned && !isGenericName(cleaned)) {
        name = cleaned;
      }
    }

    if (!name && allAttrs.source_entity_id) {
      const srcReg = registries?.entities?.get(allAttrs.source_entity_id) || hass.entities?.[allAttrs.source_entity_id];
      if (srcReg?.name && !isGenericName(srcReg.name)) {
        name = srcReg.name;
      }
    }

    if (isMultiBatteryDevice) {
      // On multi-battery devices (e.g. Danfoss Icon with multiple thermostats),
      // prioritize the specific thermostat/battery entity name over the parent gateway name!

      // Entity registry custom name on primary entity
      if (!name && primaryEntity) {
        const entReg = registries?.entities?.get(primaryEntity.entity_id) || hass.entities?.[primaryEntity.entity_id];
        if (entReg?.name && !isGenericName(entReg.name)) {
          name = entReg.name;
        }
      }

      // Primary entity friendly name (e.g. "Living Room Battery+" -> "Living Room")
      if (!name && primaryEntity?.attributes?.friendly_name) {
        const cleaned = cleanDeviceName(primaryEntity.attributes.friendly_name);
        if (cleaned && !isGenericName(cleaned)) {
          name = cleaned;
        }
      }

      // Companion battery sensor friendly_name
      if (!name && companionBatterySensor?.attributes?.friendly_name) {
        const cleaned = cleanDeviceName(companionBatterySensor.attributes.friendly_name);
        if (cleaned && !isGenericName(cleaned)) {
          name = cleaned;
        }
      }

      // Group entities friendly_name
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

      // device_name attribute from Battery Notes
      if (!name && allAttrs.device_name && !isGenericName(allAttrs.device_name)) {
        name = allAttrs.device_name;
      }

      // Fallback: If specific name is still empty, combine parent device name with area or baseName
      const parentName = devReg?.name_by_user || devReg?.name;
      if (!name && parentName && !isGenericName(parentName)) {
        if (areaName && !parentName.toLowerCase().includes(areaName.toLowerCase())) {
          name = `${parentName} ${areaName}`;
        } else if (baseName && !isGenericName(baseName)) {
          name = `${parentName} ${baseName.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`;
        } else {
          name = parentName;
        }
      }
    } else {
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
      plusSensor?.state === 'unavailable' ||
      primaryEntity?.state === 'unavailable' ||
      typeSensor?.state === 'unavailable' ||
      Boolean(allAttrs.source_entity_id && states[allAttrs.source_entity_id]?.state === 'unavailable') ||
      companionBatterySensor?.state === 'unavailable' ||
      deviceBatterySensor?.state === 'unavailable';

    const clickableEntityId =
      plusSensor?.entity_id ||
      (allAttrs.source_entity_id && states[allAttrs.source_entity_id] ? allAttrs.source_entity_id : undefined) ||
      companionBatterySensor?.entity_id ||
      primaryEntity.entity_id;

    result.push({
      id: group.id,
      deviceId: resolvedDeviceId || deviceId,
      sourceEntityId: allAttrs.source_entity_id,
      entityId: clickableEntityId,
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
      hasPlusSensor,
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
  const numInit = typeof initialRows === 'number' ? initialRows : Number(initialRows);
  const init = !isNaN(numInit) && numInit > 0 && typeof initialRows !== 'boolean' ? Math.floor(numInit) : 0;

  const numStep = typeof stepRows === 'number' ? stepRows : Number(stepRows);
  const step = !isNaN(numStep) && numStep > 0 && typeof stepRows !== 'boolean' ? Math.floor(numStep) : (init > 0 ? init : 10);

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

export function sanitizeCardConfig(config: BatteryNotesCardConfig): BatteryNotesCardConfig {
  const cleanConfig: BatteryNotesCardConfig = { ...config };

  if (cleanConfig.initial_rows !== undefined) {
    const num = Number(cleanConfig.initial_rows);
    if (typeof cleanConfig.initial_rows === 'boolean' || isNaN(num) || num <= 0) {
      delete cleanConfig.initial_rows;
    } else {
      cleanConfig.initial_rows = Math.floor(num);
    }
  }

  if (cleanConfig.step_rows !== undefined) {
    const num = Number(cleanConfig.step_rows);
    if (typeof cleanConfig.step_rows === 'boolean' || isNaN(num) || num <= 0) {
      delete cleanConfig.step_rows;
    } else {
      cleanConfig.step_rows = Math.floor(num);
    }
  }

  if (cleanConfig.title !== undefined && typeof cleanConfig.title !== 'string') {
    delete cleanConfig.title;
  }

  if (cleanConfig.icon !== undefined && typeof cleanConfig.icon !== 'string') {
    delete cleanConfig.icon;
  }

  if (cleanConfig.sort_by !== undefined) {
    const validSorts = ['battery', 'name', 'type', 'last_replaced', 'status', 'area'];
    if (!validSorts.includes(cleanConfig.sort_by)) {
      cleanConfig.sort_by = 'battery';
    }
  }

  if (cleanConfig.show_area !== undefined && typeof cleanConfig.show_area !== 'boolean') {
    cleanConfig.show_area = Boolean(cleanConfig.show_area);
  }

  if (cleanConfig.always_show_area !== undefined && typeof cleanConfig.always_show_area !== 'boolean') {
    cleanConfig.always_show_area = Boolean(cleanConfig.always_show_area);
  }

  if (cleanConfig.unavailable_first !== undefined && typeof cleanConfig.unavailable_first !== 'boolean') {
    cleanConfig.unavailable_first = Boolean(cleanConfig.unavailable_first);
  }

  if (cleanConfig.battery_plus_only !== undefined && typeof cleanConfig.battery_plus_only !== 'boolean') {
    cleanConfig.battery_plus_only = Boolean(cleanConfig.battery_plus_only);
  }

  return cleanConfig;
}

export function parseEditorValue(target: {
  type?: string;
  tagName?: string;
  checked?: boolean;
  value?: string;
}): any {
  if (target.type === 'checkbox') {
    return Boolean(target.checked);
  }
  if (target.tagName === 'HA-SWITCH' || target.tagName === 'HA-CHECKBOX') {
    return Boolean(target.checked);
  }
  if (target.type === 'number') {
    const raw = target.value;
    if (raw === '' || raw === null || raw === undefined) {
      return undefined;
    }
    const parsed = Number(raw);
    return isNaN(parsed) || parsed <= 0 ? undefined : Math.floor(parsed);
  }
  const val = target.value;
  if (typeof val === 'string' && val.trim() === '') {
    return undefined;
  }
  return val;
}

