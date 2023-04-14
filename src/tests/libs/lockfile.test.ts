import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import lockfile from "../../libs/lockfile";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("lockfile", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should not call log function when no package.json modified", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt"],
      },
    });
    lockfile();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should not call log function when package.json and yarn.lock both modified", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt", "package.json", "yarn.lock"],
      },
    });
    lockfile({ lockfilename: "yarn.lock" });
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should not call log function when package.json and package-lock.json both modified", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt", "package.json", "package-lock.json"],
      },
    });
    lockfile();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function when only package.json modified", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt", "package.json"],
      },
    });
    lockfile();
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function with custom log message", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt", "package.json"],
      },
    });
    const logMessage = "This is log message.";
    lockfile({ logMessage });
    expect(mockLogger).toHaveBeenCalledWith(logMessage);
  });
});
