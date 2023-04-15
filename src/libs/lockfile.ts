import { getDanger, getLogger } from "../utils";

const DEFAULT_LOCKFILENAME = "package-lock.json";
const getPkgLockMissingLogMessage = (pkg: string, pkgLock: string) =>
  `Dependencies (${pkg}) may have changed, but lockfile (${pkgLock}) has not been updated.`;
const getPkgMissingLogMesssage = (pkg: string, pkgLock: string) =>
  `Lockfile (${pkgLock}) has been updated, but no dependencies (${pkg}) have changed.`;

type Options = {
  logType?: "warn" | "message";
  lockfilename?: string;
  path?: string;
};

/**
 * Keep Lockfile up to date.
 */
const lockfile = (options: Options = {}) => {
  const {
    logType = "message",
    lockfilename = DEFAULT_LOCKFILENAME,
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

  const logger = getLogger(logType as any);
  if (!pkgChanged && pkgLockChanged) {
    logger(getPkgMissingLogMesssage(pkg, pkgLock));
  }
  if (pkgChanged && !pkgLockChanged) {
    logger(getPkgLockMissingLogMessage(pkg, pkgLock));
  }
};

export default lockfile;
