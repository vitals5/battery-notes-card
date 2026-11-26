import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  extractBatteryDevices,
  cleanDeviceName,
  isGenericName,
  getBaseName,
  computePagination,
  sanitizeCardConfig,
  parseEditorValue,
} from '../src/device-extractor.ts';
import type { HomeAssistant, BatteryNotesCardConfig, HomeAssistantRegistries } from '../src/types.ts';

const defaultConfig: BatteryNotesCardConfig = {
  type: 'custom:battery-notes-card',
};

describe('Device Extractor Unit Tests', () => {
  describe('Helper functions', () => {
    it('isGenericName should accurately identify generic entity names', () => {
      assert.strictEqual(isGenericName('Batterie-Typ'), true);
      assert.strictEqual(isGenericName('Batterie - Typ'), true);
      assert.strictEqual(isGenericName('Batterietyp'), true);
      assert.strictEqual(isGenericName('Batterie fast leer'), true);
      assert.strictEqual(isGenericName('Letzter Batteriewechsel'), true);
      assert.strictEqual(isGenericName('Batterie ersetzt'), true);
      assert.strictEqual(isGenericName('Battery Low'), true);
      assert.strictEqual(isGenericName('Battery Type'), true);
      assert.strictEqual(isGenericName('batterie_typ_2'), true);
      assert.strictEqual(isGenericName('battery_type_3'), true);

      assert.strictEqual(isGenericName('Küche Bewegungsmelder'), false);
      assert.strictEqual(isGenericName('Wohnzimmer Thermostat'), false);
      assert.strictEqual(isGenericName('Fenster Bad'), false);
    });

    it('cleanDeviceName should strip integration suffixes and trailing separators', () => {
      assert.strictEqual(cleanDeviceName('Küche Bewegungsmelder - Batterie-Typ'), 'Küche Bewegungsmelder');
      assert.strictEqual(cleanDeviceName('Wohnzimmer Thermostat (Batterie-Typ)'), 'Wohnzimmer Thermostat');
      assert.strictEqual(cleanDeviceName('Büro Fensterkontakt: Batterie-Typ'), 'Büro Fensterkontakt');
      assert.strictEqual(cleanDeviceName('Flur Rauchmelder Batterie fast leer'), 'Flur Rauchmelder');
      assert.strictEqual(cleanDeviceName('Bad Heizung Letzter Batteriewechsel'), 'Bad Heizung');
      assert.strictEqual(cleanDeviceName('Schlafzimmer Batterie'), 'Schlafzimmer');
    });

    it('getBaseName should strip both English and German suffixes', () => {
      assert.strictEqual(getBaseName('sensor.kueche_battery_type'), 'kueche');
      assert.strictEqual(getBaseName('sensor.kueche_batterie_typ'), 'kueche');
      assert.strictEqual(getBaseName('binary_sensor.kueche_batterie_fast_leer'), 'kueche');
      assert.strictEqual(getBaseName('sensor.kueche_letzter_batteriewechsel'), 'kueche');
      assert.strictEqual(getBaseName('button.kueche_batterie_ersetzt'), 'kueche');
      assert.strictEqual(getBaseName('sensor.kueche_battery_plus'), 'kueche');
      assert.strictEqual(getBaseName('sensor.kueche_batterie_stand'), 'kueche');
      assert.strictEqual(getBaseName('sensor.kueche_batteriestand'), 'kueche');
    });
  });

  describe('Bug Reproduction & Verification: No "Batterie-Typ" as device', () => {
    it('Scenario 1: Entity has literal friendly_name "Batterie-Typ", real name is in companion battery sensor', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.kueche_bewegungsmelder_battery_type': {
            entity_id: 'sensor.kueche_bewegungsmelder_battery_type',
            state: 'CR2032',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'CR2032',
              battery_quantity: 1,
            },
          },
          'sensor.kueche_bewegungsmelder_battery_last_replaced': {
            entity_id: 'sensor.kueche_bewegungsmelder_battery_last_replaced',
            state: '2024-03-01T12:00:00+00:00',
            attributes: {
              friendly_name: 'Letzter Batteriewechsel',
            },
          },
          'binary_sensor.kueche_bewegungsmelder_battery_low': {
            entity_id: 'binary_sensor.kueche_bewegungsmelder_battery_low',
            state: 'off',
            attributes: {
              friendly_name: 'Batterie fast leer',
            },
          },
          'button.kueche_bewegungsmelder_battery_replaced': {
            entity_id: 'button.kueche_bewegungsmelder_battery_replaced',
            state: '2024-03-01T12:00:00+00:00',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          // Original device battery sensor
          'sensor.kueche_bewegungsmelder_batterie': {
            entity_id: 'sensor.kueche_bewegungsmelder_batterie',
            state: '85',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Küche Bewegungsmelder',
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      // Must be EXACTLY 1 device!
      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      // Name must NOT be "Batterie-Typ" or "Batterie fast leer"
      assert.strictEqual(dev.name, 'Küche Bewegungsmelder');
      assert.strictEqual(dev.batteryLevel, 85);
      assert.strictEqual(dev.batteryTypeAndQuantity, 'CR2032');
      assert.strictEqual(dev.isLow, false);
      assert.ok(dev.lastReplaced !== null);
      assert.strictEqual(dev.buttonEntityId, 'button.kueche_bewegungsmelder_battery_replaced');
    });

    it('Scenario 2: Entity ID is literally "sensor.batterie_typ" linked via source_entity_id', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.batterie_typ': {
            entity_id: 'sensor.batterie_typ',
            state: '2x AAA',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'AAA',
              battery_quantity: 2,
              source_entity_id: 'sensor.wohnzimmer_thermostat_battery',
            },
          },
          'sensor.wohnzimmer_thermostat_battery': {
            entity_id: 'sensor.wohnzimmer_thermostat_battery',
            state: '62',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Wohnzimmer Thermostat Batterie',
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      assert.notStrictEqual(dev.name, 'Batterie-Typ');
      assert.notStrictEqual(dev.name, 'Batterie Typ');
      assert.strictEqual(dev.name, 'Wohnzimmer Thermostat');
      assert.strictEqual(dev.batteryLevel, 62);
      assert.strictEqual(dev.batteryTypeAndQuantity, '2x AAA');
    });

    it('Scenario 3: Orphaned generic entity with no device must NEVER be shown as a device row', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.batterie_typ': {
            entity_id: 'sensor.batterie_typ',
            state: 'unknown',
            attributes: {
              friendly_name: 'Batterie-Typ',
            },
          },
          'binary_sensor.batterie_fast_leer': {
            entity_id: 'binary_sensor.batterie_fast_leer',
            state: 'off',
            attributes: {
              friendly_name: 'Batterie fast leer',
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      // Generic orphaned entities without device must be discarded
      assert.strictEqual(devices.length, 0);
    });

    it('Scenario 4: Multiple devices with German translations and Battery+', () => {
      const hass: HomeAssistant = {
        states: {
          // Device 1
          'sensor.schlafzimmer_fenster_batterie_typ': {
            entity_id: 'sensor.schlafzimmer_fenster_batterie_typ',
            state: 'CR2032',
            attributes: {
              friendly_name: 'Schlafzimmer Fenster: Batterie-Typ',
              battery_type: 'CR2032',
              battery_quantity: 1,
            },
          },
          'sensor.schlafzimmer_fenster_battery_plus': {
            entity_id: 'sensor.schlafzimmer_fenster_battery_plus',
            state: '18',
            attributes: {
              device_class: 'battery',
              battery_low: true,
            },
          },

          // Device 2
          'sensor.bad_rauchmelder_battery_type': {
            entity_id: 'sensor.bad_rauchmelder_battery_type',
            state: '9V',
            attributes: {
              friendly_name: 'Bad Rauchmelder - Batterie-Typ',
              battery_type: '9V',
              battery_quantity: 1,
            },
          },
          'sensor.bad_rauchmelder_battery': {
            entity_id: 'sensor.bad_rauchmelder_battery',
            state: '95',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Bad Rauchmelder',
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      assert.strictEqual(devices.length, 2);

      const dev1 = devices.find(d => d.name === 'Schlafzimmer Fenster');
      assert.ok(dev1);
      assert.strictEqual(dev1.batteryLevel, 18);
      assert.strictEqual(dev1.isLow, true);

      const dev2 = devices.find(d => d.name === 'Bad Rauchmelder');
      assert.ok(dev2);
      assert.strictEqual(dev2.batteryLevel, 95);
      assert.strictEqual(dev2.isLow, false);
    });

    it('Scenario 5: Exclusion list excludes device properly', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.test_sensor_battery_type': {
            entity_id: 'sensor.test_sensor_battery_type',
            state: 'AA',
            attributes: {
              friendly_name: 'Test Sensor - Batterie-Typ',
              battery_type: 'AA',
            },
          },
        },
        callService: async () => {},
      };

      const configWithExclude: BatteryNotesCardConfig = {
        type: 'custom:battery-notes-card',
        exclude_entities: ['test_sensor'],
      };

      const devices = extractBatteryDevices(hass, configWithExclude);
      assert.strictEqual(devices.length, 0);
    });

    it('Scenario 6: Entity has friendly_name "Batterie-Typ" and no other sensor, name is derived from entity_id prefix', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.wohnzimmer_heizung_battery_type': {
            entity_id: 'sensor.wohnzimmer_heizung_battery_type',
            state: '2x AA',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'AA',
              battery_quantity: 2,
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      // Name must be derived from "wohnzimmer_heizung", NEVER "Batterie-Typ"!
      assert.strictEqual(dev.name, 'Wohnzimmer Heizung');
      assert.strictEqual(dev.batteryTypeAndQuantity, '2x AA');
    });

    it('Scenario 7: Entity ID with hyphens e.g. sensor.buero-fenster_batterie-typ', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.buero-fenster_batterie-typ': {
            entity_id: 'sensor.buero-fenster_batterie-typ',
            state: 'CR2032',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'CR2032',
              battery_quantity: 1,
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      assert.strictEqual(dev.name, 'Buero-Fenster');
    });

    it('Scenario 8: Smoke alarm without battery percentage sensor resolves real name and room via device registry', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type': {
            entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type',
            state: 'CR123A',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'CR123A',
              battery_quantity: 1,
            },
          },
          'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_last_replaced': {
            entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_last_replaced',
            state: '2025-01-15',
            attributes: {
              friendly_name: 'Letzter Batteriewechsel',
            },
          },
          'button.smoke_alarm_sbs50148a0d90_00000001_battery_replaced': {
            entity_id: 'button.smoke_alarm_sbs50148a0d90_00000001_battery_replaced',
            state: '2025-01-15',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
        },
        callService: async () => {},
      };

      const registries: HomeAssistantRegistries = {
        entities: new Map([
          [
            'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type',
            { entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type', device_id: 'dev_smoke_1' },
          ],
        ]),
        devices: new Map([
          [
            'dev_smoke_1',
            { id: 'dev_smoke_1', name_by_user: 'Rauchmelder Flur', name: 'Smoke Alarm', area_id: 'area_flur' },
          ],
        ]),
        areas: new Map([
          ['area_flur', { area_id: 'area_flur', name: 'Flur' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);

      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      assert.strictEqual(dev.name, 'Rauchmelder Flur');
      assert.strictEqual(dev.area, 'Flur');
      assert.strictEqual(dev.batteryLevel, null);
      assert.strictEqual(dev.batteryTypeAndQuantity, 'CR123A');
      assert.strictEqual(dev.buttonEntityId, 'button.smoke_alarm_sbs50148a0d90_00000001_battery_replaced');
    });

    it('Scenario 9: Smoke alarm resolves room name from sibling entity in hass.states when no registry is available', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type': {
            entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type',
            state: 'CR123A',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'CR123A',
              battery_quantity: 1,
            },
          },
          'binary_sensor.smoke_alarm_sbs50148a0d90_00000001_smoke_alarm': {
            entity_id: 'binary_sensor.smoke_alarm_sbs50148a0d90_00000001_smoke_alarm',
            state: 'off',
            attributes: {
              friendly_name: 'Rauchmelder Wohnzimmer Rauchalarm',
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      assert.strictEqual(dev.name, 'Rauchmelder Wohnzimmer');
      assert.strictEqual(dev.batteryTypeAndQuantity, 'CR123A');
    });

    it('Scenario 10: Smoke alarm falls back to clean formatted name without technical hex/MAC/zero-padding', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type': {
            entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type',
            state: 'CR123A',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'CR123A',
              battery_quantity: 1,
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      // Must NOT be "Smoke Alarm Sbs50148a0d90 00000001" or "sensor.smoke_alarm..."!
      assert.strictEqual(dev.name, 'Smoke Alarm 1');
      assert.strictEqual(dev.batteryTypeAndQuantity, 'CR123A');
    });

    it('Scenario 11: Smoke alarm with area in registry and generic device name combines area into name', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type': {
            entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type',
            state: 'CR123A',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'CR123A',
              battery_quantity: 1,
            },
          },
        },
        callService: async () => {},
      };

      const registries: HomeAssistantRegistries = {
        entities: new Map([
          [
            'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type',
            { entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type', device_id: 'dev_smoke_2' },
          ],
        ]),
        devices: new Map([
          [
            'dev_smoke_2',
            { id: 'dev_smoke_2', name: 'Smoke Alarm', area_id: 'area_schlafzimmer' },
          ],
        ]),
        areas: new Map([
          ['area_schlafzimmer', { area_id: 'area_schlafzimmer', name: 'Schlafzimmer' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);

      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      assert.strictEqual(dev.name, 'Schlafzimmer Smoke Alarm');
      assert.strictEqual(dev.area, 'Schlafzimmer');
    });

    it('Scenario 12: Manual override via config.device_names', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type': {
            entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type',
            state: 'CR123A',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'CR123A',
            },
          },
        },
        callService: async () => {},
      };

      const configWithCustomName: BatteryNotesCardConfig = {
        type: 'custom:battery-notes-card',
        device_names: {
          smoke_alarm_sbs50148a0d90_00000001: 'Küche Rauchmelder',
        },
      };

      const devices = extractBatteryDevices(hass, configWithCustomName);

      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      assert.strictEqual(dev.name, 'Küche Rauchmelder');
    });

    it('Scenario 13: Non-Battery-Notes binary sensor with device_class battery must be completely excluded', () => {
      const hass: HomeAssistant = {
        states: {
          'binary_sensor.smoke_alarm_sbs50148a0d90_0000000a_battery_status': {
            entity_id: 'binary_sensor.smoke_alarm_sbs50148a0d90_0000000a_battery_status',
            state: 'off',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Smoke Alarm SBS50148A0D90 0000000A Battery Status',
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);
      // Must NOT create any device row!
      assert.strictEqual(devices.length, 0);
    });

    it('Scenario 14: Multiple non-Battery-Notes entities from raw hardware integrations are strictly ignored', () => {
      const hass: HomeAssistant = {
        states: {
          'binary_sensor.garden_sensor_battery_low': {
            entity_id: 'binary_sensor.garden_sensor_battery_low',
            state: 'off',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Gartensensor Batterie schwach',
            },
          },
          'binary_sensor.motion_hallway_battery_status': {
            entity_id: 'binary_sensor.motion_hallway_battery_status',
            state: 'off',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Flur Bewegungsmelder Batteriestatus',
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);
      assert.strictEqual(devices.length, 0);
    });

    it('Scenario 15: Battery Notes device anchored by sensor.*_battery_plus cleanly groups companion entities while ignoring hardware battery_status', () => {
      const hass: HomeAssistant = {
        states: {
          // Battery Notes device channel 00000001
          'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_plus': {
            entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_plus',
            state: '94',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Rauchmelder Flur Battery+',
              battery_type: 'CR123A',
              battery_quantity: 1,
              battery_type_and_quantity: 'CR123A',
            },
          },
          'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type': {
            entity_id: 'sensor.smoke_alarm_sbs50148a0d90_00000001_battery_type',
            state: 'CR123A',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'CR123A',
              battery_quantity: 1,
            },
          },
          'binary_sensor.smoke_alarm_sbs50148a0d90_00000001_battery_low': {
            entity_id: 'binary_sensor.smoke_alarm_sbs50148a0d90_00000001_battery_low',
            state: 'off',
            attributes: {
              friendly_name: 'Batterie fast leer',
            },
          },
          'button.smoke_alarm_sbs50148a0d90_00000001_battery_replaced': {
            entity_id: 'button.smoke_alarm_sbs50148a0d90_00000001_battery_replaced',
            state: '2025-01-15',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          // Hardware status binary sensor from channel 0000000a (NOT Battery Notes!)
          'binary_sensor.smoke_alarm_sbs50148a0d90_0000000a_battery_status': {
            entity_id: 'binary_sensor.smoke_alarm_sbs50148a0d90_0000000a_battery_status',
            state: 'off',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Smoke Alarm SBS50148A0D90 0000000A Battery Status',
            },
          },
        },
        callService: async () => {},
      };

      const devices = extractBatteryDevices(hass, defaultConfig);

      // Must be EXACTLY 1 device row (the real Battery Notes smoke alarm)!
      assert.strictEqual(devices.length, 1);
      const dev = devices[0];
      assert.strictEqual(dev.name, 'Rauchmelder Flur');
      assert.strictEqual(dev.batteryLevel, 94);
      assert.strictEqual(dev.batteryTypeAndQuantity, 'CR123A');
      assert.strictEqual(dev.isLow, false);
      assert.strictEqual(dev.buttonEntityId, 'button.smoke_alarm_sbs50148a0d90_00000001_battery_replaced');
    });
  });

  describe('Pagination & Row Limits (computePagination)', () => {
    it('When initial_rows is not set (undefined or 0), all rows are displayed and pagination buttons are hidden', () => {
      const res = computePagination(47, 0, undefined, undefined, undefined);
      assert.strictEqual(res.effectiveLimit, 47);
      assert.strictEqual(res.remainingCount, 0);
      assert.strictEqual(res.canShowMore, false);
      assert.strictEqual(res.canShowLess, false);
    });

    it('When initial_rows is set and total matching <= initial_rows, all rows are displayed and show more is hidden', () => {
      const res = computePagination(8, 0, 10, undefined, undefined);
      assert.strictEqual(res.effectiveLimit, 8);
      assert.strictEqual(res.remainingCount, 0);
      assert.strictEqual(res.canShowMore, false);
      assert.strictEqual(res.canShowLess, false);
    });

    it('When total matching > initial_rows, only initial_rows are shown and canShowMore is true', () => {
      const res = computePagination(47, 0, 10, undefined, undefined);
      assert.strictEqual(res.effectiveLimit, 10);
      assert.strictEqual(res.remainingCount, 37);
      assert.strictEqual(res.nextStep, 10);
      assert.strictEqual(res.canShowMore, true);
      assert.strictEqual(res.canShowLess, false);
    });

    it('Clicking show more increments effectiveLimit by step_rows (or initial_rows by default)', () => {
      // User clicked "Show more" once -> displayedRows becomes 20
      const res = computePagination(47, 20, 10, undefined, undefined);
      assert.strictEqual(res.effectiveLimit, 20);
      assert.strictEqual(res.remainingCount, 27);
      assert.strictEqual(res.nextStep, 10);
      assert.strictEqual(res.canShowMore, true);
      assert.strictEqual(res.canShowLess, true);
    });

    it('When all items have been expanded, canShowMore is false and canShowLess is true', () => {
      // User expanded all 47 rows -> displayedRows = 50
      const res = computePagination(47, 50, 10, undefined, undefined);
      assert.strictEqual(res.effectiveLimit, 47);
      assert.strictEqual(res.remainingCount, 0);
      assert.strictEqual(res.nextStep, 0);
      assert.strictEqual(res.canShowMore, false);
      assert.strictEqual(res.canShowLess, true);
    });

    it('When max_rows is set, effectiveLimit is capped at max_rows and cannot expand beyond it', () => {
      // initial_rows = 10, max_rows = 25, displayedRows = 30
      const res = computePagination(50, 30, 10, undefined, 25);
      assert.strictEqual(res.effectiveLimit, 25);
      assert.strictEqual(res.canShowMore, false);
    });

    it('Custom step_rows controls the increment size per click', () => {
      // initial_rows = 5, step_rows = 15, displayedRows = 0
      const res = computePagination(50, 0, 5, 15, undefined);
      assert.strictEqual(res.effectiveLimit, 5);
      assert.strictEqual(res.remainingCount, 45);
      assert.strictEqual(res.nextStep, 15);
      assert.strictEqual(res.canShowMore, true);
    });

    it('Defensively rejects boolean false for initial_rows and step_rows', () => {
      const res = computePagination(30, 0, false as any, false as any, undefined);
      assert.strictEqual(res.effectiveLimit, 30);
      assert.strictEqual(res.remainingCount, 0);
      assert.strictEqual(res.canShowMore, false);
    });
  });

  describe('Editor Input Parsing & Configuration Sanitization', () => {
    it('parseEditorValue correctly extracts numbers even when checked=false is present on the input', () => {
      // In all browsers, HTMLInputElement has checked=false by default on text/number inputs
      const numberInput = { type: 'number', checked: false, value: '15' };
      const parsed = parseEditorValue(numberInput);
      assert.strictEqual(parsed, 15);
    });

    it('parseEditorValue returns undefined when number input is empty or <= 0', () => {
      assert.strictEqual(parseEditorValue({ type: 'number', checked: false, value: '' }), undefined);
      assert.strictEqual(parseEditorValue({ type: 'number', checked: false, value: '0' }), undefined);
      assert.strictEqual(parseEditorValue({ type: 'number', checked: false, value: '-5' }), undefined);
    });

    it('parseEditorValue correctly extracts text and does not return false', () => {
      const textInput = { type: 'text', checked: false, value: 'My Batteries' };
      assert.strictEqual(parseEditorValue(textInput), 'My Batteries');
    });

    it('parseEditorValue handles checkboxes accurately', () => {
      assert.strictEqual(parseEditorValue({ type: 'checkbox', checked: true }), true);
      assert.strictEqual(parseEditorValue({ type: 'checkbox', checked: false }), false);
    });

    it('sanitizeCardConfig strips boolean false or invalid values from initial_rows and step_rows', () => {
      const corruptConfig: any = {
        type: 'custom:battery-notes-card',
        title: false,
        icon: false,
        initial_rows: false,
        step_rows: false,
      };

      const cleaned = sanitizeCardConfig(corruptConfig);
      assert.strictEqual(cleaned.initial_rows, undefined);
      assert.strictEqual(cleaned.step_rows, undefined);
      assert.strictEqual(cleaned.title, undefined);
      assert.strictEqual(cleaned.icon, undefined);
    });

    it('sanitizeCardConfig converts valid numeric strings to integers', () => {
      const stringConfig: any = {
        type: 'custom:battery-notes-card',
        initial_rows: '10',
        step_rows: '5',
      };

      const cleaned = sanitizeCardConfig(stringConfig);
      assert.strictEqual(cleaned.initial_rows, 10);
      assert.strictEqual(cleaned.step_rows, 5);
    });
  });

  describe('Area Resolution & Area Configuration', () => {
    it('resolves area name from device registry area_id', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.smoke_detector_battery_plus': {
            entity_id: 'sensor.smoke_detector_battery_plus',
            state: '90',
            attributes: {
              friendly_name: 'Smoke Detector Battery+',
              battery_type: 'CR123A',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([
          [
            'dev_smoke_1',
            {
              id: 'dev_smoke_1',
              name: 'Living Room Smoke Detector',
              area_id: 'area_living_room',
            },
          ],
        ]),
        entities: new Map([
          [
            'sensor.smoke_detector_battery_plus',
            {
              entity_id: 'sensor.smoke_detector_battery_plus',
              device_id: 'dev_smoke_1',
            },
          ],
        ]),
        areas: new Map([
          [
            'area_living_room',
            {
              area_id: 'area_living_room',
              name: 'Living Room',
            },
          ],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].area, 'Living Room');
    });

    it('resolves area via source_entity_id when battery notes entity lacks device_id directly', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.kitchen_pir_battery_plus': {
            entity_id: 'sensor.kitchen_pir_battery_plus',
            state: '70',
            attributes: {
              friendly_name: 'Kitchen PIR Battery+',
              source_entity_id: 'sensor.kitchen_pir_battery',
              battery_type: 'AAA',
            },
          },
          'sensor.kitchen_pir_battery': {
            entity_id: 'sensor.kitchen_pir_battery',
            state: '70',
            attributes: {
              friendly_name: 'Kitchen Motion Sensor Battery',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([
          [
            'dev_kitchen_pir',
            {
              id: 'dev_kitchen_pir',
              name: 'Motion Sensor',
              area_id: 'area_kitchen',
            },
          ],
        ]),
        entities: new Map([
          [
            'sensor.kitchen_pir_battery',
            {
              entity_id: 'sensor.kitchen_pir_battery',
              device_id: 'dev_kitchen_pir',
            },
          ],
        ]),
        areas: new Map([
          [
            'area_kitchen',
            {
              area_id: 'area_kitchen',
              name: 'Kitchen',
            },
          ],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].area, 'Kitchen');
    });

    it('resolves area directly from entity registry area_id override', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.bedroom_temp_battery_plus': {
            entity_id: 'sensor.bedroom_temp_battery_plus',
            state: '55',
            attributes: {
              friendly_name: 'Bedroom Temperature Battery+',
              battery_type: 'CR2450',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([
          [
            'dev_bedroom_temp',
            {
              id: 'dev_bedroom_temp',
              name: 'Temp Sensor',
              area_id: 'area_hallway', // device in hallway, but entity moved to bedroom
            },
          ],
        ]),
        entities: new Map([
          [
            'sensor.bedroom_temp_battery_plus',
            {
              entity_id: 'sensor.bedroom_temp_battery_plus',
              device_id: 'dev_bedroom_temp',
              area_id: 'area_bedroom', // direct entity override
            },
          ],
        ]),
        areas: new Map([
          [
            'area_hallway',
            {
              area_id: 'area_hallway',
              name: 'Hallway',
            },
          ],
          [
            'area_bedroom',
            {
              area_id: 'area_bedroom',
              name: 'Bedroom',
            },
          ],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].area, 'Bedroom');
    });

    it('sanitizeCardConfig preserves area sorting and area display options', () => {
      const config: BatteryNotesCardConfig = {
        type: 'custom:battery-notes-card',
        sort_by: 'area',
        sort_direction: 'desc',
        show_area: true,
        always_show_area: true,
        columns: {
          area: true,
        },
      };

      const cleaned = sanitizeCardConfig(config);
      assert.strictEqual(cleaned.sort_by, 'area');
      assert.strictEqual(cleaned.sort_direction, 'desc');
      assert.strictEqual(cleaned.show_area, true);
      assert.strictEqual(cleaned.always_show_area, true);
      assert.strictEqual(cleaned.columns?.area, true);
    });

    it('sorts devices by area ascending and descending with unassigned areas placed at the end', () => {
      const devices = [
        { name: 'Device Z', area: 'Living Room' },
        { name: 'Device B', area: 'Bedroom' },
        { name: 'Device X', area: undefined },
        { name: 'Device A', area: 'Kitchen' },
      ];

      const sortAsc = (list: typeof devices) => [...list].sort((a, b) => {
        const areaA = a.area || '';
        const areaB = b.area || '';
        if (!areaA && areaB) return 1;
        if (areaA && !areaB) return -1;
        const cmp = areaA.localeCompare(areaB) || a.name.localeCompare(b.name);
        return cmp;
      });

      const sortDesc = (list: typeof devices) => [...list].sort((a, b) => {
        const areaA = a.area || '';
        const areaB = b.area || '';
        if (!areaA && areaB) return 1;
        if (areaA && !areaB) return -1;
        const cmp = areaA.localeCompare(areaB) || a.name.localeCompare(b.name);
        return -cmp;
      });

      const asc = sortAsc(devices);
      assert.deepStrictEqual(asc.map(d => d.name), ['Device B', 'Device A', 'Device Z', 'Device X']);

      const desc = sortDesc(devices);
      assert.deepStrictEqual(desc.map(d => d.name), ['Device Z', 'Device A', 'Device B', 'Device X']);
    });
  });

  describe('Multi-Battery Devices (Danfoss Icon & Multi-Thermostat Systems)', () => {
    it('Scenario: Danfoss Icon system with multiple room controllers sharing one parent gateway device_id', () => {
      const hass: HomeAssistant = {
        states: {
          // Living Room Thermostat
          'sensor.danfoss_living_room_battery_plus': {
            entity_id: 'sensor.danfoss_living_room_battery_plus',
            state: '85',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Living Room Thermostat Battery+',
              battery_type: '2x AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_living_room',
            },
          },
          'sensor.danfoss_living_room_battery_type': {
            entity_id: 'sensor.danfoss_living_room_battery_type',
            state: '2x AA',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_living_room',
            },
          },
          'button.danfoss_living_room_battery_replaced': {
            entity_id: 'button.danfoss_living_room_battery_replaced',
            state: '2025-01-10',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          'climate.danfoss_living_room': {
            entity_id: 'climate.danfoss_living_room',
            state: 'heat',
            attributes: {
              friendly_name: 'Living Room Thermostat',
            },
          },

          // Kitchen Thermostat
          'sensor.danfoss_kitchen_battery_plus': {
            entity_id: 'sensor.danfoss_kitchen_battery_plus',
            state: '62',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Kitchen Thermostat Battery+',
              battery_type: '2x AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_kitchen',
            },
          },
          'sensor.danfoss_kitchen_battery_type': {
            entity_id: 'sensor.danfoss_kitchen_battery_type',
            state: '2x AA',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_kitchen',
            },
          },
          'button.danfoss_kitchen_battery_replaced': {
            entity_id: 'button.danfoss_kitchen_battery_replaced',
            state: '2025-01-11',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          'climate.danfoss_kitchen': {
            entity_id: 'climate.danfoss_kitchen',
            state: 'heat',
            attributes: {
              friendly_name: 'Kitchen Thermostat',
            },
          },

          // Bedroom Thermostat
          'sensor.danfoss_bedroom_battery_plus': {
            entity_id: 'sensor.danfoss_bedroom_battery_plus',
            state: '18',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Bedroom Thermostat Battery+',
              battery_type: '2x AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_bedroom',
            },
          },
          'sensor.danfoss_bedroom_battery_type': {
            entity_id: 'sensor.danfoss_bedroom_battery_type',
            state: '2x AA',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_bedroom',
            },
          },
          'button.danfoss_bedroom_battery_replaced': {
            entity_id: 'button.danfoss_bedroom_battery_replaced',
            state: '2025-01-12',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          'climate.danfoss_bedroom': {
            entity_id: 'climate.danfoss_bedroom',
            state: 'heat',
            attributes: {
              friendly_name: 'Bedroom Thermostat',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        // Single parent gateway device in device registry
        devices: new Map([
          [
            'dev_danfoss_master',
            {
              id: 'dev_danfoss_master',
              name: 'Danfoss Icon Floor Heating',
              area_id: 'area_boiler_room',
            },
          ],
        ]),
        // All entities belong to dev_danfoss_master, but each room's entities have their own area override
        entities: new Map([
          [
            'sensor.danfoss_living_room_battery_plus',
            {
              entity_id: 'sensor.danfoss_living_room_battery_plus',
              device_id: 'dev_danfoss_master',
              area_id: 'area_living_room',
            },
          ],
          [
            'climate.danfoss_living_room',
            {
              entity_id: 'climate.danfoss_living_room',
              device_id: 'dev_danfoss_master',
              area_id: 'area_living_room',
            },
          ],
          [
            'sensor.danfoss_kitchen_battery_plus',
            {
              entity_id: 'sensor.danfoss_kitchen_battery_plus',
              device_id: 'dev_danfoss_master',
              area_id: 'area_kitchen',
            },
          ],
          [
            'climate.danfoss_kitchen',
            {
              entity_id: 'climate.danfoss_kitchen',
              device_id: 'dev_danfoss_master',
              area_id: 'area_kitchen',
            },
          ],
          [
            'sensor.danfoss_bedroom_battery_plus',
            {
              entity_id: 'sensor.danfoss_bedroom_battery_plus',
              device_id: 'dev_danfoss_master',
              area_id: 'area_bedroom',
            },
          ],
          [
            'climate.danfoss_bedroom',
            {
              entity_id: 'climate.danfoss_bedroom',
              device_id: 'dev_danfoss_master',
              area_id: 'area_bedroom',
            },
          ],
        ]),
        areas: new Map([
          ['area_boiler_room', { area_id: 'area_boiler_room', name: 'Boiler Room' }],
          ['area_living_room', { area_id: 'area_living_room', name: 'Living Room' }],
          ['area_kitchen', { area_id: 'area_kitchen', name: 'Kitchen' }],
          ['area_bedroom', { area_id: 'area_bedroom', name: 'Bedroom' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);

      // Must produce 3 separate items, NOT a single collapsed device!
      assert.strictEqual(devices.length, 3);

      const livingRoom = devices.find(d => d.name === 'Living Room Thermostat');
      assert.ok(livingRoom, 'Living Room Thermostat should be found');
      assert.strictEqual(livingRoom.batteryLevel, 85);
      assert.strictEqual(livingRoom.area, 'Living Room');
      assert.strictEqual(livingRoom.batteryTypeAndQuantity, '2x AA');
      assert.strictEqual(livingRoom.buttonEntityId, 'button.danfoss_living_room_battery_replaced');
      assert.strictEqual(livingRoom.isLow, false);

      const kitchen = devices.find(d => d.name === 'Kitchen Thermostat');
      assert.ok(kitchen, 'Kitchen Thermostat should be found');
      assert.strictEqual(kitchen.batteryLevel, 62);
      assert.strictEqual(kitchen.area, 'Kitchen');
      assert.strictEqual(kitchen.batteryTypeAndQuantity, '2x AA');
      assert.strictEqual(kitchen.buttonEntityId, 'button.danfoss_kitchen_battery_replaced');
      assert.strictEqual(kitchen.isLow, false);

      const bedroom = devices.find(d => d.name === 'Bedroom Thermostat');
      assert.ok(bedroom, 'Bedroom Thermostat should be found');
      assert.strictEqual(bedroom.batteryLevel, 18);
      assert.strictEqual(bedroom.area, 'Bedroom');
      assert.strictEqual(bedroom.batteryTypeAndQuantity, '2x AA');
      assert.strictEqual(bedroom.buttonEntityId, 'button.danfoss_bedroom_battery_replaced');
      assert.strictEqual(bedroom.isLow, true); // 18% <= 20%
    });

    it('Scenario: Multi-battery device where area is assigned on source entity (climate) in entity registry', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.danfoss_office_battery_plus': {
            entity_id: 'sensor.danfoss_office_battery_plus',
            state: '74',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Office Battery+',
              battery_type: '2x AA',
              source_entity_id: 'climate.danfoss_office',
            },
          },
          'climate.danfoss_office': {
            entity_id: 'climate.danfoss_office',
            state: 'heat',
            attributes: {
              friendly_name: 'Office Thermostat',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([
          ['dev_danfoss', { id: 'dev_danfoss', name: 'Danfoss Master', area_id: 'area_boiler' }],
        ]),
        entities: new Map([
          [
            'sensor.danfoss_office_battery_plus',
            { entity_id: 'sensor.danfoss_office_battery_plus', device_id: 'dev_danfoss' },
          ],
          [
            'climate.danfoss_office',
            { entity_id: 'climate.danfoss_office', device_id: 'dev_danfoss', area_id: 'area_office' },
          ],
        ]),
        areas: new Map([
          ['area_boiler', { area_id: 'area_boiler', name: 'Boiler Room' }],
          ['area_office', { area_id: 'area_office', name: 'Office' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].area, 'Office');
      assert.strictEqual(devices[0].name, 'Office Thermostat');
      assert.strictEqual(devices[0].batteryLevel, 74);
    });

    it('Scenario: Multi-battery device with generic friendly name falls back to combining parent name and area', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.danfoss_room1_battery_plus': {
            entity_id: 'sensor.danfoss_room1_battery_plus',
            state: '90',
            attributes: {
              friendly_name: 'Battery+', // generic
              battery_type: 'AA',
            },
          },
          'sensor.danfoss_room2_battery_plus': {
            entity_id: 'sensor.danfoss_room2_battery_plus',
            state: '45',
            attributes: {
              friendly_name: 'Battery+', // generic
              battery_type: 'AA',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([
          ['dev_danfoss', { id: 'dev_danfoss', name: 'Danfoss Icon' }],
        ]),
        entities: new Map([
          [
            'sensor.danfoss_room1_battery_plus',
            { entity_id: 'sensor.danfoss_room1_battery_plus', device_id: 'dev_danfoss', area_id: 'area_hallway' },
          ],
          [
            'sensor.danfoss_room2_battery_plus',
            { entity_id: 'sensor.danfoss_room2_battery_plus', device_id: 'dev_danfoss', area_id: 'area_bathroom' },
          ],
        ]),
        areas: new Map([
          ['area_hallway', { area_id: 'area_hallway', name: 'Hallway' }],
          ['area_bathroom', { area_id: 'area_bathroom', name: 'Bathroom' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 2);
      assert.strictEqual(devices[0].name, 'Danfoss Icon Hallway');
      assert.strictEqual(devices[0].area, 'Hallway');
      assert.strictEqual(devices[1].name, 'Danfoss Icon Bathroom');
      assert.strictEqual(devices[1].area, 'Bathroom');
    });
  });

  describe('Unavailable Devices & Sorting Behavior', () => {
    it('detects isUnavailable = true when source_entity_id state is unavailable', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.living_room_battery_type': {
            entity_id: 'sensor.living_room_battery_type',
            state: '2x AA',
            attributes: {
              friendly_name: 'Living Room Battery Type',
              battery_type: 'AA',
              battery_quantity: 2,
              source_entity_id: 'climate.living_room_thermostat',
            },
          },
          'climate.living_room_thermostat': {
            entity_id: 'climate.living_room_thermostat',
            state: 'unavailable',
            attributes: {
              friendly_name: 'Living Room Thermostat',
            },
          },
        },
      };

      const devices = extractBatteryDevices(hass, defaultConfig);
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].isUnavailable, true);
    });

    it('detects isUnavailable = true when companion hardware battery sensor state is unavailable', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.motion_sensor_battery_type': {
            entity_id: 'sensor.motion_sensor_battery_type',
            state: 'CR2450',
            attributes: {
              friendly_name: 'Motion Sensor Battery Type',
              battery_type: 'CR2450',
              battery_quantity: 1,
            },
          },
          'sensor.motion_sensor_battery': {
            entity_id: 'sensor.motion_sensor_battery',
            state: 'unavailable',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Motion Sensor Battery',
            },
          },
        },
      };

      const devices = extractBatteryDevices(hass, defaultConfig);
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].isUnavailable, true);
      assert.strictEqual(devices[0].batteryLevel, null);
    });

    it('detects isUnavailable = true when hardware device battery sensor in device registry is unavailable', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.temp_sensor_battery_type': {
            entity_id: 'sensor.temp_sensor_battery_type',
            state: 'CR2032',
            attributes: {
              friendly_name: 'Temperature Sensor Battery Type',
              battery_type: 'CR2032',
              battery_quantity: 1,
              device_id: 'dev_temp_sensor',
            },
          },
          'sensor.temp_hardware_battery': {
            entity_id: 'sensor.temp_hardware_battery',
            state: 'unavailable',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Temperature Sensor Battery',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([['dev_temp_sensor', { id: 'dev_temp_sensor', name: 'Temp Sensor' }]]),
        entities: new Map([
          ['sensor.temp_hardware_battery', { entity_id: 'sensor.temp_hardware_battery', device_id: 'dev_temp_sensor' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].isUnavailable, true);
    });

    it('sorts by status correctly: unavailable (rank 0) -> low (rank 1) -> ok (rank 2)', () => {
      const devices = [
        { name: 'Healthy Device', isUnavailable: false, isLow: false, batteryLevel: 90 },
        { name: 'Dead Device', isUnavailable: true, isLow: false, batteryLevel: null },
        { name: 'Low Battery Device', isUnavailable: false, isLow: true, batteryLevel: 15 },
      ];

      const statusComparator = (direction: 'asc' | 'desc') => (a: typeof devices[0], b: typeof devices[0]) => {
        const rank = (d: typeof a) => (d.isUnavailable ? 0 : d.isLow ? 1 : 2);
        const rankA = rank(a);
        const rankB = rank(b);
        let comparison = 0;
        if (rankA !== rankB) {
          comparison = rankA - rankB;
        } else {
          const batA = a.batteryLevel ?? -1;
          const batB = b.batteryLevel ?? -1;
          comparison = batA !== batB ? batA - batB : a.name.localeCompare(b.name);
        }
        return direction === 'asc' ? comparison : -comparison;
      };

      const asc = [...devices].sort(statusComparator('asc'));
      assert.deepStrictEqual(asc.map(d => d.name), ['Dead Device', 'Low Battery Device', 'Healthy Device']);

      const desc = [...devices].sort(statusComparator('desc'));
      assert.deepStrictEqual(desc.map(d => d.name), ['Healthy Device', 'Low Battery Device', 'Dead Device']);
    });

    it('sorts by battery ascending with null level (dead/unavailable) at top, and descending at bottom', () => {
      const devices = [
        { name: 'Empty Device', batteryLevel: 0, isUnavailable: false },
        { name: 'Dead Device', batteryLevel: null, isUnavailable: true },
        { name: 'Full Device', batteryLevel: 100, isUnavailable: false },
        { name: 'Mid Device', batteryLevel: 50, isUnavailable: false },
      ];

      const batteryComparator = (direction: 'asc' | 'desc') => (a: typeof devices[0], b: typeof devices[0]) => {
        const levelA = a.batteryLevel ?? -1;
        const levelB = b.batteryLevel ?? -1;
        let comparison = levelA - levelB;
        if (comparison === 0) {
          comparison = a.name.localeCompare(b.name);
        }
        return direction === 'asc' ? comparison : -comparison;
      };

      const asc = [...devices].sort(batteryComparator('asc'));
      assert.deepStrictEqual(asc.map(d => d.name), ['Dead Device', 'Empty Device', 'Mid Device', 'Full Device']);

      const desc = [...devices].sort(batteryComparator('desc'));
      assert.deepStrictEqual(desc.map(d => d.name), ['Full Device', 'Mid Device', 'Empty Device', 'Dead Device']);
    });

    it('pins unavailable devices to the top when unavailable_first: true regardless of sort column', () => {
      const devices = [
        { name: 'Alpha Device', isUnavailable: false, batteryLevel: 80 },
        { name: 'Zeta Device', isUnavailable: true, batteryLevel: null },
        { name: 'Beta Device', isUnavailable: false, batteryLevel: 40 },
      ];

      const sortWithName = (unavailableFirst: boolean) => [...devices].sort((a, b) => {
        if (unavailableFirst) {
          if (a.isUnavailable && !b.isUnavailable) return -1;
          if (!a.isUnavailable && b.isUnavailable) return 1;
        }
        return a.name.localeCompare(b.name);
      });

      const withoutPinning = sortWithName(false);
      assert.deepStrictEqual(withoutPinning.map(d => d.name), ['Alpha Device', 'Beta Device', 'Zeta Device']);

      const withPinning = sortWithName(true);
      assert.deepStrictEqual(withPinning.map(d => d.name), ['Zeta Device', 'Alpha Device', 'Beta Device']);
    });

    it('sanitizeCardConfig preserves and sanitizes unavailable_first option', () => {
      const conf1 = sanitizeCardConfig({
        type: 'custom:battery-notes-card',
        unavailable_first: true,
      });
      assert.strictEqual(conf1.unavailable_first, true);

      const conf2 = sanitizeCardConfig({
        type: 'custom:battery-notes-card',
        unavailable_first: false,
      });
      assert.strictEqual(conf2.unavailable_first, false);

      const conf3 = sanitizeCardConfig({
        type: 'custom:battery-notes-card',
        unavailable_first: ('true' as any),
      });
      assert.strictEqual(conf3.unavailable_first, true);
    });
  });

  describe('Battery+ Filtering & Non-Battery-Notes Entity Protection', () => {
    it('Scenario: APC UPS sensor.apcups_battery_type with platform apcupsd is strictly excluded', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.apcups_battery_type': {
            entity_id: 'sensor.apcups_battery_type',
            state: 'PbAc',
            attributes: {
              friendly_name: 'Apcups Batteriechemie',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([['dev_apcups', { id: 'dev_apcups', name: 'Apcups' }]]),
        entities: new Map([
          [
            'sensor.apcups_battery_type',
            { entity_id: 'sensor.apcups_battery_type', device_id: 'dev_apcups', platform: 'apcupsd' },
          ],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 0);
    });

    it('Scenario: Device with only battery_type, button, and binary_sensor groups into exactly 1 device, never creating standalone button or binary sensor rows', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.haustur_battery_type': {
            entity_id: 'sensor.haustur_battery_type',
            state: 'Rechargeable',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'Rechargeable',
            },
          },
          'button.haustur_battery_replaced': {
            entity_id: 'button.haustur_battery_replaced',
            state: '2026-11-26T08:00:00Z',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          'binary_sensor.haustur_battery_low': {
            entity_id: 'binary_sensor.haustur_battery_low',
            state: 'off',
            attributes: {
              friendly_name: 'Batterie fast leer',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([['dev_haustur', { id: 'dev_haustur', name: 'Haustür' }]]),
        entities: new Map([
          [
            'sensor.haustur_battery_type',
            { entity_id: 'sensor.haustur_battery_type', device_id: 'dev_haustur', platform: 'battery_notes' },
          ],
          [
            'button.haustur_battery_replaced',
            { entity_id: 'button.haustur_battery_replaced', device_id: 'dev_haustur', platform: 'battery_notes' },
          ],
          [
            'binary_sensor.haustur_battery_low',
            { entity_id: 'binary_sensor.haustur_battery_low', device_id: 'dev_haustur', platform: 'battery_notes' },
          ],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].name, 'Haustür');
      assert.strictEqual(devices[0].batteryType, 'Rechargeable');
      assert.strictEqual(devices[0].buttonEntityId, 'button.haustur_battery_replaced');
      assert.strictEqual(devices[0].hasPlusSensor, false);
    });

    it('Scenario: Standalone button and binary sensor without typeSensor or plusSensor are completely discarded', () => {
      const hass: HomeAssistant = {
        states: {
          'button.mystery_battery_replaced': {
            entity_id: 'button.mystery_battery_replaced',
            state: '2026-11-26T08:00:00Z',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          'binary_sensor.mystery_battery_low': {
            entity_id: 'binary_sensor.mystery_battery_low',
            state: 'off',
            attributes: {
              friendly_name: 'Batterie fast leer',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        entities: new Map([
          ['button.mystery_battery_replaced', { entity_id: 'button.mystery_battery_replaced', platform: 'battery_notes' }],
          ['binary_sensor.mystery_battery_low', { entity_id: 'binary_sensor.mystery_battery_low', platform: 'battery_notes' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 0);
    });

    it('Scenario: battery_plus_only option filters out devices that do not have a sensor.*_battery_plus entity', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.haustur_battery_type': {
            entity_id: 'sensor.haustur_battery_type',
            state: 'Rechargeable',
            attributes: {
              friendly_name: 'Haustür Batterie-Typ',
              battery_type: 'Rechargeable',
            },
          },
          'sensor.xmi_sensor_battery_plus': {
            entity_id: 'sensor.xmi_sensor_battery_plus',
            state: '85',
            attributes: {
              friendly_name: 'XMI_Shock1 Battery+',
              battery_type: 'CR2032',
            },
          },
        },
      };

      const allDevices = extractBatteryDevices(hass, defaultConfig);
      assert.strictEqual(allDevices.length, 2);
      assert.strictEqual(allDevices.find(d => d.name === 'Haustür')?.hasPlusSensor, false);
      assert.strictEqual(allDevices.find(d => d.name === 'XMI_Shock1')?.hasPlusSensor, true);

      // Filtering with battery_plus_only
      const plusOnlyDevices = allDevices.filter(d => d.hasPlusSensor);
      assert.strictEqual(plusOnlyDevices.length, 1);
      assert.strictEqual(plusOnlyDevices[0].name, 'XMI_Shock1');
    });

    it('sanitizeCardConfig preserves and sanitizes battery_plus_only option', () => {
      const conf1 = sanitizeCardConfig({
        type: 'custom:battery-notes-card',
        battery_plus_only: true,
      });
      assert.strictEqual(conf1.battery_plus_only, true);

      const conf2 = sanitizeCardConfig({
        type: 'custom:battery-notes-card',
        battery_plus_only: false,
      });
      assert.strictEqual(conf2.battery_plus_only, false);

      const conf3 = sanitizeCardConfig({
        type: 'custom:battery-notes-card',
        battery_plus_only: ('true' as any),
      });
      assert.strictEqual(conf3.battery_plus_only, true);
    });
  });

  describe('Danfoss Icon & Duplicate Prevention Tests (v1.1.3)', () => {
    it('Scenario: Danfoss Icon system without Battery+ extracts battery level from climate.attributes.battery_level and shows all thermostats separately', () => {
      const hass: HomeAssistant = {
        states: {
          // Living Room (Stue)
          'climate.danfoss_stue': {
            entity_id: 'climate.danfoss_stue',
            state: 'heat',
            attributes: {
              friendly_name: 'Stue Termostat',
              battery_level: 80,
            },
          },
          'sensor.danfoss_stue_battery_type': {
            entity_id: 'sensor.danfoss_stue_battery_type',
            state: '2x AA',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_stue',
            },
          },
          'button.danfoss_stue_battery_replaced': {
            entity_id: 'button.danfoss_stue_battery_replaced',
            state: '2025-01-01T10:00:00Z',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          'binary_sensor.danfoss_stue_battery_low': {
            entity_id: 'binary_sensor.danfoss_stue_battery_low',
            state: 'off',
            attributes: {
              friendly_name: 'Batterie fast leer',
            },
          },

          // Kitchen (Køkken)
          'climate.danfoss_kokken': {
            entity_id: 'climate.danfoss_kokken',
            state: 'heat',
            attributes: {
              friendly_name: 'Køkken Termostat',
              battery_level: 65,
            },
          },
          'sensor.danfoss_kokken_battery_type': {
            entity_id: 'sensor.danfoss_kokken_battery_type',
            state: '2x AA',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_kokken',
            },
          },
          'button.danfoss_kokken_battery_replaced': {
            entity_id: 'button.danfoss_kokken_battery_replaced',
            state: '2025-01-01T10:00:00Z',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          'binary_sensor.danfoss_kokken_battery_low': {
            entity_id: 'binary_sensor.danfoss_kokken_battery_low',
            state: 'off',
            attributes: {
              friendly_name: 'Batterie fast leer',
            },
          },

          // Bedroom (Soveværelse)
          'climate.danfoss_sovevaerelse': {
            entity_id: 'climate.danfoss_sovevaerelse',
            state: 'off',
            attributes: {
              friendly_name: 'Soveværelse Termostat',
              battery_level: 15,
            },
          },
          'sensor.danfoss_sovevaerelse_battery_type': {
            entity_id: 'sensor.danfoss_sovevaerelse_battery_type',
            state: '2x AA',
            attributes: {
              friendly_name: 'Batterie-Typ',
              battery_type: 'AA',
              battery_quantity: 2,
              source_entity_id: 'climate.danfoss_sovevaerelse',
            },
          },
          'button.danfoss_sovevaerelse_battery_replaced': {
            entity_id: 'button.danfoss_sovevaerelse_battery_replaced',
            state: '2025-01-01T10:00:00Z',
            attributes: {
              friendly_name: 'Batterie ersetzt',
            },
          },
          'binary_sensor.danfoss_sovevaerelse_battery_low': {
            entity_id: 'binary_sensor.danfoss_sovevaerelse_battery_low',
            state: 'on',
            attributes: {
              friendly_name: 'Batterie fast leer',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([
          [
            'dev_danfoss_master',
            {
              id: 'dev_danfoss_master',
              name: 'Danfoss Icon Floor Heating',
              area_id: 'area_boiler_room',
            },
          ],
        ]),
        entities: new Map([
          ['sensor.danfoss_stue_battery_type', { entity_id: 'sensor.danfoss_stue_battery_type', device_id: 'dev_danfoss_master', platform: 'battery_notes', area_id: 'area_stue' }],
          ['climate.danfoss_stue', { entity_id: 'climate.danfoss_stue', device_id: 'dev_danfoss_master', area_id: 'area_stue' }],
          ['button.danfoss_stue_battery_replaced', { entity_id: 'button.danfoss_stue_battery_replaced', device_id: 'dev_danfoss_master', platform: 'battery_notes' }],
          ['binary_sensor.danfoss_stue_battery_low', { entity_id: 'binary_sensor.danfoss_stue_battery_low', device_id: 'dev_danfoss_master', platform: 'battery_notes' }],

          ['sensor.danfoss_kokken_battery_type', { entity_id: 'sensor.danfoss_kokken_battery_type', device_id: 'dev_danfoss_master', platform: 'battery_notes', area_id: 'area_kokken' }],
          ['climate.danfoss_kokken', { entity_id: 'climate.danfoss_kokken', device_id: 'dev_danfoss_master', area_id: 'area_kokken' }],
          ['button.danfoss_kokken_battery_replaced', { entity_id: 'button.danfoss_kokken_battery_replaced', device_id: 'dev_danfoss_master', platform: 'battery_notes' }],
          ['binary_sensor.danfoss_kokken_battery_low', { entity_id: 'binary_sensor.danfoss_kokken_battery_low', device_id: 'dev_danfoss_master', platform: 'battery_notes' }],

          ['sensor.danfoss_sovevaerelse_battery_type', { entity_id: 'sensor.danfoss_sovevaerelse_battery_type', device_id: 'dev_danfoss_master', platform: 'battery_notes', area_id: 'area_sovevaerelse' }],
          ['climate.danfoss_sovevaerelse', { entity_id: 'climate.danfoss_sovevaerelse', device_id: 'dev_danfoss_master', area_id: 'area_sovevaerelse' }],
          ['button.danfoss_sovevaerelse_battery_replaced', { entity_id: 'button.danfoss_sovevaerelse_battery_replaced', device_id: 'dev_danfoss_master', platform: 'battery_notes' }],
          ['binary_sensor.danfoss_sovevaerelse_battery_low', { entity_id: 'binary_sensor.danfoss_sovevaerelse_battery_low', device_id: 'dev_danfoss_master', platform: 'battery_notes' }],
        ]),
        areas: new Map([
          ['area_boiler_room', { area_id: 'area_boiler_room', name: 'Boiler Room' }],
          ['area_stue', { area_id: 'area_stue', name: 'Stue' }],
          ['area_kokken', { area_id: 'area_kokken', name: 'Køkken' }],
          ['area_sovevaerelse', { area_id: 'area_sovevaerelse', name: 'Soveværelse' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);

      // Must produce exactly 3 devices, one for each thermostat, NEVER 1 and NEVER 6!
      assert.strictEqual(devices.length, 3);

      const stue = devices.find(d => d.name === 'Stue Termostat');
      assert.ok(stue, 'Stue Termostat should be found');
      assert.strictEqual(stue.batteryLevel, 80, 'Battery level should be extracted from climate attributes');
      assert.strictEqual(stue.batteryTypeAndQuantity, '2x AA');
      assert.strictEqual(stue.area, 'Stue');
      assert.strictEqual(stue.buttonEntityId, 'button.danfoss_stue_battery_replaced');
      assert.strictEqual(stue.isLow, false);
      assert.strictEqual(stue.entityId, 'climate.danfoss_stue', 'Clicking opens the climate entity');

      const kokken = devices.find(d => d.name === 'Køkken Termostat');
      assert.ok(kokken, 'Køkken Termostat should be found');
      assert.strictEqual(kokken.batteryLevel, 65, 'Battery level should be extracted from climate attributes');
      assert.strictEqual(kokken.batteryTypeAndQuantity, '2x AA');
      assert.strictEqual(kokken.area, 'Køkken');
      assert.strictEqual(kokken.buttonEntityId, 'button.danfoss_kokken_battery_replaced');
      assert.strictEqual(kokken.isLow, false);
      assert.strictEqual(kokken.entityId, 'climate.danfoss_kokken');

      const sovevaerelse = devices.find(d => d.name === 'Soveværelse Termostat');
      assert.ok(sovevaerelse, 'Soveværelse Termostat should be found');
      assert.strictEqual(sovevaerelse.batteryLevel, 15, 'Battery level should be extracted from climate attributes');
      assert.strictEqual(sovevaerelse.batteryTypeAndQuantity, '2x AA');
      assert.strictEqual(sovevaerelse.area, 'Soveværelse');
      assert.strictEqual(sovevaerelse.buttonEntityId, 'button.danfoss_sovevaerelse_battery_replaced');
      assert.strictEqual(sovevaerelse.isLow, true);
      assert.strictEqual(sovevaerelse.entityId, 'climate.danfoss_sovevaerelse');
    });

    it('Scenario: Device with both battery_plus and battery_type merges into exactly 1 device without duplicate rows', () => {
      const hass: HomeAssistant = {
        states: {
          'sensor.motion_sensor_battery_type': {
            entity_id: 'sensor.motion_sensor_battery_type',
            state: 'CR2032',
            attributes: {
              battery_type: 'CR2032',
              battery_quantity: 1,
              friendly_name: 'Living Room Motion Battery Type',
            },
          },
          'sensor.motion_sensor_battery_plus': {
            entity_id: 'sensor.motion_sensor_battery_plus',
            state: '72',
            attributes: {
              device_class: 'battery',
              friendly_name: 'Living Room Motion Battery+',
              source_entity_id: 'sensor.motion_sensor_hardware_battery',
            },
          },
          'button.motion_sensor_battery_replaced': {
            entity_id: 'button.motion_sensor_battery_replaced',
            state: '2024-11-20',
            attributes: {
              friendly_name: 'Living Room Motion Battery Replaced',
            },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([
          ['dev_motion', { id: 'dev_motion', name: 'Living Room Motion' }],
        ]),
        entities: new Map([
          ['sensor.motion_sensor_battery_type', { entity_id: 'sensor.motion_sensor_battery_type', device_id: 'dev_motion', platform: 'battery_notes' }],
          ['sensor.motion_sensor_battery_plus', { entity_id: 'sensor.motion_sensor_battery_plus', device_id: 'dev_motion', platform: 'battery_notes' }],
          ['button.motion_sensor_battery_replaced', { entity_id: 'button.motion_sensor_battery_replaced', device_id: 'dev_motion', platform: 'battery_notes' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);

      // Must NEVER produce 2 rows for the same device (one for level, one for type)
      assert.strictEqual(devices.length, 1);
      assert.strictEqual(devices[0].name, 'Living Room Motion');
      assert.strictEqual(devices[0].batteryLevel, 72);
      assert.strictEqual(devices[0].batteryType, 'CR2032');
      assert.strictEqual(devices[0].batteryTypeAndQuantity, 'CR2032');
      assert.strictEqual(devices[0].hasPlusSensor, true);
      assert.strictEqual(devices[0].buttonEntityId, 'button.motion_sensor_battery_replaced');
    });

    it('Scenario: Multiple devices in hass.states with mixed alphabetical order attach helpers to correct rooms', () => {
      const hass: HomeAssistant = {
        states: {
          // Binary sensors first alphabetically (as happens in HA)
          'binary_sensor.room_a_battery_low': {
            entity_id: 'binary_sensor.room_a_battery_low',
            state: 'off',
            attributes: { friendly_name: 'Room A Battery Low' },
          },
          'binary_sensor.room_b_battery_low': {
            entity_id: 'binary_sensor.room_b_battery_low',
            state: 'on',
            attributes: { friendly_name: 'Room B Battery Low' },
          },
          // Buttons next
          'button.room_a_battery_replaced': {
            entity_id: 'button.room_a_battery_replaced',
            state: '2025-01-01',
            attributes: { friendly_name: 'Room A Battery Replaced' },
          },
          'button.room_b_battery_replaced': {
            entity_id: 'button.room_b_battery_replaced',
            state: '2025-01-02',
            attributes: { friendly_name: 'Room B Battery Replaced' },
          },
          // Sensors last
          'sensor.room_a_battery_type': {
            entity_id: 'sensor.room_a_battery_type',
            state: 'AA',
            attributes: { battery_type: 'AA', friendly_name: 'Room A Battery Type' },
          },
          'sensor.room_b_battery_type': {
            entity_id: 'sensor.room_b_battery_type',
            state: 'AAA',
            attributes: { battery_type: 'AAA', friendly_name: 'Room B Battery Type' },
          },
          'sensor.room_a_battery': {
            entity_id: 'sensor.room_a_battery',
            state: '90',
            attributes: { device_class: 'battery', friendly_name: 'Room A Battery' },
          },
          'sensor.room_b_battery': {
            entity_id: 'sensor.room_b_battery',
            state: '10',
            attributes: { device_class: 'battery', friendly_name: 'Room B Battery' },
          },
        },
      };

      const registries: HomeAssistantRegistries = {
        devices: new Map([
          ['dev_multi', { id: 'dev_multi', name: 'Multi System' }],
        ]),
        entities: new Map([
          ['sensor.room_a_battery_type', { entity_id: 'sensor.room_a_battery_type', device_id: 'dev_multi', platform: 'battery_notes' }],
          ['button.room_a_battery_replaced', { entity_id: 'button.room_a_battery_replaced', device_id: 'dev_multi', platform: 'battery_notes' }],
          ['binary_sensor.room_a_battery_low', { entity_id: 'binary_sensor.room_a_battery_low', device_id: 'dev_multi', platform: 'battery_notes' }],

          ['sensor.room_b_battery_type', { entity_id: 'sensor.room_b_battery_type', device_id: 'dev_multi', platform: 'battery_notes' }],
          ['button.room_b_battery_replaced', { entity_id: 'button.room_b_battery_replaced', device_id: 'dev_multi', platform: 'battery_notes' }],
          ['binary_sensor.room_b_battery_low', { entity_id: 'binary_sensor.room_b_battery_low', device_id: 'dev_multi', platform: 'battery_notes' }],
        ]),
      };

      const devices = extractBatteryDevices(hass, defaultConfig, registries);
      assert.strictEqual(devices.length, 2);

      const roomA = devices.find(d => d.name === 'Room A');
      assert.ok(roomA);
      assert.strictEqual(roomA.batteryLevel, 90);
      assert.strictEqual(roomA.batteryType, 'AA');
      assert.strictEqual(roomA.buttonEntityId, 'button.room_a_battery_replaced');
      assert.strictEqual(roomA.isLow, false);

      const roomB = devices.find(d => d.name === 'Room B');
      assert.ok(roomB);
      assert.strictEqual(roomB.batteryLevel, 10);
      assert.strictEqual(roomB.batteryType, 'AAA');
      assert.strictEqual(roomB.buttonEntityId, 'button.room_b_battery_replaced');
      assert.strictEqual(roomB.isLow, true);
    });
  });
});


