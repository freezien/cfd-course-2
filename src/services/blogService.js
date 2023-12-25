import axiosInstance from "../utils/axiosInstance";

export const blogService = {
  getBlogs(slug = "") {
    return axiosInstance.get(`/blogs/${slug}`);
  },
  getBlogTopics(slug = "") {
    return axiosInstance.get(`/blog-categories/${slug}`);
  },
};
