import React, { useEffect, useState } from "react";
import Dialogue from "../../../components/Custom/Modal/modal";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Card, CardBody, Col, Container, Row } from "react-bootstrap";
import CustomTable from "../../../components/Custom/Datatable/table";
import { getSkillsContentList } from "../../../redux/Actions/seoActions";
import { deleteRecords } from "../../../redux/Actions/globalActions";

const headers = [
  { id: "0", label: "Action", column: "Action" },
  { id: "Title", label: "Title", column: "title" },
  {
    id: "0",
    label: "Skill",
    column: "skill",
  },
  {
    id: "0",
    label: "Description",
    column: "description",
  },
  {
    id: "0",
    label: "Image",
    column: "image",
  },
];

const SkillContentList = () => {
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
      onClick: (row) => handleOpen(row.encId),
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
      dispatch(getSkillsContentList(params))
        .then((response) => {
          console.log(response.payload?.data);
          setArticlesRecord(response.payload?.data);
          setTotalRecords(response.payload?.recordsTotal);
        })
        .catch((error) => {
          setArticlesRecord([]);
          setTotalRecords(0);
        });
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
    const endpoint = `Blogs/DeleteBlog/${isDelete}`;
    dispatch(deleteRecords(endpoint)).then((response) => {
      if (response?.payload) {
        fetchRecords(0, pageLength);
      }
    });
    handleClose();
  };

  const onView = (row) => {
    navigate("/add-content", { state: row });
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
                <h2 className="fw-bold">Manage Skills Content</h2>
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

export default SkillContentList;
