import { cn } from "../tw-merge";

describe("cn", () => {
  it("should merge two classes", () => {
    const result = cn("bg-red-500", "text-white");

    expect(result).toBe("bg-red-500 text-white");
  });
});
