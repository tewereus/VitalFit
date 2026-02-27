import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const adminLogin = createAsyncThunk(
  "auth/admin-login",
  async (data, thunkAPI) => {
    try {
      return await authService.adminLogin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const result = await authService.logout();
    // Force a page reload to clear any in-memory state
    window.location.href = "/";
    return result;
  } catch (error) {
    // Even if the server request fails, redirect to login
    window.location.href = "/";
    return thunkAPI.rejectWithValue(error);
  }
});

export const refreshToken = createAsyncThunk(
  "auth/refresh-token",
  async (_, thunkAPI) => {
    try {
      return await authService.refreshToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const allUsers = createAsyncThunk("auth/get-users", async (thunkAPI) => {
  try {
    return await authService.allUsers();
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const checkAdminPass = createAsyncThunk(
  "auth/check-admin",
  async (data, thunkAPI) => {
    try {
      return await authService.checkAdminPass(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateProfile = createAsyncThunk(
  "auth/update-profile",
  async (data, thunkAPI) => {
    try {
      return await authService.updateProfile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const uploadProfile = createAsyncThunk(
  "auth/profile-upload",
  async (data, thunkAPI) => {
    try {
      return await authService.uploadProfile(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updatePassword = createAsyncThunk(
  "auth/update-password",
  async (data, thunkAPI) => {
    try {
      return await authService.updatePassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const toggleDarkMode = createAsyncThunk(
  "admin/dark-mode",
  async (data, thunkAPI) => {
    try {
      return await authService.toggleDarkMode(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addStaff = createAsyncThunk(
  "auth/add-staff",
  async (data, thunkAPI) => {
    try {
      return await authService.addStaff(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const addMember = createAsyncThunk(
  "auth/add-member",
  async (data, thunkAPI) => {
    try {
      return await authService.addMember(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const updateMember = createAsyncThunk(
  "auth/update-member",
  async (data, thunkAPI) => {
    try {
      return await authService.updateMember(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const deleteMember = createAsyncThunk(
  "auth/delete-member",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteMember(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    messageClear: (state) => {
      state.isSuccess = false;
      state.isError = false;
    },
    user_reset: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
        state.user = action.payload;
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.response?.data ||
          action.error?.message ||
          "Authentication failed";
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Logged out successfully";
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.response?.data ||
          action.error?.message ||
          "Logout failed";
        // Even if the server request fails, we should still clear the user state
        state.user = null;
      })
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Token refreshed successfully";

        // Update the user state if we have user data in the response
        if (action.payload && action.payload.user) {
          state.user = action.payload.user;
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.response?.data ||
          action.error?.message ||
          "Token refresh failed";
        // If token refresh fails, we should clear the user state
        state.user = null;
      })
      .addCase(allUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "success";
      })
      .addCase(allUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(checkAdminPass.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAdminPass.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Password verified";
      })
      .addCase(checkAdminPass.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Profile updated successfully";
        if (action.payload && state.user) {
          // Update user data with the response
          state.user = {
            ...state.user,
            fullname: action.payload.fullname,
            username: action.payload.username,
            email: action.payload.email,
            mobile: action.payload.mobile,
            preference: action.payload.preference,
            profile: action.payload.profile,
            image: action.payload.image,
          };
        }
        toast.success(state.message);
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          action.error?.message ||
          "Profile update failed";
        toast.error(state.message);
      })
      .addCase(uploadProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "profile uploaded";
        if (action.payload.userInfo && state.user) {
          state.user.image = action.payload.userInfo.image;
        }
        toast.success(state.message);
      })
      .addCase(uploadProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message =
          action.payload?.message || "Password updated successfully";
        toast.success(state.message);
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          action.error?.message ||
          "Password update failed";
        toast.error(state.message);
      })
      .addCase(toggleDarkMode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(toggleDarkMode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.message = "mode changed successfully";
        if (action.payload.preference && state.user) {
          state.user.preference.mode = action.payload.preference.mode;
        }
      })
      .addCase(toggleDarkMode.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.error.message;
      })
      .addCase(addStaff.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addStaff.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Staff added successfully";
        toast.success(state.message);
      })
      .addCase(addStaff.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          action.error?.message ||
          "Failed to add staff";
        toast.error(state.message);
      })
      .addCase(addMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Member added successfully";
        toast.success(state.message);
      })
      .addCase(addMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          action.error?.message ||
          "Failed to add member";
        toast.error(state.message);
      })
      .addCase(updateMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Member updated successfully";
        toast.success(state.message);
      })
      .addCase(updateMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          action.error?.message ||
          "Failed to update member";
        toast.error(state.message);
      })
      .addCase(deleteMember.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMember.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = "Member deleted successfully";
        toast.success(state.message);
      })
      .addCase(deleteMember.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message =
          action.payload?.message ||
          action.error?.message ||
          "Failed to delete member";
        toast.error(state.message);
      });
  },
});

export const { messageClear, user_reset } = authSlice.actions;

export default authSlice.reducer;
