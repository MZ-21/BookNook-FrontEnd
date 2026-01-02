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
    shelfOpen,
    setShelfOpen,
    dropDownMenu,
    setDropDownMenu,
    setLeftPanel,
  } = useGlobalContext();
  const [menuPosition, setMenuPosition] = useState("");
  const [menuShelf, setMenuSehlf] = useState(null);
  const [editingShelfId, setEditingShelfId] = useState(null);
  const [editedName, setEditedName] = useState("");
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

      setShelves([...shelves, response.data]);
    } catch (err) {
      console.log("[ShelvesPanel FILE]: error creating shelf", err);
    }
  };
  var getSelectedShelf = (shelf) => {
    setShelfOpen(shelf);
  };

  var getInitialShelves = async () => {
    try {
      const shelvesResponse = await api.get("/api/v1/shelf/shelves");

      setShelves(shelvesResponse.data);
    } catch (err) {
      console.log("[ShelvesPanel File]: Error fetching initial shelves:", err);
    }
  };

  useEffect(() => {
    setLeftPanel(true);

    if (!shelves || shelves.length === 0) {
      getInitialShelves();
    }

  }, [shelves]);

  var panelDropDownMenu = (e) => {
    setDropDownMenu((prev) => !prev);

    const rect = e.currentTarget.getBoundingClientRect();
    setMenuPosition(rect.top + window.scrollY);
  };

  var editShelfName = async (shelfId, shelfName) => {
    try {
      await api.post(
        "/api/v1/shelf/editName",
        {
          shelfId: shelfId,
          shelfName: `${shelfName}`,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update local state immediately
      setShelves(prev =>
        prev.map(s =>
          s.id === shelfId
            ? { ...s, shelfName }
            : s
        )
      );
    } catch (error) {
      console.error("Error editing shelf:", error);
    }
  };

  return (
    <div className="shelves-panel-container">
      <div className="shelves-panel-title">Shelves</div>
      <div className="shelves-container">
        {shelves.map((shelf) => (
          <div
            className="shelf"
            id={shelf.id}
            key={shelf.id}
            onClick={() => {
              getSelectedShelf(shelf);
              navigate(`/shelves/${encodeURIComponent(shelf.id)}`);
            }}
          >
           {editingShelfId === shelf.id ? (
            <input
              className="shelf-name-input"
              value={editedName}
              autoFocus
              onChange={(e) => setEditedName(e.target.value)}
              onBlur={(e) => {
                editShelfName(shelf.id, editedName.trim());
                setEditingShelfId(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  editShelfName(shelf.id, editedName.trim());
                  setEditingShelfId(null);
                }
                if (e.key === "Escape") {
                  setEditingShelfId(null);
                }
              }}
            />
            ) : (
              <div className="shelf-name">{shelf.shelfName}</div>
            )}
            {/* </Link> */}
            <HiOutlineDotsVertical
              className="shelf-dots-menu"
              onClick={ (e) => {
                e.stopPropagation();
                panelDropDownMenu(e);
                setMenuSehlf(shelf);
              }
              }
            />
          </div>
        ))}
        {dropDownMenu && (
          <SPDM
            shelf={menuShelf}
            menuPosition={menuPosition}
            onEditClick={() => {
              setEditingShelfId(menuShelf.id);
              setDropDownMenu(false);
            }}
          />
        )}
      </div>
      <div className="add-shelf" onClick={createNewShelf}>
        +
      </div>
    </div>
  );
};

export { ShelvesPanel };
