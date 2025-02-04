import React from "react";
import { Card } from "react-bootstrap";
import HandleImages from "../Avatars/HandleImages";
import { truncateCharacters } from "../../../utils/_helpers";
import { useNavigate } from "react-router";

const CustomCard = ({ article }) => {
  const navigate = useNavigate();
  return (
    <Card
      className="shadow-sm h-100 p-3"
      style={{
        borderRadius: "20px",
        cursor: "pointer",
        border: "1px solid #999",
      }}
      onClick={() => navigate(`/${article.slug}`, { state: article })}
    >
      <HandleImages
        imagePath={article.image}
        imageAlt={article.title}
        className="top"
        imageStyle={{
          width: "100%",
          height: "170px",
          borderRadius: "15px",
        }}
        placeholder="article"
      />
      <Card.Body className="px-0">
        <Card.Title
          title={article.title}
          style={{
            cursor: "pointer",
          }}
        >
          {truncateCharacters(article.title, 27)}
        </Card.Title>
        <Card.Text className="text-muted">
          {truncateCharacters(article.description, 50)}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="border-0">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <HandleImages
              imagePath={article?.publisherImage}
              imageAlt={article?.publishedBy}
              imageStyle={{
                width: "45px",
                height: "45px",
                borderRadius: "5px",
              }}
            />
            <div className="mx-2">
              <h5 className="text-dark text-capitalize mb-1">
                {article?.publishedBy}
              </h5>
              <p className="m-0 text-muted">{article?.publishedDate}</p>
            </div>
          </div>
          <div className="text-end">
            <i className="bi bi-bookmark"></i>
          </div>
        </div>
      </Card.Footer>
    </Card>
  );
};

export default CustomCard;
