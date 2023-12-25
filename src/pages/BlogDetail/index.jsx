import React, { useEffect } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { PATHS } from "../../constants/pathnames";
import useQuery from "../../hooks/useQuery";
import useMutation from "../../hooks/useMutation";
import { blogService } from "../../services/blogService";
import { formatTimeDisplay } from "../../utils/format";
import BlogTitle from "./BlogTitle";
import BlogContent from "./BlogContent";

const BlogDetail = () => {
  const { slug } = useParams();

  const {
    data: blogDetailData,
    loading: blogDetailLoading,
    execute,
  } = useMutation(blogService.getBlogs);

  useEffect(() => {
    if (slug) execute(slug || "", {});
  }, [slug]);

  // Modify Props
  const { createdAt } = blogDetailData || {};

  const modifiedProps = {
    ...blogDetailData,
    createdAt: formatTimeDisplay(createdAt),
  };

  // Related Topics
  const { data: relatedTopics, loading: relatedTopicLoading } = useQuery(
    blogService.getBlogs
  );

  const { blogs } = relatedTopics || {};

  return (
    <>
      <main className="mainwrapper blogdetail --ptop">
        <div className="container">
          <div className="wrapper">
            <BlogTitle modifiedProps={modifiedProps} />
            <BlogContent modifiedProps={modifiedProps} />
          </div>
          <div className="blogdetail__related">
            <h2 className="blogdetail__related-title title --t2">
              Bài viết liên quan
            </h2>
            <div className="blog__list">
              {blogs?.length > 0 &&
                blogs.map((topic, index) => {
                  const { image, category, slug, createdAt, name, author } =
                    topic || {};
                  return (
                    <div className="blog__list-item" key={topic.id || index}>
                      <div className="img">
                        <Link to={PATHS.BLOG + `/${slug}`}>
                          <img
                            src={image || ""}
                            alt="Khóa học CFD"
                            className="course__thumbnail"
                          />
                        </Link>
                      </div>
                      <div className="content">
                        <p className="label">{category?.name || ""}</p>
                        <h2 className="title --t3">
                          <Link to={PATHS.BLOG + `/${slug}`}>{name || ""}</Link>
                        </h2>
                        <div className="content__info">
                          <div className="user">
                            <div className="user__img">
                              <img
                                src="/img/avatar_nghia.jpg"
                                alt="Avatar teacher"
                              />
                            </div>
                            <p className="user__name">{author || ""}</p>
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
          </div>
        </div>
      </main>
    </>
  );
};

export default BlogDetail;
