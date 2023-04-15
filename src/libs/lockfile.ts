import { getDanger, getLogger } from "../utils";

const DEFAULT_LOCKFILENAME = "package-lock.json";
const getDefaultLogMessage = (filename: string) =>
  `Changes were mad to package.json, but not to ${filename}.`;

type Options = {
  logType?: "warn" | "message";
  lockfilename?: string;
  logMessage?: string;
  path?: string;
};

/**
 * Keep Lockfile up to date.
 */
const lockfile = (options: Options = {}) => {
  const {
    logType = "message",
    lockfilename = DEFAULT_LOCKFILENAME,
    logMessage = getDefaultLogMessage(lockfilename),
    path = "",
  } = options;

  const {
    git: {
      modified_files: modifiedFiles = [],
      created_files: createdFiles = [],
    },
  } = getDanger();

  const committedFiles = [...createdFiles, ...modifiedFiles];

  const pkg = `${path}package.json`;
  const pkgLock = `${path}${lockfilename}`;

  const pkgChanged = committedFiles.includes(pkg);
  const pkgLockChanged = committedFiles.includes(pkgLock);

  if (pkgChanged && !pkgLockChanged) {
    const logger = getLogger(logType as any);
    logger(logMessage);
  }
};

export default lockfile;
