import React from "react";
import Header from "../components/Header";
import PageLoading from "../components/PageLoading";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import AuthenModal from "../components/AuthenModal";
import { Outlet } from "react-router-dom";
import { AuthenProvider } from "../components/AuthenContext";
import MainContextProvider from "../components/MainContext";

const MainLayout = () => {
  return (
    <MainContextProvider>
      <AuthenProvider>
        <PageLoading />
        <Header />
        <NavBar />

        {/* Main */}
        <Outlet />

        <Footer />

        {/* Modal */}
        <Modal />
        <AuthenModal />
      </AuthenProvider>
    </MainContextProvider>
  );
};

export default MainLayout;
