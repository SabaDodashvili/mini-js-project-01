window.onload = function () {
  const input = document.querySelector('.calc__input');
  let calcString = '';
  let repeatingOperator = true;

  document.querySelector('.calc').addEventListener('click', calcActions);
  function calcActions(e) {
    const targetElement = e.target;
    if (targetElement.closest('.calc__btn')) {
      let lastSymbol = input.value[input.value.length - 1];

      let notNumbers = lastSymbol === '÷' || lastSymbol === '×' || lastSymbol === '%' || lastSymbol === '+' || lastSymbol === '-' || lastSymbol === '.';
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

      if (targetElement.textContent === '÷' && !notNumbers) {
        calcString = calcString + ' / ';
        input.value += targetElement.textContent;
      } else if (targetElement.textContent === '×' && !notNumbers) {
        calcString = calcString + ' * ';
        input.value += targetElement.textContent;
      } else if (targetElement.textContent === '%' && !notNumbers) {
        calcString = calcString + ' / 100 * ';
        input.value += targetElement.textContent;
      } else if (targetElement.textContent === '+' && !notNumbers) {
        calcString = calcString + ' + ';
        input.value += targetElement.textContent;
      } else if (targetElement.textContent === '-' && !notNumbers) {
        calcString = calcString + ' - ';
        input.value += targetElement.textContent;
      } else if (targetElement.textContent === '.' && !notNumbers) {
        let lastSpace = calcString.lastIndexOf(' ');
        let pointInLastNumber = calcString.indexOf('.', lastSpace);
        if (pointInLastNumber == -1) {
          calcString = calcString + '.';
          input.value += targetElement.textContent;
        }
      } else if (targetElement.textContent === '=' && input.value.length > 0) {
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
          console.log(1);
        } else {
          calcString = calcString.slice(0, -1);
        }
        input.value = input.value.slice(0, -1);
        return;
      } else if (!currentIsOperator) {
        calcString = calcString + targetElement.textContent;
        input.value += targetElement.textContent;
      }
    }
  }
};

vanilla - tilt;
VanillaTilt.init(document.querySelectorAll('.vanilla'), {
  max: 5,
  speed: 400,
  glare: true,
  'max-glare': 0.1,
});
