"use strict";

const btnNumbers = document.querySelectorAll("button[data-type='number']");

btnNumbers.forEach(but => but.addEventListener("click", numberUpdate));



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
      return NaN;
  }
}

//update the display
function numberUpdate(event)
{

  const VALUE = event.target.dataset.value;
  const DISPLAY = document.querySelector(".display");


  DISPLAY.textContent = DISPLAY.textContent + VALUE;
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
  else if (TYPE === "operation" && DISPLAY.textContent !== "")
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