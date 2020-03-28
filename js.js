add = (a, b) => a + b;

subtract = (a, b) => a - b;

multiply = (a, b) => a * b;

divide = (a, b) => a / b;

operate = (a, b, operators) => {
    switch(operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "×":
            return multiply(a, b);
        case "÷":
            return divide(a, b);
    };
};

var a = "";
var b = ""
var operator = "";
var resultDisplayed = false;

let log = document.querySelector("#working");
let output = document.querySelector("#bigNumbers");

updateDisplay = input => {
    if(resultDisplayed) {
        clear();
    };
    if(output.innerText == "0" && input != ".") {
        output.innerText = "";
    };
    if(output.innerText.length < 14) {
        output.innerText += input;
    };
};

updateOperator = (input) => {
    if(operator != "") {
        if(output.innerText === "0") {
            log.innerText = log.innerText.slice(0, -1);
        } else {
            getResult();
            updateVariable();
        };
    } else {
        updateVariable();
    };
    operator = input;
    resultDisplayed = false;
    updateLog(input);
};

updateLog = (input) => {
    if(log.innerText === "0") {
        log.innerText = "";
    };
    log.innerText += input;
    while(log.innerText.length > 32) {
        log.innerText = log.innerText.slice(1, log.innerText.length)
    };
};

updateVariable = () => {
    if(a === "") { 
        a = output.innerText;
        if(!log.innerText.endsWith(a + '\u00A0')) {
            updateLog(a);
        };
    } else {
        b = output.innerText;
        updateLog(b);
    };
    output.innerText = "0";
};

getResult = () => {
    updateVariable();
    if(b === "") {
        calc = a;
    } else {
        if(operator == "÷" && b == 0) {
            output.innerText = 'ERROR';
        } else {
        calc = operate(parseFloat(a), parseFloat(b), operator);
        };
    };
    output.innerText = Math.round(calc * 1000) / 1000;
    updateLog("=" + Math.round(calc * 1000) / 1000 + '\u00A0');
    resultDisplayed = true;
    a = "";
    b = "";
    operator = "";
};

clear = () => {
    a = "";
    b = "";
    operator = "";
    resultDisplayed = false;
    log.innerText = "0";
    output.innerText = "0";
};

clearEntry = () => {
    if(!resultDisplayed) {
        output.innerText = "0";
    }
};

backspace = () => {
    if(!resultDisplayed) {
        output.innerText = output.innerText.slice(0, -1);
    };
    if(output.innerText == "") {
        output.innerText = "0";
    };
};

const numbers = document.querySelectorAll(".number");
numbers.forEach(function(numberButton) {
    numberButton.addEventListener("click", function(e) {
        updateDisplay(e.target.innerText);
    });
});

const decimal = document.querySelector("#decimal");
decimal.addEventListener("click", function(e) {
    if(!output.innerText.includes(".")) {
        updateDisplay(".");
    };   
});

const operators = document.querySelectorAll(".operator");
operators.forEach(function(operatorButton) {
    operatorButton.addEventListener("click", function (e) {
        updateOperator(e.target.innerText);
    });
});

const equalsButton = document.querySelector("#equals");
equalsButton.addEventListener("click", function(e) {
    getResult();
});

const clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", function(e) {
    clear();
});

const cE = document.querySelector("#clearEntry");
cE.addEventListener("click", function(e) {
    clearEntry();
});

const backspaceButton = document.querySelector("#backspace");
backspaceButton.addEventListener("click", function(e) {
    backspace();
});

document.addEventListener("keydown", (e) => {
    if(isFinite(e.key)) {
    updateDisplay(e.key);
    } else if (e.key == ".") {
        if(!output.innerText.includes(".")) {
            updateDisplay(".");
        };
    } else if (e.key == "/") {
        updateOperator("÷");
    } else if (e.key == "*") {
        updateOperator("×")
    } else if (e.key == "+") {
        updateOperator("+")
    } else if (e.key == "-") {
        updateOperator("-")
    } else if (e.key == "Enter") {
        getResult();
    } else if (e.key == "Backspace") {
        if(!resultDisplayed) {
            output.innerText = output.innerText.slice(0, -1);
        };
        if(output.innerText == "") {
            output.innerText = "0";
        };
    };
});

clear();