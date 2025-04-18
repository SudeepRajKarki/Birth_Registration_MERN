import React from 'react';
import './Home.css'; // Importing custom styles

const Home = () => {
    return (
        <div className="bg-light">
            {/* Hero Section */}
            <section className="hero-section text-center d-flex flex-column justify-content-center align-items-center">
                <div className="container py-5">
                    <h1 className="hero-title mb-4">
                        Government's Initiative for Easy Online Birth Registration
                    </h1>
                    <p className="hero-description mb-4">
                        A convenient and secure online system to register births from anywhere, anytime.
                    </p>
                    
                </div>
            </section>

            {/* Benefits & Process */}
            <section className="container my-5">
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card custom-card h-100">
                            <div className="card-body">
                                <h3 className="card-title text-center text-primary mb-4">Benefits of Online Registration</h3>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Register from the comfort of your home</li>
                                    <li className="list-group-item">Fast processing for birth certificates</li>
                                    <li className="list-group-item">Secure and private online system</li>
                                    <li className="list-group-item">Track your application in real time</li>
                                    <li className="list-group-item">Paperless – upload documents digitally</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card custom-card h-100">
                            <div className="card-body">
                                <h3 className="card-title text-center text-primary mb-4">How the Process Works</h3>
                                <ol className="list-group list-group-numbered list-group-flush">
                                    <li className="list-group-item">Register a account and login from it.</li>
                                    <li className="list-group-item">Register your birth.</li>
                                    <li className="list-group-item">Your Registration will be frorwarded to admin.</li>
                                    <li className="list-group-item">You can see the status of your registration.</li>
                                    <li className="list-group-item">You can delete your account or registration.</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tips Section */}
            <section className="container my-5">
                <div className="card custom-card p-5">
                    <h2 className="card-title text-center text-primary mb-4">Tips for a Smooth Registration</h2>
                    <p className="text-center mb-4">Follow these tips for a seamless experience:</p>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Keep child & parents' details ready</li>
                        <li className="list-group-item">Ensure a stable internet connection</li>
                        <li className="list-group-item">Reach out to support if needed</li>
                    </ul>
                </div>
            </section>

            {/* Testimonials */}
            <section className="container my-5 text-center">
                <h2 className="text-primary mb-4">What Citizens Are Saying</h2>
                <div className="row g-4">
                    <div className="col-md-6">
                        <div className="card custom-card p-4">
                            <p className="fst-italic text-muted">"I registered my child’s birth in minutes. So easy and stress-free!"</p>
                            <p className="fw-bold mb-0">Amrit Paudel</p>
                            <p className="text-muted">New Parent</p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card custom-card p-4">
                            <p className="fst-italic text-muted">"Loved the tracking feature! Everything was quick and clear."</p>
                            <p className="fw-bold mb-0">Himal Gurung</p>
                            <p className="text-muted">Happy User</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
