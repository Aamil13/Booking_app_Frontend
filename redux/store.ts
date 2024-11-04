import { configureStore } from "@reduxjs/toolkit";
import HotelSlice from "./Slice/hotelSlice";
import authSlice from "./Slice/authSlice";
export const store = configureStore({
  reducer: {
    hotel: HotelSlice,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
