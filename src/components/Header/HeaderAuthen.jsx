import React from "react";
import { useAuthen } from "../../components/AuthenContext";

const HeaderAuthen = () => {
  const { openAuthenModal } = useAuthen();
  return (
    <>
      <div class="header__auth">
        <a
          href="javascript:void(0)"
          class="btn btn--transparent btnmodal"
          data-modal="mdlogin"
        >
          <span onClick={() => openAuthenModal()}>Đăng ký /&nbsp;</span>
          <span onClick={() => openAuthenModal()}>Đăng nhập</span>
        </a>
      </div>
    </>
  );
};

export default HeaderAuthen;
