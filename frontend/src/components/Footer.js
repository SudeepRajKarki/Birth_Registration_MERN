import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    const isLoggedIn = !!localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    return (
        <footer className="footer bg-dark text-white py-4 mt-5">
            <div className="container text-center">
                <h5 className="mb-3">Online Birth Registration</h5>
                <p className="mb-2">
                    A government initiative to simplify birth registration for every citizen.
                </p>

                <div className="footer-links mb-3">
                    {!isLoggedIn && (
                        <>
                            <Link to="/login" className="footer-link text-white me-3">Login</Link>
                            <Link to="/register" className="footer-link text-white">Register</Link>
                        </>
                    )}

                    {isLoggedIn && userRole !== 'admin' && (
                        <>
                            <Link to="/register-birth" className="footer-link text-white me-3">Register Birth</Link>
                            <Link to="/dashboard" className="footer-link text-white me-3">See Registrations</Link>
                            <Link to="/login" onClick={() => localStorage.clear()} className="footer-link text-white">Logout</Link>
                        </>
                    )}

                    {isLoggedIn && userRole === 'admin' && (
                        <>
                            <Link to="/admin" className="footer-link text-white me-3">See Dashboard</Link>
                            <Link to="/login" onClick={() => localStorage.clear()} className="footer-link text-white">Logout</Link>
                        </>
                    )}
                </div>

                <small>
                    &copy; {new Date().getFullYear()} Government of Nepal. All rights reserved.
                </small>
            </div>
        </footer>
    );
};

export default Footer;
