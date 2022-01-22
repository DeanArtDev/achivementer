export type UnicId = string;
export type LocationState = {
  notification?: string;
  location?: Location<LocationState>;
};

export type ExtractKeysOfValueType<T> = T[keyof T];

export type Predicate = () => boolean;

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

export type ToMap<T extends { id: string } | { name: string }> = Record<T["id"] | T["name"], T>;
