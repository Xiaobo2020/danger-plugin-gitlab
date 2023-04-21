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

  describe("should not call log function", () => {
    it("is a small MR with default maxSize", () => {
      checkSize();
      expect(mockLogger).not.toHaveBeenCalled();
    });

    it("is a big MR with custom maxSize but skip checked", () => {
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
  });

  describe("should call log function", () => {
    it("is a big MR with custom maxSize", () => {
      checkSize({ maxSize: 1 });
      expect(mockLogger).toHaveBeenCalledWith(
        "This MR contains 2 files (0 new, 2 modified). Consider splitting it into multiple MRs."
      );
    });

    it("is a big MR with custom maxSize and skip unchecked", () => {
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

    it("is a big MR with custom maxSize and custom log message (string type)", () => {
      const logMessage = "custom log message with string type";
      checkSize({ maxSize: 1, logMessage });
      expect(mockLogger).toHaveBeenCalledWith(logMessage);
    });

    it("is a big MR with custom maxSize and custom log message (function type)", () => {
      const logMessage = () => "custom log message with function type";
      checkSize({ maxSize: 1, logMessage });
      expect(mockLogger).toHaveBeenCalledWith(logMessage());
    });
  });
});
