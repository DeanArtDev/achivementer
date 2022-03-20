export default function findByIndexInArray<T extends { id: string }>(
  id: string,
  arr: T[],
  success: (index: number, arr: T[]) => T[] | false
) {
  const index = arr.findIndex((i) => i.id === id);
  if (index !== -1) {
    return success(index, arr);
  }
  return false;
}
