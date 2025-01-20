import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import { valetBySkill } from "../../../redux/Actions/seoActions";
import { truncateCharacters } from "../../../utils/_helpers";
import HandleImages from "../../../components/Custom/Avatars/HandleImages";
import StarRating from "../../../components/Custom/Rating/StarRating";
import "./SkillProfile.css";
import { Card } from "react-bootstrap";

const SkillProfiles = () => {
  const { skill } = useParams();
  const dispatch = useDispatch();
  const [userRecords, setUserRecords] = useState(null);
  const [skillArticle, setSkillArticle] = useState(null);
  const [canonicalUrl, setCanonicalUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchArticleContent = () => {
    setIsLoading(true);
    // dispatch(getArticlBySkill(skill))
    //   .then((response) => {
    //     setSkillArticle(response?.payload);
    //   })
    //   .catch((err) => {
    //     console.error("Error fetching profiles:", err);
    //   });
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
      fetchProfiles();
    }
  }, [skill]);

  return (
    <div className="profiles-container">
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta
          name="description"
          content={`Discover profiles with skill: ${skill}.`}
        />
        <meta name="keywords" content={`skills, ${skill}, profiles`} />
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
                        {truncateCharacters(user.userDescription, 70)}
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
              <Card className="my-5">
                <Card.Body className="p-5">
                  <Card.Text>
                    <h2>Which Technologies Covered in Web Development</h2>
                    <p>
                      We begin by setting up a clear roadmap and finalizing our
                      plans according to the client's requirements. We allocate
                      resources and prepare the tools necessary for a successful
                      deployment. This phase sets the foundation with clear
                      timelines, roles, and tasks.
                    </p>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SkillProfiles;
