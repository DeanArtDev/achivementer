import React, { useEffect, useState } from "react";
import emitter from "utils/emitter";
import usePortal from "hooks/usePortal";
import { GlobalEmitPayload, ShowNotificationPayload } from "types/emittery";
import { ReactComponent as NotificationIcon } from "assets/images/icons/new-alert-notification.svg";
import { GlobalEmit } from "consts";
import "./style.scss";

const HIDDEN_MESSAGE_TIMER = 5000;
const MESSAGE_COUNT_LIMIT = 3;

export default function NotificationManager() {
  const goToPortal = usePortal();
  const [errorMessages, setErrorMessages] = useState<ShowNotificationPayload["message"][]>([]);

  const handleEmitterShow = ({ payload: { message } }: GlobalEmitPayload<ShowNotificationPayload>): void => {
    setErrorMessages((state) => {
      const newState = [...state, message];
      if (newState.length > MESSAGE_COUNT_LIMIT) newState.shift();
      return newState;
    });
  };

  useEffect(() => {
    return emitter.on(GlobalEmit.SHOW_NOTIFICATION, handleEmitterShow);
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    if (errorMessages) {
      timeoutId = setTimeout(() => setErrorMessages([]), HIDDEN_MESSAGE_TIMER);
    }

    return () => timeoutId && clearTimeout(timeoutId);
  }, [errorMessages]);

  if (errorMessages.length === 0) return null;
  return goToPortal(
    <div className={"notification-manager container-narrow __x-padding mx-auto"}>
      <div className={"notification-manager__content py-4"}>
        <NotificationIcon width={35} height={35} />

        <div className={"notification-manager__msg-wrapper"}>
          {errorMessages.map((message, index) => (
            <span className={"notification-manager__msg"} key={message + index}>
              {message}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
