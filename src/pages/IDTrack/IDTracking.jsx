import React, { useState } from 'react';
import './IDTracking.css';

export default function Track(){
    //define progress (useState)
    //define state (useState)
    //define ID (useState)
    const [progress, setProgress] = useState('');
    
    
    return (
        <div className="container-track">
            <h2>Package ID: [INSERT ID#]</h2>
            <p>Package is currently: [state]</p>
            <ProgressBar progress='30' />

            <div className="container-details">
                <div className="location">
                    <p className="location-title">Starting Point</p>
                    <p className="location-descrip">[Origin] <br/><br/></p>
                    <p className="location-title">Completed Stops</p>
                    <ul className="stop-list">
                        <li>
                            location
                        </li>
                        <li>
                            location
                        </li>
                    </ul>
                    <p className="location-title">Current Location</p>
                    <p className="location-descrip">[Location] <br/><br/></p>
                    <p className="location-title">Stops Left</p>
                    <ul className="stop-list">
                        location
                    </ul>
                    <p className="location-title">Destination</p>
                    <p className="location-descrip">[Destination]</p>
                </div>
                <div className="details">
                    <p className="location-title">Dropoff Employee</p>
                    <p className="location-descrip">[Name]</p>
                </div>
            </div>
        </div>
    );
}


const ProgressBar = ({progress}) =>{
    const Parentdiv = {
        height: '1rem',
        width: '80%',
        backgroundColor: '#DCDCDD',
        borderRadius: '8px',
        margin: 50
    }

    const Childdiv ={
        height: '100%',
        width: `${progress}%`, 
        backgroundColor: '#827493',
        borderRadius: '8px',
    }

    return(
        <div className="progressBar"style={Parentdiv}>
            <div style={Childdiv}>
                {/* <span>{`${progress}%`}</span> */}
            </div>
        </div>
    );
}