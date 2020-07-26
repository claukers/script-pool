import {callScript, CancelableEventEmitter, ScheduleCallScriptOptions} from "./util";

export const scheduleCallScript = (args: ScheduleCallScriptOptions, logger?: Console | any): CancelableEventEmitter => {
  logger = logger ? logger : console;
  const emitter = new CancelableEventEmitter();
  let immediate = args.immediate;
  let canceled = false;
  emitter.on("cancel", () => {
    canceled = true;
    clearTimeout(timeout);
  });
  let timeout = null;
  const realSchedule = (ms: number = args.intervalMS) => {
    const nextT = immediate ? 0 : ms;
    logger.info(`scheduling next refresh ${immediate ? "now" : `in [${new Date(new Date().getTime() + nextT).toISOString()}]`}`);
    immediate = false;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      let nextCalled = false;
      const next = (ret = args.intervalMS) => {
        if (nextCalled) {
          return;
        }
        nextCalled = true;
        if (!canceled) {
          realSchedule(ret);
        } else {
          logger.info(`canceled not scheduling`);
        }
      };
      callScript(args).then((msg) => {
        const {nextMS} = msg;
        if (typeof nextMS === "number") {
          next(nextMS);
        } else {
          next();
        }
      }).catch((e) => {
        logger.error(e);
        emitter.on("error", e);
        next();
      });
    }, nextT);
  };
  realSchedule();
  return emitter;
}
