import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
// import Redux from './Redux';
// import MyForm from './FinalForm';
import EmployeeForm from './EmployeeForm';

/**
 * Titik utama masuk aplikasi React.
 * Menggunakan ReactDOM.createRoot untuk merender komponen utama 'App' di dalam elemen HTML dengan id 'root'
 * React.StrictMode digunakan untuk menyoroti potensi masalah dalam aplikasi
 */

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Redux /> */}
    {/* <MyForm /> */} 
    <EmployeeForm />
  </React.StrictMode>
); 
 