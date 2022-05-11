import React from 'react';

const StatusBox = ({status}) =>
{
    const color = !status ? "green" : "maroon";

    return (
        <div className="status-box-outer-div">
            <div className="status-box-inner-div" style={{background: color}}>
            </div>
        </div>
    );
};

export default StatusBox;