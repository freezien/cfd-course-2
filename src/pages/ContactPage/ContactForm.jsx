import React, { useState } from "react";
import Input from "../../components/Input";
import Select from "../../components/Select";
import validate, { regrexRule, requireRule } from "../../utils/validate";
import { message } from "antd";
import TextArea from "../../components/TextArea";
import Button from "../../components/Button";
import useForm from "../../hooks/useForm";

const ContactForm = ({}) => {
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      topic: "",
      content: "",
    },
    {
      name: [requireRule("Hãy nhập họ và tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requireRule("Vui lòng nhập phone"),
        regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      topic: [requireRule("Vui lòng chọn chủ đề")],
      content: [requireRule("Nhập mô tả")],
    }
  );

  const _onSubmit = (e) => {
    e.preventDefault();
    const errObj = validate();
    // start validate
    if (Object.keys(errObj)?.length > 0) {
      console.log("Submit error", errObj);
    } else {
      setLoading(true);
      console.log("Submit success: ", form);
      setTimeout(() => {
        setLoading(false);
        message.success("Gửi hỗ trợ thành công");
      }, 1000);
    }
  };

  return (
    <>
      {" "}
      <div className="form">
        <h3 className="title --t3">Gửi yêu cầu hỗ trợ</h3>
        <div className="form-group">
          <Input
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            {...register("name")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Email"
            placeholder="Nhập email"
            {...register("email")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            {...register("phone")}
          />
        </div>
        <div className="form-group">
          <Select
            label="chủ đề cần hỗ trợ"
            required
            options={[
              {
                value: "-",
                label: "--",
              },
              {
                value: "web",
                label: "Web Responsive",
              },
              {
                value: "react",
                label: "ReactJs",
              },
              {
                value: "html",
                label: "HTML/CSS",
              },
            ]}
            {...register("topic")}
          />
        </div>
        <div className="form-group">
          <Input
            label="Mô tả"
            renderInput={(inputProps) => <TextArea {...inputProps} />}
            {...register("content")}
          />
        </div>
        <div className="btncontrol">
          <Button variant="primary" onClick={_onSubmit}>
            Gửi
          </Button>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
