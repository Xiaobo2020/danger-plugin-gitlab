import { getDanger } from "../getDangerModule";

/**
 * Check if target pattern is included in changed files
 */
const inCommitGrep = (pattern: RegExp) => {
  const {
    git: {
      created_files: createdFiles = [],
      modified_files: modifiedFiles = [],
    },
  } = getDanger();

  const changedFiles = [...createdFiles, ...modifiedFiles];
  return (
    changedFiles.findIndex(
      (filename) => filename && filename.match(pattern) !== null
    ) >= 0
  );
};

export default inCommitGrep;
