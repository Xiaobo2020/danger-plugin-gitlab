import { describe, it, expect, vi, beforeEach } from "vitest";
import getLogger from "../../utils/getLogger";

const mockFail = vi.fn();
const mockWarn = vi.fn();
const mockMessage = vi.fn();

vi.mock("../../utils/getDangerModule.ts", () => ({
  getFail: () => mockFail,
  getWarn: () => mockWarn,
  getMessage: () => mockMessage,
}));

describe("getLogger", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it('should return fail function if logType is "fail"', () => {
    expect(getLogger("fail")).toBe(mockFail);
  });

  it('should return message function if logType is "message"', () => {
    expect(getLogger("message")).toBe(mockMessage);
  });

  it('should return warn function if logType is "warn"', () => {
    expect(getLogger("warn")).toBe(mockWarn);
  });
});
