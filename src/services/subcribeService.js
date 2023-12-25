import axiosInstance from "../utils/axiosInstance";

export const subscribesService = {
  subcribes(payload = {}) {
    return axiosInstance.post(`/subscribes`, payload);
  },
};
