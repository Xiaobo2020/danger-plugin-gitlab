import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import getCommitFiles from "../../utils/getCommitFiles";
import { getDanger } from "../../utils/getDangerModule";

vi.mock("../../utils/getDangerModule.ts", () => ({
  getDanger: vi.fn(),
}));

describe("getCommitFiles", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return fail function if logType is "fail"', () => {
    const modifiedFiles = ["package.json"];
    const createdFiles = ["package.json"];
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: modifiedFiles,
        created_files: createdFiles,
      },
    });
    expect(getCommitFiles()).toEqual([...createdFiles, ...modifiedFiles]);
  });
});
