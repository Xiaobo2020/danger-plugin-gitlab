import type { LogType } from "../../utils";
import { getDanger, getLogger } from "../../utils";

const DEFAULT_LOG_FILE = "changelog.md";
const DEFAULT_LOG_TYPE = "warn";
const DEFAULT_LOG_MESSAGE = "Please add a changelog entry for your changes.";

const DEFAULT_SKIP_MESSAGE = "Skip CHANGELOG check";

type Options = {
  logFile?: string;

  logType?: LogType;
  logMessage?: string;

  enableSkip?: boolean;
  skipMessage?: string;
};

/**
 * @description Check if CHANGELOG included in the merge request
 */
const checkChangelog = (options: Options = {}) => {
  const {
    logFile = DEFAULT_LOG_FILE,

    logType = DEFAULT_LOG_TYPE,
    logMessage = DEFAULT_LOG_MESSAGE,

    enableSkip = false,
    skipMessage = DEFAULT_SKIP_MESSAGE,
  } = options;

  const {
    git: { modified_files: modifiedFiles = [] },
    gitlab: {
      mr: { description },
    },
  } = getDanger();

  const hasChangelog = modifiedFiles.includes(logFile);
  const isSkip = enableSkip
    ? description.includes(`[x] ${skipMessage}`)
    : false;

  if (!hasChangelog && !isSkip) {
    const logger = getLogger(logType as any);
    logger(logMessage);
  }
};

export default checkChangelog;
