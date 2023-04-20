import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import checkManuallyTested from ".";
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

describe("checkManuallyTested", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  describe("should not call log function", () => {
    it("only test files modified with default source file match", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.test.ts"],
        },
        gitlab: {
          mr: {
            description: "",
          },
        },
      });

      checkManuallyTested();
      expect(mockLogger).not.toHaveBeenCalled();
    });

    it("only test files modified with custom source file match", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.spec.ts"],
        },
        gitlab: {
          mr: {
            description: "",
          },
        },
      });

      checkManuallyTested({
        sourceFileMatch: /src\/.*.(?<!spec.)(js|ts|jsx|tsx)$/,
      });
      expect(mockLogger).not.toHaveBeenCalled();
    });

    it("defualt check message in description is checked", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: "[x] Manually tested in a web browser",
          },
        },
      });

      checkManuallyTested();
      expect(mockLogger).not.toHaveBeenCalled();
    });

    it("custom check message in description is checked", () => {
      const checkMessage = "custom check message";
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: `[x] ${checkMessage}`,
          },
        },
      });

      checkManuallyTested({ checkMessage });
      expect(mockLogger).not.toHaveBeenCalled();
    });
  });

  describe("should call log function", () => {
    it("source files modified and default check message in description unchecked", () => {
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: "[ ] Manually tested in a web browser",
          },
        },
      });

      checkManuallyTested();
      expect(mockLogger).toHaveBeenCalled();
    });

    it("source files modified and custom check message in description unchecked", () => {
      const checkMessage = "custom check message";
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: `[ ] ${checkMessage}`,
          },
        },
      });

      checkManuallyTested({ checkMessage });
      expect(mockLogger).toHaveBeenCalled();
    });

    it("source files modified and custom check message in description unchecked with custom log message (string type)", () => {
      const checkMessage = "custom check message";
      const logMessage = "custom log message";
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: `[ ] ${checkMessage}`,
          },
        },
      });

      checkManuallyTested({ checkMessage, logMessage });
      expect(mockLogger).toHaveBeenCalledWith(logMessage);
    });

    it("source files modified and custom check message in description unchecked with custom log message (function type)", () => {
      const checkMessage = "custom check message";
      const logMessage = () =>
        `custom log message with checkMessage: ${checkMessage}`;
      (getDanger as Mock).mockReturnValue({
        git: {
          modified_files: ["src/demo.ts"],
        },
        gitlab: {
          mr: {
            description: `[ ] ${checkMessage}`,
          },
        },
      });

      checkManuallyTested({ checkMessage, logMessage });
      expect(mockLogger).toHaveBeenCalledWith(logMessage());
    });
  });
});
