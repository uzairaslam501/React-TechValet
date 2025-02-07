import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getAvailability,
  updateSlotTimes,
} from "../../../../../redux/Actions/serviceActions";

const Slots = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [slotUpdates, setSlotUpdates] = useState([]);
  const [callLoader, setCallLoader] = useState(false);
  const [slotsLoader, setSlotsLoader] = useState(false);
  const [availabilityData, setAvailabilityData] = useState([]);

  const fetchAvailability = () => {
    setCallLoader(true);
    dispatch(getAvailability(userRecord?.userEncId)).then((response) => {
      setAvailabilityData(response?.payload || []);
      setCallLoader(false);
    });
  };

  const callAPI = () => {
    fetchAvailability();
    setShowModal(true);
  };

  const updateSlotTime = (slotUpdates) => {
    setSlotsLoader(true);
    dispatch(
      updateSlotTimes({ userId: userRecord?.userEncId, slots: slotUpdates })
    ).then((response) => {
      setSlotsLoader(false);
    });
  };

  const toggleAllSlots = (id) => {
    setAvailabilityData((prevData) =>
      prevData.map((row) => {
        if (row.id === id) {
          const areAllSelected =
            row.slot1 === "1" &&
            row.slot2 === "2" &&
            row.slot3 === "3" &&
            row.slot4 === "4";

          // If all slots are selected, deselect all; otherwise, select all
          const updatedSlots = areAllSelected
            ? { slot1: "0", slot2: "0", slot3: "0", slot4: "0" }
            : { slot1: "1", slot2: "2", slot3: "3", slot4: "4" };

          // Add the update to the slotUpdates list
          setSlotUpdates((prevUpdates) => {
            const existingUpdateIndex = prevUpdates.findIndex(
              (update) => update.id === id
            );
            if (existingUpdateIndex !== -1) {
              // Merge changes with existing entry
              const newUpdates = [...prevUpdates];
              newUpdates[existingUpdateIndex] = {
                ...newUpdates[existingUpdateIndex],
                ...updatedSlots,
              };
              return newUpdates;
            } else {
              // Add a new entry
              return [...prevUpdates, { id, ...updatedSlots }];
            }
          });

          return { ...row, ...updatedSlots };
        }
        return row;
      })
    );
  };

  const handleSlotChange = (id, slotNumber, currentValue) => {
    const newValue =
      currentValue === slotNumber.toString() ? "0" : slotNumber.toString();

    // Update the availability data
    setAvailabilityData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [`slot${slotNumber}`]: newValue } : row
      )
    );

    // Add the update to the slotUpdates list
    setSlotUpdates((prevUpdates) => {
      const existingUpdateIndex = prevUpdates.findIndex(
        (update) => update.id === id
      );

      if (existingUpdateIndex !== -1) {
        // Merge changes with existing entry for the same ID
        const updatedEntry = {
          ...prevUpdates[existingUpdateIndex],
          [`slot${slotNumber}`]: newValue,
        };
        const newUpdates = [...prevUpdates];
        newUpdates[existingUpdateIndex] = updatedEntry;
        return newUpdates;
      } else {
        // Add a new entry for this ID
        return [...prevUpdates, { id, [`slot${slotNumber}`]: newValue }];
      }
    });
  };

  const determineSelectAllState = (data) => {
    const slots = [data.slot1, data.slot2, data.slot3, data.slot4];
    const allSelected = slots.every(
      (slot, index) => slot === (index + 1).toString()
    );
    const noneSelected = slots.every((slot) => slot === "0");
    return allSelected ? true : noneSelected ? false : "indeterminate";
  };

  const renderSwitch = (slot, id, slotNumber, dateTimeOfDay) => {
    const isPastDate = new Date(dateTimeOfDay) < new Date();
    return (
      <Form.Check
        type="switch"
        id={`customSwitchesForSlots${slotNumber}${id}`}
        checked={slot === slotNumber.toString()}
        onChange={() => handleSlotChange(id, slotNumber, slot)}
        disabled={isPastDate || userRecord?.role !== "Valet"}
      />
    );
  };

  const renderSelectAll = (data) => {
    const selectAllState = determineSelectAllState(data);
    const isPastDate = new Date(data.dateTimeOfDay) < new Date();
    return (
      <Form.Check
        type="switch"
        id={`selectAll${data.id}`}
        checked={selectAllState === true}
        ref={(el) => {
          if (el) el.indeterminate = selectAllState === "indeterminate";
        }}
        disabled={isPastDate || userRecord?.role !== "Valet"}
        onChange={() => toggleAllSlots(data.id)}
      />
    );
  };

  const saveUpdates = () => {
    updateSlotTime(slotUpdates); // Call your backend API
  };

  return (
    <>
      <Button size="sm" variant="primary" onClick={() => callAPI()}>
        Check Availability
      </Button>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Availability</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="mb-3">
            <Col className="text-end">
              <Button
                size="sm"
                variant="primary"
                onClick={saveUpdates}
                disabled={slotsLoader}
              >
                {slotsLoader ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Save Changes"
                )}
              </Button>
            </Col>
          </Row>

          <Table bordered hover responsive className="text-center">
            <thead>
              <tr>
                <th style={{ width: "200px" }}>
                  <p>Days</p>
                </th>
                <th style={{ width: "110px" }}>
                  <p>Select All</p>
                </th>
                <th style={{ width: "110px" }}>
                  Morning<p>(7am-12pm)</p>
                </th>
                <th style={{ width: "110px" }}>
                  Afternoon <p>(12pm-5pm)</p>
                </th>
                <th style={{ width: "110px" }}>
                  Evening <p>(5pm-10pm)</p>
                </th>
                <th style={{ width: "110px" }}>
                  Night <p>(12am-7am)</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {callLoader ? (
                <tr>
                  <td colSpan={6}>
                    <Spinner
                      animation="grow"
                      size="sm"
                      className="text-center"
                    />
                  </td>
                </tr>
              ) : (
                availabilityData &&
                availabilityData.map((data) => (
                  <tr key={data.id}>
                    <td>
                      {data.dayName} ({data.dateTimeOfDay})
                    </td>
                    <td>{renderSelectAll(data)}</td>
                    <td>
                      {renderSwitch(data.slot1, data.id, 1, data.dateTimeOfDay)}
                    </td>
                    <td>
                      {renderSwitch(data.slot2, data.id, 2, data.dateTimeOfDay)}
                    </td>
                    <td>
                      {renderSwitch(data.slot3, data.id, 3, data.dateTimeOfDay)}
                    </td>
                    <td>
                      {renderSwitch(data.slot4, data.id, 4, data.dateTimeOfDay)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Slots;
