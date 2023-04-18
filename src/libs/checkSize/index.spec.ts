import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkSize from ".";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("checkSize", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "b.json"],
      },
      gitlab: {
        mr: {
          description: "",
        },
      },
    });
  });

  it("should not call log function when it is a small MR", () => {
    checkSize();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function when it is a big MR with custom maxSize", () => {
    checkSize({ maxSize: 1 });
    expect(mockLogger).toHaveBeenCalledWith(
      "This MR contains 2 files (0 new, 2 modified). Consider splitting it into multiple MRs."
    );
  });

  it("should not call log function when it is a big MR with custom maxSize but skip checked", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "b.json"],
      },
      gitlab: {
        mr: {
          description: "[x] Skip big size check this time",
        },
      },
    });

    checkSize({
      maxSize: 1,
      enableSkip: true,
      skipMessage: "Skip big size check this time",
    });
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function when it is a big MR with custom maxSize and skip unchecked", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["a.txt", "b.json"],
      },
      gitlab: {
        mr: {
          description: "[ ] Skip big size check this time",
        },
      },
    });

    checkSize({
      maxSize: 1,
      enableSkip: true,
      skipMessage: "Skip big size check this time",
    });
    expect(mockLogger).toHaveBeenCalledWith(
      "This MR contains 2 files (0 new, 2 modified). Consider splitting it into multiple MRs. Otherwise toggle the danger check '[ ] Skip big size check this time' in the MR template"
    );
  });
});
