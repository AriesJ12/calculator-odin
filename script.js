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

btnSign.addEventListener("click", function () {
  const DISPLAY = document.querySelector(".display");
  const negativeOne = -1;

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

//update the display
function numberUpdate(event) {
  //gets the value of the button
  const VALUE = event.target.dataset.value;
  //gets the displayed number
  const DISPLAY = document.querySelector(".display");

  if (freshlyClick) {
    //checks if the operator is clicked(replaces the value instead of concat)
    DISPLAY.textContent = VALUE;
    freshlyClick = false;
    return;
  }
  if(overflowCounter())
  {
    //stops the calculator from overflowing
    return;
  }
  //checks if the current number contains a decimal
  if (VALUE === "." && DISPLAY.textContent.includes(".")) {
    //for adding decimals
    return;
  }
  //concat the value to the text content
  DISPLAY.textContent = DISPLAY.textContent + VALUE;
}

//update the operator and do calc if number is more than pair
function operationUpdate(event) {
  freshlyClick = true;
  const DISPLAY = document.querySelector(".display");
  const VALUE = event.target.dataset.value;

  num2OrRaw = +DISPLAY.textContent;
  //1
  //num2OrRaw = 1
  //check if nagbigay na si user ng operator
  //kung walang operator automatic Result = Raw
  //kung meron gagawin ung operation Result = Result opertor Raw
  if (firstPair) {
    num1OrResult = num2OrRaw;
    firstPair = false;
  } else {
    num1OrResult = operate(num1OrResult, globalOperator, num2OrRaw);
  }

  //stops = from changing the oper
  if (VALUE !== "=") {
    globalOperator = VALUE;
  }
  //reset the raw variable atsaka display ung result
  num2OrRaw = 0;
  DISPLAY.textContent = num1OrResult;

  //reset the firstpair after =
  if (VALUE === "=") {
    firstPair = true;
  }
}

//update upon click of clear and delete(must reset variables when cleared)
function removeUpdate(event) {
  const DISPLAY = document.querySelector(".display");
  const VALUE = event.target.dataset.value;
  if (VALUE === "clear") {
    DISPLAY.textContent = "0";
    num1OrResult = 0;
    globalOperator = "";
    num2OrRaw = 0;
    firstPair = true;
  } else {
    DISPLAY.textContent = DISPLAY.textContent.slice(
      0,
      DISPLAY.textContent.length - 1
    );
  }
}

function overflowCounter()
{
  const DISPLAY = document.querySelector(".display");
  const MAX_DISPLAY = 10;

  return DISPLAY.textContent.length >= MAX_DISPLAY ? true : false;
}