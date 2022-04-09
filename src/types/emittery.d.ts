import { GlobalEmit } from "../consts";

export type GlobalEmitPayload<Payload> = {
  payload: Payload;
  trace: () => void;
};

export type ShowNotificationPayload = {
  message: string;
};

export type GlobalEmitData = {
  [GlobalEmit.SHOW_NOTIFICATION]: GlobalEmitPayload<ShowNotificationPayload>;
};

export type EmitteryEventData = {
  [K in GlobalEmit]: GlobalEmitData[K];
};
