import type { LogType } from "../../utils";
import { getDanger, getLogger } from "../../utils";

const DEFAULT_LOG_TYPE = "fail";
const DEFAULT_MAX_SIZE = 20;
const DEFAULT_SKIP_MESSAGE = "Skip MR size check";

type GetLogMessageOptions = {
  createdFiles: string[];
  modifiedFiles: string[];
  enableSkip: boolean;
  skipMessage: string;
};
const getLogMessage = ({
  createdFiles,
  modifiedFiles,
  enableSkip,
  skipMessage,
}: GetLogMessageOptions) => {
  const changedFiles = [...createdFiles, ...modifiedFiles];
  if (enableSkip) {
    return `This MR contains ${changedFiles.length} files (${createdFiles.length} new, ${modifiedFiles.length} modified). Consider splitting it into multiple MRs. Otherwise toggle the danger check '[ ] ${skipMessage}' in the MR template`;
  }

  return `This MR contains ${changedFiles.length} files (${createdFiles.length} new, ${modifiedFiles.length} modified). Consider splitting it into multiple MRs.`;
};

type Options = {
  logType?: LogType;
  maxSize?: number;

  enableSkip?: boolean;
  skipMessage?: string;

  logMessage?: string | ((options: GetLogMessageOptions) => string);
};

const checkSize = (options: Options = {}) => {
  const {
    git: {
      modified_files: modifiedFiles = [],
      created_files: createdFiles = [],
    },
    gitlab: {
      mr: { description = "" },
    },
  } = getDanger();

  const {
    enableSkip = false,
    skipMessage = DEFAULT_SKIP_MESSAGE,

    logType = DEFAULT_LOG_TYPE,
    maxSize = DEFAULT_MAX_SIZE,
    logMessage = getLogMessage({
      enableSkip,
      skipMessage,
      createdFiles,
      modifiedFiles,
    }),
  } = options;

  const isBig = [...createdFiles, ...modifiedFiles].length > maxSize;
  const isSkip = enableSkip
    ? description.includes(`[x] ${skipMessage}`)
    : false;

  if (isBig && !isSkip) {
    const logger = getLogger(logType as any);
    const msg =
      typeof logMessage === "string"
        ? logMessage
        : logMessage({ enableSkip, skipMessage, createdFiles, modifiedFiles });
    logger(msg);
  }
};

export default checkSize;
