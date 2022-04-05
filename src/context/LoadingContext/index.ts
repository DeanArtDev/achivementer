import React, { PropsWithChildren, Reducer, useReducer } from "react";
import { loadingAction } from "./consts";

type Action = {
  type: loadingAction.SET_GLOBAL_LOADING;
  payload: boolean;
};

type LoadingState = {
  loadingGlobal: boolean;
};

const defaultContext: LoadingState = {
  loadingGlobal: false,
};

export const LoadingContext = React.createContext<[LoadingState, React.Dispatch<Action>]>([defaultContext, () => {}]);

const loadingReducer: Reducer<LoadingState, Action> = (state, action) => {
  switch (action.type) {
    case loadingAction.SET_GLOBAL_LOADING:
      return { ...state, loadingGlobal: action.payload };
    default:
      return state;
  }
};

export default function LoadingProvider(props: PropsWithChildren<unknown>) {
  const [state, dispatch] = useReducer(loadingReducer, defaultContext);

  return React.createElement(LoadingContext.Provider, { value: [state, dispatch] }, props.children);
}
