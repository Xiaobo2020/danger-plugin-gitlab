import { readFileSync } from "node:fs";
import { getAddedLines, getDanger, getLogger } from "../../utils";
import type { LogType } from "../../utils";

const DEFAULT_LOCKFILENAME = "package-lock.json";
const getPkgLockMissingLogMessage = (pkg: string, pkgLock: string) =>
  `Dependencies (${pkg}) may have changed, but lockfile (${pkgLock}) has not been updated.`;
const getPkgMissingLogMesssage = (pkg: string, pkgLock: string) =>
  `Lockfile (${pkgLock}) has been updated, but no dependencies (${pkg}) have changed.`;

const hasDepsChanged = (
  startLine: number,
  endLine: number,
  addedLines: number[]
) =>
  startLine < 0
    ? false
    : addedLines.reduce(
        (alreadyChanged, ln) =>
          (ln > startLine && ln < endLine) || alreadyChanged,
        false
      );

const matchLineNumber = (content: string, pattern: RegExp, skipLines = 0) => {
  const finalContent =
    skipLines <= 0 ? content : content.split("\n").slice(skipLines).join("\n");

  const [beforeStr, afterStr] = finalContent.split(pattern);
  if (typeof afterStr === "undefined") {
    return -1;
  }

  const lines = beforeStr.split("\n");
  return skipLines + lines.length;
};

const lineRange = (content: string, pattern: RegExp) => {
  const startLine = matchLineNumber(content, pattern);
  const endLine = matchLineNumber(content, /\}/, startLine);
  return [startLine, endLine];
};

const checkMissingPkg = ({
  logType,
  pkg,
  pkgLock,
  pkgChanged,
  pkgLockChanged,
}: {
  logType: LogType;
  pkg: string;
  pkgLock: string;
  pkgChanged: boolean;
  pkgLockChanged: boolean;
}) => {
  if (!pkgChanged && pkgLockChanged) {
    const logger = getLogger(logType as any);
    logger(getPkgMissingLogMesssage(pkg, pkgLock));
  }
};

const checkMissingPkgLock = async ({
  logType,
  pkg,
  pkgLock,
  pkgChanged,
  pkgLockChanged,
}: {
  logType: LogType;
  pkg: string;
  pkgLock: string;
  pkgChanged: boolean;
  pkgLockChanged: boolean;
}) => {
  if (pkgChanged && !pkgLockChanged) {
    const pkgContent = readFileSync(pkg).toString();

    const [depsStart, depsEnd] = lineRange(pkgContent, /"dependencies": {/);
    const [devDepsStart, devDepsEnd] = lineRange(
      pkgContent,
      /"devDependencies": {/
    );

    const addedLines = await getAddedLines(pkg);

    const depsChanged = hasDepsChanged(depsStart, depsEnd, addedLines);
    const devDepsChanged = hasDepsChanged(devDepsStart, devDepsEnd, addedLines);

    if (depsChanged || devDepsChanged) {
      const logger = getLogger(logType as any);
      logger(getPkgLockMissingLogMessage(pkg, pkgLock));
    }
  }
};

type Options = {
  logType?: LogType;
  lockfile?: string;
  path?: string;
};

/**
 * Keep Lockfile up to date.
 */
const checkLockfile = async (options: Options = {}) => {
  const {
    logType = "message",
    lockfile = DEFAULT_LOCKFILENAME,
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
  const pkgLock = `${path}${lockfile}`;

  const pkgChanged = committedFiles.includes(pkg);
  const pkgLockChanged = committedFiles.includes(pkgLock);

  checkMissingPkg({
    logType,
    pkg,
    pkgLock,
    pkgChanged,
    pkgLockChanged,
  });

  await checkMissingPkgLock({
    logType,
    pkg,
    pkgLock,
    pkgChanged,
    pkgLockChanged,
  });
};

export default checkLockfile;
