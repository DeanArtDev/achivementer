import { UniqID } from "../../../types";

export type User = {
  id: UniqID;
  email: string;
  password: string;
};

export type LoginResponse = {
  user: Omit<User, "password">;
  token: string;
};

export type RegistrationResponse = LoginResponse;

export type InputLogin = Pick<User, "email" | "password">;

export type InputRegistration = Pick<User, "email" | "password">;
