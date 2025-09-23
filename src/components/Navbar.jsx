// src/components/Navbar.jsx
import React from "react";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow-sm"
      style={{
        // Background color custom because Bootstrap doesn't have this exact shade
        backgroundColor: "#B6CEB4",
      }}
    >
      <div className="container">
        {/* Brand/Logo */}
        <a className="navbar-brand fw-bold fs-4 text-dark" href="#">
          Prayer Times
        </a>

        {/* Hamburger menu for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
