export default function disableDevToolsForProductionBuild() {
  if (typeof (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__ === "object" && process.env.NODE_ENV === 'production') {
    for (const [key, value] of Object.entries((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__)) {
      (window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__[key] = typeof value == "function" ? Function.prototype : null;
    }
  }
}