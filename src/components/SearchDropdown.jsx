// src/components/SearchDropdown.jsx
import React, { useState } from "react";

function SearchDropdown({ onSearch }) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city && country) {
      onSearch({ city, country });
      setCity(""); // Reset city input
      setCountry(""); // Reset country input
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      {/* Wrapper dropdown */}
      <div className="dropdown w-75 w-md-50">
        {/* Button to open dropdown */}
        <button
          className="btn btn-primary btn-sm dropdown-toggle w-100"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Search City & Country
        </button>

        {/* Dropdown form */}
        <div className="dropdown-menu p-3 shadow rounded-3 w-100">
          <form onSubmit={handleSubmit}>
            {/* City input */}
            <div className="mb-2">
              <label className="form-label fw-semibold small">City</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
                required
              />
            </div>

            {/* Country input */}
            <div className="mb-2">
              <label className="form-label fw-semibold small">Country</label>
              <input
                type="text"
                className="form-control form-control-sm"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Enter country"
                required
              />
            </div>

            {/* Submit button */}
            <button type="submit" className="btn btn-success btn-sm w-100 fw-bold">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SearchDropdown;
