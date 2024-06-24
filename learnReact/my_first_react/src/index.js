import React from 'react';
import ReactDOM from 'react-dom/client';
// import Navbar from './Navbar';
// import Content from './Content';
// import Comment from './Comment';
// import App from './App';
// import Comments from './Comments';
import Main from './Main';

const root = document.getElementById('root');
const navbarRoot = document.getElementById('navbar-root');

const rootContainer = ReactDOM.createRoot(root);
const navbarContainer = ReactDOM.createRoot(navbarRoot);

rootContainer.render(
  <React.StrictMode>
    <Main />
    {/* <Comments /> */}
    {/* <Content />  */}
    {/* <Comment /> */}
    {/* <App /> */}
    {/* <h4>{new Date().toLocaleDateString()}</h4> */}
  </React.StrictMode>
);

navbarContainer.render(
  <React.StrictMode>
    {/* <Navbar /> */}
  </React.StrictMode>
);