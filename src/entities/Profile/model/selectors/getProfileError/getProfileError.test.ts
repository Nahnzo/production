import { StateScheme } from "app/providers/StoreProvider";
import { getProfileError } from "./getProfileError";

describe("getProfileErrorTest", () => {
  test("should return error", () => {
    const state: DeepPartial<StateScheme> = {
      profile: {
        error: "123",
      },
    };
    expect(getProfileError(state as StateScheme)).toEqual("123");
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getProfileError(state as StateScheme)).toEqual(undefined);
  });
});
