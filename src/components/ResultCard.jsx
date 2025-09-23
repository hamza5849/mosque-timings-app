// src/components/ResultCard.jsx
import React from "react";

function ResultCard({ city, country, dates, prayerTimes }) {
  if (!prayerTimes || !dates) return null;

  return (
    // Bootstrap card with table inside
    <div className="card shadow-sm mt-4 result-card">
      <div className="card-header bg-primary text-white text-center">
        <h5 className="mb-0">
          Prayer Times for {city}, {country}
        </h5>
        <small>
          {dates.gregorian} (Gregorian) | {dates.hijri} (Hijri)
        </small>
      </div>

      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-striped table-hover text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>Prayer</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Fajr</td><td>{prayerTimes.Fajr}</td></tr>
              <tr><td>Dhuhr</td><td>{prayerTimes.Dhuhr}</td></tr>
              <tr><td>Asr</td><td>{prayerTimes.Asr}</td></tr>
              <tr><td>Maghrib</td><td>{prayerTimes.Maghrib}</td></tr>
              <tr><td>Isha</td><td>{prayerTimes.Isha}</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
