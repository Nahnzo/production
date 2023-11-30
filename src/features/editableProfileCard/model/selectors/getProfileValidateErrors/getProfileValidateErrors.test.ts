import { StateScheme } from "app/providers/StoreProvider";
import { getProfileValidateErrors } from "./getProfileValidateErrors";
import { ValidateProfileError } from "../../types/editableProfileCardSchema";

describe("getProfileValidateErrorsTest", () => {
  test("should return error", () => {
    const state: DeepPartial<StateScheme> = {
      profile: {
        validateErrors: [ValidateProfileError.SERVER_ERROR, ValidateProfileError.INCORRECT_AGE],
      },
    };
    expect(getProfileValidateErrors(state as StateScheme)).toEqual([
      ValidateProfileError.SERVER_ERROR,
      ValidateProfileError.INCORRECT_AGE,
    ]);
  });
  test("should work with empty state", () => {
    const state: DeepPartial<StateScheme> = {};
    expect(getProfileValidateErrors(state as StateScheme)).toEqual(undefined);
  });
});
