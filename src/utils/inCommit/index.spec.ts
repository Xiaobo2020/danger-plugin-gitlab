import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import inCommit from ".";
import { getDanger } from "../getDangerModule";

vi.mock("../getDangerModule", () => ({
  getDanger: vi.fn(),
}));

describe("inCommit", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["packages/webapp/package.json"],
      },
    });
  });

  it("should return true when pattern is included in changed files got from getChangedFiles()", () => {
    const filename = "packages/webapp/package.json";
    expect(inCommit(filename)).toBe(true);
  });

  it("should return false when pattern is included in changed files got from getChangedFiles()", () => {
    const filename = "packages/server/package.json";
    expect(inCommit(filename)).toBe(false);
  });
});
