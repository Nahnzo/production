import { Profile } from "entities/Profile";
import { ValidateProfileError } from "../../consts/const";

export const validateProfileData = (profile?: Profile) => {
  if (!profile) {
    return [ValidateProfileError.NO_DATA];
  }
  const { age, country, firstName, lastName } = profile;
  const errors: ValidateProfileError[] = [];
  if (!firstName || !lastName) {
    errors.push(ValidateProfileError.INCORRECT_USER_DATA);
  }
  if (!age || !Number.isInteger(age)) {
    errors.push(ValidateProfileError.INCORRECT_AGE);
  }
  if (!country) {
    errors.push(ValidateProfileError.INCORRECT_COUNTRY);
  }
  return errors;
};
