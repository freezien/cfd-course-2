import React from "react";
import useQuery from "../../hooks/useQuery";
import { blogService } from "../../services/blogService";
import { Link, useParams } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import { formatTimeDisplay } from "../../utils/format";

const Blog = () => {
  const { data: blogsTopics, loading: blogsTopicsLoading } = useQuery(
    blogService.getBlogTopics
  );
  const { blogs: topics } = blogsTopics || {};

  const { data: blogsDetail, loading: blogsDetailLoading } = useQuery(
    blogService.getBlogs
  );
  const { blogs: details } = blogsDetail || {};

  return (
    <>
      <main className="mainwrapper blog --ptop">
        <div className="container">
          <div className="textbox">
            <div className="container">
              <h2 className="title --t2">Blog</h2>
            </div>
          </div>
          <div className="blog__menu">
            <a href="#" className="blog__menu-item active">
              Tất cả
            </a>
            {topics?.length > 0 &&
              topics.map((topic, index) => {
                return (
                  <Link href="" className="blog__menu-item" key={index}>
                    {topic.name}
                  </Link>
                );
              })}
          </div>
          <div className="blog__list">
            {details?.length > 0 &&
              details.map((detail, index) => {
                const { author, category, slug, createdAt, image, name } =
                  detail || {};
                return (
                  <div className="blog__list-item" key={detail.id || index}>
                    <div className="img">
                      <Link to={PATHS.BLOG + `/${slug}`}>
                        <img
                          src={
                            image || "https://picsum.photos/300/300?random=1"
                          }
                          alt="Khóa học CFD"
                          className="course__thumbnail"
                        />
                      </Link>
                    </div>
                    <div className="content">
                      <p className="label">{category.name}</p>
                      <h2 className="title --t3">
                        <a href="blog-detail.html">{name}</a>
                      </h2>
                      <div className="content__info">
                        <div className="user">
                          <div className="user__img">
                            <img
                              src="/img/avatar_nghia.jpg"
                              alt="Avatar teacher"
                            />
                          </div>
                          <p className="user__name">{author}</p>
                        </div>
                        <div className="date">
                          {formatTimeDisplay(createdAt)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
          <ul className="paging">
            <li>
              <a href="#">
                <i>
                  <img src="/img/iconprev.svg" alt="" />
                </i>
              </a>
            </li>
            <li>
              <a href="#" className="active">
                1
              </a>
            </li>
            <li>
              <a href="#">2</a>
            </li>
            <li>
              <a href="#">3</a>
            </li>
            <li>
              <a href="#">4</a>
            </li>
            <li>
              <a href="#">
                <i>
                  <img src="/img/iconprev.svg" alt="" />
                </i>
              </a>
            </li>
          </ul>
        </div>
      </main>
    </>
  );
};

export default Blog;
