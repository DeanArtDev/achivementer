export type LocationState = {
  notification?: string;
  location?: Location<LocationState>;
};

export type ExtractKeysOfValueType<T> = { [I in keyof T]: T[I] }[keyof T]
