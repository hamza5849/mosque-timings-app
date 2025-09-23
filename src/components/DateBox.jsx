// src/components/DateBox.jsx
import React from "react";

function DateBox({ dates }) {
  if (!dates) return null;

  return (
    <div
      className="card bg-light text-dark shadow-lg rounded-3"
      style={{
        // Bootstrap cannot handle exact width/height for square box
        width: "12rem",
        height: "12rem",
      }}
    >
      <div className="card-body d-flex flex-column justify-content-center align-items-center text-center p-3">
        <h5 className="fw-bold mb-2">📅 Today</h5>
        <p className="mb-1">{dates.gregorian}</p>
        <p className="mb-0">{dates.hijri}</p>
      </div>
    </div>
  );
}

export default DateBox;
