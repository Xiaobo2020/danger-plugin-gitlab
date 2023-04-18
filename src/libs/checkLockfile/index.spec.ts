import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkLockfile from ".";
import { getAddedLines, getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
  getAddedLines: vi.fn(),
}));

vi.mock("node:fs", () => ({
  readFileSync: vi.fn(),
}));

describe("lockfile", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should not call log function when no package.json modified", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt"],
      },
    });
    checkLockfile();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should not call log function when package.json and package-lock.json both modified", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "package.json", "package-lock.json"],
      },
    });
    checkLockfile();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should not call log function when package.json and yarn.lock both modified", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "package.json", "yarn.lock"],
      },
    });
    checkLockfile({ lockfile: "yarn.lock" });
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function when only package-lock.json modified", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "package-lock.json"],
      },
    });
    checkLockfile();
    expect(mockLogger).toHaveBeenCalledWith(
      "Lockfile (package-lock.json) has been updated, but no dependencies (package.json) have changed."
    );
  });

  it("should not call log function when only package.json modified but no dependencies changed", async () => {
    (readFileSync as Mock).mockReturnValue(`{
  "scripts": {
    "test": "echo 'test'"
  },
  "dependencies": {
    "foo": "0.0.1"
  },
  "devDependencies": {
    "bar": "0.0.2"
  }
}`);

    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "package.json"],
      },
    });

    (getAddedLines as Mock).mockReturnValue([3]);

    await checkLockfile();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function when only package.json modified", async () => {
    (readFileSync as Mock).mockReturnValue(`{
  "dependencies": {
    "foo": "0.0.1"
  },
  "devDependencies": {
    "bar": "0.0.2"
  }
}`);

    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "package.json"],
      },
    });

    (getAddedLines as Mock).mockReturnValue([3, 6]);

    await checkLockfile();
    expect(mockLogger).toHaveBeenCalledWith(
      "Dependencies (package.json) may have changed, but lockfile (package-lock.json) has not been updated."
    );
  });

  it("should call log function when only package.json modified with custom path", async () => {
    (readFileSync as Mock).mockReturnValue(`{
  "dependencies": {
    "foo": "0.0.1"
  },
  "devDependencies": {
    "bar": "0.0.2"
  }
}`);

    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "packages/server/package.json"],
      },
    });

    (getAddedLines as Mock).mockReturnValue([3, 6]);

    await checkLockfile({ path: "packages/server/" });
    expect(mockLogger).toHaveBeenCalledWith(
      "Dependencies (packages/server/package.json) may have changed, but lockfile (packages/server/package-lock.json) has not been updated."
    );
  });

  it("should call log function when only package-lock.json modified with custom path", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "packages/server/package-lock.json"],
      },
    });
    checkLockfile({ path: "packages/server/" });
    expect(mockLogger).toHaveBeenCalledWith(
      "Lockfile (packages/server/package-lock.json) has been updated, but no dependencies (packages/server/package.json) have changed."
    );
  });
});