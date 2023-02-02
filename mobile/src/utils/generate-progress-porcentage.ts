export function generateProgressPorcentage(
  available: number,
  completed: number
) {
  return Math.round((completed / available) * 100);
}
