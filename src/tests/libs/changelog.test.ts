import { describe, it, beforeEach, expect, vi } from "vitest";
import changelog from "../../libs/changelog";

const mockLog = vi.fn();
vi.mock("../../utils/getLog", () => ({
  default: () => mockLog,
}));

describe("changelog", () => {
  beforeEach(() => {
    // @ts-ignore
    global.danger = undefined;
  });

  it("should not call log function when changelog.md exists.", () => {
    global.danger = {
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
    };
    changelog();
    expect(mockLog).not.toHaveBeenCalled();
  });

  it("should not call log function when check message is checked", () => {
    global.danger = {
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
    };
    changelog();
    expect(mockLog).not.toHaveBeenCalled();
  });

  it("should call log function when check message is not checked", () => {
    global.danger = {
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
    };
    changelog();
    expect(mockLog).toHaveBeenCalled();
  });
});
