import { StateScheme } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileIsLoading } from "./getProfileIsLoading";

describe("getProfileIsLoadingTest", () => {
  test("should return error", () => {
    const state: DeepPartial<StateScheme> = {
      profile: {
        isLoading: true,
      },
    };
    expect(getProfileIsLoading(state as StateScheme)).toEqual(true);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getProfileIsLoading(state as StateScheme)).toEqual(undefined);
  });
});
