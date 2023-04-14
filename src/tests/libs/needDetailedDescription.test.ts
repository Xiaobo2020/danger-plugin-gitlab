import { describe, it, expect, vi, Mock, beforeEach } from "vitest";
import needDetailedDescription from "../../libs/needDetailedDescription";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("needDetailedDescription", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call log function when length of description is less than default min length", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        // @ts-ignore
        mr: {
          description: "foo",
        },
      },
    });
    needDetailedDescription();
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function when length of description is less than default min length exclude mention", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        // @ts-ignore
        mr: {
          description: "foo @sean",
        },
      },
    });
    needDetailedDescription();
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function when length of description is less than custom min length", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        // @ts-ignore
        mr: {
          description: "foo bar",
        },
      },
    });
    needDetailedDescription({ minLength: 10 });
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function with custom log message", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        // @ts-ignore
        mr: {
          description: "foo",
        },
      },
    });
    const logMessage = "This is log message.";
    needDetailedDescription({ logMessage });
    expect(mockLogger).toHaveBeenCalledWith(logMessage);
  });
});
