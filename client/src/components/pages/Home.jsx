import React from 'react';
import { Link } from 'react-router-dom';

function Home ({user}) {
  return (
    <header className="home-cta">
      <h1 style={{color: '#c0392b'}} className="mb-5">Haunted Tours</h1>

      {user ? (
        <Link to="/tours/new" className="btn btn-primary reddin">Book a Haunted Tour Today</Link>
      ) : (
        <Link to="/register" className="btn btn-primary reddin">Register to Book a Haunted Tour Today</Link>
      )}
    </header>
  );
};

export default Home;