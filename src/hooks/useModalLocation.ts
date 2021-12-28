import { useLocation } from "react-router";
import { LocationDescriptor } from "history";
import { LocationState } from "../type";

export type ModalLocationFactory = (
  pathname: string,
  state?: Omit<LocationState, "location">
) => LocationDescriptor<LocationState>;

export default function useModalLink() {
  const location = useLocation<LocationState>();

  const getLocation: ModalLocationFactory = (pathname, state) => ({
    pathname,
    state: {
      ...state,
      location: location.state?.location || location,
    },
  });
  return {
    notification: location.state?.notification,
    getLocation,
  };
}
