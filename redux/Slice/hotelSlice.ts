import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export const getCityCount = createAsyncThunk(
  "getcityCount",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "/api/hotel/gethotelsccount?cities=delhi,mumbai,hyderabad,lucknow,kashmir,manali",
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getHotelType = createAsyncThunk(
  "gethoteltype",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/api/hotel/gethotelType");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const HomeGuest = createAsyncThunk(
  "gethomeGuest",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "/api/hotel/getallhotels?featured=true&limit=7&min=100&max=501",
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

type searchquery = {
  destination?: string | null;
  adult?: string | null;
  children?: string | null;
  room?: string | null;
  minprice?: string | null;
  maxprice?: string | null;
  page: number;
  type?: string | null;
};

export const searchResult = createAsyncThunk(
  "SearchResults",
  async (data: searchquery, { rejectWithValue }) => {
    try {
      // console.log("datasearch",data.destination);

      const res = await axios.get(
        `/api/hotel/getallhotels?city=${data.destination?.toLowerCase()}&min=${data.minprice ? data.minprice : ""}&max=${data.maxprice ? data.maxprice : ""}&page=${data.page ? data.page : 1}&limit=5 `,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const searchTypeResult = createAsyncThunk(
  "SearchTypeResults",
  async (data: searchquery, { rejectWithValue }) => {
    try {
      // console.log("datasearch",data.destination);

      const res = await axios.get(
        `/api/hotel/getallhotels?type=${data.type}&min=${data.minprice ? data.minprice : ""}&max=${data.maxprice ? data.maxprice : ""}&page=${data.page ? data.page : 1}&limit=5 `,
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const GetsingleHotel = createAsyncThunk(
  "getSingleHotel",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/hotel/gethotel/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const getHotelRoom = createAsyncThunk(
  "hotelRoom",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`/api/hotel/room/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const reserveRoom = createAsyncThunk(
  "ReserveHotelRoom",
  async (id: string, { rejectWithValue }) => {},
);

////// below is slice part //////

interface citydataState {
  cityCount: Array<number>;
}

interface HoteltypedataState {
  type: string;
  count: number;
}

interface GuestTypeDataStateHotel {
  _id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: Array<string> | [];
  title: string;
  desc: string;
  rooms: Array<number> | [];
  cheapestPrice: number;
  featured: boolean;
  __v: number;
}

interface GuestTypeDataState {
  hotels: GuestTypeDataStateHotel[];
  count: string;
}

interface searchTypeDataHotels {
  _id: string;
  name: string;
  type: string;
  city: string;
  address: string;
  distance: string;
  photos: Array<string> | [];
  title: string;
  desc: string;
  rooms: Array<number> | [];
  cheapestPrice: number;
  featured: boolean;
  __v: number;
}

interface searchTypeDataState {
  hotels: searchTypeDataHotels[];
  count: string;
}

interface HotelState {
  cityloading: boolean;
  cityerror: string | null;
  citydata: citydataState | Array<string>;
  HotelTypeLoading: boolean;
  HotelTypeerror: string | null;
  HotelTypedata: HoteltypedataState | Array<{}>;
  guestTypeLoading: boolean;
  guestTypeErr: string | null;
  guestTypeData: GuestTypeDataState;
  searchTypeLoading: boolean;
  searchTypeErr: string | null;
  searchTypeData: searchTypeDataState;
}

const initialState = {
  cityloading: false,
  cityerror: null,
  citydata: [],
  HotelTypeLoading: false,
  HotelTypeerror: null,
  HotelTypedata: [],
  guestTypeLoading: false,
  guestTypeErr: null,
  guestTypeData: { hotels: [], count: "" },
  searchTypeLoading: true,
  searchTypeErr: null,
  searchTypeData: { hotels: [], count: "" },
} as HotelState;

const HotelSlice = createSlice({
  name: "HotelSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCityCount.pending, (state) => {
      state.cityloading = true;
    }),
      builder.addCase(
        getCityCount.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.cityloading = false;
          state.citydata = action.payload;
        },
      ),
      builder.addCase(
        getCityCount.rejected,
        (state, action: PayloadAction<any>) => {
          state.cityloading = false;
          state.cityerror = action.payload;
        },
      );
    builder.addCase(getHotelType.pending, (state) => {
      state.HotelTypeLoading = true;
    }),
      builder.addCase(
        getHotelType.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.HotelTypeLoading = false;
          state.HotelTypedata = action.payload;
        },
      ),
      builder.addCase(
        getHotelType.rejected,
        (state, action: PayloadAction<any>) => {
          // console.log("rr",action.payload.response.data);

          state.HotelTypeLoading = false;
          state.HotelTypeerror = action.payload.response.data;
        },
      ),
      builder.addCase(HomeGuest.pending, (state) => {
        state.guestTypeLoading = true;
      }),
      builder.addCase(
        HomeGuest.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.guestTypeLoading = false;
          state.guestTypeData = action.payload;
        },
      ),
      builder.addCase(
        HomeGuest.rejected,
        (state, action: PayloadAction<any>) => {
          state.guestTypeLoading = false;
          state.guestTypeErr = action.payload.response.data;
        },
      ),
      builder.addCase(searchResult.pending, (state) => {
        state.searchTypeLoading = true;
        state.searchTypeData = { hotels: [], count: "" };
      }),
      builder.addCase(
        searchResult.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.searchTypeLoading = false;
          state.searchTypeData = action.payload;
        },
      ),
      builder.addCase(
        searchResult.rejected,
        (state, action: PayloadAction<any>) => {
          state.searchTypeLoading = false;
          state.searchTypeErr = action.payload;
        },
      );
    builder.addCase(searchTypeResult.pending, (state) => {
      state.searchTypeLoading = true;
      state.searchTypeData = { hotels: [], count: "" };
    }),
      builder.addCase(
        searchTypeResult.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.searchTypeLoading = false;
          state.searchTypeData = action.payload;
        },
      ),
      builder.addCase(
        searchTypeResult.rejected,
        (state, action: PayloadAction<any>) => {
          state.searchTypeLoading = false;
          state.searchTypeErr = action.payload;
        },
      );
  },
});

export default HotelSlice.reducer;
