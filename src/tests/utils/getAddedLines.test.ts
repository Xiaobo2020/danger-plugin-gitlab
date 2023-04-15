import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import getAddedLines from "../../utils/getAddedLines";
import { getDanger } from "../../utils/getDangerModule";

vi.mock("../../utils/getDangerModule", () => ({
  getDanger: vi.fn(),
}));

const mockStructuredDiffForFile = vi.fn();

describe("getLogger", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("should return added lines correctly", async () => {
    mockStructuredDiffForFile.mockReturnValue(
      Promise.resolve({
        chunks: [
          {
            changes: [
              {
                type: "del",
                ln: 5,
              },
              {
                type: "add",
                ln: 5,
              },
            ],
          },
          {
            changes: [
              {
                type: "add",
                ln: 15,
              },
            ],
          },
        ],
      })
    );
    (getDanger as Mock).mockReturnValue({
      git: {
        structuredDiffForFile: mockStructuredDiffForFile,
      },
    });

    const addedLines = await getAddedLines("package.json");

    expect(addedLines).toEqual([5, 15]);
  });
});
