import React from "react";

// Shipping form

const CreateShipmentForm = () => {
  const [form, setForm] = React.useState({
    firstname: "",
    lastname: "",
    address: "",
  });

  // Save change to input
  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  // Action on submission
  const handleSubmit = async (event) => {
    let currentDate = new Date().toJSON().slice(0, 10); // Auto set current date

    event.preventDefault();
    try {
      let res = await fetch(
        "https://postoffice-api.herokuapp.com/api/create-shipment",
        {
          method: "POST",
          body: JSON.stringify({
            tracking_id: form.tracking_id,
            creation_date: currentDate,
            current_location: form.current_location,
            shipment_status: form.shipment_status,
            num_packages: form.num_packages,
            region: form.region,
          }),
        }
      );
      let resJson = await res.json();
      if (res.status == 200) {
        setForm({});
        alert("Submitted successfully");
      }
    } catch (err) {
      console.log(err);
    }

    // Alert values test
    //alert(form.tracking_id + " " + form.shipment_status + " " + currentDate);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tracking_id">Tracking ID</label>
          <input
            id="tracking_id"
            type="number"
            value={form.tracking_id}
            onChange={handleChange}
          />
          <label htmlFor="current_location">Current location</label>
          <input
            id="current_location"
            type="text"
            value={form.current_location}
            onChange={handleChange}
          />
          <label htmlFor="shipment_status">Shipment status</label>
          <select
            id="shipment_status"
            value={form.shipment_status}
            onChange={handleChange}
          >
            <option value="Labeling">Labeling</option>
            <option value="In transit">In transit</option>
            <option value="Delivered">Delivered</option>
          </select>
          <label htmlFor="num_packages">Number of packages</label>
          <input
            id="num_packages"
            type="number"
            value={form.num_packages}
            onChange={handleChange}
          />
          <label htmlFor="region">Region</label>
          <select id="region" value={form.region} onChange={handleChange}>
            <option value="North">North America</option>
            <option value="Asia">Asia</option>
            <option value="Europe">Europe</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateShipmentForm;
