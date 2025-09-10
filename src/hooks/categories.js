// src/store/slices/categoriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const response = await axios.get("https://nanosoft.technology/blue-nile/api/categories");
      return response.data.data.data;
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
export const addcategories = createAsyncThunk(
  "categories/addCategories",
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

    thunkAPI.dispatch(fetchCategories());
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




const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
//       .addCase(addcategories.rejected, (state, action) => {
//         state.loading = false;
//   state.error = action.payload;
//   if (action.payload) {
    // toast.error(action.payload, {
    //   position: "bottom-right",
    //   autoClose: 3000,
    // });
//   }
// });
  },
});

export default categoriesSlice.reducer;
