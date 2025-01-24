import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "react-bootstrap";
import moment from "moment";
import { profileOrdersPreview } from "../../../../redux/Actions/calenderActions";
import {
  disabledPreviousDateTime,
  formatDateTimeForInput,
  getFirstAndLastDayOfMonth,
  setDateRestrictions,
  setDateTimeRestrictions,
} from "../../../../utils/_helpers";
import OfferDialogue from "../../Messages/OfferDialogue/OfferDialogue";
import { useNavigate } from "react-router";
import MyCalendar from "../../../../components/Custom/Calendar/calender";

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

const CalenderOrders = ({ id, pricePerHour }) => {
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state.authentication);

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [orderRecords, setOrderRecords] = useState([]);
  const [showOrderDialogue, setShowOrderDialogue] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [defaultMessage, setDefaultMessage] = useState({
    recieverId: encodeURIComponent(id),
    valetId: encodeURIComponent(id),
  });

  const validRange = {
    start:
      userAuth && userAuth.role === "Customer"
        ? getFirstAndLastDayOfMonth().currentDay
        : getFirstAndLastDayOfMonth().monthStart,
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
          console.log(response?.payload);
          const events = response?.payload?.data?.map((eventData, index) => ({
            id: eventData.orderEncId,
            title: "Event Booked",
            start: moment(eventData.startDateTime).toISOString(),
            end: eventData.endDateTime
              ? moment(eventData.endDateTime).toISOString()
              : null,
            color: eventColors[index % eventColors.length],
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
        senderId: String(encodeURIComponent(userAuth?.userEncId)),
        customerId: String(encodeURIComponent(userAuth?.userEncId)),
        valetId: String(encodeURIComponent(id)),
        receiverId: encodeURIComponent(id),
        title: values.offerTitle,
        startedDateTime: values.startedDateTime,
        endedDateTime: values.endedDateTime,
        description: values.offerDescription,
        pricePerHour: pricePerHour,
      };
      navigate(`/preview-order`, {
        state: data,
      });
    }
  };

  const handleOrderClose = () => {
    setShowOrderDialogue(false);
  };

  useEffect(() => {
    setDefaultMessage({
      recieverId: encodeURIComponent(id),
      valetId: encodeURIComponent(id),
    });
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
          canViewDetails:
            userAuth && userAuth.role === "Customer" ? true : false,
          canEditEvents: userAuth && userAuth.role === "Customer" && false,
          canNavigate: userAuth && userAuth.role === "Customer" ? true : false,
          canChangeView:
            userAuth && userAuth.role === "Customer" ? true : false,
          canDateClick: userAuth && userAuth.role === "Customer" ? true : false,
        }}
        validRange={validRange}
        handleDateClick={
          userAuth && userAuth.role === "Customer" && handleDateClick
        }
      />
      {showOrderDialogue && (
        <OfferDialogue
          handleOrderClose={handleOrderClose}
          messageObject={defaultMessage}
          showOrderDialogue={showOrderDialogue}
          handleSendOffer={handleSendOffer}
          selectedDateTime={selectedDateTime}
          restrictions={setDateTimeRestrictions("max", validRange.end)}
        />
      )}
    </>
  );
};

export default CalenderOrders;
