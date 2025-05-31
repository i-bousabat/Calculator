let operator = '';
let rightOperand = '';
let leftOperand = '';
let justEvaluated = false;

const container = document.querySelector('.container');
const display = document.querySelector('#display');

const operators = ['+', '-', '*', '/', '='];

//basic math functions
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    //return null if divide-by-zero is attempted
    return b === 0 ? null : a / b;
}

//round long decimals to avoid not fitting in display
function roundResult(num) {
    return Math.round(num * 1000) / 1000;
}

//calls appropriate math function and handles divide-by-zero
function operate(a, operator, b) {
    let result;
    switch (operator) {
        case '+': result = add(a, b); break;
        case '-': result = subtract(a, b); break;
        case '*': result = multiply(a, b); break;
        case '/': result = divide(a, b); break;
    }

    //handle divide-by-zero
    if (result === null) {
        clear();
        alert('Cannot Divide By 0');
        return '';
    }

    return roundResult(result);
}

//event listener for button clicks
container.addEventListener('click', (e) => {
    let selected = e.target.textContent;

    if (selected === 'DEL') {
        del(); //delete last character

    } else if (selected === 'AC') {
        clear(); //clear everything

    } else if (selected === '=') {
        equals(); //evaluate expression

    } else if (operators.includes(selected)) {
        inputIsOperator(selected); //store or evaluate with operator

    } else {
        //prevent multiple decimals
        if (selected === '.' && display.textContent.includes('.')) {
            return; //do nothing if already has a decimal
        }

        //if just evaluated, start new input instead of appending
        if (justEvaluated) {
            display.textContent = selected;
            justEvaluated = false;
        } else {
            display.textContent += selected;
        }
    }
});

//remove last character from display
function del() {
    display.textContent = display.textContent.slice(0, -1);
}

//reset calculator state
function clear() {
    operator = '';
    rightOperand = '';
    leftOperand = '';
    justEvaluated = false;
    display.textContent = '';
}

//handle operator input and evaluate if needed
function inputIsOperator(oper) {
    if (display.textContent === '') {
        operator = oper; //replace previous operator if no input
        return;
    }

    if (leftOperand === '') {
        //first time an operator is pressed
        leftOperand = display.textContent;
        operator = oper;
        display.textContent = '';
    } else {
        //chain operations: evaluate previous, then store new operator
        rightOperand = display.textContent;
        let result = operate(Number(leftOperand), operator, Number(rightOperand));
        display.textContent = `${result}`;
        leftOperand = `${result}`;
        operator = oper;
        rightOperand = '';
    }
    justEvaluated = true;
}

//handle equals press
function equals() {
    if (leftOperand === '' || operator === '' || display.textContent === '') return;

    rightOperand = display.textContent;
    let result = operate(Number(leftOperand), operator, Number(rightOperand));
    display.textContent = `${result}`;

    //reset for new calculation
    leftOperand = '';
    rightOperand = '';
    operator = '';
    justEvaluated = true;
}
