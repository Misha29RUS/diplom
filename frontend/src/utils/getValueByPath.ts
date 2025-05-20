export function getValueByPath<T, K extends keyof any>(
    obj: T,
    path: K
  ): any {
    // Разбиваем путь на части и итерируемся по ним, чтобы получить значение
    return path
      .toString()
      .split('.')
      .reduce((acc, key) => (acc ? acc[key] : undefined), obj);
  }