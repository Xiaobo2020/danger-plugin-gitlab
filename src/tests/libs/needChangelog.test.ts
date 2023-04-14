import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import needChangelog from "../../libs/needChangelog";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("needChangelog", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should not call log function when changelog.md exists.", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt", "changelog.md"],
      },
      gitlab: {
        // @ts-ignore
        mr: {
          description: "",
        },
      },
    });
    needChangelog();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should not call log function when check message is checked", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt"],
      },
      gitlab: {
        // @ts-ignore
        mr: {
          description:
            "[x] This is a trival MR and no CHANGELOG changes required.",
        },
      },
    });
    needChangelog();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function when check message is not checked", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt"],
      },
      gitlab: {
        // @ts-ignore
        mr: {
          description:
            "[ ] This is a trival MR and no CHANGELOG changes required.",
        },
      },
    });
    needChangelog();
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function with custom log message", () => {
    (getDanger as Mock).mockReturnValue({
      // @ts-ignore
      git: {
        modified_files: ["a.txt"],
      },
      gitlab: {
        // @ts-ignore
        mr: {
          description: "",
        },
      },
    });
    const logMessage = "This is log message.";
    needChangelog({ logMessage });
    expect(mockLogger).toHaveBeenCalledWith(logMessage);
  });
});
