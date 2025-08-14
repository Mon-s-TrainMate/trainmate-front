export const sumBy = <T extends object>(
  sets: T[],
  key: {
    [K in keyof T]-?: number extends T[K] ? K : never;
  }[keyof T]
) => sets.reduce((total, set) => total + (set[key] as number), 0);
