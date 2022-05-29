import { User } from "../providers/api/LoginProvider/types";
import { Location } from "history";

export type ToNewType<T, U, D> = { [I in keyof T]: I extends U ? D : T[I] };
export type ToOptionalID<T> = Omit<T, "id"> & { id?: UniqID };

export type HasId = { id: UniqID };

export type UniqID = string;
export type LocationState = {
  notification?: string;
  from?: Location<LocationState>;
};

export type KeysValuesType<T> = T[keyof T];

export type BaseOption = {
  value: string;
  text: string;
  hidden?: boolean;
  disabled?: boolean;
  selected?: boolean;
};

export type InputValidationOptions = {
  regexp?: string;
  initialValue?: boolean;
  forceValue?: boolean;
  require?: boolean;
  maxChars?: number;
};

export type LoginData = {
  user: User;
  token: string;
};
