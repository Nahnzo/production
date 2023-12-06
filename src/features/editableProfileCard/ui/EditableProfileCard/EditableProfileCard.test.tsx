import { screen } from "@testing-library/react";
import { componentRender } from "shared/config/tests/componentRender/componentRender";
import { Profile } from "entities/Profile";
import { Currency } from "entities/Currency";
import { Country } from "entities/Country";
import userEvent from "@testing-library/user-event";
import { profileReducer } from "../../model/slice/profileSlice";
import { EditableProfileCard } from "./EditableProfileCard";

const profile: Profile = {
  id: "1",
  firstName: "admin",
  lastName: "admin",
  age: 32,
  currency: Currency.EUR,
  country: Country.Russia,
  city: "Vologda",
  username: "admin123",
};

describe("features/EditableProfileCard", () => {
  test("Режим переключения рид онли", async () => {
    componentRender(<EditableProfileCard id="1" />, {
      initialState: {
        profile: {
          readonly: true,
          data: profile,
          form: profile,
        },
        user: {
          authData: { id: 1, username: "admin" },
        },
      },
      asyncReducers: {
        profile: profileReducer as any,
      },
    });
    await userEvent.click(screen.getByTestId("EditableProfileCardHeader.EditButton"));
    expect(screen.getByTestId("EditableProfileCardHeader.CancelButton")).toBeInTheDocument();
  });
});
