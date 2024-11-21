import React from "react";

const EventToast = ({ event }) => {
  return (
    <div>
      <strong>{event.title}</strong>
      <br />
      Start: {event.start.toLocaleString()}
      <br />
      End: {event.end ? event.end.toLocaleString() : "N/A"}
      <br />
      Status: {event.extendedProps.description}
    </div>
  );
};

export default EventToast;
