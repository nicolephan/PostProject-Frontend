import React, { useState, useEffect } from "react";

// Return All shipments from database
const AllShipment = () => {
  const [shipmentData, setShipmentData] = useState([]);
  

  useEffect(() => {
    const fetchShipment = async () => {
      const res = await fetch("https://postoffice-api.herokuapp.com/api/shipments");
      const data = await res.json();
      setShipmentData(data);
      console.log(data);
    };
    fetchShipment();
  }, []);

  return (
    <>
      <h1>All Shipment</h1>
      <table>
        <thead>
          <tr>
            <th>Tracking ID</th>
            <th>Creation date</th>
            <th>Location</th>
            <th>Shipment status</th>
            <th>Number of packages</th>
          </tr>
        </thead>
        <tbody>
          {/*Iterate through shipment json data 
          and render to front end*/}
          {shipmentData.map((shipment) => {
            return (
              <tr>
                <th>{shipment.tracking_id}</th>
                <th>{shipment.creation_date}</th>
                <th>{shipment.current_location}</th>
                <th>{shipment.shipment_status}</th>
                <th>{shipment.num_packages}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default AllShipment;
