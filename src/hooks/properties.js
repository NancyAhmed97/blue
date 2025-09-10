// src/store/slices/propertiesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProperties = createAsyncThunk(
  "properties/fetchProperties",
  async (filters, thunkAPI) => {
    try {
      const params = new URLSearchParams();
            const state = thunkAPI.getState(); // Access Redux state

      const token = state.auth?.token; // Assuming token is stored in auth slice

      // أضف كل القيم التي لها قيمة حقيقية فقط
      for (const key in filters) {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      }

      const response = await axios.get(
        `https://nanosoft.technology/blue-nile/api/properties?${params.toString()}`,
          {
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // Add token only if exists
        }
      );

      return response.data.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.errors
          ? Object.values(error.response.data.errors)[0][0]
          : "حدث خطأ أثناء جلب العقارات"
      );
    }
  }
);
// إضافة عقار جديد مع التوكن
export const addproperties = createAsyncThunk(
  "properties/addProperties",
async (formData, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("description", description);

    // // Append each image
    // image.forEach((image, index) => {
    //   formData.append(`images[${index}]`, image.file); // send the actual File object
    // });


const response = await axios.post(
      "https://nanosoft.technology/blue-nile/api/properties",formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    thunkAPI.dispatch(fetchProperties());
    return response.data;
  } catch (error) {
          console.log(error);

    return thunkAPI.rejectWithValue(      
      error.response?.data?.errors
        ? Object.values(error.response.data.errors)[0][0]
        : "حدث خطأ أثناء إضافة العقار"
    );
  }
}

);
const propertiesSlice = createSlice({
  name: "properties",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchProperties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
                      .addCase(addproperties.pending, (state) => {
                state.loading = true;
                state.error = null;
              })
              .addCase(addproperties.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
              })
              .addCase(addproperties.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
              })
  },
});

export default propertiesSlice.reducer;
