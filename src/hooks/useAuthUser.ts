import {useContext, useEffect, useState} from "react";
import { User } from "providers/api/LoginProvider/types";
import { AuthUserContext } from "context/AuthUserContext/AuthUserContext";

export default function useAuthUser() {
  const [{ user }] = useContext(AuthUserContext);
  const [authUser, setAuthUser] = useState<User | null>(user);

  useEffect(() => {
    setAuthUser(user);
  }, [user])
  return [authUser];
}
