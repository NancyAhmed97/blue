import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// === [1] FETCH COUNTRIES ===
export const fetchCountries = createAsyncThunk(
  "location/fetchCountries",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get("https://nanosoft.technology/blue-nile/api/countries", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("فشل في جلب الدول");
    }
  }
);

// === [2] ADD COUNTRY ===
export const addCountry = createAsyncThunk(
  "location/addCountry",
  async (title, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.post("https://nanosoft.technology/blue-nile/api/countries", { title }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await thunkAPI.dispatch(fetchCountries()); 
      
      return "تمت إضافة الدولة بنجاح";

      
    } catch (error) {
      return thunkAPI.rejectWithValue("فشل في إضافة الدولة");
    }
  }
);

// === [3] FETCH CITIES BY COUNTRY ID ===
export const fetchCitiesByCountryId = createAsyncThunk(
  "location/fetchCitiesByCountryId",
  async (countryId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(`https://nanosoft.technology/blue-nile/api/countries/${countryId}/cities`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("فشل في جلب المدن");
    }
  }
);

export const addCity = createAsyncThunk(
  "location/addCity",
  async ({ country_id, title }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.post(`https://nanosoft.technology/blue-nile/api/cities`, { title,country_id }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      thunkAPI.dispatch(fetchCitiesByCountryId(country_id));
    } catch (error) {
      return thunkAPI.rejectWithValue("فشل في إضافة المدينة");
    }
  }
);

export const fetchZonesByCityId = createAsyncThunk(
  "location/fetchZonesByCityId",
  async (city_id, thunkAPI) => {  // <-- لاحظ أن الوسيط الأول هنا `_` لأنه لا يتم تمرير أي متغير فعلي
    try {
      const token = thunkAPI.getState().auth.token;
      const res = await axios.get(`https://nanosoft.technology/blue-nile/api/cities/${city_id}/zones`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("فشل في جلب المناطق");
    }
  }
);

export const addZone = createAsyncThunk(
  "location/addZone",
  async ({ city_id, title }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      await axios.post(`https://nanosoft.technology/blue-nile/api/zones`, { title ,city_id}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      thunkAPI.dispatch(fetchZonesByCityId(city_id));
    } catch (error) {
      return thunkAPI.rejectWithValue("فشل في إضافة المنطقة");
    }
  }
);

// === SLICE ===
const locationSlice = createSlice({
  name: "location",
  initialState: {
    countries: [],
    cities: [],
    zones: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.countries = action.payload;
      })
      .addCase(fetchCitiesByCountryId.fulfilled, (state, action) => {
        state.cities = action.payload;
      })

      .addCase(fetchZonesByCityId.pending, (state) => {
  state.zones = []; // تصفير المناطق القديمة
})
.addCase(fetchZonesByCityId.fulfilled, (state, action) => {
  state.zones = action.payload;
})
      // .addCase(fetchZonesByCityId.fulfilled, (state, action) => {
      //   state.zones = action.payload;
      // })
      .addMatcher(
        (action) => action.type.startsWith("location/") && action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("location/") && action.type.endsWith("/fulfilled"),
        (state) => {
          state.loading = false;
        }
      )
      .addMatcher(
        (action) => action.type.startsWith("location/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.loading = false;
          state.error = action.payload || "خطأ غير متوقع";
        }
      );
  },
});

export default locationSlice.reducer;
