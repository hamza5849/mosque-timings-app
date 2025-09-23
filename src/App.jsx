// src/App.jsx
import React, { useState } from "react"; // Import React and useState hook
import axios from "axios"; // Import axios for API calls

// Importing Components
import Navbar from "./components/Navbar";
import DateBox from "./components/DateBox";
import SearchDropdown from "./components/SearchDropdown";
import ResultCard from "./components/ResultCard";



// Import custom CSS (only necessary overrides)
import "./App.css";

function App() {
  // State to store search results
  const [searchResult, setSearchResult] = useState(null);
  // State to store prayer times from API
  const [prayerTimes, setPrayerTimes] = useState(null);
  // State to store date info
  const [dates, setDates] = useState(null);
  // State to indicate loading
  const [loading, setLoading] = useState(false);
  // State to store error messages
  const [error, setError] = useState("");

  // Fallback for today’s date if no API call yet
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

  // Function to fetch prayer times using API
  const handleSearch = async ({ city, country }) => {
    setLoading(true); // Show loading spinner/text
    setError(""); // Reset previous errors

    try {
      // Axios GET request to AlAdhan API
      const response = await axios.get(
        `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}`
      );
      const data = response.data.data;

      // Store results in states
      setSearchResult({ city, country });
      setPrayerTimes(data.timings);
      setDates({
        gregorian: `${data.date.gregorian.day} ${data.date.gregorian.month.en} ${data.date.gregorian.year}`,
        hijri: `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`,
      });
    } catch {
      // Handle API error
      setError("Check your city/country.");
      setSearchResult(null);
      setPrayerTimes(null);
      setDates(null);
    }

    setLoading(false); // Hide loading spinner/text
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column text-white position-relative"
      style={{
        // Custom background image (Bootstrap cannot handle custom images)
        backgroundImage: 'url("/MOSQUE.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay for better contrast */}
      <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50"></div>

      {/* Navbar at top */}
      <Navbar />

      {/* Page Content */}
      <div className="position-relative z-1 container mt-5">
        {/* Page Title */}
        <h1 className="text-center mb-4 display-5">Mosque Prayer Timings</h1>

        <div className="row">
          {/* Left Column: DateBox */}
          <div className="col-12 col-md-3 mb-4 d-flex justify-content-center">
            {/* Wrapper to maintain fixed height */}
            <div className="d-flex align-items-start" style={{ minHeight: "200px" }}>
              <DateBox dates={dates || formattedDates} />
            </div>
          </div>

          {/* Right Column: Search + Results */}
          <div className="col-12 col-md-9">
            {/* Search Dropdown */}
            <div className="mb-4">
              <SearchDropdown onSearch={handleSearch} />
            </div>

            {/* Loading indicator */}
            {loading && (
              <p className="text-center text-info fw-bold">Loading...</p>
            )}

            {/* Error message */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Display result card */}
            {searchResult && prayerTimes && (
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
