import React, { useEffect, useState } from "react";
import emitter from "utils/emitter";
import usePortal from "hooks/usePortal";
import { GlobalEmitPayload, ShowNotificationPayload } from "types/emittery";
import { ReactComponent as NotificationIcon } from "assets/images/icons/new-alert-notification.svg";
import { GlobalEmit } from "consts";
import "./style.scss";

const HIDDEN_MESSAGE_TIMER = 5000;

export default function NotificationManager() {
  const goToPortal = usePortal();
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmitterShow = ({ payload: { message } }: GlobalEmitPayload<ShowNotificationPayload>): void => {
    setErrorMessage(message);
  };

  useEffect(() => {
    return emitter.on(GlobalEmit.SHOW_NOTIFICATION, handleEmitterShow);
  });

  useEffect(() => {
    errorMessage && setTimeout(() => setErrorMessage(""), HIDDEN_MESSAGE_TIMER)
  }, [errorMessage])

  if (!errorMessage) return null;
  return goToPortal(
    <div className={"notification-manager container-narrow __x-padding mx-auto"}>
      <div className={"notification-manager__content py-4"}>
        <NotificationIcon className={"mr-2"} width={35} height={35} />
        <span className={"notification-manager__msg"}>{errorMessage}</span>
      </div>
    </div>
  );
}
