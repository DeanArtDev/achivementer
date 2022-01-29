export default function oneOfGuard<T, U>(value: string, abstract: T | U): abstract is T {
  return value in abstract;
}
