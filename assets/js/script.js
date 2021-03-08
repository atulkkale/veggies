// Hamburger
var hamburger = document.querySelectorAll('.hamburger div');
var close = document.getElementById('close');

function menushow(e) {
  var div = e.target;
  div.parentNode.nextElementSibling.classList.remove('ulhide');
  div.parentNode.nextElementSibling.classList.add('ulshow');
}

function menuhide(e) {
  var div = e.target;
  div.parentNode.classList.remove('ulshow');
  div.parentNode.classList.add('ulhide');
}

for (div of hamburger) {
  div.addEventListener('click', menushow);
}
close.addEventListener('click', menuhide);

// Modal
var images = document.querySelectorAll('.special-images li');

function toggleModal(e) {
  var clickedElement = e.target.tagName; // Here we store tag name of clicked element.
  console.log(clickedElement);
  switch (clickedElement) { // Depending upon element we perform actions on modal.
    case 'IMG':
      e.preventDefault();
      var li = e.target.parentNode.parentNode;
      li.classList.add('makemodal');
      break;

    case 'A':
      e.preventDefault();
      var a = e.target.parentNode;
      a.classList.toggle('makemodal');
      break;

    case 'LI':
      var li = e.target;
      li.classList.toggle('makemodal');
      break;

    default:
      break;
  }
}

for (img of images) {
  img.addEventListener('click', toggleModal);
}
