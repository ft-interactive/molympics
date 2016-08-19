import Snap from 'snapsvg';

let lapCount = 0;
let runningAnimation;
let runningAnimation2;
let moPosition = 0;
let runner2Position = 0;
let runner2Time;
let runner2Present = false;
let animationRunning = false;
let deciseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
let days = 0;
let t;
let tweetBaseText = 'Mo Farah could run 0 laps in the time it took me to ';

const dropdown = document.querySelector('#runner2');
const startButton = document.querySelector('#start');
const resetButton = document.querySelector('#reset');
const legendRunner2Text = document.querySelector('#legend-runner2-text');
const tweetLaps = document.querySelector('#tweet-laps');
const tweetButton = document.querySelector('#tweet-this');
const tweetInputText = document.querySelector('#tweet-input-text');

const legendMo = Snap('#legend-mo').circle(5, 5, 5)
    .attr({ fill: '#f6801a' });

const legendRunner2 = Snap('#legend-runner2').circle(5, 5, 5)
    .attr({ fill: '#555' })
    .addClass('hidden');

const s = Snap('#svg');

const options = [
  {
    name: 'none',
    text: '(None)',
    time: 'none',
  },
  {
    name: 'bolt',
    text: 'U. Bolt (2016, 200m)',
    info: ' ',
    time: 39.56,
    color: '#777777',
  },
  {
    name: 'niekerk',
    text: 'W. van Niekerk (2016, 400m)',
    info: ' ',
    time: 43.03,
    color: '#777777',
  },
    {
    name: 'burke',
    text: 'T. Burke (1896, 400m)',
    info: 'Thomas Burke ran the first Olympic 400 metres final in 54.2 seconds',
    time: 54.2,
    color: '#777777',
  },
  {
    name: 'coe',
    text: 'S. Coe (1984, 1500m)',
    info: 'Sebastian Coe\'s average pace over 1500m was 56.7 seconds per 400m',
    time: 56.7,
    color: '#777777',
  },
  {
    name: 'rudisha',
    text: 'D. Rudisha (2012, 800m)',
    info: 'David Rudisha\'s average lap speed at London 2012 was 50.5 seconds',
    time: 50.5,
    color: '#777777',
  },
  {
    name: 'perec',
    text: 'M.-J. Pérec (1996, 400m women)',
    info: ' ',
    time: 48.25,
    color: '#777777',
  },
  {
    name: 'jelimo',
    text: 'P. Jelimo (2008, 800m women)',
    info: ' ',
    time: 57.435,
    color: '#777777',
  },
  {
    name: 'wiggins',
    text: 'B. Wiggins (2008 4,000m pursuit)',
    info: ' ',
    time: 25.5,
    color: '#777777',
  },
  {
    name: 'yang',
    text: 'S. Yang (2012 400m freestyle)',
    info: ' ',
    time: 220.14,
    color: '#777777',
  },
  {
    name: 'dolphin',
    text: 'Bottlenose dolphin',
    info: '',
    time: 41.24,
    color: '#2e6e9e',
  },
  {
    name: 'winningbrew',
    text: 'Racehorse – Winning Brew (2008)',
    info: ' ',
    time: 20.46766169,
    color: '#777777',
  },
  {
    name: 'brettlee',
    text: 'Greyhound – Brett Lee (2001)',
    info: ' ',
    time: 22.44660194,
    color: '#777777',
  },
  {
    name: 't-rex',
    text: 'T. Rex (c. 66m years BC)',
    info: ' ',
    time: 50,
    color: '#458b00',
  },
    
];




const track = s.select('#running_lane')
    .attr({ strokeWidth: 2 });

const startingLine = Snap.path.getPointAtLength(track, 0);

const runner2 = s.circle(startingLine.x, startingLine.y, 16)
    .attr({
      fill: '#777777',
      stroke: '#b0b0b0',
      strokeWidth: '2px',
      opacity: 0.9,
    })
    .addClass('hidden');

const mo = s.circle(startingLine.x, startingLine.y, 12)
    .attr({
      fill: '#f6801a',
      stroke: '#b0b0b0',
      strokeWidth: '2px',
    });

// const timerBorder = s.rect(0, 0, 0, 0)
//     .attr({
//       stroke: '#333',
//       fill: '#e9decf',
//       rx: 5,
//       ry: 5,
//     });

// const infoText = s.text(98.4, 227, 'info text')
//     .attr({
//       textAnchor: 'start',
//     });

const timerDisplay = s.text(98.4, 207, '00:00:00:00:0')
    .attr({
      class: 'timer',
      id: 'timer-display',
      textAnchor: 'start',
    });

// const timerBounds = timerDisplay.getBBox();

// const timerBounds = document.querySelector('#timer-display').getBoundingClientRect();

// timerBorder.attr({
//   x: timerDisplay.getBBox().x - 5,
//   y: timerDisplay.getBBox().y,
//   width: timerBounds.width,
//   height: timerBounds.height,
// });

// const lapCounter = s.text(312.5, 237, 'Mo laps completed: 0')
//     .attr({
//       id: 'laps-text',
//       textAnchor: 'middle',
//     });

function count() {
  deciseconds++;
  if (deciseconds >= 10) {
    deciseconds = 0;
    seconds++;

    if (seconds >= 60) {
      seconds = 0;
      minutes++;

      if (minutes >= 60) {
        minutes = 0;
        hours++;

        if (hours >= 24) {
          hours = 0;
          days++;
        }
      }
    }
  }

  timerDisplay.node.textContent = (days > 9 ? days : '0' + days) +
      ':' + (hours > 9 ? hours : '0' + hours) +
      ':' + (minutes > 9 ? minutes : '0' + minutes) +
      ':' + (seconds > 9 ? seconds : '0' + seconds) +
      ':' + deciseconds;
}

function timer() {
  t = setInterval(count, 100);
}

const animateAlongPath = (path, el, start, duration, easing, callback) => {
  const len = Snap.path.getTotalLength(path);
  const pcTravelled = (start / len) * 100;
  const pcRemaining = 100 - pcTravelled;
  // const elBB = el.getBBox();
  // const elCenter = {
  //   x: elBB.x + (elBB.width / 2),
  //   y: elBB.y + (elBB.height / 2),
  // };

  duration = (52.94 / 100) * pcRemaining;

  // console.log(duration);

  runningAnimation = Snap.animate(start, len, (value) => {
    const movePoint = Snap.path.getPointAtLength(path, value);

    moPosition = value;

    el.attr({
      cx: movePoint.x,
      cy: movePoint.y,
    });
  }, duration * 1000, easing, () => {
    if (lapCount <= 999999) {
      lapCount++;
    } else {
      startButton.value = 'Start';
      startButton.classList.toggle('stop');

      animationRunning = false;

      clearTimeout(t);

      runningAnimation.stop();
      if (runner2Present) runningAnimation2.stop();
    }

    moPosition = 0;

    if (callback) callback(duration);
  });
};

const animateAlongPath2 = (path, el, start, duration, easing, callback) => {
  const len = Snap.path.getTotalLength(path);
  const pcTravelled = (start / len) * 100;
  const pcRemaining = 100 - pcTravelled;
  // const elBB = el.getBBox();
  // const elCenter = {
  //   x: elBB.x + (elBB.width / 2),
  //   y: elBB.y + (elBB.height / 2),
  // };

  duration = (runner2Time / 100) * pcRemaining;

  runningAnimation2 = Snap.animate(start, len, (value) => {
    const movePoint = Snap.path.getPointAtLength(path, value);

    runner2Position = value;

    el.attr({
      cx: movePoint.x,
      cy: movePoint.y,
    });
  }, duration * 1000, easing, () => {
    runner2Position = 0;

    if (callback) callback(duration);
  });
};

function animateMo() {
  animateAlongPath(track, mo, moPosition, 53.48, mina.linear(), animateMo);

  tweetLaps.textContent = lapCount;

  tweetBaseText = 'Mo Farah could run ' + lapCount + ' laps in the time it took me to';
}

function animateRunner2(time) {
  animateAlongPath2(track, runner2, runner2Position, time, mina.linear(), animateRunner2);
}

for (let i = 0; i < options.length; i++) {
  const option = options[i];

  dropdown.options.add(new Option(option.text, option.time));
}

dropdown.addEventListener('change', () => {
  if (dropdown.selectedIndex > 0) {
    runner2Present = true;

    runner2Time = options[dropdown.selectedIndex].time;

    legendRunner2Text.textContent = options[dropdown.selectedIndex].text;
    legendRunner2Text.classList.remove('hidden');

    legendRunner2.attr({
      fill: options[dropdown.selectedIndex].color,
    }).removeClass('hidden');

    runner2.removeClass('hidden')
        .attr({ fill: options[dropdown.selectedIndex].color });
  } else {
    legendRunner2Text.classList.add('hidden');
    legendRunner2.addClass('hidden');
    runner2.addClass('hidden');
  }

  lapCount = 0;
  // lapCounter.node.textContent = 'Mo laps completed: ' + lapCount;
});

function raceStart() {
  if (!animationRunning) {
    startButton.value = 'Stop';
    startButton.classList.toggle('stop');
    resetButton.disabled = true;
    dropdown.disabled = true;

    animationRunning = true;

    timer();

    animateMo(moPosition);
    if (runner2Present) animateRunner2(runner2Time);
  } else {
    startButton.value = 'Start';
    startButton.classList.toggle('stop');
    resetButton.disabled = false;
    dropdown.disabled = false;

    animationRunning = false;

    clearInterval(t);

    runningAnimation.stop();
    if (runner2Present) runningAnimation2.stop();
  }
}

function raceReset() {
  timerDisplay.node.textContent = '00:00:00:00:0';
  seconds = 0;
  minutes = 0;
  hours = 0;
  days = 0;

  mo.attr({ cx: startingLine.x, cy: startingLine.y });
  moPosition = 0;

  if (runner2Present) {
    runner2.attr({ cx: startingLine.x, cy: startingLine.y });
    runner2Position = 0;
  }

  lapCount = 0;
  tweetLaps.textContent = lapCount;

  resetButton.disabled = true;
  dropdown.disabled = false;
}

startButton.addEventListener('click', raceStart, true);
resetButton.addEventListener('click', raceReset, true);
tweetButton.addEventListener('click', (el) => {
  el.target.href += '&text=' + encodeURI(tweetBaseText + tweetInputText.value);
});

document.dispatchEvent(new CustomEvent('ig.Loaded'));

// Onward Journey tags
const ojTags = document.querySelectorAll('onward-journey');
[...ojTags].forEach((tag) => {
  if (!tag.classList.contains('is-rendered')) {
    const uuid = tag.dataset.uuid;
    const layout = tag.dataset.layout || 'default';
    const limit = tag.dataset.count || 6;
    const type = tag.dataset.type || 'thing';
    const urlBase = 'https://ft-ig-onwardjourney.herokuapp.com';
    const url = `${urlBase}/${type}/${uuid}?layout=${layout}&limit=${limit}&type=html`;
    if (uuid) {
      fetch(url)
      .then((res) => res.text())
      .then((html) => {
        tag.innerHTML = html;
      });
    } else {
      throw new Error('No UUID specified; onward journey ignored.');
    }
  }

  tag.classList.add('is-rendered');
});
