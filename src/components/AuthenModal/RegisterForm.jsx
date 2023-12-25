import React, { useEffect, useRef, useState } from "react";
import validate, { regrexRule, requireRule } from "../../utils/validate";
import Input from "../Input";
import { styled } from "styled-components";
import { useAuthen } from "../AuthenContext";
import useForm from "../../hooks/useForm";
import Button from "../../components/Button";
import ComponentLoading from "../ComponentLoading";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 425px;
  gap: 10px;
`;

const RegisterForm = () => {
  const { onRegister, renderForm, setRenderForm, closeAuthenModal } =
    useAuthen();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    {
      name: [requireRule("Nhập họ và tên")],
      email: [
        requireRule("Nhập email"),
        regrexRule("Vui lòng nhập email đúng định dạng"),
      ],
      password: [requireRule("Vui lòng nhập mật khẩu")],
      confirmPassword: [
        requireRule("Vui lòng xác nhận mật khẩu"),
        (value, values) => {
          if (values.password && value !== values.password) {
            return "Mật khẩu xác nhận không đúng";
          }
          return false;
        },
      ],
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();
    // Validate Form => error Object
    let errorObj = validate();
    if (Object.keys(errorObj)?.length > 0) {
      console.log("Submit error", errorObj);
    } else {
      setLoading(true);
      console.log("Submit success", form);
      onRegister(form);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const isRender = renderForm === "register";

  return (
    <>
      <div
        className={`modal__wrapper-content mdregister ${
          isRender ? "active" : ""
        }`}
      >
        {loading && <ComponentLoading />}
        <h3 className="title --t3">Đăng ký tài khoản</h3>
        <div className="social">
          <a className="btn btn--google" href="#">
            <i>
              <img src="/img/icon-google.svg" alt="Google CFD" />
            </i>
            <span>Đăng ký bằng Google</span>
          </a>
          <a className="btn btn--facebook" href="#">
            <i>
              <img src="/img/icon-facebook-v2.svg" alt="Google CFD" />
            </i>
            <span>Đăng ký bằng Google</span>
          </a>
        </div>
        <span className="line">Hoặc</span>
        <Form onSubmit={onSubmit} className="form">
          <Input
            label="Họ và tên"
            placeholder="Họ và tên"
            required
            {...register("name")}
          />
          <Input
            label="Email"
            placeholder="Email"
            required
            {...register("email")}
          />
          <Input
            label="Mật khẩu"
            type="password"
            placeholder="Mật khẩu"
            required
            {...register("password")}
          />
          <Input
            label="xác nhận mật khẩu"
            type="password"
            placeholder="Xác nhận mật khẩu"
            required
            {...register("confirmPassword")}
          />
          <p className="form__argee" style={{ margin: "0 auto" }}>
            Với việc đăng ký, bạn đã đồng ý{` `}
            <Link
              className="color--primary"
              to={PATHS.PRIVACY}
              onClick={() => closeAuthenModal()}
            >
              Chính Sách
            </Link>
            {` `}
            &amp;
            {` `}
            <Link
              className="color--primary"
              to={PATHS.PRIVACY}
              onClick={() => closeAuthenModal()}
            >
              {" "}
              Điều Khoản
            </Link>
          </p>
          <p className="form__argee" style={{ textAlign: "center" }}>
            Bạn đã có tài khoản? {` `}
            <span
              className="color--primary btnmodal"
              onClick={() => setRenderForm("login")}
            >
              Đăng nhập {` `}
            </span>
          </p>
          <Button variant="primary" type="submit">
            Đăng ký
          </Button>
        </Form>
      </div>
    </>
  );
};

export default RegisterForm;
