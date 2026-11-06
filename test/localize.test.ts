import { test } from 'node:test';
import assert from 'node:assert/strict';
import { localize, localizeBatteryType } from '../src/localize.ts';

test('picks language by its base code', () => {
  assert.equal(localize('filter_low', 'cs'), 'Slabé');
  assert.equal(localize('filter_low', 'cs-CZ'), 'Slabé');
  assert.equal(localize('filter_low', 'de-AT'), 'Niedrig');
  assert.equal(localize('filter_low', 'fr'), 'Low');
});

test('fills placeholders', () => {
  assert.equal(localize('time_months_ago', 'cs', { n: 4 }), 'před 4 měs.');
});

test('translates the special Battery Notes types and keeps quantity', () => {
  assert.equal(localizeBatteryType('Rechargeable', 'cs'), 'Nabíjecí');
  assert.equal(localizeBatteryType('Irreplaceable', 'de'), 'Nicht austauschbar');
  assert.equal(localizeBatteryType('2× AA', 'cs'), '2× AA');
});
