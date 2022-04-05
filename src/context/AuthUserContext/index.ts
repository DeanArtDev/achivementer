import React, { PropsWithChildren, Reducer, useReducer } from "react";
import { User } from "providers/api/LoginProvider/types";
import { LoginData } from "types";
import StorageManager from "utils/StorageManager";
import { LocalStorageKey } from "consts";
import { userAction } from "./consts";

type UserState = {
  user: User | null;
};

type Action = {
  type: userAction.SET_USER;
  payload: User | null;
};

const userReducer: Reducer<UserState, Action> = (state, action) => {
  switch (action.type) {
    case userAction.SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const defaultContext: UserState = {
  user: null,
};

export const AuthUserContext = React.createContext<[UserState, React.Dispatch<Action>]>([defaultContext, () => {}]);

export default function AuthUserProvider(props: PropsWithChildren<unknown>) {
  const loginData = StorageManager.getItem<LoginData>(LocalStorageKey.USER_LOGIN_DATA);

  const [state, dispatch] = useReducer(userReducer, {
    ...defaultContext,
    user: loginData?.user ?? null,
  });

  return React.createElement(AuthUserContext.Provider, { value: [state, dispatch] }, props.children);
}
