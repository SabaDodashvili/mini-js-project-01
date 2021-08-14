window.onload = function () {
  const input = document.querySelector('.calc__input');
  let calcString = '';

  document.querySelector('.calc').addEventListener('click', calcActions);
  function calcActions(e) {
    const targetElement = e.target;
    let bracketsStart = calcString.split('(').length - 1;
    let bracketsEnd = calcString.split(')').length - 1;
    let lastSymbol = input.value[input.value.length - 1];
    let lastIsOperator = lastSymbol === '÷' || lastSymbol === '×' || lastSymbol === '%' || lastSymbol === '+' || lastSymbol === '-' || lastSymbol === '.';
    let currentIsOperator =
      targetElement.textContent === '÷' ||
      targetElement.textContent === '×' ||
      targetElement.textContent === '%' ||
      targetElement.textContent === '+' ||
      targetElement.textContent === '-' ||
      targetElement.textContent === '.' ||
      targetElement.textContent === '=' ||
      targetElement.textContent === 'c' ||
      targetElement.textContent === '⟵';

    if (targetElement.closest('.calc__btn')) {
      if (targetElement.textContent === '÷' && lastSymbol !== '(') {
        addSymbols(' / ', targetElement.textContent);
      } else if (targetElement.textContent === '×' && lastSymbol !== '(') {
        addSymbols(' * ', targetElement.textContent);
      } else if (targetElement.textContent === '%' && lastSymbol !== '(') {
        addSymbols(' / 100 * ', targetElement.textContent);
      } else if (targetElement.textContent === '+' && lastSymbol !== '(') {
        addSymbols(' + ', targetElement.textContent);
      } else if (targetElement.textContent === '-') {
        addSymbols(' - ', targetElement.textContent);
      } else if (targetElement.textContent === '.' && lastSymbol !== '(') {
        let lastSpace = calcString.lastIndexOf(' ');
        let pointInLastNumber = calcString.indexOf('.', lastSpace);
        if (pointInLastNumber == -1) {
          addSymbols('.', targetElement.textContent);
        }
      } else if (targetElement.textContent === '=' && input.value.length > 0 && !lastIsOperator) {
        if (bracketsStart > bracketsEnd) {
          let bracketsAmount = bracketsStart - bracketsEnd;
          for (let i = 0; i < bracketsAmount; i++) {
            calcString += ')';
          }
        }
        input.value = eval(calcString);
        calcString = String(eval(calcString));
        return;
      } else if (targetElement.textContent === 'c' && input.value.length > 0) {
        input.value = '';
        calcString = '';
        return;
      } else if (targetElement.textContent === '⟵' && input.value.length > 0) {
        if (lastSymbol === '%') {
          calcString = calcString.slice(0, calcString.length - 9);
        } else if (lastIsOperator && lastSymbol !== '.') {
          calcString = calcString.slice(0, -3);
        } else {
          calcString = calcString.slice(0, -1);
        }
        input.value = input.value.slice(0, -1);
        return;
      } else if (!currentIsOperator) {
        addSymbols(false, targetElement.textContent);
      }
    }

    function addSymbols(calcSymbols, targetElement) {
      if (calcSymbols) {
        if (lastIsOperator && lastSymbol === '%' && calcSymbols !== ' - ') {
          calcString = calcString.slice(0, calcString.length - 9);
          input.value = input.value.slice(0, -1);
          calcString += calcSymbols;
        } else if (lastIsOperator && isNaN(input.value[input.value.length - 2]) == true) {
          return;
        } else if (calcSymbols === ' - ' && lastSymbol !== '+' && lastSymbol !== '-') {
          calcString += calcSymbols;
        } else if (lastIsOperator && lastSymbol !== '.') {
          calcString = calcString.slice(0, calcString.length - 3);
          input.value = input.value.slice(0, -1);
          calcString += calcSymbols;
        } else if (lastIsOperator && lastSymbol === '.') {
          calcString = calcString.slice(0, calcString.length - 1);
          input.value = input.value.slice(0, -1);
          calcString += calcSymbols;
        } else {
          calcString += calcSymbols;
        }
      } else {
        if (targetElement === ')') {
          if (bracketsStart > bracketsEnd && lastSymbol !== '(' && !lastIsOperator) {
            calcString += targetElement;
            input.value += targetElement;
            return;
          } else {
            return;
          }
        } else if (targetElement === '(') {
          if (lastIsOperator && lastSymbol !== '.') {
            calcString += targetElement;
            input.value += targetElement;
            return;
          } else {
            return;
          }
        }

        calcString += targetElement;
      }
      input.value += targetElement;
    }
  }
};

// vanilla - tilt;
VanillaTilt.init(document.querySelectorAll('.vanilla'), {
  max: 5,
  speed: 400,
  glare: true,
  'max-glare': 0.1,
});
