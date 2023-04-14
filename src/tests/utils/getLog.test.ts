import { describe, it, expect, vi } from "vitest";
import getLog from "../../utils/getLog";

const mockFail = vi.fn();
const mockWarn = vi.fn();
const mockMessage = vi.fn();

vi.stubGlobal("fail", mockFail);
vi.stubGlobal("warn", mockWarn);
vi.stubGlobal("message", mockMessage);

describe("getLog", () => {
  it('should return fail function if logType is "fail"', () => {
    expect(getLog("fail")).toBe(mockFail);
  });

  it('should return message function if logType is "message"', () => {
    expect(getLog("message")).toBe(mockMessage);
  });

  it('should return warn function if logType is "warn"', () => {
    expect(getLog("warn")).toBe(mockWarn);
  });
});
