import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import detailedDescription from "../../libs/detailedDescription";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();
vi.mock("../../utils", () => ({
  getLogger: () => mockLogger,
  getDanger: vi.fn(),
}));

describe("detailedDescription", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call log function when length of description is less than default min length", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          description: "foo",
        },
      },
    });
    detailedDescription();
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
    detailedDescription();
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
    detailedDescription({ minLength: 10 });
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
    detailedDescription({ logMessage });
    expect(mockLogger).toHaveBeenCalledWith(logMessage);
  });
});
