import { getDanger, getLogger } from "../../utils";
import type { LogType } from "../../utils";

const DEFAULT_MIN_LENGTH = 5;
const DEFAULT_LOG_MESSAGE =
  "Please provide a summary in the pull request description.";

type Options = {
  logType?: LogType;
  minLength?: number;
  logMessage?: string;
};

/**
 * @description Check if the description in the merge request detailed enough
 */
const checkDescription = (options: Options = {}) => {
  const {
    logType = "message",
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
