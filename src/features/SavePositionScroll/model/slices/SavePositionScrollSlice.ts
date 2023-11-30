import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SavePositionScrollSchema } from "../types/SavePositionScrollSchema";

const initialState: SavePositionScrollSchema = {
  scroll: {},
};

const savePositionScrollSlice = createSlice({
  name: "SavePositionScrollSchema",
  initialState,
  reducers: {
    setScrollPosition: (state, { payload }: PayloadAction<{ path: string; position: number }>) => {
      state.scroll[payload.path] = payload.position;
    },
  },
});

export const { actions: savePositionScrollActions } = savePositionScrollSlice;
export const { reducer: savePositionScrollReducer } = savePositionScrollSlice;
