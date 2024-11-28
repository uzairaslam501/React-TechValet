import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getValetsList } from "../../../../redux/Actions/customerActions";
import TopImageCarousal from "../../../../components/Custom/CarousalWithTopImage/topImageCarousal";

const ValetSliders = () => {
  const dispatch = useDispatch();
  const [valetRecords, setValetRecords] = useState([]); // Initialized as an empty array

  useEffect(() => {
    getValetsRecords();
  }, []);

  const getValetsRecords = async () => {
    const response = await dispatch(getValetsList());
    setValetRecords(response?.payload || []); // Ensure fallback to an empty array if response is undefined
  };

  return (
    <>
      <TopImageCarousal label={"Recently Viewed & More"} users={valetRecords} />
    </>
  );
};

export default ValetSliders;
