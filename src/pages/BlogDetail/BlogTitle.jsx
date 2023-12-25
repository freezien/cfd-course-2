import React, { useEffect } from "react";

const BlogTitle = ({ modifiedProps }) => {
  const { name, author, createdAt, category } = modifiedProps || {};
  return (
    <>
      <div className="blogdetail__title" key={category?.id || ""}>
        <h1 className="title --t2">{name}</h1>
        <ul className="meta">
          <li className="meta__item">Đăng bởi {author}</li>
          <li className="meta__item">{category?.name || ""}</li>
          <li className="meta__item">{createdAt}</li>
        </ul>
      </div>
    </>
  );
};

export default BlogTitle;
