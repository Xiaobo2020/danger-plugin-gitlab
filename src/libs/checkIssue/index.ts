import { getLogger, LogType } from "../../utils";
import { getDanger } from "../../utils";

const DEFAULT_LOG_TYPE = "warn";
const getDefaultLogMessage = (location: IssueLocation) =>
  `Please include a ticket (like \`XXX-DDDD\` or \`NO-ISSUE\` if there is no ticket) at the beginning of the MR ${location}`;
const DEFAULT_ISSUE_LOCATION = "title";

// TODO: "branch"
type IssueLocation = "title" | "description";

type Options = {
  key?: string | string[];
  logType?: LogType;
  logMessage?: string;
  location?: IssueLocation;
};

const checkIssue = (options: Options = { key: "" }) => {
  const {
    key,
    logType = DEFAULT_LOG_TYPE,
    location = DEFAULT_ISSUE_LOCATION,
    logMessage = getDefaultLogMessage(location),
  } = options;

  if (!key || key.length === 0) {
    throw new Error("[checkIssue]: Missing key (e.g. 'JIRA').");
  }

  const {
    gitlab: {
      mr: { title = "", description = "" },
    },
  } = getDanger();

  const content = location === "title" ? title : description;

  // NO-ISSUE
  const noIssueRegexp = new RegExp("NO-ISSUE", "g");
  if (noIssueRegexp.exec(content) !== null) return;

  // ISSUE
  const issueKey = Array.isArray(key) ? `(${key.join("|")})` : key;
  const issueRegexp = new RegExp(`(${issueKey}-[0-9]+)`, "g");

  const issues = [];
  let issue;
  while ((issue = issueRegexp.exec(content)) !== null) {
    issues.push(issue);
  }
  if (issues.length === 0) {
    const logger = getLogger(logType as any);
    logger(logMessage);
    return;
  }

  return;
};

export default checkIssue;
