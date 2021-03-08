// Hamburger
var hamburger = document.querySelectorAll('.hamburger div');
var close = document.getElementById('close');

function menushow(e){
  var div = e.target;
  div.parentNode.nextElementSibling.classList.remove('ulhide');
  div.parentNode.nextElementSibling.classList.add('ulshow');
}

function menuhide(e){
  var div = e.target;
  div.parentNode.classList.remove('ulshow');
  div.parentNode.classList.add('ulhide');
}

for(div of hamburger){
  div.addEventListener('click', menushow);
}
close.addEventListener('click', menuhide);






















