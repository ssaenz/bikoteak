const board = (function(){

  const size = {
    columnNum: 3,
    rowNum:2
  };

  const cardTemplate = (card) => {
    return `
    <div class="card-container">
      <div class="card" data-value="${card}">
        <div class="card-back-side"></div>
        <div class="card-front-side">${card}</div>
      </div>
    </div>
    `
  }

  const gridContainer = document.getElementById('grid-container')
  
  function generateCards(size) {

    const values = Array();
    for (let i = 1; i <= (size.columnNum * size.rowNum)/2; i++) {
      values.push(i);
      values.push(i);
    }
    return values;
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

  const cardClickListener = (event) => {
    if (!waitingForCheck) {
      const card = event.target;
      rotate(card);
      removeCardListener(card, cardClickListener);
      if(firstCard) {
        secondCard = card;
        waitingForCheck = setTimeout(() => {
          checkMatch(firstCard, secondCard);
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
    }
  };

})()