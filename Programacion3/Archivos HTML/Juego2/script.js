const totalCards = 12;
let cards = [];
let selectedCards = [];
let valuesUsed = [];
let currentMove = 0;

const cardTemplate = `
  <div class="card">
    <div class="back"></div>
    <div class="face"></div>
  </div>
`;

function activate(e) {
  const card = e.currentTarget;

  if (currentMove < 2 && !card.classList.contains('active')) {
    card.classList.add('active');
    selectedCards.push(card);

    if (++currentMove === 2) {
      const value1 = selectedCards[0].querySelector('.face').innerHTML;
      const value2 = selectedCards[1].querySelector('.face').innerHTML;

      if (value1 === value2) {
        // Match found
        selectedCards = [];
        currentMove = 0;
      } else {
        // No match, flip back after a delay
        setTimeout(() => {
          selectedCards[0].classList.remove('active');
          selectedCards[1].classList.remove('active');
          selectedCards = [];
          currentMove = 0;
        }, 600);
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

function initializeGame() {
  const gameContainer = document.querySelector('#game');

  for (let i = 0; i < totalCards; i++) {
    const div = document.createElement('div');
    div.innerHTML = cardTemplate;
    const card = div.firstElementChild;

    const value = randomValue();
    card.querySelector('.face').innerHTML = value;

    card.addEventListener('click', activate);
    cards.push(card);
    gameContainer.appendChild(card);
  }
}

// Initialize the game when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeGame);