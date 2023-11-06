import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile, ValidateProfileError } from "../../types/profile";
import { getProfileForm } from "../../selectors/getProfileForm/getProfileForm";
import { validateProfileData } from "../validateProfileData/validateProfileData";

export const updateProfileData = createAsyncThunk<
  Profile,
  void,
  ThunkConfig<ValidateProfileError[]>
>("profile/updateProfileData", async (_, thunkApi) => {
  const { extra, rejectWithValue, getState } = thunkApi;
  const formData = getProfileForm(getState());
  try {
    const response = await extra.api.put<Profile>(`/profile/${formData?.id}`, formData);
    const errors = validateProfileData(formData);
    if (errors.length) {
      return rejectWithValue(errors);
    }
    return response.data;
  } catch (error) {
    console.log(error, "error");
    return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
  }
});
