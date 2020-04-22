
const settings = {
  columns: 8,
  rows: 4,
  cardTemplate: (card) => {
    return `
    <div class="card-container">
      <div class="card" data-value="${card}">
        <div class="card-back-side"></div>
        <div class="card-front-side">${card}</div>
      </div>
    </div>
    `
  }
}

const bikoteak = (function(settings) {

  const cards = generateCards(settings.columns * settings.rows);
  
  function generateCards(size) {
    const values = Array();
    for (let i = 1; i <= (settings.columns * settings.rows)/2; i++) {
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

  function drawCards(cards, template) {
    const gridContainer = document.getElementById('grid-container')
    gridContainer.style.gridTemplateColumns = 'repeat(' + settings.columns + ', 1fr)'
    gridContainer.style.gridTemplateRows = 'repeat(' + settings.rows + ', 1fr)'
    const htmlCards = cards.reduce((all, card) => all + template(card), "");
    
    gridContainer.innerHTML = htmlCards;
  }

  return {
    drawBoard: function() {
      const shuffledCards = shuffle(cards);
      drawCards(shuffledCards, settings.cardTemplate);
    },
    setCardEventListener: function(listener) {
      Array.from(document.getElementsByClassName('card')).forEach(gridItem => {
        gridItem.addEventListener('click', listener);
      })
    }
  }

})(settings)

bikoteak.drawBoard()
bikoteak.setCardEventListener((event) => {
  event.target.classList.toggle('rotate');
});


        