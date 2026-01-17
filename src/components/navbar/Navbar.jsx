import { useRef, useState } from "react";
import "./navbar.css";
import treeIcon from "../../images/treeI.svg";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useGlobalContext } from "../../context/context";
import api from "../../api/axiosConfig";
import debounce from "lodash.debounce";
import SearchBar from "../Search/SearchBar";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user } = useAuth();
  const { leftPanelOpen, setLeftPanel, setSearchedBooks, searchedBooks } =
    useGlobalContext();

  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOnClickOutside(wrapperRef, () => setOpen(false));
  const findBook = async (searchInput) => {
    try {
      const books = await api.get(`/api/v1/books/search`, {
        params: {
          q: searchInput,
        },
      });
      console.log(books);
      setSearchedBooks(books.data);
    } catch (err) {
      console.log(err);
    }
  };
  const debouncedSearch = debounce((q) => {
    findBook(q);
  }, 300);

  const leftPanelSelection = () => {
    //Opens and closes left panel
    setLeftPanel(!leftPanelOpen);
  };

  return (
    <div className="navbar-container">
      <div className="left-navbar-container">
        <div className="icon-title-container">
          <div className="icon-container">
            <div className="icon">
              <img src={treeIcon} className="tree-icon" />
            </div>
          </div>
          <div className="title-container">
            <span>Book</span> <br />
            <span className="nook">Nook</span>
          </div>
        </div>
      </div>
      {user ? (
        // Authenticated navbar
        <div className="middle-navbar-container">
          <div className="navbar-items" onClick={leftPanelSelection}>
            Shelves
          </div>
          <div className="navbar-items">Characters</div>
          <div className="navbar-items">Community</div>

          <div ref={wrapperRef} className="search-bar-container">
            <input
              className="search-bar"
              type="text"
              onFocus={() => setOpen(true)}
              onChange={(e) => {
                debouncedSearch(e.target.value);
              }}
              placeholder="title"
            />
            {open && <SearchBar />}
          </div>
        </div>
      ) : (
        // Unauthenticated navbar
        <div></div>
      )}
      <div className="right-navbar-container">
        {user ? ( 
          <div>
            <Link to="/signout">Sign out</Link>
          </div>
        ) : (
          <div>
            <div>
               <Link to="/login">Login</Link>
            </div>
           <div>
               <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        )}
       
        <div className="menu-container">
          <HiOutlineDotsVertical className="dots-menu" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
