import { getLog } from "../utils";

const DEFAULT_CHECK_MESSAGE =
  "This is a trival MR and no CHANGELOG changes required.";
const DEFAULT_LOG_MESSAGE = "Please add a changelog entry for your changes.";

type ChangelogOptions = {
  filename?: string;
  logType?: "fail" | "warn" | "message";
  checkMessage?: string;
  logMessage?: string;
};
const changelog = (options: ChangelogOptions = {}) => {
  const {
    filename = "changelog.md",
    logType = "warn",
    checkMessage = DEFAULT_CHECK_MESSAGE,
    logMessage = DEFAULT_LOG_MESSAGE,
  } = options;
  const {
    git: { modified_files: modifiedFiles },
    gitlab: {
      mr: { description },
    },
  } = danger;

  const hasChangelog = modifiedFiles.includes(filename);
  const isTrival = description.includes(`[x] ${checkMessage}`);

  if (!isTrival && !hasChangelog) {
    const log = getLog(logType as any);
    log(logMessage);
  }
};

export default changelog;
