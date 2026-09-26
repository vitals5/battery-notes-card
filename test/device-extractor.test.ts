import { describe, it } from 'node:test';
import assert from 'node:assert';
import {
  extractBatteryDevices,
  cleanDeviceName,
  isGenericName,
  getBaseName,
  computePagination,
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
  });
});

