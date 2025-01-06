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

  const updateWindowSize = () => {
    setIsMobile(window.innerWidth <= 600);
  };
  const clickEventCalendar = (url) => {
    console.log("Event URL:", url);
  };

  const headerToolbar = permissions.canChangeView
    ? {
        left: permissions.canNavigate ? "prev,next today" : "",
        center: isMobile ? "" : "title",
        right: "dayGridMonth,timeGridDay",
      }
    : { center: "title" };

  useEffect(() => {
    window.addEventListener("resize", updateWindowSize);
    // Remove event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateWindowSize);
    };
  }, []);

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={headerToolbar}
        events={events}
        navLinks={permissions.canNavigate}
        selectable={permissions.canEditEvents}
        validRange={validRange}
        dateClick={(info) => {
          if (permissions.canDateClick) {
            info.view.calendar.gotoDate(info.date);
            info.view.calendar.changeView("timeGridDay");
          }
        }}
        views={{
          timeGridDay: {
            type: "timeGridDay", // Corrected from "day"
            dateClick: function (info) {
              handleDateClick(info.dateStr);
            },
          },
        }}
        eventMouseEnter={(info) => {
          if (permissions.canViewDetails) {
            // Dispose of any existing popover to prevent duplicate tooltips
            if (window.bootstrap && info.el._popover) {
              info.el._popover.dispose();
            }

            // Extracting event details
            const { description } = info.event.extendedProps;

            // Create a new tooltip
            info.el._popover = new bootstrap.Popover(info.el, {
              title: `<strong>Title:</strong> ${info.event.title}`,
              content: `
                <div>
                  <span><strong>Status:</strong> ${
                    description || "N/A"
                  }</span><br />
                  <span><strong>Start:</strong> ${info.event.start.toLocaleString()}</span><br />
                  <span><strong>End:</strong> ${
                    info.event.end.toLocaleString() || "N/A"
                  }</span>
                </div>
              `,
              html: true,
              trigger: "hover focus",
              placement: "top",
            });

            // Show the tooltip
            info.el._popover.show();

            // Clean up tooltip when mouse leaves
            info.el.onmouseleave = () => {
              if (info.el._popover) {
                info.el._popover.dispose();
                info.el._popover = null;
              }
            };
          }
        }}
        eventClick={(info) => {
          if (permissions.canViewDetails && info.event.url) {
            info.jsEvent.preventDefault();
            clickEventCalendar(info.event.url);
          }
        }}
        eventDidMount={(info) => {
          console.log("info ::", info);
        }}
      />
    </div>
  );
};

export default MyCalendar;
