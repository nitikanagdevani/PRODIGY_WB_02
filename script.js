
const $ = document;

const playBtn = $.querySelector(".play");
const lapBtn = $.querySelector(".lap");
const resetBtn = $.querySelector(".reset");
const minute = $.querySelector(".min");
const second = $.querySelector(".sec");
const centiSecond = $.querySelector(".msec");
const laps = $.querySelector(".laps");
const clearAllBtn = $.querySelector(".lap-clear-btn");
const bg = $.querySelector(".outer-circle");

let isPlay = false;
let minInterval;
let secInterval;
let centiSecInterval;
let minCounter = 0;
let secCounter = 0;
let centiCounter = 0;
let lapId = 0;

const formatNumber = (number) => {
  return number < 10 ? `0${number}` : `${number}`;
};

const toggleBtn = () => {
  lapBtn.classList.remove("hidden");
  resetBtn.classList.remove("hidden");
};

const resetTimer = () => {
  clearInterval(minInterval);
  clearInterval(secInterval);
  clearInterval(centiSecInterval);
};

const startTimer = () => {
  minInterval = setInterval(() => {
    minute.innerHTML = `${formatNumber(minCounter)} :`;
    minCounter++;
  }, 60000);

  secInterval = setInterval(() => {
    second.innerHTML = `&nbsp;${formatNumber(secCounter)} :`;
    secCounter++;
    if (secCounter === 60) {
      secCounter = 0;
    }
  }, 1000);

  centiSecInterval = setInterval(() => {
    centiSecond.innerHTML = `&nbsp;${formatNumber(centiCounter)}`;
    centiCounter++;
    if (centiCounter === 100) {
      centiCounter = 0;
    }
  }, 10);
};


const play = () => {
  if (!isPlay) {
    playBtn.innerHTML = "Pause";
    bg.classList.add("animation-bg");

    startTimer();
    isPlay = true;
  } else {
    playBtn.innerHTML = "Play";
    bg.classList.remove("animation-bg");
    resetTimer();
    isPlay = false;
  }

  toggleBtn();
};

const reset = () => {
  isPlay = false;
  playBtn.innerHTML = "Play";
  bg.classList.remove("animation-bg");
  resetTimer();
  minCounter = 0;
  secCounter = 0;
  centiCounter = 0;
  
  minute.innerHTML = `00 :`;
  second.innerHTML = `&nbsp;00 :`;
  centiSecond.innerHTML = `&nbsp;00`;

  toggleBtn();
};


const lap = () => {
  const li = $.createElement("li");
  const number = $.createElement("span");
  const timeStamp = $.createElement("span");

  li.setAttribute("class", "lap-item");
  number.setAttribute("class", "number");
  timeStamp.setAttribute("class", "time-stamp");

  number.innerHTML = `#${++lapId}`;
  timeStamp.innerHTML = `${minCounter} : ${secCounter} : ${centiCounter}`;

  li.append(number, timeStamp);
  laps.append(li);

  clearAllBtn.classList.remove("hidden");
};

const clearAll = () => {
  laps.innerHTML = "";
  laps.append(clearAllBtn);
  lapId = 0;
  clearAllBtn.classList.add("hidden");
};

playBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);
clearAllBtn.addEventListener("click", clearAll);
