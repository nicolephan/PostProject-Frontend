import AdminNav from "../../components/AdminNav/AdminNav";
import ShippingModal from "../../components/Modal/ShippingModal";

export default function Admin(){
    var x = localStorage.getItem("email");

    return (
        <>
            <AdminNav />
            <h1>ADMIN ({x})</h1>
            {/* <p>
                Contains <br />
                <li>employee information  </li>
                <li>info about current shipments out</li>
                <li>info about pending shipments (in store)</li>
                <li>info about all PO boxes (avaliable and otherwise)</li>
                <li>form to update shipping information</li>
                <br/>all of which takes info from the db
            </p> */}
            <ShippingModal />


        </>
    );
}