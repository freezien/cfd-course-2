import React, { useEffect, useState } from "react";
import InfoOrder from "./InfoOrder";
import FormOrder from "./FormOrder";
import PaymentOrder from "./PaymentOrder";
import Button from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import useMutation from "../../hooks/useMutation";
import { courseService } from "../../services/courseService";
import { Roles } from "../../constants/roles";
import { formatCurrency } from "../../utils/format";
import { useAuthen } from "../../components/AuthenContext";
import useForm from "../../hooks/useForm";
import { PATHS } from "../../constants/pathnames";
import { regrexRule, requireRule } from "../../utils/validate";
import { message } from "antd";

const CourseOrder = ({ orderLoading }) => {
  // ------------ InfoOrder ---------------
  const { slug } = useParams();
  const {
    data: courseDetailData,
    loading: courseDetaiLoading,
    execute,
  } = useMutation(courseService.getCourseBySlug);

  useEffect(() => {
    if (slug) execute(slug || "", {});
  }, [slug]);

  // Modify render data
  const { teams, price, tags } = courseDetailData || {};

  // Child Props
  const infoOrderProps = {
    ...courseDetailData,
    teacherInfo: teams?.find((item) => item.tags.includes(Roles.Teacher)) || {},
    price: formatCurrency(price),
  };

  // -------------- Form Order --------------
  const { profile } = useAuthen();
  const {
    firstName: profileName,
    email: profileEmail,
    phone: profilePhone,
  } = profile || {};

  // Handle profile form
  const { form, register, validate, setForm } = useForm(
    {
      name: "",
      email: "",
      phone: "",
      type: "",
    },
    {
      name: [requireRule("Vui lòng nhập tên")],
      email: [
        requireRule("Vui lòng nhập email"),
        regrexRule("email", "Vui lòng nhập đúng định dạng email"),
      ],
      phone: [
        requireRule("Vui lòng nhập phone"),
        regrexRule("phone", "Vui lòng nhập đúng định dạng phone"),
      ],
      type: [requireRule("Vui lòng chọn hình thức học")],
    }
  );

  useEffect(() => {
    setForm({
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      type: "",
    });
  }, [profileName, profileEmail, profilePhone]);

  // -------------- Payment Order --------------

  const [paymentMethod, setPaymentMethod] = useState("");
  const handlePaymentMethod = (payment) => {
    setPaymentMethod(payment);
  };

  // -------------- _On Order --------------
  const navigate = useNavigate();
  const { courseInfo, handleGetProfileCourse, handleGetProfilePayment } =
    useAuthen();

  const isAlreadyOrder = courseInfo?.some(
    (item) => item?.course?.slug === slug
  );

  // Handle when user click order this course
  const _onOrder = () => {
    const profileError = validate();

    if (Object.keys(profileError).length > 0) {
      console.log("Profile form validate failed", profileError);
    } else {
      if (paymentMethod) {
        // setup payload
        const payload = {
          name: form?.name,
          phone: form?.phone,
          course: courseDetailData?.id,
          type: form.type,
          paymentMethod,
        };
        // call api order
        orderCourse(payload, {
          onSuccess: async () => {
            message.success("Đăng ký thành công!");
            await handleGetProfileCourse();
            await handleGetProfilePayment();
            navigate(PATHS.PROFILE.COURSES);
          },
          onFail: () => {
            message.error("Đăng ký thất bại!");
          },
        });
      } else {
        message.error("Vui lòng chọn hình thức thanh toán");
      }
    }
  };

  return (
    <>
      <main className="mainwrapper --ptop">
        <section className="sccourseorder">
          <div className="container small">
            <InfoOrder {...infoOrderProps} />
            <FormOrder
              register={register}
              types={tags}
              disabled={isAlreadyOrder}
            />
            <PaymentOrder
              handleChange={handlePaymentMethod}
              selectedPayment={paymentMethod}
              disabled={isAlreadyOrder}
            />
            {/* addclass --processing khi bấm đăng ký */}
            <Button
              onClick={_onOrder}
              style={{ width: "100%" }}
              loading={orderLoading}
              disabled={isAlreadyOrder}
            >
              <span>{isAlreadyOrder ? "Đã đăng ký" : "Đăng ký khoá học"}</span>
            </Button>
          </div>
        </section>
      </main>
    </>
  );
};

export default CourseOrder;
