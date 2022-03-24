export default function oneOfGuard<T, U>(entity: T | U, value: string): entity is T {
  return value in entity;
}
