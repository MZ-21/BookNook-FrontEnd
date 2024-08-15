import React, { useState, useEffect } from 'react';
import './Shelves.css';
import api from '../../api/axiosConfig';


const Shelves = ({ shelf }) => {
    
    return(
        <div className='selected-shelf'>{shelf}</div>
    )
}

export default Shelves;