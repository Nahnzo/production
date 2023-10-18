import { StateScheme } from "app/providers/StoreProvider";
import { getLoginPassword } from "./getLoginPassword";

describe("getLoginPassword", () => {
  test("should return value", () => {
    const state: DeepPartial<StateScheme> = {
      loginForm: {
        password: "123321",
      },
    };
    expect(getLoginPassword(state as StateScheme)).toEqual("123321");
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getLoginPassword(state as StateScheme)).toEqual("");
  });
});
