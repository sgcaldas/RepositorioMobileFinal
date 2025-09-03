import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type FavState = { items: number[] }; // ids favoritos
const initialState: FavState = { items: [] };

const favSlice = createSlice({
  name: "fav",
  initialState,
  reducers: {
    toggleFav(state, action: PayloadAction<number>) {
      const id = action.payload;
      const i = state.items.indexOf(id);
      if (i >= 0) state.items.splice(i, 1);
      else state.items.push(id);
    },
  },
});

export const { toggleFav } = favSlice.actions;

export const store = configureStore({
  reducer: { fav: favSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
