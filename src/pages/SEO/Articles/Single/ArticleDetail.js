import "./style.css";
import { useDispatch } from "react-redux";
import { Helmet } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import { getBlogsList } from "../../../../redux/Actions/seoActions";
import HandleImages from "../../../../components/Custom/Avatars/HandleImages";
import {
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  calculateReadingTime,
  truncateCharacters,
} from "../../../../utils/_helpers";

const ArticleDetail = () => {
  const { slug } = useParams();
  const { state } = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [recentPosts, setRecentPosts] = useState(null);
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const fetchRecentPosts = (pageNumber = 0, pageLength = 9) => {
    const params = {
      pageNumber,
      pageLength,
      sortColumn: "publishedDate",
      sortDirection: "desc",
      searchParam: "",
    };
    dispatch(getBlogsList(params))
      .then((response) => {
        const posts = response?.payload?.data || [];
        const filteredPosts = posts.filter((post) => post.id !== state.id);
        setRecentPosts(filteredPosts);
      })
      .catch((err) => {
        console.error("Error fetching profiles:", err);
      });
  };

  useEffect(() => {
    const runtimeUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    setCanonicalUrl(runtimeUrl);
  }, [slug]);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const reservedRoutes = ["blogs", "skill"];
  if (reservedRoutes.includes(slug)) {
    return <navigate to={`/${slug}`} />;
  }

  if (!state) {
    return <Navigate to={`/not-found`} />;
  }

  return (
    state && (
      <>
        <Helmet>
          <link rel="canonical" href={canonicalUrl} />
          <meta name="title" content={`${state?.title}.`} />
          <meta name="description" content={`${state?.description}.`} />
          <meta name="keywords" content={`${state?.tags}.`} />
        </Helmet>

        <Container fluid className="bg-white">
          <Container className="py-5">
            <Row className="g-4">
              <Col xl={8} lg={8} md={8} sm={12} xs={12}>
                <Card className="shadow-sm rounded-lg border-0">
                  <Card.Body>
                    <h1 className="h1 font-weight-bold text-dark">
                      {state?.title}
                    </h1>
                    <div className="d-flex">
                      <p className="text-muted fs-5">
                        {state?.publishedDate} <span className="mx-2">|</span>
                        <span>
                          {calculateReadingTime(state?.content)} min reading
                          time
                        </span>
                      </p>
                    </div>
                    <HandleImages
                      imageSrc={state?.image}
                      imageAlt={state?.title}
                      imageStyle={{
                        width: "100%",
                        height: "400px",
                      }}
                      className="top"
                      placeholder="article"
                    />
                    <div dangerouslySetInnerHTML={{ __html: state?.content }} />
                    <div className="py-3">
                      {state?.tags &&
                        state.tags
                          .split(",")
                          .map((tag) => tag.trim())
                          .map((tag, index) => (
                            <span
                              key={index}
                              className="badge bg-danger text-white me-2 mb-2 rounded fw-normal"
                              style={{ fontSize: "14px" }}
                            >
                              {tag}
                            </span>
                          ))}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col
                xl={4}
                lg={4}
                md={4}
                sm={12}
                xs={12}
                style={{
                  position: "sticky",
                  top: "0", // Ensures the column stays at the top while scrolling
                  height: "100%", // Full viewport height minus a little padding
                  overflowY: "auto", // Scroll within the column when content overflows
                }}
              >
                <Card className="shadow-sm rounded-lg border-0">
                  <h3 className="px-2 py-3 font-weight-bold text-dark mb-0">
                    Recent Posts
                  </h3>
                  <Card.Body
                    style={{ maxHeight: "400px", overflowY: "auto" }}
                    className="pt-0"
                  >
                    {recentPosts && recentPosts?.length > 0 ? (
                      recentPosts.map((recentArticle) => (
                        <Row
                          key={recentArticle.encId}
                          className="pb-2 mb-3"
                          style={{ borderBottom: "1px solid #f1f1f1" }}
                        >
                          <Col xl={3} sm={3}>
                            <a
                              onClick={() =>
                                navigate(`/${recentArticle.slug}`, {
                                  state: recentArticle,
                                })
                              }
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              <HandleImages
                                imagePath={recentArticle.image}
                                imageAlt={recentArticle.title}
                                imageStyle={{ height: "100%", width: "100%" }}
                                placeholder="article"
                              />
                            </a>
                          </Col>
                          <Col xl={9} sm={9}>
                            <a
                              as={NavLink}
                              title={recentArticle.title}
                              className="text-dark h6"
                              onClick={() =>
                                navigate(`/${recentArticle.slug}`, {
                                  state: recentArticle,
                                })
                              }
                              style={{
                                cursor: "pointer",
                              }}
                            >
                              {truncateCharacters(recentArticle.title, 30)}
                            </a>
                            <p className="text-muted mb-0">
                              {truncateCharacters(
                                recentArticle.description,
                                50
                              )}
                              <a
                                className="text-primary"
                                onClick={() =>
                                  navigate(`/${recentArticle.slug}`, {
                                    state: recentArticle,
                                  })
                                }
                                style={{
                                  cursor: "pointer",
                                  fontSize: "13px",
                                }}
                              >
                                Read More
                              </a>
                            </p>
                          </Col>
                        </Row>
                      ))
                    ) : (
                      <p>No recent articles available.</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </Container>
      </>
    )
  );
};

export default ArticleDetail;
