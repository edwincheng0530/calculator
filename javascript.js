function add(x, y) {
    return Math.round((Number(x)+Number(y)) * 1000)/1000;
}

function subtract(x, y) {
    return Math.round((Number(x)-Number(y)) * 1000)/1000;
}

function multiply(x, y) {
    return Math.round((Number(x)*Number(y)) * 1000)/1000;
}

function divide(x, y) {
    return Math.round((Number(x)/Number(y)) * 1000)/1000;
}

function operate(num1, num2, operator) {
    let answer = 0;
    if(operator == 'add') {
        answer = add(num1, num2);
    } else if(operator == 'subtract') {
        answer = subtract(num1, num2);
    } else if(operator == 'multiply') {
        answer = multiply(num1, num2);
    } else {
        answer = divide(num1, num2);
    }
    return answer;
}


const output = document.querySelector('.output');
const previousOutput = document.querySelector('.previous');

let two_operands = [];
let current_number = "0";
let current_operation = "";
let final_operation = "";
let equalled = false;


const numb = document.querySelectorAll('.number');
numb.forEach(number => {
    number.addEventListener('click', function() {
        addNumber(number);
    })
});

const oper = document.querySelectorAll('.operate');
oper.forEach(operator => {
    operator.addEventListener('click', function() {
        addOperator(operator);
    })
});

const equals = document.querySelector('.equal');
equals.addEventListener('click', function() {
    equalsSign(equals);
});

const clear = document.querySelector('.clear');
clear.addEventListener('click', function() {
    clearing();
})

function addNumber(button) {
    if(current_operation != "") {
        final_operation = current_operation;
        current_operation = "";
        equalled = false;
    }

    if(equalled) {
        special_clear();
        equalled = false;
    }

    if(output.innerHTML === '0' && !button.matches('.decimal')) {
        output.innerHTML = button.innerHTML;
        current_number = button.innerHTML;
        return;
    }

    if(current_number.includes('.') && button.matches('.decimal')) {
        return;
    }

    current_number = current_number + button.innerHTML;
    output.innerHTML = output.innerHTML + button.innerHTML;
}

function addOperator(button) {
    if(current_operation != "") {
        output.innerHTML = output.innerHTML.substring(0, output.innerHTML.length-1) + button.innerHTML;
    } else {
        output.innerHTML = output.innerHTML + button.innerHTML;
    }
    if(current_number != "") {
        two_operands.push(current_number);
        current_number = "";
    }
    current_operation = button.classList[button.classList.length-1];

    if(two_operands.length == 2) {
        let temp_second = two_operands.pop();
        let temp_first = two_operands.pop();
        let answer = operate(temp_first, temp_second, final_operation);
        previousOutput.innerHTML = output.innerHTML.substring(0, output.innerHTML.length-1);
        output.innerHTML = answer + button.innerHTML;
        current_number = "";
        two_operands.push(answer);
    }
}

function equalsSign(button) {
    if(current_number != "") {
        two_operands.push(current_number);
        current_number = "";
        let temp_second = two_operands.pop();
        let temp_first = two_operands.pop();
        let answer = operate(temp_first, temp_second, final_operation);
        previousOutput.innerHTML = output.innerHTML;
        output.innerHTML = answer;
        two_operands.push(answer);
        equalled = true;

        console.log(two_operands);
        console.log(current_number);
        console.log(current_operation);
    }
}

function clearing() {
    for(let i = 0; i < two_operands.length; i++) {
        two_operands.pop();
    }
    current_number = "0";
    current_operation = "";
    output.innerHTML = "0";
    previousOutput.innerHTML = "0";
}

function special_clear() {
    for(let i = 0; i < two_operands.length; i++) {
        two_operands.pop();
    }
    current_number = "";
    current_operation = "";
    previousOutput.innerHTML = output.innerHTML;
    output.innerHTML = "0";
}

// round evaluated numbers so that they are 4 decimal spaces
//add decimal ??