import { getFail, getMessage, getWarn } from "./getDangerModule";

function getLogger(logType: "fail"): ReturnType<typeof getFail>;
function getLogger(logType: "warn"): ReturnType<typeof getWarn>;
function getLogger(logType: "message"): ReturnType<typeof getMessage>;
function getLogger(
  logType: "fail" | "warn" | "message"
):
  | ReturnType<typeof getFail>
  | ReturnType<typeof getWarn>
  | ReturnType<typeof getMessage> {
  if (logType === "message") return getMessage();
  if (logType === "fail") return getFail();
  return getWarn();
}

export default getLogger;
