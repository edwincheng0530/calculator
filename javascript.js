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


const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        if(button.matches('.clear')) {
            clear();
        } else if(button.matches('.number')) {
            //IF BUTTON IS NUMBER
            if(output.innerHTML === '0') {
                output.innerHTML = button.innerHTML;
                current_number = button.innerHTML;
                return;
            }

            if(current_operation != "") {
                final_operation = current_operation;
                current_operation = "";
            }

            current_number = current_number + button.innerHTML;
            output.innerHTML = output.innerHTML + button.innerHTML;
            
        } else if (button.matches('.operate')) {
            //IF BUTTON IS OPERATION
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
                console.log(two_operands);
                let temp_second = two_operands.pop();
                let temp_first = two_operands.pop();
                let answer = operate(temp_first, temp_second, final_operation);
                previousOutput.innerHTML = output.innerHTML.substring(0, output.innerHTML.length-1);
                output.innerHTML = answer + button.innerHTML;
                current_number = "";
                two_operands.push(answer);
                console.log(two_operands);
            }
        } else if (button.matches('.equal')) {
            if(current_number != "") {
                two_operands.push(current_number);
                current_number = "";
                let temp_second = two_operands.pop();
                let temp_first = two_operands.pop();
                let answer = operate(temp_first, temp_second, final_operation);
                previousOutput.innerHTML = output.innerHTML;
                output.innerHTML = answer;
                current_number = "";
                two_operands.push(answer);
            }
        }
    }) 
});

function clear() {
    for(let i = 0; i < two_operands.length; i++) {
        two_operands.pop();
    }
    current_number = "0";
    current_operation = "";
    output.innerHTML = "0";
    previousOutput.innerHTML = "0";
}

// round evaluated numbers so that they are 4 decimal spaces
//add decimal ??