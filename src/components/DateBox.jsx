// src/components/DateBox.jsx
import React from "react";

function DateBox({ dates }) {
  if (!dates) return null;

  return (
    // Positioned box for today’s date
    <div className="date-box card bg-dark text-white shadow-sm">
      <div className="card-body d-flex flex-column justify-content-center text-center p-2">
        <h6 className="fw-bold mb-1">📅 Today</h6>
        <small>{dates.gregorian}</small>
        <small>{dates.hijri}</small>
      </div>
    </div>
  );
}

export default DateBox;
