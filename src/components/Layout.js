import { Outlet, Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../components/Layout.css';
import Navbar from './navbar/Navbar';
import ShelvesPanel from './shelves-panel/ShelvesPanel';



const LeftPanelContext = React.createContext();


const Layout = () => {
    const [leftPanelOpen, setLeftPanel] = useState(false);
  

    return (
        <>
            <LeftPanelContext.Provider value={[leftPanelOpen, setLeftPanel]}>
                <Navbar/>
                <div className='body-container'>
                    {leftPanelOpen && <ShelvesPanel/>}
                    <main>
                        <Outlet/> 
                            {/* renders current route selected */}
                    </main>
                </div>
            </LeftPanelContext.Provider>
        </>
    )
}

export { Layout, LeftPanelContext};