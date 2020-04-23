

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

menu.setOnLevelChangeListener((level) => {
  console.log(level);
  switch (level) {
    case 1: board.resize(sizes.easy); break;
    case 2: board.resize(sizes.normal); break;
    case 3: board.resize(sizes.hard); break;
    default: board.resize(sizes.easy); break;
  }
});

menu.setOnRefreshClickListener(() => {
  board.start();
})

board.start();
        