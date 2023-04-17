import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  getDanger,
  getFail,
  getMessage,
  getWarn,
  getMarkdown,
} from "../../utils/getDangerModule";

const mockDanger = { foo: "bar" };
const mockFail = vi.fn();
const mockWarn = vi.fn();
const mockMessage = vi.fn();
const mockMarkdown = vi.fn();

vi.stubGlobal("danger", mockDanger);
vi.stubGlobal("fail", mockFail);
vi.stubGlobal("warn", mockWarn);
vi.stubGlobal("message", mockMessage);
vi.stubGlobal("markdown", mockMarkdown);

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
  it("should return markdown function", () => {
    expect(getMarkdown()).toBe(mockMarkdown);
  });
});
