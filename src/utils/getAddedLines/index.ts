import { getDanger } from "../../utils";

const getAddedLines = async (filename: string) => {
  const {
    git: { structuredDiffForFile },
  } = getDanger();

  const { chunks = [] } = (await structuredDiffForFile(filename)) || {};

  const addedLines: number[] = [];

  chunks.forEach(({ changes }) => {
    changes.forEach((change) => {
      if (change.type === "add") {
        addedLines.push(change.ln);
      }
    });
  });
  return addedLines;
};

export default getAddedLines;
