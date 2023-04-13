import { describe, it, beforeEach, expect, vi } from "vitest";
import getMessageLog from "./getMessageLog";

const mockFail = vi.fn();
const mockWarn = vi.fn();
const mockMessage = vi.fn();

describe("getMessageLog", () => {
  beforeEach(() => {
    global.message = mockMessage;
    global.warn = mockWarn;
    global.fail = mockFail;
  });

  it('should return fail function if logType is "fail"', () => {
    expect(getMessageLog("fail")).toBe(mockFail);
  });

  it('should return message function if logType is "message"', () => {
    expect(getMessageLog("message")).toBe(mockMessage);
  });

  it('should return warn function if logType is "warn"', () => {
    expect(getMessageLog("warn")).toBe(mockWarn);
  });

  it("should return warn function if logType is empty", () => {
    expect(getMessageLog()).toBe(mockWarn);
  });
});

export {};
