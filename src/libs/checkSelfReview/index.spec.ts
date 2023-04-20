import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkSelfReview from ".";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();

vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("checkSelfReview", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("should not call log function", () => {
    it("default check message in description is checked", () => {
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            description: "[x] Code has been reviewed by the author",
          },
        },
      });
      checkSelfReview();
      expect(mockLogger).not.toHaveBeenCalled();
    });

    it("custom check message in description is checked", () => {
      const checkMessage = "custom check message";
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            description: `[x] ${checkMessage}`,
          },
        },
      });
      checkSelfReview({ checkMessage });
      expect(mockLogger).not.toHaveBeenCalled();
    });
  });

  describe("should call log function", () => {
    it("default check message in description is unchecked", () => {
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            description: "Code has been reviewed by the author",
          },
        },
      });
      checkSelfReview();
      expect(mockLogger).toHaveBeenCalled();
    });

    it("custom check message in description is unchecked", () => {
      const checkMessage = "custom check message";
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            description: `[ ] ${checkMessage}`,
          },
        },
      });
      checkSelfReview({ checkMessage });
      expect(mockLogger).toHaveBeenCalled();
    });

    it("custom check message in description is unchecked with custom log message (string type)", () => {
      const checkMessage = "custom check message";
      const logMessage = "custom log message";
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            description: `[ ] ${checkMessage}`,
          },
        },
      });
      checkSelfReview({ checkMessage, logMessage });
      expect(mockLogger).toHaveBeenCalledWith(logMessage);
    });

    it("custom check message in description is unchecked with custom log message (function type)", () => {
      const checkMessage = "custom check message";
      const logMessage = () => `custom log message with ${checkMessage}`;
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            description: `[ ] ${checkMessage}`,
          },
        },
      });
      checkSelfReview({ checkMessage, logMessage });
      expect(mockLogger).toHaveBeenCalledWith(logMessage());
    });
  });
});
