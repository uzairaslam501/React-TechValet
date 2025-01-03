import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import { profileOrdersPreview } from "../../../../redux/Actions/calenderActions";
import { sendUsersMessages } from "../../../../redux/Actions/messagesActions";
import {
  formatDateTimeForInput,
  getFirstAndLastDayOfMonth,
} from "../../../../utils/_helpers";
import MyCalendar from "./Calenders";
import OfferDialogue from "../../Messages/OfferDialogue/OfferDialogue";

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

const CalenderOrders = ({ id }) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);

  const [loading, setLoading] = useState(true);
  const [orderRecords, setOrderRecords] = useState([]);
  const [showOrderDialogue, setShowOrderDialogue] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [currentView, setCurrentView] = useState("dayGridMonth");
  const [defaultMessage, setDefaultMessage] = useState({
    recieverId: id,
    valetId: id,
  });

  const validRange = {
    start: getFirstAndLastDayOfMonth().currentDay,
    end: getFirstAndLastDayOfMonth().monthEnd,
  };

  const handleDateClick = (selectedDate, view) => {
    setSelectedDateTime(formatDateTimeForInput(selectedDate)); // Store the clicked datetime
    if (view !== "dayGridMonth") setShowOrderDialogue(true); // Open the dialogue when a date is clicked
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      dispatch(profileOrdersPreview(encodeURIComponent(id))).then(
        (response) => {
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
          setOrderRecords(events);
        }
      );
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendOffer = (values) => {
    if (values) {
      const data = {
        SenderId: String(userAuth?.id),
        CustomerId: String(userAuth?.id),
        ValetId: String(values?.valetId),
        ReceiverId: values.receiverId,
        MessageDescription: "Offer Sent",
        OfferTitle: values.offerTitle,
        StartedDateTime: values.startedDateTime,
        EndedDateTime: values.endedDateTime,
        OfferDescription: values.offerDescription,
      };
      dispatch(sendUsersMessages(data));
    }
  };

  const handleOrderClose = () => setShowOrderDialogue(false);

  useEffect(() => {
    fetchOrders();
  }, [id]);

  return loading ? (
    <div className="text-center">
      <Spinner animation="grow" role="status" />
    </div>
  ) : (
    <>
      <MyCalendar
        events={orderRecords}
        permissions={{
          canViewDetails: true,
          canEditEvents: false,
          canNavigate: true,
          canChangeView: true,
          canDateClick: true,
        }}
        validRange={validRange}
        currentView={currentView} // Bind the current view
        handleDateClick={handleDateClick}
      />
      {showOrderDialogue && (
        <OfferDialogue
          handleOrderClose={handleOrderClose}
          messageObject={defaultMessage}
          showOrderDialogue={showOrderDialogue}
          handleSendOffer={handleSendOffer}
          selectedDateTime={selectedDateTime}
        />
      )}
    </>
  );
};

export default CalenderOrders;
