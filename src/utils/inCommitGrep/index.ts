import getChangedFiles from "../getChangedFiles";

/**
 * Check if target pattern is included in changed files
 */
const inCommitGrep = (
  pattern: RegExp,
  changedFiles: string[] = getChangedFiles()
) =>
  changedFiles.findIndex(
    (filename) => filename && filename.match(pattern) !== null
  ) >= 0;

export default inCommitGrep;
