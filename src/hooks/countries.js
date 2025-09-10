// src/store/slices/countriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;

      const response = await axios.get("https://nanosoft.technology/blue-nile/api/countries");
      return response.data.data;
    } catch (error) {
return thunkAPI.rejectWithValue(
  error.response?.data?.errors
    ? Object.values(error.response.data.errors)[0][0]
    : "حدث خطأ أثناء جلب البيانات"
);
    }
  }
);





const countriesSlice = createSlice({
  name: "countries",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
//       .addCase(addcountries.rejected, (state, action) => {
//         state.loading = false;
//   state.error = action.payload;
//   if (action.payload) {
//     toast.error(action.payload, {
//       position: "bottom-right",
//       autoClose: 3000,
//     });
//   }
// });
  },
});

export default countriesSlice.reducer;
