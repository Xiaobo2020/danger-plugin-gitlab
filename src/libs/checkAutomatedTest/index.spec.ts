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

  it("should call log function with no test file modified and enableChecked is false", () => {
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

  it("should not call log function with test file modified and enableChecked is false", () => {
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: ["src/demo.ts", "src/demo.test.ts"],
      },
      gitlab: {
        mr: {
          description: "",
        },
      },
    });

    checkAutomatedTest();
    expect(mockLogger).not.toHaveBeenCalled();
  });

  it("should call log function with no test file modified and enableChecked is true (unchecked)", () => {
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

  it("should not call log function with no test file modified and enableChecked is true (checked)", () => {
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
