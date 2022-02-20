import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputEl: document.querySelector('input'),
  startEl: document.querySelector('[data-start]'),
  daysEl: document.querySelector('[data-days]'),
  hoursEl: document.querySelector('[data-hours]'),
  minutesEl: document.querySelector('[data-minutes]'),
  secondsEl: document.querySelector('[data-seconds]'),
  divTimerEl: document.querySelector('.timer'),
};

let selectedDate = null;
refs.startEl.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0]; 

    if (selectedDates[0] < Date.now()) {
      
      Notify.failure('Please choose a date in the future', {
        width: '300px',
        position: 'right-top',
        distance: '20px',
        warning: {
          background: '#da2121',
          textColor: '#fff',
        },
      });
      refs.startEl.disabled = true;
    }
   else
    {
      refs.startEl.disabled = false;
    }
  },
};

const start = function () {
  let intervalId = 0;
  let deltaTime = 0;
  refs.startEl.disabled = false;

  intervalId = setInterval(() => {  
    const currentTime = Date.now();
    const deltaTime = selectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(intervalId);
      refs.startEl.disabled = true;
      return 
    }

    let dateObj = convertMs(deltaTime);
    console.log(dateObj);
    changeCountdown(dateObj);
    refs.startEl.disabled = true;
  }, 1000);
};

refs.startEl.addEventListener('click', start);

const newCalendar = flatpickr('#datetime-picker', options);

function changeCountdown(dateObj) {
  refs.daysEl.textContent = dateObj.days;
  refs.hoursEl.textContent = dateObj.hours;
  refs.minutesEl.textContent = dateObj.minutes;
  refs.secondsEl.textContent = dateObj.seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
refs.divTimerEl.classList.add('field-table');
