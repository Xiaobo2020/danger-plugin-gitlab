import getMessageLog from "../utils/getMessageLog";
import type { LogType } from "../utils/getMessageLog";

const changelog = ({
  filename,
  logType,
}: {
  filename?: string;
  logType?: LogType;
}) => {
  const log = getMessageLog(logType || "warn");
  console.log(log, filename);
};

export default changelog;
