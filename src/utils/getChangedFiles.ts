import { getDanger } from "./getDangerModule";

const getChangedFiles = () => {
  const {
    git: {
      modified_files: modifiedFiles = [],
      created_files: createdFiles = [],
    },
  } = getDanger();

  return [...createdFiles, ...modifiedFiles];
};

export default getChangedFiles;
