// src/App.jsx

import React, { useState } from "react";
import axios from "axios"; // Axios for API calls
import Navbar from "./components/Navbar"; // Navbar component
import DateBox from "./components/DateBox"; // Displays today’s Gregorian and Hijri dates
import SearchDropdown from "./components/SearchDropdown"; // Form for city & country input
import ResultCard from "./components/ResultCard"; // Displays prayer times
import "./App.css"; // Global CSS

function App() {
  // === States ===
  const [searchResult, setSearchResult] = useState(null); // Stores searched city/country
  const [prayerTimes, setPrayerTimes] = useState(null); // Stores prayer timings from API
  const [dates, setDates] = useState(null); // Stores Gregorian and Hijri dates
  const [loading, setLoading] = useState(false); // Indicates whether API call is in progress
  const [error, setError] = useState(""); // Stores error messages to show in the UI

  // === Fallback Dates ===
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

  // === Handle Search ===
  const handleSearch = async ({ city, country }) => {
    setLoading(true); // Show loading spinner/text
    setError(""); // Reset previous errors

    // === Client-side validation ===
    if (!/^[a-zA-Z\s]+$/.test(city) || !/^[a-zA-Z\s]+$/.test(country)) {
      setError("City and Country must contain only letters.");
      setLoading(false);
      return;
    }

    try {
      // === Step 1: Validate city & country using OpenStreetMap Nominatim ===
      const geoResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?city=${city}&country=${country}&format=json&addressdetails=1`
      );

      if (!geoResponse.data || geoResponse.data.length === 0) {
        throw new Error("City or country not found");
      }

      // === Step 2: Filter valid types & exact country match ===
      const validTypes = ["city", "town", "village", "administrative", "state"];
      const foundPlace = geoResponse.data.find((place) => {
        const placeCountry = place.address?.country?.toLowerCase() || "";
        return validTypes.includes(place.type) && placeCountry === country.toLowerCase();
      });

      if (!foundPlace) {
        throw new Error("City not found in the specified country");
      }

      const { lat, lon } = foundPlace;

      // === Step 3: Fetch prayer times from AlAdhan API ===
      const response = await axios.get(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
      );

      const data = response.data.data;

      // === Step 4: Update states with valid data ===
      setSearchResult({ city, country });
      setPrayerTimes(data.timings);
      setDates({
        gregorian: `${data.date.gregorian.day} ${data.date.gregorian.month.en} ${data.date.gregorian.year}`,
        hijri: `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`,
      });
    } catch (err) {
      // === Handle invalid input or API errors ===
      setError("City or country not found. Please check your input.");
      setSearchResult(null);
      setPrayerTimes(null);
      setDates(null);
    }

    setLoading(false); // Hide loading indicator
  };

  return (
    <div
      className="min-vh-100 d-flex flex-column text-white position-relative"
      style={{
        backgroundImage: 'url("/MOSQUE.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50"></div>

      {/* Navbar */}
      <Navbar />

      {/* Page Content */}
      <div className="position-relative z-1 container mt-5">
        <h1 className="text-center mb-4 display-5">Mosque Prayer Timings</h1>

        <div className="row">
          {/* Left Column: DateBox */}
          <div className="col-12 col-md-3 mb-4 d-flex justify-content-center">
            <div className="d-flex align-items-start" style={{ minHeight: "200px" }}>
              <DateBox dates={dates || formattedDates} />
            </div>
          </div>

          {/* Right Column: Search + Results */}
          <div className="col-12 col-md-9">
            <div className="mb-4">
              <SearchDropdown onSearch={handleSearch} />
            </div>

            {/* Loading indicator */}
            {loading && <p className="text-center text-info fw-bold">Loading...</p>}

            {/* Error alert */}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* Display prayer times */}
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
