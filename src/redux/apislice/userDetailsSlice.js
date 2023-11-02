import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// create action
export const createUsers = createAsyncThunk("createUsers", async (data, { rejectWithValue }) => {
   const response = await fetch("https://65241ef0ea560a22a4e976d0.mockapi.io/curd", {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
   });

   try {
      const result = await response.json();
      return result;
   } catch (error) {
      return rejectWithValue(error);
   }
});

//read action
export const showUsers = createAsyncThunk("showUsers", async (data, { rejectWithValue }) => {
   const response = await fetch("https://65241ef0ea560a22a4e976d0.mockapi.io/curd");

   try {
      const result = await response.json();
      return result;
   } catch (error) {
      return rejectWithValue(error);
   }
});

//update action
export const updateUsers = createAsyncThunk("updateUsers", async (data, { rejectWithValue }) => {
   const response = await fetch(`https://65241ef0ea560a22a4e976d0.mockapi.io/curd/${data.id}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });

   try {
      const result = await response.json();
      return result;
   } catch (error) {
      return rejectWithValue(error);
   }
});

//delete action
export const deleteUsers = createAsyncThunk("deleteUsers", async (id, { rejectWithValue }) => {
   const response = await fetch(`https://65241ef0ea560a22a4e976d0.mockapi.io/curd/${id}`, {
      method: "DELETE"
   });

   try {
      const result = await response.json();
      return result;
   } catch (error) {
      return rejectWithValue(error);
   }
});

export const userDetail = createSlice({
   name: "userDetail",
   initialState: {
      users: [],
      loading: false,
      error: null,
      searchData: []
   },
   reducers: {
      searchUser: (state,action) => {
         state.searchData = action.payload;
      },
   },
   extraReducers: (builder) => {
      // createuser action promises
      builder.addCase(createUsers.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(createUsers.fulfilled, (state, action) => {
         state.loading = false;
         state.users.push(action.payload);
      });
      builder.addCase(createUsers.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });


      // readuser action promises
      builder.addCase(showUsers.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(showUsers.fulfilled, (state, action) => {
         state.loading = false;
         state.users = action.payload
      });
      builder.addCase(showUsers.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });


      // updateuser action promises
      builder.addCase(updateUsers.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(updateUsers.fulfilled, (state, action) => {
         state.loading = false;
         state.users = state.users.map((e) =>
            e.id === action.payload.id ? action.payload : e
         );
      });
      builder.addCase(updateUsers.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });


      // deleteuser action promises
      builder.addCase(deleteUsers.pending, (state) => {
         state.loading = true;
      });
      builder.addCase(deleteUsers.fulfilled, (state, action) => {
         state.loading = false;
         const { id } = action.payload;
         if (id) {
            state.users = state.users.filter((e) => e.id !== id);
         }
      });
      builder.addCase(deleteUsers.rejected, (state, action) => {
         state.loading = false;
         state.error = action.payload;
      });
   }
});

export default userDetail.reducer
export const { searchUser } = userDetail.actions