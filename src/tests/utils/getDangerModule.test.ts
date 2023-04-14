import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  getDanger,
  getFail,
  getWarn,
  getMessage,
} from "../../utils/getDangerModule";

const mockDanger = { foo: "bar" };
const mockFail = vi.fn();
const mockWarn = vi.fn();
const mockMessage = vi.fn();

vi.stubGlobal("danger", mockDanger);
vi.stubGlobal("fail", mockFail);
vi.stubGlobal("warn", mockWarn);
vi.stubGlobal("message", mockMessage);

describe("getDangerModule", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  it("should return danger object", () => {
    expect(getDanger()).toBe(mockDanger);
  });
  it("should return fail function", () => {
    expect(getFail()).toBe(mockFail);
  });
  it("should return warn function", () => {
    expect(getWarn()).toBe(mockWarn);
  });
  it("should return message function", () => {
    expect(getMessage()).toBe(mockMessage);
  });
});
