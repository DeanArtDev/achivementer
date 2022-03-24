export type ToMap<U extends string, T> = Record<U, T>;
export type ToNewType<T, U, D> = { [I in keyof T]: I extends U ? D : T[I] };
export type ToOptionalID<T> = Omit<T, "id"> & { id?: UniqID };

export type UniqID = string;
export type LocationState = {
  notification?: string;
  location?: Location<LocationState>;
};

export type ExtractKeysOfValueType<T> = T[keyof T];

export type Predicate = () => boolean;
export type PredicateMap = ToMap<Predicate["name"], Predicate>;

export type BaseOption = {
  value: string;
  text: string;
  hidden?: boolean;
  disabled?: boolean;
  selected?: boolean;
};

export type InputValidationOptions = {
  predicateNameSpace: string;
  regexp?: string;
  initialValue?: boolean;
  require?: boolean;
};
