import React, { useState } from "react";
import api from '../../api/axiosConfig';
import  './SPDM.css';


const SPDM = () => {

    return (
        <div className="spdm-container">
            <div className="edit-btn-container">
                <button className="btn">Edit Name</button>
            </div>
            <div className="delete-btn-container">
                <button className="btn">Delete </button>
            </div>
        </div>
    )
}

export default SPDM;