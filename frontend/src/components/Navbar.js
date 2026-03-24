import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const links = [
    { to: "/", label: "Home" },
    { to: "/login", label: "Login" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/skill-test", label: "Skill Test" },
    { to: "/planner", label: "Planner" },
    { to: "/progress", label: "Progress" },
  ];

  return (
    <header className="nav-root">
      <div className="nav-inner">
        <h1 className="brand">Analyzer Learner Planner</h1>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
