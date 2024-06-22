import React from 'react';
// import './Navbar.css'; // You can create a separate CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#home">MyBrand</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="#home">Home</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#about">About</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#services">Services</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#contact">Contact</a>
                    </li>
                    </ul>
                </div>
        </nav>
    );
};

const styles = {
    navbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
    },
    brand: {
      fontSize: '24px',
      fontWeight: 'bold',
    },
    navLinks: {
      listStyle: 'none',
      display: 'flex',
      margin: 0,
      padding: 0,
    },
    navItem: {
      margin: '0 10px',
    },
    navLink: {
      color: '#fff',
      textDecoration: 'none',
      fontSize: '18px',
    },
  };

export default Navbar;