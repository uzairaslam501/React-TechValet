import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getValetsList } from "../../../../redux/Actions/customerActions";
import TopImageCarousal from "../../../../components/Custom/CarousalWithTopImage/topImageCarousal";

const ValetSlider = () => {
  const dispatch = useDispatch();
  const [valetRecords, setValetRecords] = useState([]);

  useEffect(() => {
    getValetsRecords();
  }, []);

  const getValetsRecords = async () => {
    const response = await dispatch(getValetsList());
    setValetRecords(response?.payload || []);
  };

  return <TopImageCarousal users={valetRecords} />;
};

export default ValetSlider;
