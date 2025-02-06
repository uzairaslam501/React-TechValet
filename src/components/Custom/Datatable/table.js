import React, { useState } from "react";
import {
  Table,
  Container,
  Button,
  FormGroup,
  InputGroup,
} from "react-bootstrap";
import CustomButtons from "../Button/buttons";
import { NavLink } from "react-router-dom";
import BadgeStatus from "../StatusBadge/StatusBadge";
import { truncateCharacters } from "../../../utils/_helpers";
import HandleImages from "../Avatars/HandleImages";

function CustomTable({
  headers,
  records,
  totalRecords,
  pageLength,
  buttons,
  onPageChange,
  onPageLengthChange,
  loader,
  searchFunctionality,
  pageLengthFunctionality,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(pageLength);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [sortColumn, setSortColumn] = useState("");
  const [sortDirection, setSortDirection] = useState("");

  const handleSort = (headerId) => {
    const isAsc = sortColumn === headerId && sortDirection === "asc";
    const newSortDirection = isAsc ? "desc" : "asc";
    setSortColumn(headerId);
    setSortDirection(newSortDirection);
    onPageChange(page, rowsPerPage, headerId, newSortDirection, search);
  };

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
      onPageChange(page + 1, rowsPerPage, "", "", search);
    }
  };

  const handlePreviousPage = () => {
    if (page > 0) {
      setPage(page - 1);
      onPageChange(page - 1, rowsPerPage, "", "", search);
    }
  };

  const handlePageClick = (pageIndex) => {
    setPage(pageIndex);
    onPageChange(pageIndex, rowsPerPage, "", "", search);
  };

  const currentRecords = records;

  const renderPagination = () => {
    const pagination = [];

    if (totalPages <= 3) {
      for (let i = 0; i < totalPages; i++) {
        pagination.push(
          <Button
            key={i}
            onClick={() => handlePageClick(i)}
            variant={page === i ? "secondary-secondary" : "primary-secondary"}
            className="m-1"
            disabled={page === i} // Disable the current page button
          >
            {i + 1}
          </Button>
        );
      }
    } else {
      if (page > 1) {
        pagination.push(
          <Button
            key={0}
            size="md"
            onClick={() => handlePageClick(0)}
            variant="primary-secondary"
            className="m-1"
          >
            1
          </Button>
        );
      }

      if (page === totalPages - 2 || page === totalPages - 1) {
        pagination.push(<span key="ellipsis1">...</span>);
      }

      pagination.push(
        <Button
          key={page}
          size="md"
          onClick={() => handlePageClick(page)}
          variant="secondary-secondary"
          className="m-1"
          disabled
        >
          {page + 1}
        </Button>
      );

      if (page <= totalPages - 2) {
        if (page !== totalPages - 2) {
          pagination.push(<span key="ellipsis2">...</span>);
        }
        pagination.push(
          <Button
            size="md"
            key={totalPages - 1}
            onClick={() => handlePageClick(totalPages - 1)}
            variant="primary-secondary"
            className="m-1"
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pagination;
  };

  const handleSearch = () => {
    setPage(0);
    onPageChange(0, rowsPerPage, "", "", search);
  };

  return (
    <Container>
      <div className="d-flex justify-content-between py-3">
        {pageLengthFunctionality && (
          <div>
            <span>Page Length: </span>
            <select
              value={rowsPerPage}
              onChange={(e) => {
                const newPageLength = Number(e.target.value);
                setRowsPerPage(newPageLength);
                onPageLengthChange(newPageLength);
                onPageChange(page, newPageLength, "", "", search);
              }}
              className="form-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        )}
        {searchFunctionality && (
          <FormGroup className="d-flex" style={{ alignItems: "flex-end" }}>
            <div className="col-9">
              <input
                type="text"
                size="sm"
                className="form-control"
                placeholder="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
            <div className="col-3">
              <Button variant="primary" onClick={handleSearch}>
                <i className="bi bi-search"></i>
              </Button>
            </div>
          </FormGroup>
        )}
      </div>

      <Table
        striped
        bordered
        hover
        responsive
        style={{ verticalAlign: "middle" }}
      >
        <thead style={{ backgroundColor: "#000" }}>
          <tr>
            {headers.map((header) => (
              <th
                key={header.column}
                onClick={() => header.id !== "0" && handleSort(header.id)}
                style={{
                  cursor: "pointer",
                }}
                className="py-3"
              >
                {header.label}
                {header.id !== "0" && sortColumn === header.id && (
                  <i
                    className={`bi bi-chevron-${
                      sortDirection === "asc" ? "up" : "down"
                    }`}
                  ></i>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {!loader ? (
            currentRecords.length >= 1 ? (
              currentRecords.map((row) => (
                <tr key={row.id}>
                  {headers.map((header) => (
                    <td
                      key={header.column}
                      style={{
                        color: "#666",
                      }}
                    >
                      {header.column === "Action" ? (
                        <CustomButtons buttons={buttons} row={row} />
                      ) : header.column === "profilePath" ||
                        header.column === "image" ? (
                        <a
                          href={row.image}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <HandleImages
                            imagePath={row.image}
                            imageAlt=""
                            imageStyle={{ width: "50px", height: "50px" }}
                          />
                        </a>
                      ) : header.column === "orderPrice" ? (
                        <>
                          <p>
                            <span className="fw-bold">$</span>
                            {row[header.column]}
                          </p>
                        </>
                      ) : header.column === "encOrderId" ? (
                        <>
                          <Button
                            as={NavLink}
                            to={`/order-details/${row.encOrderId}`}
                            className="text-primary bg-transparent border-0 p-0"
                          >
                            <u>{row.encOrderId}</u>
                          </Button>
                        </>
                      ) : header.column === "orderReasonType" ? (
                        <>
                          {row.orderReasonType === "3" &&
                          row.orderReasonIsActive === "1" ? (
                            <Button
                              size="sm"
                              as={NavLink}
                              to={`/order-details/${row.encId}`}
                              variant="danger"
                            >
                              Cancelled
                            </Button>
                          ) : row.isDelivered === "0" ? (
                            <Button
                              size="sm"
                              as={NavLink}
                              to={`/order-details/${row.encId}`}
                              className="btn-secondary-secondary"
                            >
                              In Progress
                            </Button>
                          ) : row.isDelivered === "1" ? (
                            <Button
                              size="sm"
                              as={NavLink}
                              to={`/order-details/${row.encId}`}
                              variant="success"
                            >
                              Delivered
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              as={NavLink}
                              to={`/order-details/${row.encId}`}
                              className="btn-primary-secondary"
                            >
                              Completed
                            </Button>
                          )}
                        </>
                      ) : header.column === "status" ? (
                        <>
                          {row.remainingSessions > 0 ? (
                            <span>Activate</span>
                          ) : (
                            <span>Expired</span>
                          )}
                        </>
                      ) : header.column == "orderStatus" ? (
                        <>
                          {row.orderStatus !== "" ? (
                            <NavLink
                              to={`/order-details/${
                                row.encOrderId || row.orderEncId
                              }`}
                            >
                              <BadgeStatus status={parseInt(row.orderStatus)} />
                            </NavLink>
                          ) : (
                            <BadgeStatus status="N/A" />
                          )}
                          {}
                        </>
                      ) : header.column == "paymentStatus" ? (
                        <>
                          {row.paymentStatus.toUpperCase() === "COMPLETED" ? (
                            <BadgeStatus status="Completed" />
                          ) : row.paymentStatus.toUpperCase() === "REFUNDED" ? (
                            <BadgeStatus status="Refunded" />
                          ) : row.paymentStatus.toUpperCase() ===
                            "PAID-BY-PACKAGE" ? (
                            <BadgeStatus status="Package" />
                          ) : (
                            <BadgeStatus status="N/A" />
                          )}
                        </>
                      ) : header.column == "stripeStatus" ? (
                        <>
                          {row.orderStatus === "0" ? (
                            <span className="text-warning">Pending</span>
                          ) : row.orderStatus === "1" ? (
                            <span className="text-success">Completed</span>
                          ) : row.orderStatus === "2" ? (
                            <span className="text-danger">Cancelled</span>
                          ) : (
                            <span className="text-info">In Progress</span>
                          )}
                        </>
                      ) : (
                        <span title={row[header.column]}>
                          {row[header.column] &&
                            truncateCharacters(row[header.column], 25)}
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center">
                  No Record Found
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center">
                <div className="spinner-border" role="status"></div>
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between align-items-center p-3">
        <div>
          Showing {page * rowsPerPage + 1}-
          {Math.min((page + 1) * rowsPerPage, totalRecords)} of {totalRecords}{" "}
          records
        </div>

        <div>
          <Button
            variant="primary-secondary"
            onClick={handlePreviousPage}
            disabled={page === 0}
            className="m-1"
          >
            <i className="bi bi-arrow-left"></i>
          </Button>
          {renderPagination()}
          <Button
            variant="primary-secondary"
            onClick={handleNextPage}
            disabled={page === totalPages - 1}
            className="m-1"
          >
            <i className="bi bi-arrow-right"></i>
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default CustomTable;
