export type LogType = "fail" | "warn" | "message";

export default function getMessageLog(logType: LogType = "warn") {
  switch (logType) {
    case "fail":
      return fail;
    case "message":
      return message;
    default:
      return warn;
  }
}
