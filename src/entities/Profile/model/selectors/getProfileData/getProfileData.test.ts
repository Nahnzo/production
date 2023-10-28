import { StateScheme } from "app/providers/StoreProvider";
import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { getProfileData } from "./getProfileData";

describe("getProfileDataTest", () => {
  test("should return error", () => {
    const data = {
      firstName: "Алексей",
      lastName: "Догадаев",
      age: 25,
      currency: Currency.RUB,
      country: Country.Russia,
      city: "Sokol",
      username: "admin",
    };
    const state: DeepPartial<StateScheme> = {
      profile: {
        data,
      },
    };
    expect(getProfileData(state as StateScheme)).toEqual(data);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getProfileData(state as StateScheme)).toEqual(undefined);
  });
});
