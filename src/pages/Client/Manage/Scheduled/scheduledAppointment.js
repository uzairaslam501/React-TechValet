import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { getOrderEventsByUserId } from "../../../../redux/Actions/calenderActions";
import MyCalendar from "../../../../components/Custom/Calendar/calender";
import { Container, Card, CardBody, Col, Row } from "react-bootstrap";

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
      dispatch(getOrderEventsByUserId(userAuth?.userEncId)).then((response) => {
        const events = response?.payload?.data?.map((eventData, index) => ({
          id: eventData.orderEncId,
          title: eventData.orderTitle,
          start: moment(eventData.startDateTime).toISOString(),
          end: eventData.endDateTime
            ? moment(eventData.endDateTime).toISOString()
            : null,
          color: eventColors[index % eventColors.length],
          url: eventData.orderDetailUrl,
          extendedProps: { description: eventData.orderStatusDescription },
        }));
        setEvents(events);
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
      <Container className="py-5">
        <Row className="text-center">
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
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
                    canDateClick: false,
                  }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ScheduledAppointment;
