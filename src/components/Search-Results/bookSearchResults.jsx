import React from "react";
import "./bookSearchResults.css";
import { useGlobalContext } from "../../context";
const bookSearchResults = () => {
  const { searchResults } = useGlobalContext();

  return (
    <div>
      {searchResults.length > 0 ? (
        searchResults.map((book) => <div key={book.id}>{book.title}</div>)
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default bookSearchResults;
