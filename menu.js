const menu = (function() {

  let level = 1;
  let levelChangeListener = (level) => {};
  let refreshClickListener = () => {};

  document.getElementById('level-one').addEventListener('click', function(event) {
    setLevel(1);
  });
  document.getElementById('level-two').addEventListener('click', function(event) {
    setLevel(2);
  });
  document.getElementById('level-three').addEventListener('click', function(event) {
    setLevel(3);
  });

  document.getElementById('refresh').addEventListener('click', function(event) {
    refreshClickListener();
  })

  function setLevel(newLevel) {
    if (level !== newLevel) {
      level = newLevel;
      levelChangeListener(level);
    }
  }

  return {
    setOnLevelChangeListener: (listener) => {
      levelChangeListener = listener;
    },
    setOnRefreshClickListener: (listener) => {
      refreshClickListener = listener;
    }
  }

})()