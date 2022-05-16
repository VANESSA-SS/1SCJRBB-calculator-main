const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operator;
let previousNumber;

if (typeof window !== "undefined") {
    console.log("In Browser");
    var x = document.getElementById("msg");
    console.log(x);
  }
  else {
    console.log("In nodeJS");
  }

function updateDisplay(numero) {
    if(newNumber) {
        display.textContent = numero;
        newNumber = false;
    }
    else display.textContent += numero;
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

// Prototype são atributos e funções inerentes ao tipo

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent;
}

operators.forEach((operator) => operator.addEventListener('click', selectOperator));

const calculate = () => {
    let actualNumber = display.textContent;
    actualNumber = actualNumber.replace(",", ".");
    previousNumber = previousNumber.replace(",", ".");
    const result = eval(`(${previousNumber})${operator}(${actualNumber})`); //template string, utilizando craze
    let resultText = result.toString(); 
    resultText = resultText.replace(".", ",");
    newNumber = true;
    updateDisplay(resultText);
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
  clearDisplay();
  newNumber = true;
  operator = undefined;
  previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => 
    (display.textContent = display.textContent.slice(0,-1));

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    let actualNumber = display.textContent
    actualNumber = actualNumber.replace(",",".");
    actualNumber = actualNumber * -1 
    actualNumber = actualNumber.toString();
    actualNumber = actualNumber.replace(".", ",");
    updateDisplay(actualNumber);
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

const insertDecimal = (event) => {
    let actualNumber = display.textContent;
    if (newNumber){
        actualNumber = "0,";
        newNumber = false
    }else{
        if (!(actualNumber.includes(','))){       
            actualNumber = actualNumber.concat(",");
        }
    } 
     display.textContent = actualNumber;
 }


document.querySelector("#decimal").addEventListener("click", insertDecimal);