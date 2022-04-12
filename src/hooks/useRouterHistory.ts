import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";
import { Location } from "history";
import { LocationState } from "types";
import { routePath } from "router/consts";

type UseRouterHistoryReturn = {
  fromPath: string | null;
  getLocation: (pathname: string, state?: LocationState) => Location<LocationState>;
  goToHome: () => void;
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

  const history = useHistory();
  const goToHome = () => {
    history.push(getLocation(routePath.DEFAULT));
  };

  return {
    fromPath,
    getLocation,
    goToHome,
    notification: location.state?.notification,
  };
}
