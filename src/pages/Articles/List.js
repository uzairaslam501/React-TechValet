import React, { useEffect, useState } from "react";
import Dialogue from "../../components/Custom/Modal/modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import CustomTable from "../../components/Custom/Datatable/table";

const dataObjects = [
  {
    Content: "<p>Here is some new content1</p>",
    Description: "This is a new description1",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Sales",
    Slug: "changed-slug-1",
    Tags: "tag1, tag2",
    Title: "Data Analyst",
  },
  {
    Content: "<p>Here is some new content2</p>",
    Description: "This is a new description2",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Marketing",
    Slug: "changed-slug-2",
    Tags: "tag3, tag4",
    Title: "Software Engineer",
  },
  {
    Content: "<p>Here is some new content3</p>",
    Description: "This is a new description3",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Customer Success",
    Slug: "changed-slug-3",
    Tags: "tag5, tag6",
    Title: "Product Manager",
  },
  {
    Content: "<p>Here is some new content4</p>",
    Description: "This is a new description4",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Design",
    Slug: "changed-slug-4",
    Tags: "tag7, tag8",
    Title: "UX/UI Designer",
  },
  {
    Content: "<p>Here is some new content5</p>",
    Description: "This is a new description5",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Engineering",
    Slug: "changed-slug-5",
    Tags: "tag9, tag10",
    Title: "Backend Engineer",
  },
  {
    Content: "<p>Here is some new content6</p>",
    Description: "This is a new description6",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Data Science",
    Slug: "changed-slug-6",
    Tags: "tag11, tag12",
    Title: "Data Scientist",
  },
  {
    Content: "<p>Here is some new content7</p>",
    Description: "This is a new description7",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Product",
    Slug: "changed-slug-7",
    Tags: "tag13, tag14",
    Title: "Product Owner",
  },
  {
    Content: "<p>Here is some new content8</p>",
    Description: "This is a new description8",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Research",
    Slug: "changed-slug-8",
    Tags: "tag15, tag16",
    Title: "User Researcher",
  },
  {
    Content: "<p>Here is some new content9</p>",
    Description: "This is a new description9",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Content",
    Slug: "changed-slug-9",
    Tags: "tag17, tag18",
    Title: "Content Writer",
  },
  {
    Content: "<p>Here is some new content10</p>",
    Description: "This is a new description10",
    image:
      "https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-1170x780.jpg",
    Skill: "Other",
    Slug: "changed-slug-10",
    Tags: "tag19, tag20",
    Title: "Other Title",
  },
];

const headers = [
  { id: "0", label: "Action", column: "Action" },
  { id: "Title", label: "Title", column: "Title" },
  {
    id: "Skill",
    label: "Skill",
    column: "Skill",
  },
  {
    id: "0",
    label: "Description",
    column: "Description",
  },
  {
    id: "0",
    label: "Image",
    column: "image",
  },
];

const ArticleList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalRecord, setTotalRecords] = useState();
  const [articlesRecord, setArticlesRecord] = useState([]);

  const [loader, setLoader] = useState(false);
  const [deleteLoader, setDeleteLoader] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDelete, setIsDelete] = useState();
  const [pageLength, setPageLength] = useState(10);

  const buttons = [
    {
      id: 1,
      title: "Delete",
      onClick: (row) => handleOpen(row.id),
      variant: "outline-danger",
      icon: "bi bi-trash",
    },
    {
      id: 2,
      title: "View",
      onClick: (row) => onView(row),
      variant: "outline-success",
      icon: "bi bi-pencil",
    },
  ];

  const fetchRecords = async (
    pageNumber = 0,
    pageLength = 10,
    sortColumn = "",
    sortDirection = "",
    searchParam = ""
  ) => {
    const params = {
      pageNumber,
      pageLength,
      sortColumn,
      sortDirection,
      searchParam,
    };

    try {
      setLoader(true);
      setArticlesRecord(dataObjects);
      setTotalRecords(dataObjects?.length);
      //   dispatch(getAppointments(params))
      //     .then((response) => {
      //       setArticlesRecord(response.payload?.data);
      //       setTotalRecords(response.payload?.recordsTotal);
      //     })
      //     .catch((error) => {
      //       setArticlesRecord([]);
      //       setTotalRecords(0);
      //     });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleOpen = (id) => {
    setIsDelete(id);
    setShowDeleteModal(true);
  };

  const handleClose = () => {
    setDeleteLoader(false);
    setIsDelete("");
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    setDeleteLoader(true);
    const endpoint = `User/DeleteRecord?id=${isDelete}`;
    handleClose();
  };

  const onView = (row) => {
    navigate("/add-article", { state: row });
  };

  useEffect(() => {
    fetchRecords(0, pageLength);
  }, [pageLength]);

  return (
    <>
      <Container className="py-5">
        <Row className="text-center">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card className="shadow">
              <CardBody>
                <h2 className="fw-bold">Manage Appointments with Tech Valet</h2>
                <CustomTable
                  headers={headers}
                  records={articlesRecord}
                  totalRecords={totalRecord}
                  pageLength={pageLength}
                  buttons={buttons}
                  onPageChange={fetchRecords}
                  onPageLengthChange={setPageLength}
                  loader={loader}
                  searchFunctionality={false}
                  pageLengthFunctionality={true}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      <Dialogue
        show={showDeleteModal}
        onHide={handleClose}
        headerClass=""
        title="Warning"
        bodyContent={
          <p>
            <span className="fw-bold">Attention:</span> Deleting the record
            erases all data associated with it. Double-check before confirming.
            💾
          </p>
        }
        backdrop="static"
        customFooterButtons={[
          { text: "Confirm", variant: "danger", onClick: handleDelete },
          {
            text: "Cancel",
            className: "btn-secondary-secondary",
            onClick: handleClose,
          },
        ]}
      />
    </>
  );
};

export default ArticleList;
