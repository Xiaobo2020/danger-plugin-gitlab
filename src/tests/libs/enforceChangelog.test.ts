import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import enforceChangelog from "../../libs/enforceChangelog";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("enforceChangelog", () => {
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
    enforceChangelog();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should not call log function when check message is checked", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt"],
      },
      gitlab: {
        mr: {
          description:
            "[x] This is a trival MR and no CHANGELOG changes required.",
        },
      },
    });
    enforceChangelog();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function when check message is not checked", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt"],
      },
      gitlab: {
        mr: {
          description:
            "[ ] This is a trival MR and no CHANGELOG changes required.",
        },
      },
    });
    enforceChangelog();
    expect(mockLogger).toHaveBeenCalled();
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
    enforceChangelog({ logMessage });
    expect(mockLogger).toHaveBeenCalledWith(logMessage);
  });
});