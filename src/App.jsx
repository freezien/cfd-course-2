import { useState } from "react";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import ChangePassword from "./pages/ChangePassword";
import CourseOrder from "./pages/CourseOrder";
import CourseDetail from "./pages/CourseDetail";
import Page404 from "./pages/Page404";
import PaymentMethod from "./pages/PaymentMethod";
import Privacy from "./pages/Privacy";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ProfileLayout from "./layouts/ProfileLayout";
import MyInfo from "./pages/ProfilePage/MyInfo";
import MyCourses from "./pages/ProfilePage/MyCourses";
import MyPayment from "./pages/ProfilePage/MyPayment";
import { PATHS } from "./constants/pathnames";
import Courses from "./pages/Course";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <>
      {/* Main */}
      <Routes>
        <Route path={PATHS.HOME} element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path={PATHS.CONTACT} element={<ContactPage />} />
          <Route path={PATHS.ABOUT} element={<About />} />
          <Route path={PATHS.BLOG} element={<Blog />} />
          <Route path={PATHS.BLOG_DETAIL} element={<BlogDetail />} />
          <Route path={PATHS.CHANGEPASSWORD} element={<ChangePassword />} />
          <Route path={PATHS.COURSES} element={<Courses />} />
          <Route path={PATHS.COURSES_DETAIL} element={<CourseDetail />} />
          <Route path={PATHS.COURSES_ORDER} element={<CourseOrder />} />
          <Route path="*" element={<Page404 />} />
          <Route path={PATHS.PAYMENTMETHOD} element={<PaymentMethod />} />
          <Route path={PATHS.PRIVACY} element={<Privacy />} />
          <Route element={<PrivateRoute />}>
            <Route path={PATHS.PROFILE.INDEX} element={<ProfileLayout />}>
              <Route index element={<MyInfo />} />
              <Route path={PATHS.PROFILE.COURSES} element={<MyCourses />} />
              <Route path={PATHS.PROFILE.PAYMENT} element={<MyPayment />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
