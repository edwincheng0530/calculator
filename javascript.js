function add(x, y) {
    return x+y;
}

function subtract(x, y) {
    return x-y;
}

function multiply(x, y) {
    return x*y;
}

function divide(x, y) {
    return x/y;
}

function operate(num1, num2, operator) {
    let answer = 0;
    if(operator == '+') {
        answer = add(num1, num2);
    } else if(operator == '-') {
        answer = subtract(num1, num2);
    } else if(operator == '*') {
        answer = multiply(num1, num2);
    } else {
        answer = divide(num1, num2);
    }
    return answer;
}