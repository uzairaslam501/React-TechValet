import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getOrderEventsByUserId } from "../../../../redux/Actions/calenderActions";
import MyCalendar from "../../../../components/Custom/Calendar/calender";
import { Card, CardBody, Col, Row } from "react-bootstrap";

const ScheduledAppointment = () => {
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
      dispatch(getOrderEventsByUserId(userAuth?.id)).then((response) => {
        let colorIndex = 0;
        const fetchedEvents = response?.payload?.map((eventData) => {
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
      });
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEventsAndGenerateCalendar();
  }, [userAuth?.id]);

  return (
    <>
      <section>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <Card>
              <CardBody className="text-center">
                <h1>User Calendar</h1>
                <MyCalendar
                  events={events}
                  permissions={{
                    canViewDetails: true,
                    canEditEvents: false,
                    canNavigate: true,
                    canChangeView: true,
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </section>
    </>
  );
};

export default ScheduledAppointment;
