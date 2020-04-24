const board = (function() {

  const cards = [
    {icon: "fa-apple-alt", value: 1},
    {icon: "fa-carrot", value: 2},
    {icon: "fa-leaf", value: 3},
    {icon: "fa-horse", value: 4},
    {icon: "fa-plane", value: 5},
    {icon: "fa-bicycle", value: 6},
    {icon: "fa-car-side", value: 7},
    {icon: "fa-dog", value: 8},
    {icon: "fa-frog", value: 9},
    {icon: "fa-spider", value: 10},
    {icon: "fa-paw", value: 11},
    {icon: "fa-cat", value: 12},
    {icon: "fa-crow", value: 13},
    {icon: "fa-fish", value: 14},
    {icon: "fa-hippo", value: 15},
    {icon: "fa-mug-hot", value: 16},
    {icon: "fa-tree", value: 17},
    {icon: "fa-egg", value: 18},
    {icon: "fa-drumstick-bite", value: 19}
  ]

  const size = {
    columnNum: 3,
    rowNum:2
  };

  let matchListener = () => {}

  const cardTemplate = (card) => {
    return `
    <div class="card-container">
      <div class="card" data-value="${card.value}">
        <div class="card-back-side"></div>
        <div class="card-front-side"><i class="fas ${card.icon}"></i></div>
      </div>
    </div>
    `
  }

  const gridContainer = document.getElementById('grid-container')
  
  function generateCards(size) {
    const halfDeck = cards.slice(0, (size.columnNum * size.rowNum)/2);
    return halfDeck.concat(halfDeck);
  }

  function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

  function drawBoard() {
    const cards = generateCards(size);
    const shuffledCards = shuffle(cards);
    const htmlCards = shuffledCards.reduce((all, card) => all + cardTemplate(card), "");

    gridContainer.innerHTML = htmlCards;
    gridContainer.style.gridTemplateColumns = 'repeat(' + size.columnNum + ', 1fr)'
    gridContainer.style.gridTemplateRows = 'repeat(' + size.rowNum + ', 1fr)'

    setCardClickListener(cardClickListener);
  }

  function setCardClickListener (listener) {
    Array.from(document.getElementsByClassName('card')).forEach(gridItem => {
      gridItem.addEventListener('click', listener);
    })
  }

  let firstCard;
  let secondCard;
  let waitingForCheck;
  let attempts = 0;

  const cardClickListener = (event) => {
    if (!waitingForCheck) {
      const card = event.target;
      rotate(card);
      removeCardListener(card, cardClickListener);
      if(firstCard) {
        secondCard = card;
        attempts ++;
        waitingForCheck = setTimeout(() => {
          const matched = checkMatch(firstCard, secondCard);
          if (matched) {
            matchListener(attempts);
            attempts = 0;
          }
          cleanCheckState();
        }, 1000)
        
      } else {
        firstCard = card;
      }
    }
  }

  function rotate(card) {
    card.classList.toggle('rotate');
  }

  function checkMatch(firstCard, secondCard) {
    if (firstCard.getAttribute('data-value') !== secondCard.getAttribute('data-value')) {
      firstCard.classList.toggle('rotate')
      secondCard.classList.toggle('rotate')
      addCardListener(firstCard, cardClickListener);
      addCardListener(secondCard, cardClickListener);
      return false;
    } else {
      firstCard.classList.toggle('blocked')
      secondCard.classList.toggle('blocked')
      return true;
    }
  }

  function removeCardListener (card, listener) {
    card.removeEventListener('click', listener);
  }

  function addCardListener (card, listener) {
    card.addEventListener('click', listener);
  }

  function cleanCheckState() {
    firstCard = secondCard = undefined;
    waitingForCheck = undefined;
  }

  return {
    resize: ({columnNum, rowNum}) => {
      if ((columnNum * rowNum) % 2 !== 0) {
        throw "The number of cards must be even and there are " + (columnNum * rowNum) + " cards";
      }
      size.columnNum = columnNum;
      size.rowNum = rowNum;
      console.dir(size)
      drawBoard();
    },
    start: () => {
      drawBoard();
    },
    setMatchListener: (listener) => {
      matchListener = listener;
    }
  };

})()