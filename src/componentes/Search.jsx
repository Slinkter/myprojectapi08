import React from "react";

const Search = ({ search, setSeach, handleSearch }) => {
  return (
    <div className="search-engine">
      <input
        type="text"
        className="city-search"
        placeholder="enter city name"
        name="search"
        value={search}
        onChange={(e) => setSeach(e.target.value)}
      />
      <button className="search-btn" onClick={handleSearch}>
        Search Weather
      </button>
    </div>
  );
};

export default Search;
