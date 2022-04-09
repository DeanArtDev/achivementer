import React, { useEffect, useState } from "react";
import emitter from "utils/emitter";
import usePortal from "hooks/usePortal";
import { GlobalEmitPayload, ShowNotificationPayload } from "types/emittery";
import { GlobalEmit } from "consts";
// import "./style.scss";

export default function NotificationManager() {
  const goToPortal = usePortal();
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmitterShow = ({ payload: { message } }: GlobalEmitPayload<ShowNotificationPayload>): void => {
    setErrorMessage(message);
  };

  useEffect(() => {
    return emitter.on(GlobalEmit.SHOW_NOTIFICATION, handleEmitterShow);
  });

  if (!errorMessage) return null;
  return goToPortal(<div className={"notification-manager"}>{errorMessage}</div>);
}
