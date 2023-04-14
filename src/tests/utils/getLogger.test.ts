import { describe, it, expect, vi } from "vitest";
import getLogger from "../../utils/getLogger";

const mockFail = vi.fn();
const mockWarn = vi.fn();
const mockMessage = vi.fn();

vi.stubGlobal("fail", mockFail);
vi.stubGlobal("warn", mockWarn);
vi.stubGlobal("message", mockMessage);

describe("getLogger", () => {
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
