import AdminNav from "../../components/AdminNav/AdminNav";


export default function Admin(){
    return (
        <>
        <AdminNav />
        <div>
            <h2>ADMIN</h2>
            <p>
                Contains <br />
                <li>employee information  </li>
                <li>info about current shipments out</li>
                <li>info about pending shipments (in store)</li>
                <li>info about all PO boxes (avaliable and otherwise)</li>
                <li>form to update shipping information</li>
                <br/>all of which takes info from the db
            </p>
        </div>
        </>
    );
}