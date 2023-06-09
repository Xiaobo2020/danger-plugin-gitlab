import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import isExternal from ".";
import { getDanger } from "../getDangerModule";

vi.mock("../getDangerModule", () => ({
  getDanger: vi.fn(),
}));

describe("isExternal", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should return false when the project is same", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          source_project_id: 1,
          target_project_id: 1,
        },
      },
    });
    expect(isExternal()).toEqual(false);
  });

  it("should return true when the project is different", () => {
    (getDanger as Mock).mockReturnValue({
      gitlab: {
        mr: {
          source_project_id: 1,
          target_project_id: 2,
        },
      },
    });
    expect(isExternal()).toEqual(true);
  });
});
