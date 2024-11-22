import {deleteCookie, setCookie} from "@/app/hooks/useCookie";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

type loginSate = {
  username: string | undefined;
  password: string | undefined;
};

export const login = createAsyncThunk(
  "LoginUser",
  async (data: loginSate, { rejectWithValue }) => {

    try {
      const res = await axios.post("/api/auth/login", {
        username: data.username,
        password: data.password,
      });
      // console.log("res",res.data);

      const isSuccess = res.data.success; // Adjust this based on your actual response structure

      // Use toast.promise based on the success/failure status
      toast.promise(
        Promise.resolve(res), // Resolve the promise with the Axios response
        {
          loading: "Loading",
          success: "Login Successfully",
          error: "Login Failed",
        },
      );

      return res.data;
    } catch (error: any) {
      // console.log("err",error?.response?.data?.message);
      toast.promise(Promise.reject(error), {
        loading: "Loading",
        success: "Login Successfully", // You may customize the success message
        error: error?.response?.data?.message,
      });
      return rejectWithValue(error);
    }
  },
);

type registerstate = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const Register = createAsyncThunk(
  "Register",
  async (data: registerstate, { rejectWithValue }) => {
    try {
      const res = await axios.post("/api/auth/register", {
        username: data.name,
        email: data.email,
        password: data.password,
      });

      toast.promise(
        Promise.resolve(res), // Resolve the promise with the Axios response
        {
          loading: "Loading",
          success: "Registered Successfully",
          error: "Register Failed",
        },
      );

      return res.data;
    } catch (error: any) {
      toast.promise(Promise.reject(error), {
        loading: "Loading",
        success: "Registered Successfully", // You may customize the success message
        error: error?.response?.data?.message,
      });

      return rejectWithValue(error);
    }
  },
);

interface AuthUserState {
  _id: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface authState {
  AuthLoading: boolean;
  AuthError: null | string;
  AuthUser: AuthUserState | null;
}

const initialState = {
  AuthLoading: false,
  AuthError: null,
  // @ts-ignore
  AuthUser:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("BookingUser") || "null")
      : null,
} as authState;

const AuthSlice = createSlice({
  name: "Auth",
  initialState,
  reducers: {
    LogOut: (state) => {
      state.AuthUser = null;
      localStorage.removeItem("BookingUser");
   deleteCookie("access_token")
      toast("Logged Out Successfully", {
        icon: "👏",
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.AuthLoading = true;
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.AuthLoading = false;
        state.AuthUser = action.payload.otherDetails;
        localStorage.setItem(
          "BookingUser",
          JSON.stringify(action.payload.otherDetails),
        );

        setCookie('access_token', action.payload?.tokenWithExpireDate?.accessToken, action.payload?.tokenWithExpireDate?.expires);
        state.AuthError = null;
      }),
      builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.AuthLoading = false;
        // console.log("action",action.payload.response.data.message);

        state.AuthError = action?.payload?.response?.data?.message || "something went wrong";
      });
  },
});

export const { LogOut } = AuthSlice.actions;
export default AuthSlice.reducer;
