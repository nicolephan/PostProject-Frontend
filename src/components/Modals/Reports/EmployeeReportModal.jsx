import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
Modal.setAppElement('#root'); // Set the app root element for accessibility

const EmployeeReportModal = () => {
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
            url: 'https://postoffice-api.herokuapp.com/api/employee-report',
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
      <button onClick={() => setIsOpen(true)}>Employee Report</button>
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

        <h2>Employee Work Report</h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="start_date">Start date:</label>
          <input type="date" id="start_date" value={form.start_date} onChange={handleChange} />
          <label htmlFor="end_date">End date:</label>
          <input type="date" id="end_date" value={form.end_date} onChange={handleChange} />
          <label htmlFor="include_total_pay">Include total</label>
          <input type="checkbox" id="enable_pay" name="enable_pay" value="true" checked={istotalPay} onChange={handleBoolChange}/>
            <button type="submit">Submit</button>
        </form>

        {/*Conditional Rendering*/}
        {
          result && (
        <>
          <h4>Report</h4>
          <p>From {form.start_date} to {form.end_date}</p>
          <table>
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>work_name</th>
                <th>pay</th>
                <th>Hours worked</th>
                <th>On date</th>
                <th>Branch address</th>
                <th>Phone number</th>
                <th>Email</th>
                <th>Currently employed?</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through job json data 
              and render to front end*/}
              {result?.map((job) => {
                //setSum({...form, total_pay: form.total_pay + job.pay});
                if (job.first_name !== undefined) {
                return (
                  <tr>
                    <th>{job.first_name}</th>
                    <th>{job.last_name}</th>
                    <th>{job.work_name}</th>
                    <th>{job.pay}</th>
                    <th>{job.hours_worked}</th>
                    <th>{job.on_date.slice(0,10)}</th>
                    <th>{job.branch_address}</th>
                    <th>{job.phone_number}</th>
                    <th>{job.email}</th>
                    <th>{String(job.is_employed)}</th>
                  </tr>
                );
              }})
              }
             { istotalPay && (
              <tr>
                <th>Total employee: {result[result.length - 1].employee_count}</th>
                <th>Total works: {result[result.length - 1].total_job}</th>
                <th>Total pay: ${result[result.length - 1].total_pay}</th>
                <th>Total hours: {result[result.length - 1].total_hrs}</th>
                <th>Avg wage: ${(result[result.length - 1].total_pay / result[result.length - 1].total_hrs).toFixed(2)}/hr</th>
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

export default EmployeeReportModal;