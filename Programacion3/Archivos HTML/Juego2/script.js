const totalCards = 12;
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;
let timeLeft = 60; // Tiempo límite en segundos
let timerInterval;

const cardTemplate = `
  <div class="card">
    <div class="back"></div>
    <div class="face"></div>
  </div>
`;


const cardImages = [
  'img/Planeta 1.PNG',
  'img/Planeta 2.PNG',
  'img/Planeta 3.PNG',
  'img/Planeta 4.PNG',
  'img/Planeta 5.PNG',
  'img/Planeta 6.PNG'
];

function activate(e) {
  const card = e.currentTarget;

  // Evitar que se seleccionen más de dos cartas o que se seleccione la misma carta dos veces
  if (currentMove < 2 && !card.classList.contains('active')) {
    card.classList.add('active');
    selectedCards.push(card);

    if (++currentMove === 2) {
      let currentAttemps = 0;      const value1 = selectedCards[0].getAttribute('data-value');
      const value2 = selectedCards[1].getAttribute('data-value');

      if (value1 === value2) {
        // Si las cartas coinciden, reinicia el movimiento
        selectedCards = [];
        currentMove = 0;
        checkVictory(); // Verificar si el jugador ha ganado
      } else {
        // Si no coinciden, espera un momento y quita la clase 'active'
        setTimeout(() => {
          selectedCards[0].classList.remove('active');
          selectedCards[1].classList.remove('active');
          selectedCards = [];
          currentMove = 0;
        }, 1000); // Espera 1 segundo antes de voltear las cartas
      }
    }
  }
}

function randomValue() {
  let rnd;
  do {
    rnd = Math.floor(Math.random() * (totalCards / 2));
  } while (valuesUsed.filter(value => value === rnd).length >= 2);

  valuesUsed.push(rnd);
  return rnd;
}

function startTimer() {
  // Elimina el timer anterior si existe
  const oldTimer = document.getElementById('timer');
  if (oldTimer) {
    oldTimer.remove();
  }

  const timerElement = document.createElement('div');
  timerElement.id = 'timer';
  timerElement.style.color = 'white';
  timerElement.style.fontSize = '2rem';
  timerElement.style.position = 'absolute';
  timerElement.style.top = '10px';
  timerElement.style.right = '10px';
  document.body.appendChild(timerElement);

  timerInterval = setInterval(() => {
    timerElement.innerHTML = `Tiempo restante: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      defeat(); // Llamar a la función de derrota
    }
    timeLeft--;
  }, 1000);
}

function showModal(message) {
  const modal = document.getElementById('modal-message');
  const modalText = document.getElementById('modal-text');
  modalText.textContent = message;
  modal.style.display = 'flex';
  document.getElementById('modal-btn').onclick = () => {
    modal.style.display = 'none';
    resetGame();
  };
  document.getElementById('menu-btn').onclick = () => {
    window.location.href = '../index.html';
  };
}

function defeat() {
  showModal('¡Tiempo agotado! Has perdido.');
}

function checkVictory() {
  if (document.querySelectorAll('.card:not(.active)').length === 0) {
    clearInterval(timerInterval);
    showModal('¡Felicidades! Has ganado.');
  }
}

function resetGame() {
  document.querySelector('#game').innerHTML = '';
  cards = [];
  selectedCards = [];
  valuesUsed = [];
  currentMove = 0;
  timeLeft = 60;
  clearInterval(timerInterval);
  initializeGame();
}
function resetGame() {
  document.querySelector('#game').innerHTML = '';
  cards = [];
  selectedCards = [];
  valuesUsed = [];
  currentMove = 0;
  timeLeft = 60;
  clearInterval(timerInterval);
  initializeGame();
  // startTimer();  // <-- Esta línea sobra
}
function initializeGame() {
  const gameContainer = document.querySelector('#game');

  for (let i = 0; i < totalCards; i++) {
    const div = document.createElement('div');
    div.innerHTML = cardTemplate;
    const card = div.firstElementChild;

    const value = randomValue();
    card.querySelector('.face').innerHTML = `<img src="${cardImages[value]}" style="width:90px; height:90px; border-radius:10px;">`;
    card.setAttribute('data-value', value);

    card.addEventListener('click', activate);
    cards.push(card);
    gameContainer.appendChild(card);
  }

  startTimer(); // Iniciar el temporizador
}
// Iniciar el juego al cargar la página
document.addEventListener('DOMContentLoaded', initializeGame);
