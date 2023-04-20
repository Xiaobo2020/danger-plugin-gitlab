import type { LogType } from "../../utils";
import { getDanger, getLogger } from "../../utils";

const DEFAULT_LOG_TYPE = "warn";
export const DEFAULT_CHECK_MESSAGE = "Code has been reviewed by the author";
export const getLogMessage = (checkMessage: string) =>
  `\`${checkMessage}\` is unchecked in the MR description.\n\n` +
  "* Please ensure you have read through your code changes in 'Files changed' _before_ asking others to review your MR. " +
  "This helps catch obvious errors and typos, which avoids wasting your time and the reviewer's time, and ultimately allows us to " +
  "ship product changes more quickly.\n\n* Please also take this opportunity to annotate your PR with GitHub comments to explain " +
  "any complex logic or decisions that you have made. This helps the reviewer understand your MR and speed up the review process.\n\n" +
  `Once you've done this, check \`${checkMessage}\` in the MR description to make this Danger step pass.`;

type Options = {
  logType?: LogType;
  logMessage?: string | ((checkMessage: string) => string);
  checkMessage?: string;
};

/**
 * @description Hard fail if author has not reviewed their code.
 */
const checkSelfReview = (options: Options = {}) => {
  const {
    logType = DEFAULT_LOG_TYPE,
    checkMessage = DEFAULT_CHECK_MESSAGE,
    logMessage = getLogMessage(checkMessage),
  } = options;

  const {
    gitlab: {
      mr: { description = "" },
    },
  } = getDanger();

  const hasSelfReviewed = description.includes(`[x] ${checkMessage}`);

  if (!hasSelfReviewed) {
    const logger = getLogger(logType as any);
    const msg =
      typeof logMessage === "string" ? logMessage : logMessage(checkMessage);

    logger(msg);
  }
};

export default checkSelfReview;
