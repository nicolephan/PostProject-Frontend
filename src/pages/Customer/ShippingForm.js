import React from "react";

// Shipping form

const ShippingForm = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
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

export default ShippingForm;
