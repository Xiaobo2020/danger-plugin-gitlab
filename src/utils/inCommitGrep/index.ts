import { getChangedFiles } from "../../utils";

/**
 * Check if target pattern is included in changed files
 */
const inCommitGrep = (
  pattern: RegExp,
  changedFiles: string[] = getChangedFiles()
) => {
  return (
    changedFiles.findIndex(
      (filename) => filename && filename.match(pattern) !== null
    ) >= 0
  );
};

export default inCommitGrep;
