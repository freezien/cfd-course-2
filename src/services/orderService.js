import axiosInstance from "../utils/axiosInstance";

export const orderService = {
  getPaymentHistories() {
    return axiosInstance.get(`/orders/me`);
  },
  getCourseHistories() {
    return axiosInstance.get(`/orders/courses/me`);
  },
  orderCourse(payload = {}) {
    return axiosInstance.get(`/orders`, payload);
  },
};
