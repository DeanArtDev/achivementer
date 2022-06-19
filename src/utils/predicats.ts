import { HasId, UniqID } from "../types";

export function isUndefined(value: string | number | boolean | undefined): value is undefined {
  return typeof value === "undefined";
}

export function isIdEqualReturnLast<T extends HasId>(id: UniqID, firstEntity: T, lastEntity: T): T {
  return lastEntity.id === id ? lastEntity : firstEntity;
}
