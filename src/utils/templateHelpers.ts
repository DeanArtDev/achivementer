export function classes(classes: string | string[], computedClasses?: Record<string, boolean>): string {
  if (Array.isArray(classes)) {
    return classes.join(" ");
  }

  const readyClasses = [classes];
  if (computedClasses) {
    Object.entries(computedClasses).forEach(([key, value]) => {
      if (value) {
        readyClasses.push(key);
      }
    });
  }

  return readyClasses.join(" ");
}
