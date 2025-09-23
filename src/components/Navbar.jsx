// src/components/Navbar.jsx
import React from "react";

function Navbar() {
  return (
    // Bootstrap dark navbar
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        {/* Brand/Logo */}
        <a className="navbar-brand fw-bold" href="#">
             Prayer Times
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
