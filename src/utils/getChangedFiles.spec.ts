import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import getChangedFiles from "./getChangedFiles";
import { getDanger } from "./getDangerModule";

vi.mock("./getDangerModule.ts", () => ({
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
    expect(getChangedFiles()).toEqual([...createdFiles, ...modifiedFiles]);
  });
});
