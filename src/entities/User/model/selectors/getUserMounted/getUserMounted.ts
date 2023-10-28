import { StateScheme } from "app/providers/StoreProvider";

export const getUserMounted = (state: StateScheme) => state.user._mounted;
