import { StateScheme } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileReadonly } from "./getProfileReadonly";

describe("getProfileReadonlyTest", () => {
  test("should return error", () => {
    const state: DeepPartial<StateScheme> = {
      profile: {
        readonly: true,
      },
    };
    expect(getProfileReadonly(state as StateScheme)).toEqual(true);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getProfileReadonly(state as StateScheme)).toEqual(undefined);
  });
});
