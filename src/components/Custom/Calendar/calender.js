import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getOrderEventsByUserId } from "../../../redux/Actions/calender";

const MyCalendar = ({
  permissions = {
    canViewDetails: true,
    canEditEvents: false,
    canNavigate: true,
    canChangeView: true,
  },
}) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.authentication);
  const [events, setEvents] = useState([]);
  const eventColors = [
    "#2cdd9b",
    "#3498db",
    "#9b59b6",
    "#ffc107",
    "#56ccf2",
    "#f39c12",
    "#1abc9c",
    "#ff6b81",
  ];

  // Fetch events and update state
  const fetchEventsAndGenerateCalendar = async () => {
    try {
      const response = await dispatch(getOrderEventsByUserId(userAuth?.id));
      console.log("calendar", response);
      if (response?.payload?.status && response?.payload?.data) {
        let colorIndex = 0;
        const fetchedEvents = response?.payload?.data.map((eventData) => {
          const eventColor = eventColors[colorIndex % eventColors.length];
          colorIndex++;
          return {
            id: eventData.orderEncId,
            title: eventData.orderTitle,
            start: moment(eventData.startDateTime).toISOString(),
            end: eventData.endDateTime
              ? moment(eventData.endDateTime).toISOString()
              : null,
            color: eventColor,
            url: eventData.orderDetailUrl,
            extendedProps: {
              description: eventData.orderStatusDescription,
            },
          };
        });
        setEvents(fetchedEvents);
      } else {
        console.error("Error:", response?.payload?.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEventsAndGenerateCalendar();
  }, [userAuth?.id]);

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
            const event = info.event;
            const el = info.el;

            // Create a popover or tooltip to display event details
            const tooltip = document.createElement("div");
            tooltip.innerHTML = `
            
              <strong>${event.title}</strong><br/>
              Start: ${event.start.toLocaleString()}<br/>
              End: ${event.end ? event.end.toLocaleString() : "N/A"}<br/>
              Status: ${event.extendedProps.description}
            `;
            tooltip.className = "popover";
            el.appendChild(tooltip);

            el.onmouseleave = () => {
              el.removeChild(tooltip);
            };
          }
        }}
        eventClick={(info) => {
          if (permissions.canViewDetails && info.event.url) {
            info.jsEvent.preventDefault();
            window.location.href = info.event.url;
          }
        }}
      />
    </div>
  );
};

export default MyCalendar;
