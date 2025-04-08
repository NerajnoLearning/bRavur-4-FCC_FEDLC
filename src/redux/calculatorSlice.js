import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  display: '0',
  firstOperand: null,
  operator: null,
  waitingForSecondOperand: false,
  lastInputType: null
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    inputDigit: (state, action) => {
      const digit = action.payload;
      if (state.waitingForSecondOperand) {
        state.display = digit;
        state.waitingForSecondOperand = false;
      } else {
        state.display = state.display === '0' ? digit : state.display + digit;
      }
      state.lastInputType = 'digit';
    },
    inputDecimal: (state) => {
      if (state.waitingForSecondOperand) {
        state.display = '0.';
        state.waitingForSecondOperand = false;
      } else if (!state.display.includes('.')) {
        state.display += '.';
      }
      state.lastInputType = 'decimal';
    },
    inputOperator: (state, action) => {
      const nextOperator = action.payload;
      const { firstOperand, display, operator } = state;

      // Special case for negative numbers
      if (nextOperator === '-' && (!display || display === '0' || state.waitingForSecondOperand)) {
        state.display = '-';
        state.waitingForSecondOperand = false;
        return;
      }

      const inputValue = parseFloat(display);

      // Handle consecutive operators
      if (operator && state.waitingForSecondOperand && display !== '-') {
        state.operator = nextOperator;
        return;
      }

      // Normal operation flow
      if (firstOperand === null && display !== '-') {
        state.firstOperand = inputValue;
      } else if (operator && display !== '-') {
        const result = performCalculation(firstOperand, inputValue, operator);
        state.display = String(result);
        state.firstOperand = result;
      }

      state.waitingForSecondOperand = true;
      state.operator = nextOperator;
    },
    calculateResult: (state) => {
      if (!state.operator || state.waitingForSecondOperand) {
        return;
      }

      const inputValue = parseFloat(state.display);
      const result = performCalculation(state.firstOperand, inputValue, state.operator);

      state.display = String(result);
      state.firstOperand = result;
      state.operator = null;
      state.waitingForSecondOperand = true;
      state.lastInputType = 'equals';
    },
    clearCalculator: (state) => {
      state.display = '0';
      state.firstOperand = null;
      state.operator = null;
      state.waitingForSecondOperand = false;
      state.lastInputType = null;
    }
  }
});

function performCalculation(firstOperand, secondOperand, operator) {
  // Handle negative numbers
  if (typeof secondOperand === 'string' && secondOperand === '-') {
    secondOperand = -1;
  }

  switch (operator) {
    case '+':
      return Number((firstOperand + secondOperand).toFixed(4));
    case '-':
      return Number((firstOperand - secondOperand).toFixed(4));
    case '*':
      return Number((firstOperand * secondOperand).toFixed(4));
    case '/':
      return Number((firstOperand / secondOperand).toFixed(4));
    default:
      return secondOperand;
  }
}

export const { inputDigit, inputDecimal, inputOperator, clearCalculator, calculateResult } = calculatorSlice.actions;
export default calculatorSlice.reducer;
