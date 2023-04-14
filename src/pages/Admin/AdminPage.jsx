import UserNav from "../../components/UserNav/UserNav";
import ShippingModal from "../../components/Modals/CreateShipmentModal";
import ReadShipmentModal from "../../components/Modals/ReadShipmentModal";

export default function Admin(){
    var x = localStorage.getItem("email");

    return (
        <>
            <UserNav />
            <h1>Hello ADMIN: ({x})</h1>
            {/* 
                Contains:
                -employee information
                -info about current shipments out
                -info about pending shipments (in store)
                -info about all PO boxes (avaliable and otherwise)
                -form to update shipping information
                -all of which takes info from the db
            */}

            <div className="">
                <ShippingModal />
            </div>
            
            <div className="">
                <ReadShipmentModal />
            </div>

            <div className="">
                Update Shipment
            </div>

            <div className="">
                Delete Shipment
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