import { getFail, getMarkdown, getMessage, getWarn } from "../../utils";
import type { LogType } from "../../utils";

function getLogger(logType: "fail"): ReturnType<typeof getFail>;
function getLogger(logType: "warn"): ReturnType<typeof getWarn>;
function getLogger(logType: "message"): ReturnType<typeof getMessage>;
function getLogger(logType: "markdown"): ReturnType<typeof getMarkdown>;
function getLogger(
  logType: LogType
):
  | ReturnType<typeof getFail>
  | ReturnType<typeof getWarn>
  | ReturnType<typeof getMessage> {
  if (logType === "message") return getMessage();
  if (logType === "markdown") return getMarkdown();
  if (logType === "fail") return getFail();
  return getWarn();
}

export default getLogger;
