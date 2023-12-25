import React from "react";

const FaqSection = ({ questions, loading = false }) => {
  let from0to5 = questions?.slice(0, 5);
  let form6toend = questions?.slice(6);
  return (
    <>
      <section className="faq --scpadding">
        <div className="container">
          <div className="faq__inner">
            <div className="heading --noline --center">
              <h2 className="heading__title title --t2">
                Câu hỏi <span className="color--primary">thường gặp</span>
              </h2>
            </div>
            <div className="faq__list">
              <div className="accordion">
                <h3 className="accordion__title label">Thông tin chung</h3>
                {questions?.length > 0 &&
                  from0to5.map((question, index) => {
                    return (
                      <div
                        className="accordion__content"
                        key={question.id || index}
                      >
                        <div className="accordion__content-title">
                          <h4>
                            <strong>{question.question}</strong>
                          </h4>
                        </div>
                        <div className="accordion__content-text">
                          {question.answer}
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="accordion">
                <h3 className="accordion__title label">Đăng ký, thanh toán</h3>
                {questions?.length > 0 &&
                  form6toend.map((question, index) => {
                    return (
                      <div
                        className="accordion__content"
                        key={question.id || index}
                      >
                        <div className="accordion__content-title">
                          <h4>
                            <strong>{question.question}</strong>
                          </h4>
                        </div>
                        <div className="accordion__content-text">
                          {question.answer}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FaqSection;
