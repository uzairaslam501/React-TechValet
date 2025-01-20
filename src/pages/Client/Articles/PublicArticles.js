import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { truncateCharacters } from "../../../utils/_helpers";
import { Link } from "react-router-dom";

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

const PublicArticles = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Articles</h2>
      <Row className="g-4">
        {dataObjects.map((article, index) => (
          <Col key={index} xl={3} lg={3} md={4} sm={12}>
            <Card className="shadow-sm h-100">
              {article.image && (
                <Card.Img
                  variant="top"
                  src={article.image}
                  alt={article.title}
                />
              )}
              <Card.Body>
                <Card.Title title={article.title}>
                  {truncateCharacters(article.title, 25)}
                </Card.Title>
                <Card.Text className="text-muted">
                  {truncateCharacters(article.description, 40)}
                </Card.Text>
                <Button
                  as={Link}
                  size="sm"
                  variant="primary"
                  to={`/article/${article.slug}`}
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Read More
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
  );
};

export default PublicArticles;
