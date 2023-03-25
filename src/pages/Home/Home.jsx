import REACT, {useRef} from 'react';
import "./Home.css";

export default function Home(){
    return(
        <div className="hTrackPackage">
            <h1>Track A Package</h1>
            <SearchBar />
        </div>
    );
}


// function SearchBar(){
//     return(
//         <form action="/" method="get">
//             <label htmlFor="header-search"></label>
//             <input
//                 type="text"
//                 id="header-search"
//                 placeholder="Package #ID"
//                 name="s"
//             />
//             <button type="submit">Enter</button>
//         </form>
//     );
// }

function SearchBar(props){
    const query = useRef();

    const handleSearch =(e) => {
        e.preventDefault();
        const queryVal = query.current.value;
        props.fetchID(queryVal.trim());
    };

    return(
        <form action="/" method="get">
            <label htmlFor="header-search"></label>
            <input
                type="text"
                id="header-search"
                placeholder="Package #ID"
                name="s"
            />
            <button type="submit" onSubmit={handleSearch}>Enter</button>
        </form>
    );
}
