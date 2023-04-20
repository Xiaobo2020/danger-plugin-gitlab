import { inCommitGrep, LogType } from "../../utils";
import { getDanger, getLogger } from "../../utils";

const DEFAULT_LOG_TYPE = "fail";
export const DEFAULT_CHECK_MESSAGE = "Manually tested in a web browser";
const DEFAULT_SOURCE_FILE_MATCH = /src\/.*.(?<!test.)(js|ts|jsx|tsx)$/;
const getLogMessage = (checkMessage: string) =>
  `\`${checkMessage}\` is unchecked in the MR description when source files have been modified.\n\n` +
  "* Please ensure you have manually tested your change in a web browser.\n\n* Preferably, also manually test the full search flow.\n\n" +
  "* This helps prevent bugs that automated tests miss from reaching production. Ultimately, this saves travellers from " +
  "suffering a degraded experience and saves us from wasting time in incidents/ILDs that could be avoided.\n\n" +
  "* Manual testing is _not_ a substitute for automated testing - if you've made logic changes, please ensure they are covered by tests.\n\n" +
  `Once you've done this, check \`${checkMessage}\` in the MR description to make this Danger step pass.`;

type Options = {
  logType?: LogType;
  logMessage?: string | ((checkMessage: string) => string);
  checkMessage?: string;
  sourceFileMatch?: RegExp;
};

/**
 * @description Hard fail if author has not manually tested their changes when source files have been modified
 */
const checkManuallyTested = (options: Options = {}) => {
  const {
    logType = DEFAULT_LOG_TYPE,
    checkMessage = DEFAULT_CHECK_MESSAGE,
    logMessage = getLogMessage(checkMessage),
    sourceFileMatch = DEFAULT_SOURCE_FILE_MATCH,
  } = options;

  const {
    gitlab: {
      mr: { description = "" },
    },
  } = getDanger();

  const hasBeenManuallyTested = description.includes(`[x] ${checkMessage}`);
  const sourceFileChanged = inCommitGrep(sourceFileMatch);

  if (sourceFileChanged && !hasBeenManuallyTested) {
    const logger = getLogger(logType as any);
    const msg =
      typeof logMessage === "string" ? logMessage : logMessage(checkMessage);

    logger(msg);
  }
};

export default checkManuallyTested;
