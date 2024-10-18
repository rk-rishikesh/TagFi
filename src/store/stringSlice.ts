import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CategoryState =
  | "cat"
  | "banana"
  | "plant"
  | "automobile"
  | "skin"
  | "garbage";

interface CategorySliceState {
  category: CategoryState;
}

const initialState: CategorySliceState = {
  category: "cat",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<CategoryState>) {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
