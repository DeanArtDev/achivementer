import Emittery from "emittery";
import { EmitteryEventData, GlobalEmitData, GlobalEmitPayload } from "types/emittery";
import { GlobalEmit } from "consts";

export function addPayload<T>({ payload }: { payload: T }): GlobalEmitPayload<T> {
  return {
    payload,
    trace: () => console.trace("Emittery trace: "),
  };
}

const logger = (type: string, _: string, eventName?: GlobalEmit, eventData?: GlobalEmitData[GlobalEmit]) => {
  if (type === "subscribe") return;
  if (type === "emit" && eventData?.trace) eventData.trace();

  console.table([{ "Type": type, "Event name": eventName, "Data": eventData }]);
};

export default new Emittery<EmitteryEventData>({
  debug: { name: "APP_EMITTER", enabled: !!process.env.REACT_APP_DEBUG_MODE, logger },
});
