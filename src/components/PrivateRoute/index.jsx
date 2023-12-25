import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthen } from "../../components/AuthenContext";
import tokenMethod from "../../utils/token";

const PrivateRoute = ({ redirectPath = "/" }) => {
  const { isAuthenModalOpen } = useAuthen();
  if (!!tokenMethod.get()) {
    isAuthenModalOpen;
    return <Navigate to={redirectPath} />;
  } else {
    return (
      <>
        <Outlet />
      </>
    );
  }
};

export default PrivateRoute;
