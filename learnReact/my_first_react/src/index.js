import React from 'react';
import ReactDOM from 'react-dom/client';
// import Navbar from './Navbar'; // Komponen Navbar
// import Content from './Content'; // Komponen utama konten
// import Comments from './Comments'; // Komponen daftar comments
// import Main from './Main'; // Komponen data yang dikirimkan ke Comments
// import Clock from './TimeString';
// import UserInput from './UserInput'
import Gallery from './Gallery';

const root = document.getElementById('root');
const navbarRoot = document.getElementById('navbar-root');

// Id root container  untuk aplikasi utama
const rootContainer = ReactDOM.createRoot(root);

// Id root container untuk navbar
const navbarContainer = ReactDOM.createRoot(navbarRoot);

rootContainer.render(
  <React.StrictMode>
    {/* <Main /> */}
    {/* <Comments /> */}
    {/* <Content />  */}
    {/* <Clock /> */}
    {/* <UserInput /> */}
    <Gallery />
    {/* <h2>{new Date().toLocaleTimeString()}</h2> */}
  </React.StrictMode>
);

navbarContainer.render(
  <React.StrictMode>
    {/* <Navbar /> */}
  </React.StrictMode>
);