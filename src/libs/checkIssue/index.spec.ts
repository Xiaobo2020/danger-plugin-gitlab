import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkIssue from ".";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();

vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("checkIssue", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("should throw error when missing key", () => {
    it("no key input", () => {
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            title: "[NO-ISSUE] This is a test MR",
            description: "# ISSUE\n\nNO-ISSUE",
          },
        },
      });
      expect(() => checkIssue()).toThrowError(
        "[checkIssue]: Missing key (e.g. 'JIRA')."
      );
    });
    it("invalid key input", () => {
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            title: "[NO-ISSUE] This is a test MR",
            description: "# ISSUE\n\nNO-ISSUE",
          },
        },
      });
      expect(() => checkIssue({ key: "" })).toThrowError(
        "[checkIssue]: Missing key (e.g. 'JIRA')."
      );
    });
    it("empty key list input", () => {
      (getDanger as Mock).mockReturnValue({
        gitlab: {
          mr: {
            title: "[NO-ISSUE] This is a test MR",
            description: "# ISSUE\n\nNO-ISSUE",
          },
        },
      });
      expect(() => checkIssue({ key: [] })).toThrowError(
        "[checkIssue]: Missing key (e.g. 'JIRA')."
      );
    });
  });

  describe("title location", () => {
    describe("should not call log function", () => {
      it("'NO-ISSUE' exists", () => {
        (getDanger as Mock).mockReturnValue({
          gitlab: {
            mr: {
              title: "[NO-ISSUE] This is a test MR",
            },
          },
        });
        checkIssue({
          key: "JIRA",
          location: "title",
        });
        expect(mockLogger).not.toHaveBeenCalled();
      });

      it("'JIRA-001' exists", () => {
        (getDanger as Mock).mockReturnValue({
          gitlab: {
            mr: {
              title: "[JIRA-001] This is a test MR",
            },
          },
        });
        checkIssue({
          key: "JIRA",
          location: "title",
        });
        expect(mockLogger).not.toHaveBeenCalled();
      });
    });

    describe("should call log function", () => {
      it("no ISSUE ticket exists", () => {
        (getDanger as Mock).mockReturnValue({
          gitlab: {
            mr: {
              title: "This is a test MR",
            },
          },
        });
        checkIssue({
          key: "JIRA",
          location: "title",
        });
        expect(mockLogger).toHaveBeenCalledWith(
          "Please include a ticket (like `XXX-DDDD` or `NO-ISSUE` if there is no ticket) at the beginning of the MR title"
        );
      });

      it("no ISSUE ticket exists with multi keys", () => {
        (getDanger as Mock).mockReturnValue({
          gitlab: {
            mr: {
              title: "This is a test MR",
            },
          },
        });
        checkIssue({
          key: ["JIRA", "IDEV"],
          location: "title",
        });
        expect(mockLogger).toHaveBeenCalledWith(
          "Please include a ticket (like `XXX-DDDD` or `NO-ISSUE` if there is no ticket) at the beginning of the MR title"
        );
      });
    });
  });

  describe("description location", () => {
    describe("should not call log function", () => {
      it("'NO-ISSUE' exists", () => {
        (getDanger as Mock).mockReturnValue({
          gitlab: {
            mr: {
              description: "# Ticket\n\nNO-ISSUE",
            },
          },
        });
        checkIssue({
          key: "JIRA",
          location: "description",
        });
        expect(mockLogger).not.toHaveBeenCalled();
      });

      it("'JIRA-001' exists", () => {
        (getDanger as Mock).mockReturnValue({
          gitlab: {
            mr: {
              description: "# Ticket\n\nJIRA-001",
            },
          },
        });
        checkIssue({
          key: "JIRA",
          location: "description",
        });
        expect(mockLogger).not.toHaveBeenCalled();
      });
    });

    describe("should call log function", () => {
      it("no ISSUE ticket exists", () => {
        (getDanger as Mock).mockReturnValue({
          gitlab: {
            mr: {
              description: "# Ticket\n\n",
            },
          },
        });
        checkIssue({
          key: "JIRA",
          location: "description",
        });
        expect(mockLogger).toHaveBeenCalledWith(
          "Please include a ticket (like `XXX-DDDD` or `NO-ISSUE` if there is no ticket) at the beginning of the MR description"
        );
      });

      it("no ISSUE ticket exists with multi keys", () => {
        (getDanger as Mock).mockReturnValue({
          gitlab: {
            mr: {
              description: "# Ticket\n\n",
            },
          },
        });
        checkIssue({
          key: ["JIRA", "IDEV"],
          location: "description",
        });
        expect(mockLogger).toHaveBeenCalledWith(
          "Please include a ticket (like `XXX-DDDD` or `NO-ISSUE` if there is no ticket) at the beginning of the MR description"
        );
      });
    });
  });
});
