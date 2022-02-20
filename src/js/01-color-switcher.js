const refs = {
  bodyEl: document.querySelector('body'),
  btnEl: document.querySelector('button'),
  startEl: document.querySelector('[data-start]'),
  stopEl: document.querySelector('[data-stop]'),
};

const currentColor = getRandomHexColor();
let timerId = null;

refs.startEl.disabled = false;
refs.stopEl.disabled = true;

const pushColor = function () {
  timerId = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  console.log(timerId);
  refs.startEl.disabled = true;
  refs.stopEl.disabled = false;
};
refs.startEl.addEventListener('click', pushColor);

const stopColor = function () {
  clearInterval(timerId);
  refs.startEl.disabled = false;
  refs.stopEl.disabled = true;
};
refs.stopEl.addEventListener('click', stopColor);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.bodyEl.classList.add('body-flex');
refs.startEl.classList.add('btn-start');
refs.stopEl.classList.add('btn-stop');
