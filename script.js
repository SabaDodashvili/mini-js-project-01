window.onload = function () {
  const input = document.querySelector('.calc__input');
  let calcString = '';

  document.querySelector('.calc').addEventListener('click', calcActions);
  function calcActions(e) {
    const targetElement = e.target;
    if (targetElement.textContent !== '=' && targetElement.textContent !== 'c' && targetElement.textContent !== '⟵' && targetElement.closest('.calc__btn')) {
      input.value += targetElement.textContent;

      if (targetElement.textContent === '÷') {
        calcString = calcString + '/';
      } else if (targetElement.textContent === '×') {
        calcString = calcString + '*';
      } else if (targetElement.textContent === '%') {
        calcString = calcString + '/ 100 *';
      } else {
        calcString = calcString + targetElement.textContent;
      }
    } else if (targetElement.textContent === '=' && input.value.length > 0) {
      input.value = eval(calcString);
      calcString = String(eval(calcString));
    } else if (targetElement.textContent === 'c' && input.value.length > 0) {
      input.value = '';
      calcString = '';
    } else if (targetElement.textContent === '⟵' && input.value.length > 0) {
      if (input.value[input.value.length - 1] === '%') {
        calcString = calcString.slice(0, calcString.length - 7);
      } else {
        calcString = calcString.slice(0, -1);
      }
      input.value = input.value.slice(0, -1);
    }
  }
};

//vanilla-tilt

VanillaTilt.init(document.querySelectorAll('.vanilla'), {
  max: 25,
  speed: 400,
  glare: true,
  'max-glare': 0.2,
});
