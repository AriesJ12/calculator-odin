//makes the javascript uses strict rules;
"use strict";

//num1OrResult stores the first number at result
let num1OrResult = 0;
//stores the operator
let globalOperator = "";
//stores second number
let num2OrRaw = 0;

//events for numbers - selects all the buttons with number
const btnNumbers = document.querySelectorAll("button[data-type='number']");
btnNumbers.forEach((but) => but.addEventListener("click", numberUpdate));

//events for operation
const btnOperation = document.querySelectorAll("button[data-type='operation']");
btnOperation.forEach((but) => but.addEventListener("click", operationUpdate));

//events for removal
const btnRemove = document.querySelectorAll("button[data-type='remove']");
btnRemove.forEach((but) => but.addEventListener("click", removeUpdate));

//event for change sign
const btnSign = document.querySelector("button[data-type='sign']");

// Add an event listener to the button with id or class 'btnSign'
btnSign.addEventListener("click", function () {
    // Select the first element in the document with the class '.display'
    const DISPLAY = document.querySelector(".display");
    // Declare a constant with the value of -1
    const negativeOne = -1;
  
    // Convert the text content of the DISPLAY element to a number, multiply it by -1, and assign the result back to DISPLAY.textContent
    DISPLAY.textContent = +DISPLAY.textContent * negativeOne;
});

//choose the basic function
function operate(firstNum, operator, secondNum) {
  switch (operator) {
    case "+":
      return firstNum + secondNum;
    case "-":
      return firstNum - secondNum;
    case "*":
      return firstNum * secondNum;
    case "/":
      return firstNum / secondNum;
    default:
      return secondNum;
  }
}

//updates upon clicking an operation
let freshlyClick = true;
let firstPair = true;

// Function to update the display
function numberUpdate(event) {
    // Get the value of the clicked button from its 'data-value' attribute
    const VALUE = event.target.dataset.value;
    // Select the first element in the document with the class '.display'
    const DISPLAY = document.querySelector(".display");
  
    // If the operator was just clicked, replace the display value instead of concatenating
    if (freshlyClick) {
      DISPLAY.textContent = VALUE;
      freshlyClick = false;
      return;
    }
  
    // If the display is about to overflow, stop further input
    if(overflowCounter()) {
      return;
    }
  
    // If the clicked button is a decimal point and the display already contains a decimal point, prevent further input
    if (VALUE === "." && DISPLAY.textContent.includes(".")) {
      return;
    }
  
    // If none of the above conditions are met, append the clicked button's value to the display
    DISPLAY.textContent = DISPLAY.textContent + VALUE;
}

// This function is called when an operator button is clicked
function operationUpdate(event) {
    // Set freshlyClick to true, but it's not used in this function
    freshlyClick = true;
  
    // Get the display element from the DOM
    const DISPLAY = document.querySelector(".display");
  
    // Get the operator value from the clicked button
    const VALUE = event.target.dataset.value;
  
    // Convert the current display content to a number
    num2OrRaw = +DISPLAY.textContent;
  
    // If this is the first pair of numbers in an operation
    if (firstPair) {
      // Set the first operand or result to the second operand or raw input
      num1OrResult = num2OrRaw;
  
      // Indicate that the first pair of numbers has been processed
      firstPair = false;
    } else {
      // Perform the operation and limit the result's length
      num1OrResult = limitNumberLength(operate(num1OrResult, globalOperator, num2OrRaw));
    }
  
    // If the equals sign was not clicked, update the global operator
    if (VALUE !== "=") {
      globalOperator = VALUE;
    }
  
    // Reset the second operand or raw input and update the display
    num2OrRaw = 0;
    DISPLAY.textContent = num1OrResult;
  
    // If the equals sign was clicked, reset the first pair indicator
    if (VALUE === "=") {
      firstPair = true;
    }
}

//update upon click of clear and delete(must reset variables when cleared)
function removeUpdate(event) {
    // Get the display element from the DOM
    const DISPLAY = document.querySelector(".display");

    // Get the value from the clicked button
    const VALUE = event.target.dataset.value;

    // If the clear button was clicked
    if (VALUE === "clear") {
        // Reset the display and all the global variables
        DISPLAY.textContent = "0";
        num1OrResult = 0;
        globalOperator = "";
        num2OrRaw = 0;
        firstPair = true;
    } else {
        // If the delete button was clicked
        if (DISPLAY.textContent.length === 1) {
            // If the display has only one digit, set it to 0
            DISPLAY.textContent = "0";
        } else {
            // Remove the last character from the display
            DISPLAY.textContent = DISPLAY.textContent.slice(0, DISPLAY.textContent.length - 1);
        }
    }
}
  

// Function to check if the display content length exceeds the maximum
function overflowCounter() {
  // Get the display element from the DOM
  const DISPLAY = document.querySelector(".display");

  // Set the maximum display length
  const MAX_DISPLAY = 10;

  // Return true if the display content length is greater than or equal to the maximum, false otherwise
  return DISPLAY.textContent.length >= MAX_DISPLAY ? true : false;
}

// Function to limit the length of a number
function limitNumberLength(num) {
  // Set the allowed length
  const allowedLength = 10;

  // Convert the number to a string
  let numStr = num.toString();

  // If the number length is within the allowed length, return the number
  if (numStr.length <= allowedLength) {
    return num;
  } else {
    // If the number is an integer and its length exceeds the allowed length, truncate it
    if (Number.isInteger(num)) {
      return parseInt(numStr.substring(0, allowedLength));
    } else {
      // If the number is a decimal, round it to fit within the allowed length
      let decimalIndex = numStr.indexOf('.');
      let decimalPlaces = allowedLength - decimalIndex - 1;
      return parseFloat(num.toFixed(decimalPlaces));
    }
  }
}
