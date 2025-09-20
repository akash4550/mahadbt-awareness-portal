import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' }}>
            <div>
                <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
                    <h1>DBT-MITRA</h1>
                </Link>
            </div>
            <nav>
                <Link to="/community">
                    <button style={{ marginRight: '10px' }}>Community </button>
                </Link>
                <Link to="/login">
                    <button style={{ marginRight: '10px' }}>Login</button>
                </Link>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </nav>
        </div>
    </header>
);

export default Header;