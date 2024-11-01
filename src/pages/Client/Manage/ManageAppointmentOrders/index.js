import React, { useState } from "react";
import Appointment from "./Appointments/appointment";
import Order from "./Orders/order";

const ManageAppointment = () => {
  const [isAppointmentComplete, setIsAppointmentComplete] = useState(false);

  // Run the Appointment component first
  const handleAppointmentComplete = () => {
    setIsAppointmentComplete(true);
  };

  return (
    <>
      {<Appointment onComplete={handleAppointmentComplete} />}
      {<Order isLoading={isAppointmentComplete} />}
    </>
  );
};

export default ManageAppointment;
