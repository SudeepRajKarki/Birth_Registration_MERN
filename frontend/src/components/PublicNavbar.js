import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const PublicNavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* Company Logo and Name */}
            <Link to="/" className="navbar-brand d-flex align-items-center">
                Birth Registration App
            </Link>

            {/* Hamburger Menu Button */}
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

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto d-flex gap-3">
                    <li className="nav-item">
                        <NavLink to="/" className="nav-link" activeClassName="active" exact>
                            Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/register" className="nav-link" activeClassName="active">
                            Register
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/login" className="nav-link" activeClassName="active">
                            Login
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default PublicNavbar;
