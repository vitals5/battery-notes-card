/**
 * Picks an icon that matches the physical battery form factor.
 *
 * - cylindrical cells (AA, AAA, C, D, 18650…) → battery outline
 * - coin / button cells (CR2032, LR44, SR626…) → coin
 * - rechargeable → plug with battery
 * - irreplaceable → battery with lock
 * - 9V → high battery
 *
 * A leading quantity ("2x ", "3× ") is ignored.
 */
export function getBatteryTypeIcon(type: string): string {
  const t = (type || '').toLowerCase().replace(/^\s*\d+\s*[x×]\s*/, '').trim();
  if (!t || t === '-') return 'mdi:battery-outline';
  if (t.includes('rechargeable')) return 'mdi:power-plug-battery-outline';
  if (t.includes('irreplaceable')) return 'mdi:battery-lock';
  if (/^(cr|br|lr|sr|ag|lir)\s?\d/.test(t) || t.includes('button') || t.includes('coin')) {
    return 'mdi:circle-double';
  }
  if (t.includes('9v') || t === 'pp3') return 'mdi:battery-high';
  return 'mdi:battery-outline';
}
