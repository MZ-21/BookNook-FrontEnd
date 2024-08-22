import React, { useContext, useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import api from '../../api/axiosConfig';
import  './SPDM.css';
import { ShelvesContext } from '../Layout';
import { SelectedShelfContext } from '../../App';
import { DropDownMenuContext } from '../shelves-panel/ShelvesPanel';

const SPDM = ({ menuPosition }) => {

    const topPosition = `${menuPosition + 5}px`;
    const [shelves, setShelves] = useContext(ShelvesContext);
    const [isShelfRemoved, setIsShelfRemoved] = useState(false);
    const [shelfOpen, setShelfOpen ] = useContext(SelectedShelfContext);
    const [dropDownMenu, setDropDownMenu] = useContext(DropDownMenuContext);
    const navigate = useNavigate();
    

    var deleteShelf = async() => {
        try {
            await api.post("/api/v1/shelf/deleteShelf", {
                shelfName: `${shelfOpen}`
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
        
            setIsShelfRemoved(true);//Set state to indicate shelf was removed
        } catch (err){
            console.error("Error deleting shelf:",err);
        }
       
    };

    var editShelf = async() => {
        try {
            await api.post("/api/v1/shelf/edit")
        } catch (error){

        }
    }
    
    const renderShelves = (shelfRemove) => {//method to filter out deleted shelf from shelves array
        const updatedShelves = shelves.filter((shelf) => shelf !== shelfRemove);
        setShelves(updatedShelves); // Ensure creating a new array
    };

    useEffect(() => {
        if(isShelfRemoved){
            renderShelves(shelfOpen);
            setShelfOpen(""); //Clear selected shelf
            setDropDownMenu(false); //Close dropdown menu
            navigate("/"); //Navigate back to home
            setIsShelfRemoved(false); //Reset the removal state
        };
        
    },[isShelfRemoved, shelfOpen, navigate, renderShelves, setShelfOpen, setDropDownMenu])

    return (
        <div className="spdm-container" style={{ top : topPosition}}>
            <div className="edit-btn-container">
                <button className="btn-spdm" onClick={editShelf}>Edit Name</button>
            </div>
            <div className="delete-btn-container">
                <button className="btn-spdm" onClick={deleteShelf}>Delete </button>
            </div>
        </div>
    )
}

export default SPDM;