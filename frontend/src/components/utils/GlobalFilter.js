import React from "react";
import "../../styles/global_filter.css";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <input
      className="search-input"
      type="text"
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      placeholder="Search..."
    />
  );
};

export default GlobalFilter;
