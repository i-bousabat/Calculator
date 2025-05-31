let operator = '';
let rightOperand = '';
let leftOperand = '';
let justEvaluated = false;

const operators = ['+','-','*','/', '='];

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
container.addEventListener('click', (e) => {            //TODO clean up---------------------------------------------------------------
    let selected =  e.target.textContent;

    if (selected === 'DEL'){    //delete
        del();

    }else if (selected === 'AC'){   //clear
        clear();

    }else if (selected === '='){ //input is equals   
        equals();

    }else if (operators.includes(selected)){ //opeators
        inputIsOperator(selected);

    }else{  //numbers
        if (justEvaluated) {
            display.textContent = selected;
            justEvaluated = false;
        } else {
            display.textContent += selected; 
        }
    };
});

function del(){
    display.textContent = display.textContent.slice(0,-1);
};

function clear(){
    operator = '';
    rightOperand = '';
    leftOperand = '';
    justEvaluated = false;
    display.textContent = '';
}
function inputIsOperator(oper){ //TODO --------------------------------------------------------- may add equals() functions
     
    if (leftOperand === ''){
        leftOperand = display.textContent;
        operator = oper;
        display.textContent = '';

    }else{
        rightOperand = display.textContent;
        let result = operate(Number(leftOperand), operator, Number(rightOperand));
        display.textContent = `${result}`;
        leftOperand = `${result}`;
        operator = oper; 
        rightOperand = ''; 
    }
    justEvaluated = true;
}

function equals(){
    rightOperand = display.textContent;
    alert([leftOperand, operator, rightOperand]);
    let result = operate(Number(leftOperand), operator, Number(rightOperand));
    display.textContent = `${result}`;  
    leftOperand = ``;
    rightOperand = ''; 
    operator = '';
    justEvaluated = true;

}