

const sizes = {
  easy: {
    columnNum: 3,
    rowNum:2
  },
  normal: {
    columnNum: 4,
    rowNum:3
  },
  hard: {
    columnNum: 5,
    rowNum:4
  }
}

var modal = document.getElementById("endgame");
var refreshModal = document.getElementById('refresh-modal');


let score = 0;

menu.setOnLevelChangeListener((level) => {
  switch (level) {
    case 1: board.resize(sizes.easy); break;
    case 2: board.resize(sizes.normal); break;
    case 3: board.resize(sizes.hard); break;
    default: board.resize(sizes.easy); break;
  }
  resetScore();
});

menu.setOnRefreshClickListener(() => {
  board.start();
});

board.setMatchListener((attempts) => {
  if (attempts > 1) {
    score = score + 10;
  } else {
    score = score + 20
  }
  menu.setScore(score);
});

board.setEndGameListener(() => {
  showEndGameModal();
});

refreshModal.addEventListener('click', (event) => {
  hideEndGameModal();
  board.start();
})

board.start();

function resetScore() {
  score = 0;
  menu.setScore(score);
}

function showEndGameModal() {
  modal.style.display = 'block';
}

function hideEndGameModal() {
  modal.style.display = 'none';
}
        