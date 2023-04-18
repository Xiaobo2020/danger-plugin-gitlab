import type { LogType } from "../../utils";
import { getDanger, getLogger, inCommitGrep } from "../../utils";

const DEFAULT_LOG_TYPE = "fail";
const DEFAULT_SOURCE_FILE_MATCH = /src\/.*.(?<!test.)(js|ts|jsx|tsx)$/;
const DEFAULT_TEST_FILE_MATCH = /src\/.*test.*(js|jsx|ts|tsx)$/;
const DEFAULT_CHECK_MESSAGE = "Automated tests added/updated";
const getDefaultLogMessage = ({
  enableCheck,
  checkMessage,
}: {
  enableCheck: boolean;
  checkMessage: string;
}) => {
  const msg1 =
    "Source files have been modified, but no test files have been added or modified.";
  const msg2 =
    "If you've made logic changes, please ensure they are covered by automated tests.";
  const msg3 = `Once you've done this, check \'${checkMessage}\' in the MR description to make this Danger step pass.`;

  if (!enableCheck) {
    return msg1 + "\n\n" + msg2;
  }

  return msg1 + "\n\n" + msg2 + "\n\n" + msg3;
};

type Options = {
  logType?: LogType;
  logMessage?: string;

  sourceFileMatch?: RegExp;
  testFileMatch?: RegExp;

  enableCheck?: boolean;
  checkMessage?: string;
};

const checkAutomatedTest = (options: Options = {}) => {
  const {
    logType = DEFAULT_LOG_TYPE,
    logMessage,

    sourceFileMatch = DEFAULT_SOURCE_FILE_MATCH,
    testFileMatch = DEFAULT_TEST_FILE_MATCH,

    enableCheck = false,
    checkMessage = DEFAULT_CHECK_MESSAGE,
  } = options;

  const {
    gitlab: {
      mr: { description },
    },
  } = getDanger();

  const sourceFileChanged = inCommitGrep(sourceFileMatch);
  const testFileChanged = inCommitGrep(testFileMatch);
  const testFileUpdated = enableCheck
    ? (description || "").includes(`[x] ${checkMessage}`)
    : false;

  if (sourceFileChanged && !testFileChanged && !testFileUpdated) {
    const logger = getLogger(logType as any);
    logger(logMessage || getDefaultLogMessage({ enableCheck, checkMessage }));
  }
};

export default checkAutomatedTest;
