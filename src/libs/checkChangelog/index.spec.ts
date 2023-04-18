import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkChangelog from ".";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("checkChangelog", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should not call log function when changelog.md exists.", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "changelog.md"],
      },
      gitlab: {
        mr: {
          description: "",
        },
      },
    });
    checkChangelog();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should not call log function when custom log file exists.", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "CHANGELOG.md"],
      },
      gitlab: {
        mr: {
          description: "",
        },
      },
    });
    checkChangelog({ logFile: "CHANGELOG.md" });
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function when changelog.md does not exists and skip unchecked", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt"],
      },
      gitlab: {
        mr: {
          description: "[ ] Skip CHANGELOG check",
        },
      },
    });
    checkChangelog({ enableSkip: true });
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should not call log function when changelog.md does not exists but skip checked", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt"],
      },
      gitlab: {
        mr: {
          description: "[x] Skip CHANGELOG check",
        },
      },
    });
    checkChangelog({ enableSkip: true });
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function with custom log message", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt"],
      },
      gitlab: {
        mr: {
          description: "",
        },
      },
    });
    const logMessage = "This is log message.";
    checkChangelog({ logMessage });
    expect(mockLogger).toHaveBeenCalledWith(logMessage);
  });
});
