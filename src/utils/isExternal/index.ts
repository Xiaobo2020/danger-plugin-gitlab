import { getDanger } from "../../utils";

const isExternal = () => {
  const {
    gitlab: {
      mr: {
        source_project_id: sourceProjectId,
        target_project_id: targetProjectId,
      },
    },
  } = getDanger();

  return sourceProjectId !== targetProjectId;
};

export default isExternal;
