import React, { createContext, useContext, useEffect, useState } from "react";
import { authService } from "../../services/authService";
import { message } from "antd";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import { orderService } from "../../services/orderService";

const AuthenContext = createContext({});

export const AuthenProvider = ({ children }) => {
  const [profileInfo, setProfileInfo] = useState({});
  const [renderForm, setRenderForm] = useState("login");
  const [isAuthenModalOpen, setisAuthenModalOpen] = useState(false);
  const [courseInfo, setCourseInfo] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState([]);

  const openAuthenModal = () => {
    if (!!!localStorage.getItem(LOCAL_STORAGE.token)) {
      setisAuthenModalOpen(true);
    }
  };
  const closeAuthenModal = () => {
    setisAuthenModalOpen(false);
    setRenderForm("login");
  };

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE.token);
    if (!!token) {
      // Call API get profile
      onGetProfile(token);
    }
  }, []);

  const onLogin = async (loginData, callback) => {
    // Call API
    try {
      const res = await authService.onLogin(loginData);
      const { token, refreshToken } = res?.data?.data || {};
      // Lưu vào LocalStorage
      localStorage.setItem(LOCAL_STORAGE.token, token);
      localStorage.setItem(LOCAL_STORAGE.refreshToken, refreshToken);

      if (!!token) {
        // Get Profile
        onGetProfile(token);
        // Thông báo thành công
        message.success("Đăng nhập thành công!!!");
        // Đóng Modal
        closeAuthenModal();
      }
    } catch (error) {
      console.log("error", error);
      message.error("Đăng nhập thất bại!!!");
    } finally {
      callback?.();
    }
  };

  const onRegister = async (registerData, callback) => {
    // Call API
    try {
      const { name, email, password, confirmPassword } = registerData;
      const payload = {
        firstName: name,
        lastName: "",
        email,
        password,
        confirmPassword,
      };
      const res = await authService.onRegister(payload);
      if (res?.data?.data?.id) {
        message.success("Đăng ký thành công");
        onLogin({
          email,
          password,
        });
      }
    } catch (error) {
      if (error?.response?.status === 403) {
        message.error("Tài khoản đã tồn tại");
      } else {
        message.error("Đăng ký thất bại!!");
      }
    } finally {
      callback?.();
    }
  };

  const onLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE.token);
    localStorage.removeItem(LOCAL_STORAGE.refreshToken);
    setProfileInfo({});
    window.location.reload();
  };

  const onGetProfile = async (token) => {
    try {
      const profileRes = await authService.getProfile(token);
      if (!!profileRes?.data?.data) {
        setProfileInfo(profileRes.data.data);
      }
    } catch (error) {
      console.log("error", error);
      onLogout();
    }
  };

  const handleGetProfileCourse = async () => {
    try {
      const res = await orderService.getCourseHistories();
      const orderCourses = res?.data?.data.orders || [];
      setCourseInfo(orderCourses);
    } catch (error) {
      console.log("getHistories Error", error);
    }
  };

  const handleGetProfilePayment = async () => {
    try {
      const res = await orderService.getPaymentHistories();
      const payments = res?.data?.data?.orders || [];
      setPaymentInfo(paymentInfo);
    } catch (error) {
      console.log("getPaymentHistories Error", error);
    }
  };

  return (
    <AuthenContext.Provider
      value={{
        isAuthenModalOpen,
        renderForm,
        profileInfo,
        setProfileInfo,
        openAuthenModal,
        closeAuthenModal,
        onLogin,
        onRegister,
        onLogout,
        setRenderForm,
        handleGetProfileCourse,
        handleGetProfilePayment,
      }}
    >
      {children}
    </AuthenContext.Provider>
  );
};

export const useAuthen = () => useContext(AuthenContext);
