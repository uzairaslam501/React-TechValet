import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { toast } from "react-toastify";
import EventToast from "../EventToaster/EventToast";

const MyCalendar = ({
  events,
  permissions = {
    canViewDetails: true,
    canEditEvents: false,
    canNavigate: true,
    canChangeView: true,
  },
}) => {
  const clickEventCalendar = (url) => {
    console.log("Event URL:", url);
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={
          permissions.canChangeView
            ? {
                left: permissions.canNavigate ? "prev,next today" : "",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }
            : { center: "title" }
        }
        events={events}
        navLinks={permissions.canNavigate}
        selectable={permissions.canEditEvents}
        dateClick={(info) => {
          if (permissions.canNavigate) {
            info.view.calendar.gotoDate(info.date);
            info.view.calendar.changeView("timeGridDay");
          }
        }}
        eventMouseEnter={(info) => {
          if (permissions.canViewDetails) {
            let currentToastId = null;
            const el = info.el;
            const event = info.event;

            if (currentToastId !== null) {
              toast.dismiss(currentToastId);
            }

            currentToastId = toast.success(<EventToast event={event} />);
            el.onmouseleave = () => {
              toast.dismiss(currentToastId);
              currentToastId = null;
            };
          }
        }}
        eventClick={(info) => {
          if (permissions.canViewDetails && info.event.url) {
            info.jsEvent.preventDefault();
            clickEventCalendar(info.event.url);
          }
        }}
      />
    </div>
  );
};

export default MyCalendar;
