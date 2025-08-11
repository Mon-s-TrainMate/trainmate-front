export function formatDuration(input: number) {
  input |= 0;
  return [Math.floor(input / 3600), Math.floor((input % 3600) / 60), input % 60]
    .map((x) => String(x).padStart(2, '0'))
    .join(' : ');
}
