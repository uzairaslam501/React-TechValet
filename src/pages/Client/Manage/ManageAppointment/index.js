import React, { useState } from "react";
import Appointment from "./Appointments/appointment";
import Order from "../ManageOrders/Orders/order";

const ManageAppointment = () => {
  const [isAppointmentComplete, setIsAppointmentComplete] = useState(false);

  // Run the Appointment component first
  const handleAppointmentComplete = () => {
    setIsAppointmentComplete(true);
  };

  return <>{<Appointment onComplete={handleAppointmentComplete} />}</>;
};

export default ManageAppointment;
