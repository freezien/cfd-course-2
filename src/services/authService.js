import axiosInstance from "../utils/axiosInstance";

export const authService = {
  onLogin(payload = {}) {
    return axiosInstance.post(`/customer/login`, payload);
  },
  onRegister(payload = {}) {
    return axiosInstance.post(`/customer/register`, payload);
  },
  getProfile(token = "") {
    return axiosInstance.get(`/customer/profiles`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  updateProfile(payload = {}, token) {
    return axiosInstance.put(`/customer/profiles`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
