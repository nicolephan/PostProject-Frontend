import React from 'react';

const ProgressBar = ({progress}) =>{
    const Parentdiv = {
        height: '3rem',
        width: '100%',
        backgroundColor: '#c5c3c6',
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
        <div style={Parentdiv}>
            <div style={Childdiv}>
                <span>{`${progress}%`}</span>
            </div>
        </div>
    );
}

export default ProgressBar;