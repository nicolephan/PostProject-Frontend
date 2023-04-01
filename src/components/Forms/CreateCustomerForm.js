import React from "react";

// Shipping form

const CreateShipmentForm = () => {
  const [form, setForm] = React.useState({
    firstname: "",
    lastname: "",
    address: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let res = await fetch(
        "https://postoffice-api.herokuapp.com/api/shipment",
        {
          method: "POST",
          body: JSON.stringify({
            firstname: form.firstname,
            lastname: form.lastname,
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

    alert(form.firstname + " " + form.lastname + " " + form.address);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First name</label>
          <input
            id="firstname"
            type="text"
            value={form.firstname}
            onChange={handleChange}
          />
          <label htmlFor="lastname">Last name</label>
          <input
            id="lastname"
            type="text"
            value={form.lastname}
            onChange={handleChange}
          />
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            value={form.address}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default CreateShipmentForm;
