import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './redux/calculatorSlice';
import Calculator from './components/Calculator';

const store = configureStore({
  reducer: {
    calculator: calculatorReducer
  }
});

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Calculator />
      </div>
    </Provider>
  );
}

export default App;
