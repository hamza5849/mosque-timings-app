// src/components/SearchDropdown.jsx
import React, { useState } from "react";

function SearchDropdown({ onSearch }) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && country) {
      onSearch({ city, country });
      setCity("");
      setCountry("");
    }
  };

  return (
    <div className="dropdown text-center">
      {/* Button to open dropdown */}
      <button
        className="btn btn-primary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Search City & Country
      </button>

      {/* Dropdown menu with form */}
      <div className="dropdown-menu p-4 shadow">
        <form onSubmit={handleSubmit}>
          {/* City input */}
          <div className="mb-3">
            <label className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              required
            />
          </div>

          {/* Country input */}
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input
              type="text"
              className="form-control"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              required
            />
          </div>

          {/* Submit button */}
          <button type="submit" className="btn btn-success w-100">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SearchDropdown;
