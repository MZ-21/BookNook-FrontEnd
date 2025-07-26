import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";
import "./ShelvesPanel.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useGlobalContext } from "../../context";
import SPDM from "../Shelf-Panel-DM/SPDM";

const ShelvesPanel = () => {
  const {
    shelves,
    setShelves,
    setShelfOpen,
    dropDownMenu,
    setDropDownMenu,
    setLeftPanel,
  } = useGlobalContext();
  const [menuPosition, setMenuPosition] = useState("");
  const navigate = useNavigate();

  const createNewShelf = async () => {
    try {
      var payload = {
        shelfName: `newShelf${shelves.length}`,
        icon: "",
        bookCollection: {
          id: "669aec9a10de31e7466fc58e",
          bookId: "",
          title: "",
          author: "",
          rating: 0.0,
          genres: [""],
          publisher: "",
          description: "",
          coverImg: "",
        },
      };
      const response = await api.post("/api/v1/shelf", payload, {
        headers: {
          "Content-Type": "application/json",
          // other headers if needed
        },
      });

      setShelves([...shelves, response.data.shelfName]);
    } catch (err) {
      console.log(err);
    }
  };

  var getSelectedShelf = (shelf) => {
    setShelfOpen(shelf);
  };

  var getInitialSelves = async () => {
    try {
      const shelfNamesResponse = await api.get("/api/v1/shelf/shelfNames");

      setShelves([
        ...shelves,
        ...shelfNamesResponse.data.filter((item) => !shelves.includes(item)),
      ]);

      console.log(shelves);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLeftPanel(true);
    getInitialSelves();
  }, []);

  var panelDropDownMenu = (shelf) => {
    setDropDownMenu(!dropDownMenu);
    var shelfForMenu = document.getElementById(shelf);
    const rect = shelfForMenu.getBoundingClientRect();
    const yPosition = rect.top + window.scrollY;
    setMenuPosition(yPosition);
  };

  return (
    <div className="shelves-panel-container">
      <div className="shelves-panel-title">Shelves</div>
      <div className="shelves-container">
        {shelves.map((shelf) => (
          <div
            className="shelf"
            id={shelf}
            key={shelf}
            onClick={() => {
              getSelectedShelf(shelf);
              navigate(`/shelves/${encodeURIComponent(shelf)}`);
            }}
          >
            {/* <Link className="shelf-link" to={`/${shelf}`}> */}
            {shelf}
            {/* </Link> */}
            <HiOutlineDotsVertical
              className="shelf-dots-menu"
              onClick={() => panelDropDownMenu(shelf)}
            />
          </div>
        ))}
        {dropDownMenu && <SPDM menuPosition={menuPosition} />}
      </div>
      <div className="add-shelf" onClick={createNewShelf}>
        +
      </div>
    </div>
  );
};

export { ShelvesPanel };
