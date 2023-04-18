import UserNav from "../../components/UserNav/UserNav";
import { 
        CreateShipmentModal, 
        ReadShipmentModal, 
        UpdateShipmentModal, 
        DeleteShipmentModal,
        SelfReportModal,
        ShipmentReportModal,
        AllLocHistoryModal,
    } from "../../components/Modals";


//import { default } from "../../components/Modals/Reports/ShipmentReportModal"
import './Employee.css';
import Ship from "../Ship/Ship";

export default function Admin(){
    var x = localStorage.getItem("email");

    return (
        <>
            <UserNav />
            <div className="title-admin">
                <h1 className="tracking-in-expand one">Hello Employee: ({x})</h1>
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
            
            </div>
            <hr className="fade-hr" />
            <div>
              <SelfReportModal />
              <ShipmentReportModal />
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