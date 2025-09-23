// src/App.jsx
import React, { useState } from "react";
import axios from "axios";

// Importing components
import Navbar from "./components/Navbar";
import DateBox from "./components/DateBox";
import SearchDropdown from "./components/SearchDropdown";
import ResultCard from "./components/ResultCard";

// Import global CSS (App.css will handle background image)
import "./App.css";

function App() {
  // === State Management ===
  const [searchResult, setSearchResult] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [dates, setDates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // === Local fallback date (if API not called yet) ===
  const today = new Date();
  const formattedDates = {
    gregorian: today.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    hijri: today.toLocaleDateString("en-GB-u-ca-islamic", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
  };

  // === Fetch data from AlAdhan API ===
  const handleSearch = async ({ city, country }) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
      );

      const data = response.data.data;

      // Save search results
      setSearchResult({ city, country });
      setPrayerTimes(data.timings);
      setDates({
        gregorian: `${data.date.gregorian.day} ${data.date.gregorian.month.en} ${data.date.gregorian.year}`,
        hijri: `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`,
      });
    } catch (err) {
      setError(" Check your city/country.");
      setSearchResult(null);
      setPrayerTimes(null);
      setDates(null);
    }

    setLoading(false);
  };

  return (
    // Main wrapper (background is handled in App.css)
    <div className="min-vh-100 d-flex flex-column">
      {/* === Navbar === */}
      <Navbar />

      {/* === Page Content === */}
      <div className="container-fluid mt-4 text-white">
        <div className="row">
          {/* Left Side: Date Box */}
          <div className="col-12 col-md-3 mb-3">
            <DateBox dates={dates || formattedDates} />
          </div>

          {/* Right Side: Search + Results */}
          <div className="col-12 col-md-9">
            {/* Search Dropdown */}
            <div className="mb-3">
              <SearchDropdown onSearch={handleSearch} />
            </div>

            {/* Loading Indicator */}
            {loading && <p className="text-info">loading...</p>}

            {/* Error Message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Result Card */}
            {searchResult && (
              <div className="d-flex justify-content-center">
                <ResultCard
                  city={searchResult.city}
                  country={searchResult.country}
                  dates={dates}
                  prayerTimes={prayerTimes}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
