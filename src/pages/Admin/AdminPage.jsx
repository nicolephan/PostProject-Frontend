import UserNav from "../../components/UserNav/UserNav";
import { 
        CreateShipmentModal, 
        ReadShipmentModal, 
        UpdateShipmentModal, 
        DeleteShipmentModal,
        AllLocHistoryModal,

        CreateEmployeeModal,
        ReadEmployeeModal,
        UpdateEmployeeModal,
        DeleteEmployeeModal,

        CreateCustomerModal,
        ReadCustomerModal,
        UpdateCustomerModal,
        DeleteCustomerModal,

        CreateJobModal,
        ReadJobModal,
        UpdateJobModal,
        DeleteJobModal,
        
        ShipmentReportModal,
        EmployeeReportModal,
    } from "../../components/Modals";

import './admin.css';

export default function Admin(){
    var x = localStorage.getItem("email");

    return (
        <>
            <UserNav />
            <div className="title-admin">
                <h1 className="tracking-in-expand one">Hello ADMIN: ({x})</h1>
            </div>
            
            {/* 
                Contains:
                -employee information
                -info about current shipments out
                -info about pending shipments (in store)
                -info about all PO boxes (avaliable and otherwise)
                -form to update shipping information
                -all of which takes info from the db
            */}
            <hr className="fade-hr"/>
            <div className="grid-container">
                <div className="grid-title tracking-in-expand one">Shipment</div>
                <div className="grid-item scale-in-hor-center one"><CreateShipmentModal /></div>
                <div className="grid-item scale-in-hor-center one"><ReadShipmentModal /></div>
                <div className="grid-item scale-in-hor-center one"><UpdateShipmentModal /></div>
                <div className="grid-item scale-in-hor-center one"><DeleteShipmentModal /></div>

                <div className="grid-title tracking-in-expand two">Job</div>
                <div className="grid-item scale-in-hor-center two"><CreateJobModal /></div>
                <div className="grid-item scale-in-hor-center two"><ReadJobModal /></div>
                <div className="grid-item scale-in-hor-center two"><UpdateJobModal /></div>
                <div className="grid-item scale-in-hor-center two"><DeleteJobModal /></div>

                <div className="grid-title tracking-in-expand three">Employee</div>
                <div className="grid-item scale-in-hor-center three"><CreateEmployeeModal /></div>
                <div className="grid-item scale-in-hor-center three"><ReadEmployeeModal /></div>
                <div className="grid-item scale-in-hor-center three"><UpdateEmployeeModal /></div>
                <div className="grid-item scale-in-hor-center three"><DeleteEmployeeModal /></div>

                <div className="grid-title tracking-in-expand four">Customer</div>
                <div className="grid-item scale-in-hor-center four"><CreateCustomerModal /></div>
                <div className="grid-item scale-in-hor-center four"><ReadCustomerModal /></div>
                <div className="grid-item scale-in-hor-center four"><UpdateCustomerModal /></div>
                <div className="grid-item scale-in-hor-center four"><DeleteCustomerModal /></div>
            
            </div>
            <hr className="fade-hr" />
            <div>
              <ShipmentReportModal />
              <EmployeeReportModal />
            </div>
            
            <div>
               <AllLocHistoryModal />
            </div>

            {
                /* TODO:
                    - add update tracking status (1 2 3 or 4) -> sends email
                    - display tracking history for all customers
                    - display employee data
                */
            }


        </>
    );
}