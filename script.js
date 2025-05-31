let operator = '';
let rightOperand = '';
let leftOperand = '';
let justEvaluated = false;
const container = document.querySelector('.container');
const display = document.querySelector('#display');

const operators = ['+', '-', '*', '/', '='];

// Basic math functions
function add(a, b) {
    return a + b;
};
function subtract(a, b) {
    return a - b;
};
function multiply(a, b) {
    return a * b;
};
function divide(a, b) {
    // Return error message for divide-by-zero
    if (b === 0){
        clear();
        return null;
    }else{    
        return a / b;
    }
}    

// Round long decimals to avoid display overflow
function roundResult(num) {
    return Math.round(num * 1000) / 1000;
}

// Calls appropriate math function
function operate(a, operator, b) {
    switch (operator) {
        case '+': return roundResult(add(a, b)); break;
        case '-': return roundResult(subtract(a, b)); break;
        case '*': return roundResult(multiply(a, b)); break;
        case '/': return roundResult(divide(a, b)); break;
    }
    if (result === null) {
        display.textContent = 'Cannot Divide By 0';
        return; // prevent further execution
    }

    return roundResult(result);
}

// Event listener for button clicks
container.addEventListener('click', (e) => {
    let selected = e.target.textContent;

    if (selected === 'DEL') {
        del(); // Delete last character

    } else if (selected === 'AC') {
        clear(); // Clear everything

    } else if (selected === '=') {
        equals(); // Evaluate expression

    } else if (operators.includes(selected)) {
        inputIsOperator(selected); // Store or evaluate with operator

    } else {
        // ✅ If just evaluated, start new input instead of appending
        if (justEvaluated) {
            display.textContent = selected;
            justEvaluated = false;
        } else {
            display.textContent += selected;
        }
    }
});

// Remove last character from display
function del() {
    display.textContent = display.textContent.slice(0, -1);
}

// Reset calculator state
function clear() {
    operator = '';
    rightOperand = '';
    leftOperand = '';
    justEvaluated = false;
    display.textContent = '';
}

// Handle operator input and evaluate if needed
function inputIsOperator(oper) {
    // Prevent evaluating if no new input after last operator
    if (display.textContent === '') {
        operator = oper; // ✅ Replace previous operator if needed
        return;
    }

    if (leftOperand === '') {
        // ✅ First time an operator is pressed
        leftOperand = display.textContent;
        operator = oper;
        display.textContent = '';
    } else {
        // ✅ Chain operations: evaluate previous, then store new operator
        rightOperand = display.textContent;
        let result = operate(Number(leftOperand), operator, Number(rightOperand));
        display.textContent = `${result}`;
        leftOperand = `${result}`;
        operator = oper;
        rightOperand = '';
    }
    justEvaluated = true;
}

// Handle equals press
function equals() {
    if (leftOperand === '' || operator === '' || display.textContent === '') return;

    rightOperand = display.textContent;
    let result = operate(Number(leftOperand), operator, Number(rightOperand));
    display.textContent = `${result}`;

    // ✅ Reset for new calculation
    leftOperand = '';
    rightOperand = '';
    operator = '';
    justEvaluated = true;
}