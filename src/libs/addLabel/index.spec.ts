import { beforeEach, describe, expect, it, Mock, vi } from "vitest";
import addLabel from ".";

import { getDanger, getChangedFiles } from "../../utils";

const mockAddLabels = vi.fn();

vi.mock("../../utils", async () => {
  const actualModule: typeof import("../../utils") = await vi.importActual(
    "../../utils"
  );
  return {
    ...actualModule,
    getChangedFiles: vi.fn(),
    getDanger: vi.fn(),
  };
});

describe("addLabel", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    const modifiedFiles = [
      "packages/server/package.json",
      "packages/webapp/package.json",
    ];
    (getDanger as Mock).mockReturnValue({
      git: {
        modified_files: modifiedFiles,
      },
      gitlab: {
        utils: {
          addLabels: mockAddLabels,
        },
      },
    });
    (getChangedFiles as Mock).mockReturnValue(modifiedFiles);
  });

  it("should call danger.gitlab.utils.addLabels when all matched", () => {
    const labels = [
      { match: /packages\/server\/.*/, name: "server" },
      { match: /packages\/webapp\/.*/, name: "webapp" },
    ];

    addLabel(labels);
    expect(mockAddLabels).toHaveBeenNthCalledWith(1, "server");
    expect(mockAddLabels).toHaveBeenNthCalledWith(2, "webapp");
  });

  it("should not call danger.gitlab.utils.addLabels when all not matched", () => {
    const labels = [
      { match: /packages\/aaa\/.*/, name: "aaa" },
      { match: /packages\/bbb\/.*/, name: "bbb" },
    ];

    addLabel(labels);
    expect(mockAddLabels).not.toHaveBeenCalled();
  });

  it("should call danger.gitlab.utils.addLabels when partial matched", () => {
    const labels = [
      { match: /packages\/aaa\/.*/, name: "aaa" },
      { match: /packages\/webapp\/.*/, name: "webapp" },
    ];

    addLabel(labels);
    expect(mockAddLabels).toHaveBeenNthCalledWith(1, "webapp");
  });
});
