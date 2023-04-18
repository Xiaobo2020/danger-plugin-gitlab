import type { LogType } from "../../utils";
import { getDanger, getLogger } from "../../utils";

const DEFAULT_LOG_TYPE = "fail";
const getDefaultLogMessage = ({
  createdFiles,
  modifiedFiles,

  enableSkip,
  skipMessage,
}: {
  createdFiles: string[];
  modifiedFiles: string[];
  enableSkip: boolean;
  skipMessage: string;
}) => {
  const changedFiles = [...createdFiles, ...modifiedFiles];
  if (enableSkip) {
    return `This MR contains ${changedFiles.length} files (${createdFiles.length} new, ${modifiedFiles.length} modified). Consider splitting it into multiple MRs. Otherwise toggle the danger check '[ ] ${skipMessage}' in the MR template`;
  }

  return `This MR contains ${changedFiles.length} files (${createdFiles.length} new, ${modifiedFiles.length} modified). Consider splitting it into multiple MRs.`;
};

// const DEFAULT_SIZE_UNIT = "file";
const DEFAULT_MAX_SIZE = 20;
const DEFAULT_SKIP_MESSAGE = "Skip MR size check";

// TODO: 'line'
type SizeUnit = "file";

type Options = {
  logType?: LogType;
  logMessage?: string;
  sizeUnit?: SizeUnit;
  maxSize?: number;

  enableSkip?: boolean;
  skipMessage?: string;
};

const checkSize = (options: Options = {}) => {
  const {
    enableSkip = false,
    skipMessage = DEFAULT_SKIP_MESSAGE,

    logType = DEFAULT_LOG_TYPE,
    logMessage,
    // sizeUnit = DEFAULT_SIZE_UNIT,
    maxSize = DEFAULT_MAX_SIZE,
  } = options;

  const {
    git: {
      modified_files: modifiedFiles = [],
      created_files: createdFiles = [],
    },
    gitlab: {
      mr: { description = "" },
    },
  } = getDanger();

  const isBig = [...createdFiles, ...modifiedFiles].length > maxSize;
  const isSkip = enableSkip
    ? description.includes(`[x] ${skipMessage}`)
    : false;

  if (isBig && !isSkip) {
    const logger = getLogger(logType as any);
    logger(
      logMessage ||
        getDefaultLogMessage({
          createdFiles,
          modifiedFiles,
          enableSkip,
          skipMessage,
        })
    );
  }
};

export default checkSize;
