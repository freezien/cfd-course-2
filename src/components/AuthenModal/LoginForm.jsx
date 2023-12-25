import React, { useState } from "react";
import validate, { regrexRule, requireRule } from "../../utils/validate";
import Input from "../Input";
import { styled } from "styled-components";
import { useAuthen } from "../AuthenContext";
import useForm from "../../hooks/useForm";
import Button from "../../components/Button";
import ComponentLoading from "../ComponentLoading";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 425px;
`;

const LoginForm = () => {
  const { onLogin, renderForm, setRenderForm } = useAuthen();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      password: [requireRule("Vui lòng nhập password")],
    }
  );

  const onSubmit = (e) => {
    e.preventDefault();
    // Validate Form => error Object
    let errorObj = validate();
    // Check Error => error? fail : success
    if (Object.keys(errorObj)?.length > 0) {
      console.log("Submit error", errorObj);
    } else {
      setLoading(true);
      onLogin(form);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const isRender = renderForm === "login";
  return (
    <>
      <div
        className={`modal__wrapper-content mdlogin ${isRender ? "active" : ""}`}
        style={{ position: "relative" }}
      >
        {loading && <ComponentLoading />}
        <h3 className="title --t3">Đăng nhập</h3>
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
            label="Email"
            placeholder="Email"
            required
            {...register("email")}
          />
          <Input
            label="Mật khẩu"
            placeholder="Mật khẩu"
            required
            type="password"
            {...register("password")}
          />
          <div className="form__bottom">
            <p>
              Bạn chưa có tài khoản?{` `}
              <span
                className="color--primary btnmodal"
                onClick={() => setRenderForm("register")}
              >
                Đăng ký
              </span>
            </p>
            {/* <a className="color--primary" href="#">
              Quên mật khẩu?
            </a> */}
          </div>
          <Button variant="primary" className="form__btn-register">
            Đăng nhập
          </Button>
        </Form>
      </div>
    </>
  );
};

export default LoginForm;
