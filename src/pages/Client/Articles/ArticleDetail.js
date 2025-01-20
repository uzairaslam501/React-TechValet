import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { valetBySkill } from "../../../redux/Actions/articleActions";
import { truncateCharacters } from "../../../utils/_helpers";
import HandleImages from "../../../components/Custom/Avatars/HandleImages";
import StarRating from "../../../components/Custom/Rating/StarRating";
import { Helmet } from "react-helmet-async";

const dataObjects = [
  {
    content: "<p>Here is some new content1</p>",
    description: "This is a new description1",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Sales",
    slug: "changed-slug-1",
    tags: "tag1, tag2",
    title: "Data Analyst Data Analyst Data Analyst",
  },
  {
    content: "<p>Here is some new content2</p>",
    description:
      "This is a new description2 This is a new description2 This is a new description2",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Marketing",
    slug: "changed-slug-2",
    tags: "tag3, tag4",
    title:
      "Software Engineer Software Engineer Software Engineer Software Engineer",
  },
  {
    content: "<p>Here is some new content3</p>",
    description:
      "This is a new description3 This is a new description3 This is a new description3 This is a new description3 This is a new description3",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Customer Success",
    slug: "changed-slug-3",
    tags: "tag5, tag6",
    title: "Product Manager",
  },
  {
    content: "<p>Here is some new content4</p>",
    description: "This is a new description4",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Design",
    slug: "changed-slug-4",
    tags: "tag7, tag8",
    title: "UX/UI Designer",
  },
  {
    content: "<p>Here is some new content5</p>",
    description: "This is a new description5",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Engineering",
    slug: "changed-slug-5",
    tags: "tag9, tag10",
    title: "Backend Engineer",
  },
  {
    content: "<p>Here is some new content6</p>",
    description: "This is a new description6",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Data Science",
    slug: "changed-slug-6",
    tags: "tag11, tag12",
    title: "Data Scientist",
  },
  {
    content: "<p>Here is some new content7</p>",
    description: "This is a new description7",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Product",
    slug: "changed-slug-7",
    tags: "tag13, tag14",
    title: "Product Owner",
  },
  {
    content: "<p>Here is some new content8</p>",
    description: "This is a new description8",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Research",
    slug: "changed-slug-8",
    tags: "tag15, tag16",
    title: "User Researcher",
  },
  {
    content: "<p>Here is some new content9</p>",
    description: "This is a new description9",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "content",
    slug: "changed-slug-9",
    tags: "tag17, tag18",
    title: "content Writer",
  },
  {
    content: "<p>Here is some new content10</p>",
    description: "This is a new description10",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    skill: "Mac",
    slug: "changed-slug-10",
    tags: "tag19, tag20",
    title: "Other title",
  },
];

const ArticleDetail = () => {
  const { slug } = useParams(); // Get the slug from the URL params
  const dispatch = useDispatch();
  const [article, setArticle] = useState(null);
  const [userRecords, setUserRecords] = useState(null);
  const [canonicalUrl, setCanonicalUrl] = useState("");

  const fetchProfiles = () => {
    if (article) {
      dispatch(valetBySkill(article.skill))
        .then((response) => {
          console.log(response?.payload);
          setUserRecords(response?.payload);
        })
        .catch((err) => {
          console.error("Error fetching profiles:", err);
        });
    }
  };

  // Find the article based on the slug
  useEffect(() => {
    const foundArticle = dataObjects.find((article) => article.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      // Handle case where the article is not found
      console.log("Article not found!");
    }
    const runtimeUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    setCanonicalUrl(runtimeUrl);
  }, [slug]);

  useEffect(() => {
    if (article) {
      fetchProfiles();
    }
  }, [article]);

  return (
    <>
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={`${article?.description}.`} />
        <meta name="keywords" content={`${article?.tags}.`} />
      </Helmet>
      {userRecords && (
        <Container className="my-5">
          <h2 className="text-center mb-4">Articles</h2>
          <Row className="g-4">
            {userRecords.map((user, index) => (
              <Col key={index} xl={3} lg={3} md={4} sm={12}>
                <Card className="shadow-sm h-100">
                  {user.userProfile && (
                    <HandleImages
                      imagePath={user.userProfile}
                      imageAlt={user.userName}
                      imageStyle={{
                        height: "200px",
                        width: "100%",
                      }}
                    />
                  )}
                  <Card.Body>
                    <StarRating averageStars={user.averageStars} />
                    <Card.Title>
                      {`${user.firstName} ${user.lastName}`}
                    </Card.Title>
                    <Card.Text className="text-muted">
                      {truncateCharacters(user.userDescription, 50)}
                    </Card.Text>
                    <Button
                      as={Link}
                      size="sm"
                      variant="primary"
                      to={`/preview-profile/${user.encUserId}`}
                      target="_self"
                      rel="noopener noreferrer"
                    >
                      View Profile
                    </Button>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">Skill: {article.skill}</small>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      )}
      <Container className="py-5">
        <Row>
          <Col xl={8} lg={8} md={8} sm={12} xs={12}>
            <Card>
              <Card.Img variant="top" src={article?.image} />
              <Card.Body>
                <Card.Title>{article?.title}</Card.Title>
                <Card.Text>{article?.description}</Card.Text>
                <div dangerouslySetInnerHTML={{ __html: article?.content }} />
                <Button variant="secondary">Back to Articles</Button>
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
              height: "500px",
              overflowY: "scroll",
            }}
          >
            <Card className="">
              <Card.Header>Recent Articles</Card.Header>
              <Card.Body>
                {dataObjects?.length ? (
                  dataObjects.map((recentArticle) => (
                    <Row
                      key={recentArticle.id}
                      className="pb-2 mb-3 "
                      style={{ borderBottom: "1px solid #999" }}
                    >
                      <Col xl={4} sm={4}>
                        <HandleImages
                          imagePath={recentArticle.image}
                          imageAlt={recentArticle.title}
                          imageStyle={{ height: "100%", width: "100%" }}
                        />
                      </Col>
                      <Col xl={8} sm={8}>
                        <a
                          title={recentArticle.title}
                          style={{
                            textDecoration: "underline",
                          }}
                          className="text-dark"
                          href={`/article/${recentArticle.slug}`}
                        >
                          {truncateCharacters(recentArticle.title, 30)}
                        </a>
                        <p className="mb-0">
                          {truncateCharacters(recentArticle.description, 50)}...{" "}
                          <br />
                          <a
                            className="text-primary"
                            style={{
                              fontSize: "13px",
                            }}
                            href={`/article/${recentArticle.slug}`}
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
    </>
  );
};

export default ArticleDetail;
