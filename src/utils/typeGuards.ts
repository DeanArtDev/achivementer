export function guardOneOf<T extends object>(entity: object, value: string): entity is T {
  return value in entity;
}
