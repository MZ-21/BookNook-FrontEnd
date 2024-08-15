import React, { useState, useEffect,  useContext } from "react";
import { Link } from 'react-router-dom';
import api from '../../api/axiosConfig';
import  './ShelvesPanel.css';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { SelectedShelfContext } from '../../App';
import SPDM from "../Shelf-Panel-DM/SPDM";


const ShelvesPanel = () =>{
    const [shelves, setShelves] = useState([]);
    const [shelfOpen, setShelfOpen ] = useContext(SelectedShelfContext);
    const [dropDownMenu, setDropDownMenu] = useState(false);
    
    const createNewShelf = async () => {

        try{
            var payload = {
                "shelfName": `newShelf${shelves.length}`,
                "icon": "",
                "bookCollection": {
                    "id":"669aec9a10de31e7466fc58e",
                    "bookId":"",
                    "title":"",
                    "author":"",
                    "rating":0.0,
                    "genres":[""],
                    "publisher":"",
                    "description":"",
                    "coverImg":""
                }
            }
            const response = await api.post("/api/v1/shelf",payload, 
                {
                    headers: {
                      'Content-Type': 'application/json',
                      // other headers if needed
                    }
                })
            setShelves([...shelves, response.data.shelfName]);
            

        }
        catch(err){
            console.log(err);
        }
    }

    var getSelectedShelf = (shelf) => {
        setShelfOpen(shelf);
    }



    var getInitialSelves = async () => {
        try{
            const shelfNamesResponse = await api.get("/api/v1/shelf/shelfNames");

            setShelves([...shelves, ...shelfNamesResponse.data.filter((item) => !shelves.includes(item))]);
            
            console.log(shelves);
        }
        catch(err){
            console.log(err)
        }

    }

    useEffect(()=>{
        getInitialSelves();

    },[]);

    var panelDropDownMenu = () => {
        setDropDownMenu(!dropDownMenu);
    }
    
    return (
        <div className="shelves-panel-container">
            <div className="shelves-panel-title">Shelves</div>
            <div className="shelves-container">
                {shelves.map((shelf) => (
                    <div className="shelf" key={shelf}>
                        <Link className="shelf-link" to={`/${shelf}`}  onClick={() => getSelectedShelf(shelf)}>
                            {shelf}
                        </Link>
                        <HiOutlineDotsVertical className="shelf-dots-menu" onMouseOver={panelDropDownMenu} />
                    </div>
                ))}
                {dropDownMenu && <SPDM/>}
            </div>
            <div className="add-shelf" onClick={createNewShelf}>+</div>
            
        </div>
    )
}

export default ShelvesPanel;