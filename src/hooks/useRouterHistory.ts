import { useLocation } from "react-router";
import { Location } from "history";
import { LocationState } from "types";

type UseRouterHistoryReturn = {
  fromPath: string | null;
  getLocation: (pathname: string, state?: LocationState) => Location<LocationState>;
  notification: LocationState["notification"];
};

export default function useRouterHistory(): UseRouterHistoryReturn {
  const location = useLocation<LocationState>();
  const fromPath = location?.state?.from?.pathname ?? null;

  const getLocation = (pathname: string, state?: LocationState): Location<LocationState> => {
    return {
      ...location,
      pathname,
      state: {
        ...state,
        from: location,
      },
    };
  };

  return {
    fromPath,
    getLocation,
    notification: location.state?.notification,
  };
}
