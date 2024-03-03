let total = 0;
let display = "0";
let prevOp;

const screen = document.querySelector('.screen');

function handleNumber(numStr) {
    if (display === '0') {
        display = numStr;
    } else {
        display += numStr;
    }
}

function flushOperation(intDisplay) {
    if (prevOp === '+') {
        total += intDisplay;
    } else if (prevOp === '−') {
        total -= intDisplay;
    } else if (prevOp === '×') {
        total *= intDisplay;
    } else if (prevOp === '÷') {
        total /= intDisplay;
    }
}

function handleMath(symbol) {
    if (display === '0') {
        return;
    }
    const intDisplay = parseInt(display);
    if (total === 0) {
        total = intDisplay;
    } else {
        flushOperation(intDisplay);
    }
    prevOp = symbol;
    display = '0';
}

function handleSymbol(symbol) {
    switch(symbol) {
        case 'C':
            display = '0';
            total = 0;
            break;
        case '=':
            if (prevOp == null) {return}
            flushOperation(parseInt(display));
            prevOp = null;
            display = total;
            total = 0;
            break; 
        case '←':
            if (display.length === 1) {
                display = '0';
            } else {
                display = display.substring(0, display.length-1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function click(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = display;
}

function init() {
    document.querySelector('.buttons').
    addEventListener('click', function(event){
        click(event.target.innerText);
    })
}

init();