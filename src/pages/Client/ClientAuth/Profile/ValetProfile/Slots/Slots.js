import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getAvailability } from "../../../../../../redux/Actions/serviceActions";

const Slots = ({ userRecord }) => {
  const dispatch = useDispatch();
  const [availabilityData, setAvailabilityData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchAvailability = () => {
    dispatch(getAvailability(userRecord?.userEncId)).then((response) => {
      setAvailabilityData(response?.payload || []);
    });
  };

  const callAPI = () => {
    fetchAvailability();
    setShowModal(true);
  };

  const updateSlotTime = (id, slotUpdates) => {
    // Replace this with your API call logic
    console.log("Updating slot time for ID:", id, "with updates:", slotUpdates);
  };

  const toggleAllSlots = (id) => {
    setAvailabilityData((prevData) =>
      prevData.map((row) => {
        if (row.id === id) {
          const updatedSlots = {
            slot1: row.slot1 === "1" ? "0" : "1",
            slot2: row.slot2 === "2" ? "0" : "2",
            slot3: row.slot3 === "3" ? "0" : "3",
            slot4: row.slot4 === "4" ? "0" : "4",
          };
          updateSlotTime(id, updatedSlots); // Call updateSlotTime with all slot updates
          return { ...row, ...updatedSlots };
        }
        return row;
      })
    );
  };

  const handleSlotChange = (id, slotNumber, currentValue) => {
    const newValue =
      currentValue === slotNumber.toString() ? "0" : slotNumber.toString();
    setAvailabilityData((prevData) =>
      prevData.map((row) =>
        row.id === id ? { ...row, [`slot${slotNumber}`]: newValue } : row
      )
    );
    updateSlotTime(id, { [`slot${slotNumber}`]: newValue }); // Call updateSlotTime for the specific slot
  };

  const determineSelectAllState = (data) => {
    const slots = [data.slot1, data.slot2, data.slot3, data.slot4];
    const allSelected = slots.every(
      (slot, index) => slot === (index + 1).toString()
    );
    const noneSelected = slots.every((slot) => slot === "0");
    return allSelected ? true : noneSelected ? false : "indeterminate";
  };

  const renderSwitch = (slot, id, slotNumber) => (
    <Form.Check
      type="switch"
      id={`customSwitchesForSlots${slotNumber}${id}`}
      checked={slot === slotNumber.toString()}
      onChange={() => handleSlotChange(id, slotNumber, slot)}
      disabled={userRecord?.role === "Valet" ? false : true}
    />
  );

  const renderSelectAll = (data) => {
    const selectAllState = determineSelectAllState(data);

    return (
      <Form.Check
        type="switch"
        id={`selectAll${data.id}`}
        checked={selectAllState === true}
        ref={(el) => {
          if (el) el.indeterminate = selectAllState === "indeterminate";
        }}
        disabled={userRecord?.role === "Valet" ? false : true}
        onChange={() => toggleAllSlots(data.id)}
      />
    );
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
              {availabilityData.map((data) => (
                <tr key={data.id}>
                  <td>
                    {data.dayName} ({data.dateTimeOfDay})
                  </td>
                  <td>{renderSelectAll(data)}</td>
                  <td>{renderSwitch(data.slot1, data.id, 1)}</td>
                  <td>{renderSwitch(data.slot2, data.id, 2)}</td>
                  <td>{renderSwitch(data.slot3, data.id, 3)}</td>
                  <td>{renderSwitch(data.slot4, data.id, 4)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Slots;
