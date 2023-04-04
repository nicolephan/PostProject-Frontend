import React, { useState, useEffect } from "react";

const AllShipment = () => {
  const [shipmentData, setShipmentData] = useState({});
  // Return All shipments

  useEffect(() => {
    const fetchShipment = async () => {
      const res = await fetch("https://postoffice-api.herokuapp.com/api/");
      const data = await res.json();
      setShipmentData(data);
      console.log(data);
    };
  });

  return (
    <>
      <h1>allshipment</h1>
      {shipmentData.map((shipmentData) => {
        return;
      })}
    </>
  );
};

export default AllShipment;
