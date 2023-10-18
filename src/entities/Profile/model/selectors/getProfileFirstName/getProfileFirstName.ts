import { StateScheme } from "app/providers/StoreProvider";

export const getProfileFirstName = (state: StateScheme) => state?.profile?.data?.firstName || "";
