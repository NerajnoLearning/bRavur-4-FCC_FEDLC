import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { inputDigit, inputDecimal, inputOperator, clearCalculator, calculateResult } from '../redux/calculatorSlice';
import '../styles/calculator.scss';

const Calculator = () => {
  const display = useSelector((state) => state.calculator.display);
  const dispatch = useDispatch();

  return (
    <div id="calculator" className="calculator">
      <div id="display">{display}</div>
      <div className="calculator-grid">
        <button id="clear" onClick={() => dispatch(clearCalculator())}>AC</button>
        <button id="divide" onClick={() => dispatch(inputOperator('/'))}>/</button>
        <button id="multiply" onClick={() => dispatch(inputOperator('*'))}>x</button>
        <button id="subtract" onClick={() => dispatch(inputOperator('-'))}>-</button>

        <button id="seven" onClick={() => dispatch(inputDigit('7'))}>7</button>
        <button id="eight" onClick={() => dispatch(inputDigit('8'))}>8</button>
        <button id="nine" onClick={() => dispatch(inputDigit('9'))}>9</button>
        <button id="add" onClick={() => dispatch(inputOperator('+'))}>+</button>

        <button id="four" onClick={() => dispatch(inputDigit('4'))}>4</button>
        <button id="five" onClick={() => dispatch(inputDigit('5'))}>5</button>
        <button id="six" onClick={() => dispatch(inputDigit('6'))}>6</button>

        <button id="one" onClick={() => dispatch(inputDigit('1'))}>1</button>
        <button id="two" onClick={() => dispatch(inputDigit('2'))}>2</button>
        <button id="three" onClick={() => dispatch(inputDigit('3'))}>3</button>

        <button id="zero" onClick={() => dispatch(inputDigit('0'))}>0</button>
        <button id="decimal" onClick={() => dispatch(inputDecimal())}>.</button>
        <button id="equals" onClick={() => dispatch(calculateResult())}>=</button>
      </div>
    </div>
  );
};

export default Calculator;
