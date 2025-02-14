import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import {
  GetBlogBySkill,
  valetBySkill,
} from "../../../../redux/Actions/seoActions";
import { truncateCharacters } from "../../../../utils/_helpers";
import HandleImages from "../../../../components/Custom/Avatars/HandleImages";
import StarRating from "../../../../components/Custom/Rating/StarRating";
import { Card } from "react-bootstrap";
import "./style.css";

const SkillProfiles = () => {
  const { skill } = useParams();
  const dispatch = useDispatch();
  const [userRecords, setUserRecords] = useState(null);
  const [skillArticle, setSkillArticle] = useState(null);
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchRecordBySkill = () => {
    setIsLoading(true);
    dispatch(GetBlogBySkill(skill))
      .then((response) => {
        console.log(response?.payload);
        setSkillArticle(response?.payload);
      })
      .catch((err) => {
        console.error("Error fetching profiles:", err);
      });
    fetchProfiles();
  };

  const fetchProfiles = () => {
    if (skill) {
      dispatch(valetBySkill(skill))
        .then((response) => {
          setUserRecords(response?.payload);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching profiles:", err);
        });
    }
  };

  useEffect(() => {
    if (skill) {
      const runtimeUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      setCanonicalUrl(runtimeUrl);
      setIsLoading(true);
      fetchRecordBySkill();
    }
  }, [skill]);

  return (
    <div className="profiles-container">
      <Helmet>
        <title>{`${skillArticle?.title} - Tech Valet`}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="description" content={`${skillArticle?.description}`} />
        <meta name="keywords" content={`${skillArticle?.tags}`} />
      </Helmet>

      {isLoading ? (
        <div className="profiles-loading">
          <div className="spinner"></div>
        </div>
      ) : (
        <>
          {userRecords && (
            <div className="profiles-content">
              <h2 className="profiles-heading py-2">{`Valet profiles related to: ${skill}`}</h2>
              {userRecords?.length > 0 ? (
                <div className="profiles-grid">
                  {userRecords.map((user, index) => (
                    <div className="profile-card" key={index}>
                      {user.userProfile && (
                        <div className="profile-image-wrapper">
                          <HandleImages
                            imagePath={user.userProfile}
                            imageAlt={user.userName}
                            imageStyle={{
                              height: "200px",
                              width: "100%",
                              objectFit: "cover",
                              borderRadius: "12px 12px 0 0",
                            }}
                          />
                        </div>
                      )}
                      <div className="profile-card-body">
                        <div className="profile-rating">
                          <StarRating averageStars={user.averageStars} />
                        </div>
                        <h3 className="profile-name">{`${user.firstName} ${user.lastName}`}</h3>
                        <p className="profile-description">
                          {user?.userDescription &&
                            truncateCharacters(user.userDescription, 70)}
                        </p>
                        <Link
                          to={`/preview-profile/${user.encUserId}`}
                          className="profile-view-button"
                        >
                          View Profile
                        </Link>
                      </div>
                      <div className="profile-card-footer">
                        <small className="profile-skill">Skill: {skill}</small>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center h3">
                  No profiles found for this skill.
                </div>
              )}

              {skillArticle && (
                <Card className="my-5">
                  <Card.Body className="p-5">
                    <Card.Text>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: skillArticle?.content,
                        }}
                      />
                    </Card.Text>
                  </Card.Body>
                </Card>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SkillProfiles;
