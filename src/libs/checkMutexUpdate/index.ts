import type { LogType } from "../../utils";
import { getDanger, getLogger } from "../../utils";

const DEFAULT_LOG_TYPE = "fail";
const DEFAULT_SKIP_MESSAGE = "Skip mutex update check";
const getLogMessage = ({
  mutexItemNames,
  enableSkip,
  skipMessage,
}: {
  mutexItemNames: string[];
  enableSkip: boolean;
  skipMessage: string;
}) => {
  const msg1 = `The MR contains mutex code updates (${mutexItemNames
    .map((v) => `\`${v}\``)
    .join(" & ")}). Try to split into multi MRs.`;
  const msg2 = ` If you are confident in your change then check the \`${skipMessage}\` in the MR description`;

  if (enableSkip) {
    return msg1 + msg2;
  }

  return msg1;
};

type MutexItem = {
  name: string;
  match: RegExp;
};
type Options = {
  logType?: LogType;
  logMessage?: string | ((mutexItemNames: string[]) => string);
  mutexItems?: MutexItem[];

  enableSkip?: boolean;
  skipMessage?: string;
};
const checkMutexUpdate = (options: Options = {}) => {
  const {
    git: {
      modified_files: modifiedFiles = [],
      created_files: createdFiles = [],
    },
    gitlab: {
      mr: { description = "" },
    },
  } = getDanger();
  const changedFiles = [...createdFiles, ...modifiedFiles];

  const {
    logType = DEFAULT_LOG_TYPE,
    logMessage,
    mutexItems = [],
    enableSkip = false,
    skipMessage = DEFAULT_SKIP_MESSAGE,
  } = options;

  if (mutexItems.length === 0) return;

  const mutexItemNames = Array.from(
    new Set(
      changedFiles.reduce<string[]>((acc, cur) => {
        const mutexName = mutexItems.reduce<null | string>(
          (mutexName, { match, name }) => {
            if (mutexName !== null) return mutexName;

            return match.exec(cur) !== null ? name : null;
          },
          null
        );

        if (mutexName !== null) {
          return [...acc, mutexName];
        }

        return acc;
      }, [])
    )
  );

  const isSkip = enableSkip
    ? description.includes(`[x] ${skipMessage}`)
    : false;

  if (mutexItemNames.length >= 2 && !isSkip) {
    const logger = getLogger(logType as any);
    const msg =
      logMessage === undefined
        ? getLogMessage({ mutexItemNames, enableSkip, skipMessage })
        : typeof logMessage === "string"
        ? logMessage
        : String(logMessage(mutexItemNames));

    logger(msg);
  }
};

export default checkMutexUpdate;
