import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicNavbar from './components/PublicNavbar';
import PrivateNavbar from './components/PrivateNavbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import BirthForm from './components/BirthForm';
import Profile from './components/Profile';
import ForgotPassword from './components/ForgetPassword';
import Footer from './components/Footer';
import './App.css'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import ResetPassword from './components/ResetPassword';

// Inside your <Routes>:



const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const App = () => {
    const [loggedIn, setLoggedIn] = useState(isAuthenticated());

    useEffect(() => {
        setLoggedIn(isAuthenticated());
    }, []);

    return (
        <div className="app-layout d-flex flex-column min-vh-100">
            <Router>
                {loggedIn ? <PrivateNavbar /> : <PublicNavbar />}

                {/* Content area */}
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/forgot-password" element={<ForgotPassword />} />
                        <Route
                            path="/dashboard"
                            element={loggedIn ? <Dashboard /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/admin"
                            element={
                                loggedIn && localStorage.getItem('role') === 'admin' ? (
                                    <AdminDashboard />
                                ) : (
                                    <Navigate to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/profile"
                            element={loggedIn ? <Profile /> : <Navigate to="/login" />}
                        />
                        <Route
                            path="/register-birth"
                            element={loggedIn ? <BirthForm /> : <Navigate to="/login" />}
                        />
                        <Route path="*" element={<Navigate to="/" />} />
                        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

                    </Routes>
                </div>

                {/* Footer stays at the bottom */}
                <Footer />
            </Router>
        </div>
    );
};

export default App;
