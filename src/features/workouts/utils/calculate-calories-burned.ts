export function calculateCaloriesBurned(
  met: number,
  weightKg: number,
  durationSec: number
) {
  return (met * weightKg * ((durationSec | 0) / 3600)) | 0;
}
