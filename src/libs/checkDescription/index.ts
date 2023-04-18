import type { LogType } from "../../utils";
import { getDanger, getLogger } from "../../utils";

const DEFAULT_LOG_TYPE = "message";
const DEFAULT_LOG_MESSAGE =
  "Please provide a summary in the pull request description.";
const DEFAULT_MIN_LENGTH = 50;

type Options = {
  logType?: LogType;
  logMessage?: string;
  minLength?: number;
};

/**
 * @description Check if the description in the merge request detailed enough
 */
const checkDescription = (options: Options = {}) => {
  const {
    logType = DEFAULT_LOG_TYPE,
    minLength = DEFAULT_MIN_LENGTH,
    logMessage = DEFAULT_LOG_MESSAGE,
  } = options;

  const {
    gitlab: {
      mr: { description },
    },
  } = getDanger();

  const descNoMentions = (description || "").replace(/@\w+/, "");
  const descLines = descNoMentions.split("\n").map((line) => line.trim());
  const descText = descLines.join("");

  const minDescLength =
    !Number.isInteger(minLength) || minLength < 0
      ? DEFAULT_MIN_LENGTH
      : minLength;

  if (descText.length <= minDescLength) {
    const logger = getLogger(logType as any);
    logger(logMessage);
  }
};

export default checkDescription;
