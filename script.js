const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const keys = document.querySelectorAll(".key");

let expression = "";
let justCalculated = false;

function show() {
  expressionEl.textContent = expression || "\u00A0";
  resultEl.textContent = expression || "0";
}

function toMathExpression(value) {
  return value
    .replaceAll("×", "*")
    .replaceAll("÷", "/")
    .replaceAll("−", "-");
}

function calculate() {
  try {
    if (!expression) return;
    const answer = Function(`"use strict"; return (${toMathExpression(expression)})`)();
    expressionEl.textContent = expression;
    resultEl.textContent = Number.isFinite(answer) ? String(answer) : "Error";
    expression = String(answer);
    justCalculated = true;
  } catch {
    resultEl.textContent = "Error";
    justCalculated = true;
  }
}

keys.forEach((key) => {
  key.addEventListener("click", () => {
    const value = key.dataset.value;
    const action = key.dataset.action;

    if (action === "clear") {
      expression = "";
      justCalculated = false;
      show();
      return;
    }

    if (action === "backspace") {
      expression = expression.slice(0, -1);
      show();
      return;
    }

    if (action === "equal") {
      calculate();
      return;
    }

    if (action === "percent") {
      if (expression) expression = String(Number(expression) / 100);
      show();
      return;
    }

    if (action === "sign") {
      if (!expression) return;
      expression = expression.startsWith("-") ? expression.slice(1) : `-${expression}`;
      show();
      return;
    }

    if (value) {
      const isOperator = ["+", "−", "×", "÷"].includes(value);
      if (justCalculated && !isOperator) expression = "";
      expression += value;
      justCalculated = false;
      show();
    }
  });
});

show();
