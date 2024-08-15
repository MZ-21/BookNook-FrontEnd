import React from "react";
import { useContext } from "react";
import  './navbar.css';
import treeIcon from '../../images/treeI.svg';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LeftPanelContext } from "../Layout";

const Navbar = () => {
    const [leftPanel, setLeftPanel] = useContext(LeftPanelContext);
    

    const leftPanelSelection = () =>{
        setLeftPanel(!leftPanel);
    }

    return (
        <div className="navbar-container">
            <div className="left-navbar-container">
                <div className="icon-title-container">
                    <div className="icon-container">
                        <div className="icon">
                            <img src={treeIcon} className="tree-icon"/>

                        </div>

                    </div>
                    <div className="title-container">
                        <span>Book</span> <br/> 
                        <span className="nook">Nook</span>
                    </div>

                </div>
            </div>
            <div className="middle-navbar-container">
                <div className="navbar-items" onClick={leftPanelSelection}>Shelves</div>
                <div className="navbar-items">Characters</div>
                <div className="navbar-items">Community</div>

                <div className="search-bar-container">
                    <input className="search-bar" type="text" placeholder=""/>
                    <button className="search-btn">Search</button>
                </div>
            </div>
            <div className="right-navbar-container">
                <div className="menu-container">
                    <HiOutlineDotsVertical className="dots-menu"/>

                </div>
            </div>
        </div>
    )

}

export default Navbar;