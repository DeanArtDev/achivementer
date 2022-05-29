import { ReactElement } from "react";

type ComputedClasses = Record<string, boolean>;

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

export function extendReactElementByClassName(child: ReactElement, className: string): ReactElement {
  return {
    ...child,
    props: {
      ...child.props,
      className: child.props.className ? `${className} ${child.props.className}` : className,
    },
  };
}

export { classes };
