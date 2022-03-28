export function classes(classes: string | string[], computedClasses?: Record<string, boolean>): string {
  const cls: string[] = [];
  Array.isArray(classes) ? cls.push(...classes) : cls.push(classes);

  if (computedClasses) {
    Object.entries(computedClasses).forEach(([key, value]) => {
      if (value) cls.push(key);
    });
  }

  return cls.join(" ");
}
