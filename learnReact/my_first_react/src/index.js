import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './Navbar';

const root = document.getElementById('root');
const navbarRoot = document.getElementById('navbar-root');

ReactDOM.render(
  <React.StrictMode>
      <main>
        <section id="home">
          <h5>Welcome to My Website</h5>
        </section>
        <section id="about">
          <h5>About Us</h5>
        </section>
        <section id="services">
          <h5>Our Services</h5>
        </section>
        <section id="contact">
          <h5>Contact Us</h5>
        </section>
      </main>
  </React.StrictMode>,
  root
);

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
  </React.StrictMode>,
  navbarRoot
);