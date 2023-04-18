import { getDanger, getLogger } from "../../utils";

const DEFAULT_CHECK_MESSAGE =
  "This is a trival MR and no CHANGELOG changes required.";
const DEFAULT_LOG_MESSAGE = "Please add a changelog entry for your changes.";

type Options = {
  filename?: string;
  logType?: "fail" | "warn" | "message";
  checkMessage?: string;
  logMessage?: string;
};

/**
 * @description Check if CHANGELOG included in the merge request
 */
const checkChangelog = (options: Options = {}) => {
  const {
    filename = "changelog.md",
    logType = "warn",
    checkMessage = DEFAULT_CHECK_MESSAGE,
    logMessage = DEFAULT_LOG_MESSAGE,
  } = options;

  const {
    git: { modified_files: modifiedFiles = [] },
    gitlab: {
      mr: { description },
    },
  } = getDanger();

  const hasChangelog = modifiedFiles.includes(filename);
  const isTrival = description.includes(`[x] ${checkMessage}`);

  if (!isTrival && !hasChangelog) {
    const logger = getLogger(logType as any);
    logger(logMessage);
  }
};

export default checkChangelog;
