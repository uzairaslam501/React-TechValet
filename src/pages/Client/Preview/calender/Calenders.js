import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import * as bootstrap from "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MyCalendar = ({
  events,
  permissions = {
    canViewDetails: true,
    canEditEvents: false,
    canNavigate: true,
    canChangeView: true,
    canDateClick: true,
  },
  validRange,
  handleDateClick,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const headerToolbar = {
    left: permissions.canNavigate ? "prev,next today" : "",
    center: isMobile ? "" : "title",
    right: permissions.canChangeView ? "dayGridMonth,timeGridDay" : "",
  };

  const handleEventClick = (info) => {
    if (permissions.canViewDetails && info.event.url) {
      info.jsEvent.preventDefault();
      window.open(info.event.url, "_blank");
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={headerToolbar}
      events={events}
      validRange={validRange}
      navLinks={permissions.canNavigate}
      selectable={permissions.canEditEvents}
      dateClick={(info) => {
        if (permissions.canDateClick) {
          info.view.calendar.gotoDate(info.date);
          info.view.calendar.changeView("timeGridDay");
          handleDateClick(info.date);
        }
      }}
      eventClick={handleEventClick}
      eventMouseEnter={(info) => {
        const { description } = info.event.extendedProps;
        const tooltip = new bootstrap.Popover(info.el, {
          title: `<strong>${info.event.title}</strong>`,
          content: `
            <strong>Status:</strong> ${description || "N/A"}<br/>
            <strong>Start:</strong> ${info.event.start.toLocaleString()}<br/>
            <strong>End:</strong> ${info.event.end?.toLocaleString() || "N/A"}
          `,
          html: true,
          trigger: "hover",
          placement: "top",
        });
        info.el.onmouseleave = () => tooltip.dispose();
      }}
    />
  );
};

export default MyCalendar;
