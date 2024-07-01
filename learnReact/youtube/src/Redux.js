import React from 'react';
import { createStore } from 'redux';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';
/**
 * Root reducer untuk mengelola store counter
 * 
 * @param {number} state - State saat ini dari counter. Default adalah 0
 * @param {object} action - Action yang dikirim ke reducer.
 * @param {string} action.type - Tipe dari action.
 * @returns {number} State baru dari counter berdasarkan action yang diterima.
 */
const rootReducer = (state = 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};

// Membuat store Redux dengan rootReducer dan Devtools extension
const store = createStore(rootReducer, composeWithDevTools());
console.log("Initial State = ", store.getState());

store.dispatch({ type: "INCREMENT" });
console.log("State after Increment = ", store.getState());

/**
 * Komponen Counter untuk menampilkan dan mengelola counter
 * 
 * @component
 * @returns {JSX.Element}
 */
const Counter = () => {
  // Mengambil nilai counter dari state Redux
  const count = useSelector(state => state); 
  // Mendapatkan dispatch function dari store Redux
  const dispatch = useDispatch(); 

  return (
    <div>
      <h1>Counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
    </div>
  );
};

/**
 * Komponen utama Redux yang menyediakan store dari aplikasi.
 * 
 * @component
 * @returns {JSX.Element}
 */
const Redux = () => {
  return (
    <Provider store={store}>
      <Counter />
    </Provider>
  );
};

export default Redux;