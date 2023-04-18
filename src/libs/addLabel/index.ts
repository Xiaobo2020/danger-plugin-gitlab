import { getDanger, inCommitGrep } from "../../utils";

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
    labels.forEach(({ match, name }) => {
      if (inCommitGrep(match)) {
        addLabels(name);
      }
    });
  }
};

export default addLabel;
