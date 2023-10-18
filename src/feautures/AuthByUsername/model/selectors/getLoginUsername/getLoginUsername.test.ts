import { StateScheme } from "app/providers/StoreProvider";
import { getLoginUsername } from "./getLoginUsername";

describe("getLoginUsername", () => {
  test("should return true", () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        username: "123321",
      },
    };
    expect(getLoginUsername(state as StateScheme)).toEqual("123321");
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getLoginUsername(state as StateScheme)).toEqual("");
  });
});
