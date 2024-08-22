import './App.css';
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Routes, Route } from 'react-router-dom';
import Shelves from './components/Shelves/Shelves';


const SelectedShelfContext = React.createContext();
function App() {
 
  const [shelfOpen, setShelfOpen ] = useState("");

  return (
    <div className="App">
       <SelectedShelfContext.Provider value={[shelfOpen, setShelfOpen]}>
          <Routes>
              <Route path="/" element={<Layout/>}>
                <Route path={`/${shelfOpen}`} element={<Shelves shelf={shelfOpen}/>}></Route>
              </Route>
          </Routes>
        </SelectedShelfContext.Provider>
    </div>
  );
}

export { App, SelectedShelfContext };
