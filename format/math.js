export function round(num, bit = 2) {
  const precision = 10 ** bit;
  return Math.round(num * precision) / precision;
}

export function roundUp(num, bit = 2) {
  const precision = 10 ** bit;
  return Math.ceil(num * precision) / precision;
}

export function roundDown(num, bit = 2) {
  const precision = 10 ** bit;
  return Math.floor(num * precision) / precision;
}
