import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkDescription from ".";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("checkDescription", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call log function when description is undefined", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          description: undefined,
        },
      },
    });
    checkDescription();
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function when length of description is less than default min length", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          description: "foo",
        },
      },
    });
    checkDescription();
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function when length of description is less than default min length exclude mention", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          description: "foo @sean",
        },
      },
    });
    checkDescription();
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function when length of description is less than custom min length", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          description: "foo bar",
        },
      },
    });
    checkDescription({ minLength: 10 });
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function when custom min length is NaN", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          description: "foo bar",
        },
      },
    });
    checkDescription({ minLength: NaN });
    expect(mockLogger).toHaveBeenCalled();
  });

  it("should call log function with custom log message", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          description: "foo",
        },
      },
    });
    const logMessage = "This is log message.";
    checkDescription({ logMessage });
    expect(mockLogger).toHaveBeenCalledWith(logMessage);
  });
});
