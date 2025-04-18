import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const PrivateNavbar = () => {
    // Function to handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the JWT token
        localStorage.removeItem('role'); // Remove the user role
        window.location.href = '/'; // Refresh the page and redirect to home
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            {/* Dashboard Link */}
            <Link to="/dashboard" className="navbar-brand">
                Birth Registration App
            </Link>

            {/* Hamburger Menu Button */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#privateNavbarNav"
                aria-controls="privateNavbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navbar Links */}
            <div className="collapse navbar-collapse" id="privateNavbarNav">
                <ul className="navbar-nav ms-auto d-flex gap-3">

                
                {localStorage.getItem('role') === 'user' && (
                    <li className="nav-item">
                        <NavLink to="/dashboard" className="nav-link" activeClassName="active">
                            Dashboard
                        </NavLink>
                    </li>

                )}
                
                {localStorage.getItem('role') === 'user' && (
                    <li className="nav-item">
                        <NavLink to="/register-birth" className="nav-link" activeClassName="active">
                            BirthRegistration
                        </NavLink>
                    </li>
                )}
                {localStorage.getItem('role') === 'user' && (
                    <li className="nav-item">
                        <NavLink to="/profile" className="nav-link" activeClassName="active">
                            Profile
                        </NavLink>
                    </li>
                )}
                
                    {/* Show Admin Dashboard link only if user is an admin */}
                    {localStorage.getItem('role') === 'admin' && (
                        <li className="nav-item">
                            <NavLink to="/admin" className="nav-link" activeClassName="active">
                                Admin Dashboard
                            </NavLink>
                        </li>
                    )}
                    {/* Logout Button */}
                    <li className="nav-item">
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default PrivateNavbar;
