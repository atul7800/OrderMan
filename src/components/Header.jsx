import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header-container ${isScrolled ? "active" : ""} `}>
      <nav className="navbar">
        <div className="nav-container">
          {/* Hamburger Menu */}
          <div className="navbar-menu">
            <label className="bar">
              <input type="checkbox" checked={menuOpen} onChange={toggleMenu} />
              <span className="top"></span>
              <span className="middle"></span>
              <span className="bottom"></span>
            </label>
          </div>

          {/* Main Nav */}
          <div className={`nav-list ${menuOpen ? "active-btn" : ""}`}>
            <Link className="nav-link" to="/orders">
              Order
            </Link>
            <Link className="nav-link" to="/skus">
              SKUs
            </Link>
            <Link className="nav-link" to="/create-order">
              Create Order
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
