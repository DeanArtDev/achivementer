export default function changeFunctionName<T>(name: string, cb: T): T {
  return Object.defineProperty(cb, "name", { value: name, writable: true });
}
