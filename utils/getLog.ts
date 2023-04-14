const getFail = () => fail;
const getWarn = () => warn;
const getMessage = () => message;

function getLog(logType: "fail"): ReturnType<typeof getFail>;
function getLog(logType: "warn"): ReturnType<typeof getWarn>;
function getLog(logType: "message"): ReturnType<typeof getMessage>;
function getLog(
  logType: "fail" | "warn" | "message"
):
  | ReturnType<typeof getFail>
  | ReturnType<typeof getWarn>
  | ReturnType<typeof getMessage> {
  if (logType === "message") return getMessage();
  if (logType === "fail") return getFail();
  return getWarn();
}

export default getLog;
