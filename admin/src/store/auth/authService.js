import { axiosPrivate, axiosPublic } from "../../api/axios";

const adminLogin = async (data) => {
  try {
    console.log(data);
    const response = await axiosPublic.post(`/admin/login`, data, {
      withCredentials: true, // Important for cookies
    });

    return response.data;
  } catch (error) {
    // Format the error for better handling in the slice
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

const logout = async () => {
  try {
    // Call the logout endpoint
    const response = await axiosPrivate.post("/admin/logout");
    return response.data;
  } catch (error) {
    // Format the error for better handling in the slice
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

const refreshToken = async () => {
  try {
    // First, refresh the token - don't use custom headers to avoid CORS issues
    const response = await axiosPublic.post(
      "/admin/refresh-token",
      {},
      {
        withCredentials: true,
      },
    );

    // Then, get the current user profile to update the Redux state
    try {
      const profileResponse = await axiosPrivate.get("/admin/profile");
      return {
        ...response.data,
        user: profileResponse.data,
      };
    } catch (profileError) {
      // If we can't get the profile, just return the token response
      return response.data;
    }
  } catch (error) {
    // Format the error for better handling in the slice
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

const allUsers = async () => {
  const response = await axiosPrivate.get(`/user/all-users`);
  return response.data;
};

const checkAdminPass = async (data) => {
  const response = await axiosPublic.post(`/admin/check-admin`, data);
  return response.data;
};

const updateProfile = async (data) => {
  const response = await axiosPrivate.put(`/admin/profile`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  });

  return response.data;
};

const uploadProfile = async (data) => {
  const response = await axiosPrivate.post(`/admin/upload-profile`, data);
  return response.data;
};

const updatePassword = async (data) => {
  const response = await axiosPrivate.put(`/admin/update-password`, data);
  return response.data;
};

const toggleDarkMode = async (data) => {
  console.log(data);
  const response = await axiosPrivate.put(`/admin/dark-mode`, data);
  return response.data;
};

const addStaff = async (data) => {
  const response = await axiosPrivate.post(`/admin/add-staff`, data.data);
  return response.data;
};

const addMember = async (data) => {
  const response = await axiosPrivate.post(`/admin/members`, data.data);
  return response.data;
};

const updateMember = async (data) => {
  const { id, payload } = data;
  const response = await axiosPrivate.put(`/admin/members/${id}`, payload);
  return response.data;
};

const deleteMember = async (id) => {
  const response = await axiosPrivate.delete(`/admin/members/${id}`);
  return response.data;
};

const authService = {
  adminLogin,
  logout,
  refreshToken,
  allUsers,
  checkAdminPass,
  updateProfile,
  uploadProfile,
  updatePassword,
  toggleDarkMode,
  addStaff,
  addMember,
  updateMember,
  deleteMember,
};

export default authService;
