import React, { useState } from "react";
import LoginForm from "./LoginForm";
import ReactDom from "react-dom";
import RegisterForm from "./RegisterForm";
import { useAuthen } from "../AuthenContext";

const AuthenModal = () => {
  const { isAuthenModalOpen, closeAuthenModal } = useAuthen();

  return ReactDom.createPortal(
    <div className={`modal modallogin ${isAuthenModalOpen ? "open" : ""}`}>
      <div className="modal__wrapper">
        <div className="modal__wrapper-close" onClick={closeAuthenModal}>
          <img src="/img/close_icon.svg" alt="CFD Register" />
        </div>
        <LoginForm />
        <RegisterForm />
        {/* <div className="modal__wrapper-content mdconsult">
            <h3 className="title --t3">Đăng ký tư vấn</h3>
            <form action="#" className="form">
              <input
                type="text"
                className="form__input"
                name="name"
                placeholder="Họ và tên"
              />
              <input
                type="text"
                className="form__input"
                name="name"
                placeholder="Số điện thoại"
              />
              <input
                type="text"
                className="form__input"
                name="email"
                placeholder="Email"
              />
              <textarea
                name
                id
                cols={30}
                rows={4}
                className="form__input"
                placeholder="Nội dung cần tư vấn"
                defaultValue={""}
              />
              <button
                className="btn btn--primary form__btn-register"
                type="submit"
              >
                Gửi thông tin
              </button>
            </form>
          </div> */}
      </div>
      <div className="modal__overlay" onClick={closeAuthenModal} />
    </div>,
    document.body
  );
};

export default AuthenModal;
