import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkAutomatedTest from ".";
import { getDanger } from "../../utils";

const mockLogger = vi.fn();

vi.mock("../../utils", async () => {
  const actualModule: typeof import("../../utils") = await vi.importActual(
    "../../utils"
  );
  return {
    ...actualModule,
    getLogger: () => mockLogger,
  };
});

vi.mock("../../utils/getDangerModule", async () => {
  const actualModule: typeof import("../../utils/getDangerModule") =
    await vi.importActual("../../utils/getDangerModule");
  return {
    ...actualModule,
    getDanger: vi.fn(),
  };
});

describe("checkAutomatedTest", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("should not call log function", () => {
    it("test file modified and enableCheck is false", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts", "src/demo.test.ts"],
        },
        gitlab: {
          mr: {
            description: "[ ] Automated tests added/updated",
          },
        },
      });

      checkAutomatedTest();
      expect(mockLogger).not.toHaveBeenCalled();
    });

    it("no test file modified and enableCheck is true (checked)", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: "[x] Automated tests added/updated",
          },
        },
      });

      checkAutomatedTest({ enableCheck: true });
      expect(mockLogger).not.toHaveBeenCalled();
    });
  });

  describe("should call log function", () => {
    it("no test file modified with enableCheck is false", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: "",
          },
        },
      });

      checkAutomatedTest();
      expect(mockLogger).toHaveBeenCalled();
    });

    it("no test file modified with enableCheck is false and custom log message (string type)", () => {
      const logMessage = "custom log message with string type";

      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: "",
          },
        },
      });

      checkAutomatedTest({ logMessage });
      expect(mockLogger).toHaveBeenCalledWith(logMessage);
    });

    it("no test file modified with enableCheck is false and custom log message (function type)", () => {
      const logMessage = () => "custom log message with function type";

      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: "",
          },
        },
      });

      checkAutomatedTest({ logMessage });
      expect(mockLogger).toHaveBeenCalledWith(logMessage());
    });

    it("no test file modified with enableCheck is true (unchecked)", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: "[ ] Automated tests added/updated",
          },
        },
      });

      checkAutomatedTest({ enableCheck: true });
      expect(mockLogger).toHaveBeenCalled();
    });
  });
});
