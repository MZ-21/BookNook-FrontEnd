import { useGlobalContext } from "../../context";
import { CiMenuKebab } from "react-icons/ci";
import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import api from "../../api/axiosConfig";
import "./searchbar.css";

const SearchBar = () => {
  const { searchedBooks } = useGlobalContext();
  const { setSearchResults, shelves } = useGlobalContext();
  const [menuSelected, setMenuSelected] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");

  useEffect(() => {
    const handleClickOutside = () => {
      setMenuSelected(null);
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const addBookToShelf = async (book, shelfName) => {
    try {
      await api.post(
        "/api/v1/shelf/addBook",
        {
          shelfName: shelfName,
          book: book,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setConfirmMessage(`Added to "${shelfName}"`);
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 2000);
    } catch (err) {
      console.error("Error adding book to shelf:", err);
    }
  };

  return (
    <>
      <ul className="sb-results-container">
        {searchedBooks.length > 0 ? (
          searchedBooks.map((book) => (
            <li
              className="sb-result"
              key={book.bookId}
              onClick={() => setSearchResults([book])}
            >
              {book.title}
              <CiMenuKebab
                className="sb-result-item-menu-icon"
                onClick={(e) => {
                  e.stopPropagation(); // prevent click from triggering the book's onClick
                  setMenuSelected(book.bookId);
                }}
              />
              {menuSelected === book.bookId && (
                <ul className="sb-result-item-menu">
                  {shelves.length > 0 ? (
                    shelves.map((shelf) => (
                      <li
                        key={shelf}
                        className="sb-result-item-menu-item"
                        onClick={() => addBookToShelf(book, shelf)}
                      >
                        <IoAdd />
                        {shelf}
                      </li>
                    ))
                  ) : (
                    <li>No shelves found</li>
                  )}
                </ul>
              )}

              {showConfirm && (
                <div className="popup-confirm">{confirmMessage}</div>
              )}
            </li>
          ))
        ) : (
          <li className="no-results">No results found</li>
        )}
      </ul>
    </>
  );
};

export default SearchBar;
