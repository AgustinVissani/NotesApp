import React from "react";

import "../styles/card.css";

const Cards = ({ note }) => {
  return (
    <div className="card">
      <div className="padding">
        <div className="card-title">{note.title}</div>
        {note.content && (
          <p className="card-content">
            <strong>Content:</strong> {note.content}
          </p>
        )}
        {note.categoryId && (
          <p className="card-content">
            <strong>Category:</strong> {note.category.name}
          </p>
        )}
      </div>
    </div>
  );
};

export default Cards;
