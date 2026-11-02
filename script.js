
const display = document.getElementById("display");
const calculation = document.getElementById("calculation");
const resultDisplay = document.getElementById("result");

const clearallBtn = document.getElementById("clearallBtn");
const deleteBtn = document.getElementById("deleteBtn");

const divisionBtn = document.getElementById("divisionBtn");
const multiplicationBtn = document.getElementById("multiplicationBtn");
const subtractionBtn = document.getElementById("subtractionBtn");
const additionBtn = document.getElementById("additionBtn");

const numberButtons = document.querySelectorAll(".number");
const equalstoBtn = document.getElementById("equalstoBtn");
const decimals = document.getElementById("decimals");


// Variables for calculator operation

let firstNumber = null;
let secondNumber = null;
let operator = null;

let waitingForSecondNumber = false;
let justCalculated = false;


// Basic math functions

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {

    if (num2 === 0) {
        return "Cannot divide by zero!";
    }

    return num1 / num2;
}


// Operate function

function operate(operator, num1, num2) {

    if (operator === "+") {
        return add(num1, num2);
    }

    else if (operator === "-") {
        return subtract(num1, num2);
    }

    else if (operator === "*") {
        return multiply(num1, num2);
    }

    else if (operator === "/") {
        return divide(num1, num2);
    }

}


// Number button functionality

numberButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        const buttonValue = button.textContent;

        if (justCalculated) {

            resultDisplay.textContent = buttonValue;
            calculation.textContent = "";

            firstNumber = null;
            secondNumber = null;
            operator = null;

            justCalculated = false;

        }

        else if (waitingForSecondNumber) {

            resultDisplay.textContent = buttonValue;

            waitingForSecondNumber = false;

        }

        else if (resultDisplay.textContent === "0" ||
                 resultDisplay.textContent === "Cannot divide by zero!") {

            resultDisplay.textContent = buttonValue;

        }

        else {

            resultDisplay.textContent += buttonValue;

        }

        decimals.disabled = resultDisplay.textContent.includes(".");

    });

});


// Clear button

clearallBtn.addEventListener("click", function() {

    resultDisplay.textContent = "0";
    calculation.textContent = "";

    firstNumber = null;
    secondNumber = null;
    operator = null;

    waitingForSecondNumber = false;
    justCalculated = false;

    decimals.disabled = false;

});


// Delete button

deleteBtn.addEventListener("click", function() {

    if (waitingForSecondNumber) {
        return;
    }

    if (justCalculated) {

        firstNumber = null;
        secondNumber = null;
        operator = null;

        calculation.textContent = "";
        justCalculated = false;

    }

    if (resultDisplay.textContent === "Cannot divide by zero!") {

        resultDisplay.textContent = "0";

    }

    else if (resultDisplay.textContent.length > 1) {

        resultDisplay.textContent =
            resultDisplay.textContent.slice(0, -1);

    }

    else {

        resultDisplay.textContent = "0";

    }

    decimals.disabled = resultDisplay.textContent.includes(".");

});


// Addition button

additionBtn.addEventListener("click", function() {

    chooseOperator("+");

});


// Subtraction button

subtractionBtn.addEventListener("click", function() {

    chooseOperator("-");

});


// Multiplication button

multiplicationBtn.addEventListener("click", function() {

    chooseOperator("*");

});


// Division button

divisionBtn.addEventListener("click", function() {

    chooseOperator("/");

});


// Function for selecting an operator

function chooseOperator(selectedOperator) {

    if (resultDisplay.textContent === "Cannot divide by zero!") {
        return;
    }

    if (waitingForSecondNumber) {

        operator = selectedOperator;

        calculation.textContent = firstNumber + " " + operator;

        return;

    }

    if (justCalculated) {

        firstNumber = Number(resultDisplay.textContent);

        justCalculated = false;

    }

    else if (firstNumber === null) {

        firstNumber = Number(resultDisplay.textContent);

    }

    else if (operator !== null) {

        secondNumber = Number(resultDisplay.textContent);

        let result = operate(operator, firstNumber, secondNumber);

        if (result === "Cannot divide by zero!") {

            calculation.textContent =
                firstNumber + " " + operator + " " + secondNumber + " =";

            resultDisplay.textContent = result;

            firstNumber = null;
            secondNumber = null;
            operator = null;

            justCalculated = true;

            return;

        }

        result = Number(result.toFixed(8));

        calculation.textContent =
            firstNumber + " " + operator + " " + secondNumber + " =";

        resultDisplay.textContent = result;

        firstNumber = result;

    }

    operator = selectedOperator;

    calculation.textContent = firstNumber + " " + operator;

    waitingForSecondNumber = true;

    decimals.disabled = false;

}


// Decimal button

decimals.addEventListener("click", function() {

    if (justCalculated) {

        resultDisplay.textContent = "0.";
        calculation.textContent = "";

        firstNumber = null;
        secondNumber = null;
        operator = null;

        justCalculated = false;

    }

    else if (waitingForSecondNumber) {

        resultDisplay.textContent = "0.";

        waitingForSecondNumber = false;

    }

    else if (!resultDisplay.textContent.includes(".")) {

        resultDisplay.textContent += ".";

    }

    decimals.disabled = true;

});


// Equal button

equalstoBtn.addEventListener("click", function() {

    if (firstNumber === null || operator === null ||
        waitingForSecondNumber || justCalculated) {

        return;

    }

    secondNumber = Number(resultDisplay.textContent);

    let result = operate(operator, firstNumber, secondNumber);

    calculation.textContent =
        firstNumber + " " + operator + " " + secondNumber + " =";


    if (result === "Cannot divide by zero!") {

        resultDisplay.textContent = result;

        firstNumber = null;
        secondNumber = null;
        operator = null;

        justCalculated = true;

        return;

    }

    result = Number(result.toFixed(8));

    resultDisplay.textContent = result;

    firstNumber = result;
    secondNumber = null;
    operator = null;

    waitingForSecondNumber = false;
    justCalculated = true;

    decimals.disabled = resultDisplay.textContent.includes(".");

});