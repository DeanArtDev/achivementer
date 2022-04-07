import { ReactElement } from "react";

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

export function extendReactElementByClassName(child: ReactElement, className: string): ReactElement {
  return {
    ...child,
    props: {
      ...child.props,
      className: child.props.className ? `${className} ${child.props.className}` : className,
    },
  };
}
