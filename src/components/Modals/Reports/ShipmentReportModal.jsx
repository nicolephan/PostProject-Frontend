import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
Modal.setAppElement('#root'); // Set the app root element for accessibility

const ShipmentReportModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [resultIsShown, setResultShown] = useState(null);

    // Check box states
    const [istotalPay, SetisTotalPay] = React.useState(false);
    const [istotalHrs, SetisTotalHrs] = React.useState(false);

    const [form, setForm] = React.useState({
        start_date: "2023-01-01",
        end_date: "2023-12-30"
    });

    // Temp duplicate Handle Change for total
    const handleHrsBoolChange = () => {
        SetisTotalHrs(!istotalHrs);
      };

    const handleBoolChange = () => {
        SetisTotalPay(!istotalPay);
      };

    // Save form input to variable
    const handleChange = (event) => {
        setForm({
        ...form,
        [event.target.id]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        //Handle the response data
        const options = {
            method: 'POST',
            url: 'https://postoffice-api.herokuapp.com/api/shipment-report',
            headers: {'Content-Type': 'application/json'},
            data: {
                start_date: form.start_date,
                end_date: form.end_date,
            }
        };
        console.log(options)

        try { //TODO format data in html
            const response = await axios.request(options);
            console.log("Try");
            console.log(response.data);
            setResult(response.data);
        } catch (error) {
            console.error(error);
            setResult(`error`);
        }
    
    console.log(`Submitted`);
    setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setResult(null);
    };

  // Summary total
  var total_pay=0;
  var total_hrs=0;

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Shipment Report</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Simple Form Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-btn" onClick={handleCloseModal}>
          <span className="close-icon">&times;</span>
        </button>

        <h2>Shipment Report</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="start_date">Start date:</label>
          <input type="date" id="start_date" value={form.start_date} onChange={handleChange} />
          <label htmlFor="start_date">End date:</label>
          <input type="date" id="start_date" value={form.end_date} onChange={handleChange} />
          <label htmlFor="include_total_pay">Include total</label>
          <input type="checkbox" id="enable_pay" name="enable_pay" value="true" checked={istotalPay} onChange={handleBoolChange}/>
            <button type="submit">Submit</button>
        </form>

        {/*Conditional Rendering*/}
        {
          result && (
        <>
          <h4>Shipment Report</h4>
          <p>From {form.start_date} to {form.end_date}</p>
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Customer LName</th>
                <th>Email</th>
                <th>Current location</th>
                <th>Shipment status</th>
                <th>Number of packages</th>
                <th>Region</th>
                <th>Creation date</th>
                <th>Est delivery date</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through job json data 
              and render to front end*/}
              {result?.map((job) => {
                //setSum({...form, total_pay: form.total_pay + job.pay});
                return (
                  <tr>
                    <th>{job.tracking_id}</th>
                    <th>{job.last_name}</th>
                    <th>{job.email}</th>
                    <th>{job.current_location}</th>
                    <th>{job.shipment_status}</th>
                    <th>{job.num_packages}</th>
                    <th>{job.region}</th>
                    <th>{job.creation_date}</th>
                    <th>{job.est_delivery_date}</th>
                  </tr>
                );
              })}
             { istotalPay && (
              <tr>
                <th>Total shipments: {result[result.length - 1].total_shipment}</th>
                <th>Total customers: {result[result.length - 1].total_customer}</th>
                <th>Total packages: {result[result.length - 1].total_packages}</th>
                <th>Avg packages per customer: {result[result.length - 1].total_packages / result[result.length - 1].total_customer}</th>
              </tr>
             )}
            </tbody>
          </table>
        </>
        )
        }
      </Modal>
    </>
  )
}

export default ShipmentReportModal;