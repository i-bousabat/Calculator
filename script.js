let operator = '';
let rightOperand = '';
let leftOperand = '';

const operands = ['+','-','*','/'];

function add(a,b) {
    return a + b;
};

function subtract(a,b){
    return a - b;
};


function multiply(a,b){
    return a * b;
};

function divide(a,b){
    return a / b;
};

function operate(a, operator, b){
    switch (operator) {
        case '+':
            return add(a,b);
        
        case '-':
            return subtract(a,b);

        case '*':
            return multiply(a,b);

        case '/':
            return divide(a,b);    
    };
};

const container = document.querySelector('.container');
const display = document.querySelector('#display');
container.addEventListener('click', (e) => {
    let selected =  e.target.textContent;
    alert(selected);

    if (selected === 'DEL'){
        //FUNCTINO TO REMOVE PREV INPUT
    }else if (selected === 'AC'){
        //FUNCTION FOR CLEARING
    }else if (operands.includes(selected)){
        display.textContent = `${selected}`;
        
    }
});

