import { getDanger, getLogger } from "../utils";

const DEFAULT_LOCKFILENAME = "package-lock.json";
const getDefaultLogMessage = (filename: string) =>
  `Changes were mad to package.json, but not to ${filename}.`;

type Options = {
  logType?: "warn" | "message";
  lockfilename?: string;
  logMessage?: string;
};

const lockfile = (options: Options = {}) => {
  const {
    logType = "message",
    lockfilename = DEFAULT_LOCKFILENAME,
    logMessage = getDefaultLogMessage(lockfilename),
  } = options;

  const {
    git: { modified_files: modifiedFiles },
  } = getDanger();

  const packageChanged = modifiedFiles.includes("package.json");
  const lockfileChanged = modifiedFiles.includes(lockfilename);

  if (packageChanged && !lockfileChanged) {
    const logger = getLogger(logType as any);
    logger(logMessage);
  }
};

export default lockfile;
