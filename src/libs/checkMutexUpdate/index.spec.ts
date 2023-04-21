import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkMutexUpdate from ".";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();

vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("checkMutexUpdate", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("should not call log function", () => {
    it("no mutex item and disable skip", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: [
            "packages/server/package.json",
            "packages/webapp/package.json",
          ],
        },
        gitlab: {
          mr: {
            description: "[ ] Skip mutex update check",
          },
        },
      });
      checkMutexUpdate();
      expect(mockLogger).not.toHaveBeenCalled();
    });

    it("no mutex item and disable skip", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: [
            "packages/server/package.json",
            "packages/webapp/package.json",
          ],
        },
        gitlab: {
          mr: {
            description: "[ ] Skip mutex update check",
          },
        },
      });
      checkMutexUpdate({
        mutexItems: [
          { match: /packages\/aaa\/.*/, name: "aaa" },
          { match: /packages\/bbb\/.*/, name: "bbb" },
        ],
      });
      expect(mockLogger).not.toHaveBeenCalled();
    });

    it("no mutex item and enable skip", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: [
            "packages/server/package.json",
            "packages/webapp/package.json",
          ],
        },
        gitlab: {
          mr: {
            description: "[x] Skip mutex update check",
          },
        },
      });
      checkMutexUpdate({ enableSkip: true });
      expect(mockLogger).not.toHaveBeenCalled();
    });
  });

  describe("should call log function", () => {
    it("mutex items exist", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: [
            "packages/server/package.json",
            "packages/webapp/package.json",
          ],
        },
        gitlab: {
          mr: {
            description: "[ ] Skip mutex update check",
          },
        },
      });
      checkMutexUpdate({
        mutexItems: [
          { match: /packages\/server\/.*/, name: "server" },
          { match: /packages\/webapp\/.*/, name: "webapp" },
        ],
      });
      expect(mockLogger).toHaveBeenCalledWith(
        "The MR contains mutex code updates (`server` & `webapp`). Try to split into multi MRs."
      );
    });

    it("mutex items exist with custom log message (string type)", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: [
            "packages/server/package.json",
            "packages/webapp/package.json",
          ],
        },
        gitlab: {
          mr: {
            description: "[ ] Skip mutex update check",
          },
        },
      });
      checkMutexUpdate({
        logMessage: "custom log message",
        mutexItems: [
          { match: /packages\/server\/.*/, name: "server" },
          { match: /packages\/webapp\/.*/, name: "webapp" },
        ],
      });
      expect(mockLogger).toHaveBeenCalledWith("custom log message");
    });

    it("mutex items exist with custom log message (function type)", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: [
            "packages/server/package.json",
            "packages/webapp/package.json",
          ],
        },
        gitlab: {
          mr: {
            description: "[ ] Skip mutex update check",
          },
        },
      });
      checkMutexUpdate({
        logMessage: () => "custom log message",
        mutexItems: [
          { match: /packages\/server\/.*/, name: "server" },
          { match: /packages\/webapp\/.*/, name: "webapp" },
        ],
      });
      expect(mockLogger).toHaveBeenCalledWith("custom log message");
    });

    it("mutex items exist and enable skip", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: [
            "packages/server/package.json",
            "packages/webapp/package.json",
          ],
        },
        gitlab: {
          mr: {
            description: "[ ] Skip mutex update check",
          },
        },
      });
      checkMutexUpdate({
        enableSkip: true,
        mutexItems: [
          { match: /packages\/server\/.*/, name: "server" },
          { match: /packages\/webapp\/.*/, name: "webapp" },
        ],
      });
      expect(mockLogger).toHaveBeenCalledWith(
        "The MR contains mutex code updates (`server` & `webapp`). Try to split into multi MRs. If you are confident in your change then check the `Skip mutex update check` in the MR description"
      );
    });
    it("mutex items exist and enable skip with custom skip message", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: [
            "packages/server/package.json",
            "packages/webapp/package.json",
          ],
        },
        gitlab: {
          mr: {
            description: "[ ] custom skip message",
          },
        },
      });
      checkMutexUpdate({
        enableSkip: true,
        skipMessage: "custom skip message",
        mutexItems: [
          { match: /packages\/server\/.*/, name: "server" },
          { match: /packages\/webapp\/.*/, name: "webapp" },
        ],
      });
      expect(mockLogger).toHaveBeenCalledWith(
        "The MR contains mutex code updates (`server` & `webapp`). Try to split into multi MRs. If you are confident in your change then check the `custom skip message` in the MR description"
      );
    });
  });
});
