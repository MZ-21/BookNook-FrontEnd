import React, { useState, useEffect } from "react";
import "./Shelves.css";
import { useParams } from "react-router-dom";
import api from "../../api/axiosConfig";

const Shelves = () => {
  const { shelfName } = useParams();
  const [booksInShelf, setBooksInShelf] = useState([]);

  useEffect(() => {
    getBooks();
  }, [shelfName]);

  async function getBooks() {
    try {
      const bookResponse = await api.get(`/api/v1/shelf/getBooks/${shelfName}`);
      setBooksInShelf(bookResponse.data);
    } catch (e) {
      console.error(`Error:`, e);
    }
  }
  return (
    <div className="shelf-content">
      <h2 className="shelf-title">{shelfName}</h2>
      <div className="book-grid">
        {booksInShelf.length > 0 ? (
          booksInShelf.map((book) => (
            <div key={book.bookId} className="book-card">
              <img
                src={book.coverImg || "/default-cover.jpg"}
                alt={book.title}
                className="book-cover"
              />
              <div className="book-title">{book.title}</div>
            </div>
          ))
        ) : (
          <div className="no-books">No books in this shelf yet.</div>
        )}
      </div>
    </div>
  );
};

export default Shelves;
