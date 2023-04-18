import { getChangedFiles, getDanger, inCommitGrep } from "../../utils";

type Label = {
  match: RegExp;
  name: string;
};

const addLabel = (labels: Label[] = []) => {
  const {
    gitlab: {
      utils: { addLabels },
    },
  } = getDanger();

  if (labels.length > 0) {
    const changedFiles = getChangedFiles();

    labels.forEach(({ match, name }) => {
      if (inCommitGrep(match, changedFiles)) {
        addLabels(name);
      }
    });
  }
};

export default addLabel;
