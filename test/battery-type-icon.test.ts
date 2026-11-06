import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getBatteryTypeIcon } from '../src/battery-type-icon.ts';

test('cylindrical cells', () => {
  for (const t of ['AA', 'AAA', '3× AA', '2x AAA', '18650', 'C', 'D']) {
    assert.equal(getBatteryTypeIcon(t), 'mdi:battery-outline', t);
  }
});

test('coin and button cells', () => {
  for (const t of ['CR2032', 'CR2477', '2x LR44', 'SR626', 'CR 2450']) {
    assert.equal(getBatteryTypeIcon(t), 'mdi:circle-double', t);
  }
});

test('special types', () => {
  assert.equal(getBatteryTypeIcon('Rechargeable'), 'mdi:power-plug-battery-outline');
  assert.equal(getBatteryTypeIcon('Irreplaceable'), 'mdi:battery-lock');
  assert.equal(getBatteryTypeIcon('9V'), 'mdi:battery-high');
  assert.equal(getBatteryTypeIcon(''), 'mdi:battery-outline');
});
