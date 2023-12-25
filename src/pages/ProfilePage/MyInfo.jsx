import React, { useEffect, useState } from "react";
import { useAuthen } from "../../components/AuthenContext";
import Input from "../../components/Input";
import validate from "../../utils/validate";
import { authService } from "../../services/authService";
import { message } from "antd";
import { LOCAL_STORAGE } from "../../constants/localStorage";
import TextArea from "../../components/TextArea";

const MyInfo = () => {
  const { profileInfo, setProfileInfo } = useAuthen();
  const token = localStorage.getItem(LOCAL_STORAGE.token);
  const [form, setForm] = useState({
    password: "********",
  });
  const [errors, setErrors] = useState({});

  const rules = {
    firstName: [
      {
        required: true,
        message: "Vui lòng nhập họ tên",
      },
    ],
    email: [
      {
        required: true,
        message: "Vui lòng nhập email",
      },
      {
        regex: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        message: "Hãy nhập đúng định dạng mail",
      },
    ],
    phone: [
      {
        required: true,
        message: "Vui lòng nhập số điện thoại",
      },
      {
        regex: /(84|0[3|5|7|8|9])+([0-9]{8})\b/,
        message: "Hãy nhập đúng định sdt",
      },
    ],
    password: [
      {
        required: true,
        message: "Hãy nhập password",
      },
    ],
  };

  const onSubmit = async (e) => {
    e?.preventDefault();
    try {
      const errObj = validate(rules, form);
      setErrors(errObj);

      if (Object.keys(errObj)?.length === 0) {
        const res = await authService.updateProfile(form, token);
        if (res.status) {
          setProfileInfo(res?.data?.data);
          message.success("Cập nhật thành công");
        }
      }
    } catch (error) {
      message.error("Cập nhật thất bại!!");
      console.log("error", error);
    }
  };

  const register = (fieldName) => {
    return {
      value: form[fieldName],
      error: errors[fieldName],
      onChange: (e) => setForm({ ...form, [fieldName]: e.target.value }),
    };
  };

  useEffect(() => {
    if (profileInfo) {
      setForm({ ...form, ...profileInfo });
    }
  }, [profileInfo]);

  return (
    <>
      <div className="tab__content-item" style={{ display: "block" }}>
        <form onSubmit={onSubmit} className="form">
          <div className="form-container">
            <div className="form-group">
              <Input
                label="Họ và tên"
                placeholder="Vui lòng nhập họ và tên"
                required
                {...register("firstName")}
              />
            </div>
            <div className="form-group">
              <Input
                label="Số điện thoại"
                placeholder="Vui lòng nhập số điện thoại"
                required
                {...register("phone")}
              />
            </div>
          </div>
          <div className="form-container">
            <div className="form-group">
              <Input
                label="Email"
                placeholder="Vui lòng nhập Email"
                required
                disabled
                {...register("email")}
              />
            </div>
            <div className="form-group">
              <Input
                label="Mật khẩu"
                required
                disabled
                {...register("password")}
              />
            </div>
          </div>
          <div className="form-group">
            <Input
              label="Facebook URL"
              placeholder="Vui lòng nhập facebook"
              {...register("facebookURL")}
            />
          </div>
          <div className="form-group">
            <Input label="Website" {...register("website")} />
          </div>
          <div className="form-container textarea">
            <Input
              label="Giới thiệu bản thân"
              renderInput={(inputProps) => <TextArea {...inputProps} />}
              {...register("introduce")}
            />
          </div>
          <div className="form-group">
            <div className="btnsubmit">
              <button className="btn btn--primary">Lưu lại</button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default MyInfo;
