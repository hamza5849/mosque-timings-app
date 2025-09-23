// src/components/ResultCard.jsx
import React from "react";

function ResultCard({ city, country, dates, prayerTimes }) {
  if (!prayerTimes || !dates) return null;

  return (
    <div className="card shadow-lg rounded-4 w-100">
      {/* Card Header */}
      <div
        className="card-header text-white text-center py-3"
        style={{
          // Custom color because Bootstrap doesn't have AED6CF
          backgroundColor: "#AED6CF",
        }}
      >
        <h5 className="mb-1 fw-bold">
          Prayer Times for {city}, {country}
        </h5>
        <small className="text-dark">
          {dates.gregorian} (Gregorian) | {dates.hijri} (Hijri)
        </small>
      </div>

      {/* Card Body */}
      <div className="card-body p-3">
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center align-middle mb-0">
            <thead className="table-dark">
              <tr>
                <th>Prayer</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Fajr</td>
                <td>{prayerTimes.Fajr}</td>
              </tr>
              <tr>
                <td>Dhuhr</td>
                <td>{prayerTimes.Dhuhr}</td>
              </tr>
              <tr>
                <td>Asr</td>
                <td>{prayerTimes.Asr}</td>
              </tr>
              <tr>
                <td>Maghrib</td>
                <td>{prayerTimes.Maghrib}</td>
              </tr>
              <tr>
                <td>Isha</td>
                <td>{prayerTimes.Isha}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
