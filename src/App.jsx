// src/App.jsx

import React, { useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import DateBox from "./components/DateBox";
import SearchDropdown from "./components/SearchDropdown";
import ResultCard from "./components/ResultCard";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [searchResult, setSearchResult] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [dates, setDates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  const handleSearch = async ({ city, country }) => {
    setLoading(true);
    setError("");

    // Input validation (letters and spaces only)
    if (!/^[a-zA-Z\s]+$/.test(city) || !/^[a-zA-Z\s]+$/.test(country)) {
      setError("City and Country must contain only letters.");
      setLoading(false);
      return;
    }

    try {
      // === Step 1: Validate city & country with Nominatim ===
      const geoResponse = await axios.get("https://nominatim.openstreetmap.org/search", {
        params: {
          city: city,
          country: country,
          format: "json",
          addressdetails: 1,
          limit: 1,
        },
      });

      if (!geoResponse.data || geoResponse.data.length === 0) {
        throw new Error("City or country not found.");
      }

      const validTypes = ["city", "town", "village", "administrative", "state"];
      const foundPlace = geoResponse.data.find((place) => {
        const placeCountry = place.address?.country || "";
        return (
          validTypes.includes(place.type) &&
          placeCountry.toLowerCase() === country.toLowerCase()
        );
      });

      if (!foundPlace) {
        throw new Error("City not found in the specified country.");
      }

      const lat = foundPlace.lat;
      const lon = foundPlace.lon;

      // === Step 2: Fetch prayer times from AlAdhan API ===
      const response = await axios.get(
        `${API_URL}/v1/timings?latitude=${lat}&longitude=${lon}&method=2`
      );

      const data = response.data.data;

      // === Step 3: Update states ===
      setSearchResult({ city, country });
      setPrayerTimes(data.timings);
      setDates({
        gregorian: `${data.date.gregorian.day} ${data.date.gregorian.month.en} ${data.date.gregorian.year}`,
        hijri: `${data.date.hijri.day} ${data.date.hijri.month.en} ${data.date.hijri.year} AH`,
      });
    } catch (err) {
      setError("City or country not found. Please check your input.");
      setSearchResult(null);
      setPrayerTimes(null);
      setDates(null);
    }

    setLoading(false);
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
      <div className="position-absolute w-100 h-100 bg-dark bg-opacity-50"></div>
      <Navbar />
      <div className="position-relative z-1 container mt-5">
        <h1 className="text-center mb-4 display-5">Mosque Prayer Timings</h1>
        <div className="row">
          <div className="col-12 col-md-3 mb-4 d-flex justify-content-center">
            <div className="d-flex align-items-start" style={{ minHeight: "200px" }}>
              <DateBox dates={dates || formattedDates} />
            </div>
          </div>
          <div className="col-12 col-md-9">
            <div className="mb-4">
              <SearchDropdown onSearch={handleSearch} />
            </div>
            {loading && <p className="text-center text-info fw-bold">Loading...</p>}
            {error && <div className="alert alert-danger">{error}</div>}
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
