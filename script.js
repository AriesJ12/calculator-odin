"use strict";
let num1OrResult = 0;
let globalOperator = "";
let num2OrRaw = 0;


//events for numbers
const btnNumbers = document.querySelectorAll("button[data-type='number']");

btnNumbers.forEach((but) => but.addEventListener("click", numberUpdate));

//events for operation
const btnOperation = document.querySelectorAll("button[data-type='operation']");

btnOperation.forEach((but) => but.addEventListener("click", operationUpdate));

//events for removal
const btnRemove = document.querySelectorAll("button[data-type='remove']");

btnRemove.forEach(but => but.addEventListener("click", removeUpdate))

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

//update the display
function numberUpdate(event) {
  const VALUE = event.target.dataset.value;
  const DISPLAY = document.querySelector(".display");

  if (freshlyClick)
  {
    DISPLAY.textContent =  VALUE;
    freshlyClick = false;
    return;
  }
  DISPLAY.textContent = DISPLAY.textContent + VALUE;
}

//update the operator and do calc if number is more than pair
function operationUpdate(event) {
  freshlyClick = true;
  const DISPLAY = document.querySelector(".display");
  const VALUE = event.target.dataset.value;

  num2OrRaw = +DISPLAY.textContent;

  //stops = from changing the oper
  if (VALUE !== "=") {
    globalOperator = VALUE;
  }

  num1OrResult = operate(num1OrResult, globalOperator, num2OrRaw);

  num2OrRaw =0;

  DISPLAY.textContent = num1OrResult;
}


//update upon click of clear and delete(must reset variables when cleared)
function removeUpdate(event) {

  const DISPLAY = document.querySelector(".display");
  const VALUE = event.target.dataset.value; 
  if (VALUE === "clear") {
    DISPLAY.textContent = "";
    num1OrResult = 0;
    globalOperator = "";
    num2OrRaw = 0;
  } else {
    DISPLAY.textContent = DISPLAY.textContent.slice(
      0,
      DISPLAY.textContent.length - 1
    );
  }
}
