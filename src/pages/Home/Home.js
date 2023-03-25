// import REACT from 'react';
import "./Home.css";

export default function Home(){
    return(
        <div className="hTrackPackage">
            <h1>Track A Package</h1>
            <SearchBar />
        </div>
    );
}

function SearchBar(){
    return(
        <form action="/" method="get">
            <label htmlFor="header-search"></label>
            <input
                type="text"
                id="header-search"
                placeholder="Package #ID"
                name="s"
            />
            <button type="submit">Enter</button>
        </form>
    );
}
