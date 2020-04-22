
const gridItems = document.getElementsByClassName('card');

Array.from(gridItems).forEach(gridItem => {
  gridItem.addEventListener('click', function (event) {
    const classList = event.target.classList;
    classList.toggle('rotate');
    
  });
});
        