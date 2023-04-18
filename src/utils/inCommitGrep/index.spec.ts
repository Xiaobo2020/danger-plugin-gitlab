import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import inCommitGrep from ".";
import getChangedFiles from "../getChangedFiles";

vi.mock("../getChangedFiles", () => ({
  default: vi.fn(),
}));

describe("inCommitGrep", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return true when pattern is included in changed files", () => {
    const result = inCommitGrep(/packages\/webapp\/.*/, [
      "packages/webapp/package.json",
    ]);
    expect(result).toBe(true);
  });

  it("should return false when pattern is excluded in changed files", () => {
    const result = inCommitGrep(/packages\/webapp\/.*/, [
      "packages/server/package.json",
    ]);
    expect(result).toBe(false);
  });

  it("should return true when pattern is included in changed files got from getChangedFiles()", () => {
    (getChangedFiles as Mock).mockReturnValue(["packages/webapp/package.json"]);

    const result = inCommitGrep(/packages\/webapp\/.*/);

    expect(result).toBe(true);
  });

  it("should return false when pattern is included in changed files got from getChangedFiles()", () => {
    (getChangedFiles as Mock).mockReturnValue(["packages/server/package.json"]);

    const result = inCommitGrep(/packages\/webapp\/.*/);

    expect(result).toBe(false);
  });
});
