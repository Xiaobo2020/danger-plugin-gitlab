import { getDanger } from "../getDangerModule";

/**
 * Check if filename is included in changed files
 */
const inCommit = (filename: string) => {
  const {
    git: {
      created_files: createdFiles = [],
      modified_files: modifiedFiles = [],
    },
  } = getDanger();

  const changedFiles = [...createdFiles, ...modifiedFiles];

  return changedFiles.includes(filename);
};

export default inCommit;
