// src/store/slices/subcategoriesSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSubcategories = createAsyncThunk(
  "subcategories/fetchSubcategories",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();

      const response = await axios.get("https://nanosoft.technology/blue-nile/api/categories/1/sub-categories");
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
export const addsubcategories = createAsyncThunk(
  "subcategories/addSubcategories",
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
      "https://nanosoft.technology/blue-nile/api/subcategories",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    thunkAPI.dispatch(fetchSubcategories());
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




const subcategoriesSlice = createSlice({
  name: "subcategories",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcategories.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchSubcategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
//       .addCase(addsubcategories.rejected, (state, action) => {
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

export default subcategoriesSlice.reducer;
