import { UniqID } from "types";

export type User = {
  id: UniqID;
  email: string;
};

export type LoginResponse = {
  user: Omit<User, "password">;
  token: string;
};

export type RegistrationResponse = LoginResponse;

export type InputLogin = Pick<User, "email"> & { password: string };

export type InputRegistration = InputLogin;
