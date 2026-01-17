import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const AppContext = (props) => {
  const [shelves, setShelves] = useState([]);
  const [leftPanelOpen, setLeftPanel] = useState(false);
  const [searchedBooks, setSearchedBooks] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [shelfOpen, setShelfOpen] = useState(false);
  const [dropDownMenu, setDropDownMenu] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        shelves,
        setShelves,
        leftPanelOpen,
        setLeftPanel,
        searchResults,
        setSearchResults,
        shelfOpen,
        setShelfOpen,
        dropDownMenu,
        setDropDownMenu,
        searchedBooks,
        setSearchedBooks,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default AppContext;
