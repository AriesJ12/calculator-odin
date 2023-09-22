"use strict";

const buttons = document.querySelectorAll("button");

buttons.forEach(but => but.addEventListener("click", update));


//basic functions
function add(a, b) {
  return a + b;
}
function minus(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

//choose the basic function
function operate(firstNum, operator, secondNum) {
  switch (operator) {
    case "+":
      return add(firstNum, secondNum);
    case "-":
      return minus(firstNum, secondNum);
    case "*":
      return multiply(firstNum, secondNum);
    case "/":
      return divide(firstNum, secondNum);
    default:
      return NaN;
  }
}

function update(event)
{
  //append the value
  append(event);

  //call operate

}

function append(event)
{
  const TYPE = event.target.dataset.type;
  const VALUE = event.target.dataset.value;
  const DISPLAY = document.querySelector(".display");

  console.log(DISPLAY);
  if(TYPE === "number")
  {
    DISPLAY.textContent = DISPLAY.textContent + VALUE;
  }
  else if (TYPE === "operation")
  {
    DISPLAY.textContent = `${DISPLAY.textContent} ${VALUE} `;
  }
  else
  {
    if(VALUE === "clear")
    {
      DISPLAY.textContent = "";
    }
    else
    {
      DISPLAY.textContent = DISPLAY.textContent.slice(0, DISPLAY.textContent.length - 1)
    }
  }

}