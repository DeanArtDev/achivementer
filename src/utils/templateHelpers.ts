type ComputedClasses = Record<string, boolean>;

function classes(classes: ComputedClasses): string;
function classes(classes: string, computedClasses: ComputedClasses): string;
function classes(classes: string[], computedClasses: ComputedClasses): string;
function classes(classes: string | string[] | ComputedClasses, computedClasses?: ComputedClasses): string {
  const cls: string[] = [];

  Array.isArray(classes) && cls.push(...classes);
  typeof classes === "string" && cls.push(classes);
  if (computedClasses || typeof classes === "object") {
    Object.entries(computedClasses ?? classes).forEach(([key, value]) => {
      if (value) cls.push(key);
    });
  }

  return cls.join(" ");
}

export { classes };
