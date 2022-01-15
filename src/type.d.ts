export type LocationState = {
  notification?: string;
  location?: Location<LocationState>;
};

export type ExtractKeysOfValueType<T> = T[keyof T];

export type Predicate = () => boolean;

export type BaseOption<T = string> = {
  value: T;
  text: string;
  hidden?: boolean;
  disabled?: boolean;
  selected?: boolean;
};

export type InputValidationOptions = {
  regexp?: string;
  initialValue?: boolean;
  require?: boolean;
};