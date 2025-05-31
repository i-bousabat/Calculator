let operator = '';
let rightOperand = '';
let leftOperand = '';

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
container.addEventListener('click', (e) => {
    let selected =  e.target.textContent;
    alert(selected);

    if (selected === 'DEL'){    //delete
        del();

    }else if (selected === 'AC'){   //clear
        clear();

    }else if (operators.includes(selected)){ //opeators
        inputIsOperator(selected);
    
    }else if (selected === '='){ //input is equals



    }else{  //numbers
        display.textContent += `${selected}`; 
    };
});

function del(){
    display.textContent = display.textContent.slice(0,-1);
};

function clear(){
    operator = '';
    rightOperand = '';
    leftOperand = '';
    display.textContent = '';
}
function inputIsOperator(oper){
    
     if (leftOperand !== '' && rightOperand !== ''){
        //
     }
    else if (leftOperand === ''){
        leftOperand = display.textContent;
        display.textContent = '';

    }else{
        rightOperand = display.textContent;
        let result = operate(Number(leftOperand), oper, Number(rightOperand));
        display.textContent = `${result}`;
        leftOperand = `${result}`;
        rightOperand = '';
    }
}