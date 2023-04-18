import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import inCommitGrep from ".";
import { getDanger } from "../getDangerModule";

vi.mock("../getDangerModule", () => ({
  getDanger: vi.fn(),
}));

describe("inCommitGrep", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["packages/webapp/package.json"],
      },
    });
  });

  it("should return true when pattern is included in changed files got from getChangedFiles()", () => {
    const pattern = /packages\/webapp\/.*/;
    expect(inCommitGrep(pattern)).toBe(true);
  });

  it("should return false when pattern is included in changed files got from getChangedFiles()", () => {
    const pattern = /packages\/server\/.*/;
    expect(inCommitGrep(pattern)).toBe(false);
  });
});
