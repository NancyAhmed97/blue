// src/store/slices/compoundsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCompounds = createAsyncThunk(
  "compounds/fetchCompounds",
  async (filters, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      const params = new URLSearchParams();

      for (const key in filters) {
        if (filters[key] !== undefined && filters[key] !== null && filters[key] !== '') {
          params.append(key, filters[key]);
        }
      }
      const response = await axios.get(`https://nanosoft.technology/blue-nile/api/compounds?${params.toString()}`);
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

// إضافة عقار جديد مع التوكن
export const addcompounds = createAsyncThunk(
  "compounds/addCompounds",
async ({ title, description, image }, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    // Append each image
    image.forEach((image, index) => {
      formData.append(`images[${index}]`, image.file); // send the actual File object
    });

    const response = await axios.post(
      "https://nanosoft.technology/blue-nile/api/categories",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    thunkAPI.dispatch(fetchCompounds());
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




const compoundsSlice = createSlice({
  name: "compounds",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompounds.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCompounds.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCompounds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
//       .addCase(addcompounds.rejected, (state, action) => {
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

export default compoundsSlice.reducer;
