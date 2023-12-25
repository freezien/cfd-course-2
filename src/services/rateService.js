import axiosInstance from "../utils/axiosInstance";

export const rateService = {
  getRates(query = "") {
    return axiosInstance.get(`/rates${query}`);
  },
};
