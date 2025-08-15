export const sumBy = <T extends object>(
  items: T[],
  key: {
    [K in keyof T]-?: number extends T[K] ? K : never;
  }[keyof T]
) => items.reduce((acc, item) => acc + (item[key] as number), 0);
