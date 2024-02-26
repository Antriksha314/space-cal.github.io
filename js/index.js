let runningTotal = 0;
let buffer = "0";
let prevOperator = null;

const screen = document.querySelector(".screen");

function flushOperations(intBuffer) {
  switch (prevOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "−":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    default:
      runningTotal /= intBuffer;
      break;
  }
}

function handleEqual() {
  if (!prevOperator) {
    return;
  }
  flushOperations(parseInt(buffer));
  prevOperator = null;
  buffer = runningTotal;
  runningTotal = 0;
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperations(intBuffer);
  }
  prevOperator = symbol;
  buffer = "0";
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    case "=":
      handleEqual();
      break;
    case "+":
      handleMath(symbol);
      break;
    case "−":
      handleMath(symbol);
      break;
    case "×":
      handleMath(symbol);
      break;
    case "÷":
      handleMath(symbol);
      break;
    default:
      buffer = "0";
      break;
  }
}

function handleNumber(numberString) {
  if (buffer === "0") {
    buffer = numberString;
  } else {
    buffer += numberString;
  }
}

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
