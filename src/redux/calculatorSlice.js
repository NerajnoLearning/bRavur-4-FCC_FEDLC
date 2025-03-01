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
      const { firstOperand, display, operator, lastInputType } = state;
      const inputValue = parseFloat(display);

      if (nextOperator === '-' && (lastInputType === 'operator' || display === '0')) {
        if (display !== '-') {
          state.display = '-';
          state.lastInputType = 'negative';
          return;
        }
      }

      if (lastInputType === 'operator' && nextOperator !== '-') {
        state.operator = nextOperator; // Replace previous operator (excluding negative sign)
        return;
      }

      if (operator && !state.waitingForSecondOperand) {
        state.firstOperand = performCalculation(firstOperand, inputValue, operator);
        state.display = String(state.firstOperand);
      } else {
        state.firstOperand = inputValue;
      }

      state.waitingForSecondOperand = true;
      state.operator = nextOperator;
      state.lastInputType = 'operator';
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
  switch (operator) {
    case '+':
      return firstOperand + secondOperand;
    case '-':
      return firstOperand - secondOperand;
    case '*':
      return firstOperand * secondOperand;
    case '/':
      return firstOperand / secondOperand;
    default:
      return secondOperand;
  }
}

export const { inputDigit, inputDecimal, inputOperator, clearCalculator, calculateResult } = calculatorSlice.actions;
export default calculatorSlice.reducer;
