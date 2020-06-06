import React from 'react';
import './style.css';

function Loading({ visible }) {

    return (
        <div className="loadingContainer">
            <div 
                className={visible ? "lds-ellipsis" : "lds-ellipsis-hidden"}
                data-testid="loading_div">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );

}

export default Loading;