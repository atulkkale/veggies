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
  switch (
    clickedElement // Depending upon element we perform actions on modal.
  ) {
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

//Form validation
var form = {
  errorCount: { 0: null, 1: null }, // If any of the form field is valid then it will set to object otherwise null and this field give referance to submit function.
  formInputs: document.querySelectorAll('input[type=text]'),
  validate: function (e) { // This function validate field on event keyup.
    var regex;
    var currelemnt = e.target;

    currelemnt === form.formInputs['0']
      ? (regex = [/^[a-zA-Z]{2,15}$/,2,16,'lenerror','syntanerror']) // Regular exrpression for first name.
      : (regex = [/^[a-zA-Z0-9]+@[a-zA-Z]{0,7}\.[a-zA-Z]{2,5}$/,5,20,'gmaillenerror','gmailerror']); // Regular exrpression for email.

    if(!(currelemnt.value.length > regex[1] && currelemnt.value.length < regex[2])){
      removeOrAddError(regex[3],currelemnt);
    } else if(!(regex[0].test(currelemnt.value))){
      removeOrAddError(regex[4],currelemnt);
    } else {
      removeOrAddError('validfield',currelemnt);
    }
  },
  submit: function (e) {
    e.preventDefault(); // For form to submit data remove this line.
    a = {};
    for(var input in form.errorCount){
      if(form.errorCount[input] === null){
        e.preventDefault();
        a.target = form.formInputs[input];
        form.validate(a);
      }
    }
  },
};

function removeOrAddError(apply, element) { // This function shows and removes error massage on each fields.

  var errorcode = ['lenerror','validfield','syntanerror','gmaillenerror','gmailerror','gmaillenerror']; // Store all error code.

  for (err of errorcode) {
    element.parentNode.classList.remove(err);
  }
  element.parentNode.classList.add(apply);

  switch (element) {
    case form.formInputs[0]:
      apply === 'validfield'
        ? (form.errorCount['0'] = form.formInputs[0])
        : (form.errorCount['0'] = null); // This indicates that if current field is valid or not.
      break;

    case form.formInputs[1]:
      apply === 'validfield'
        ? (form.errorCount['1'] = form.formInputs[1])
        : (form.errorCount['1'] = null);
      break;

    default:
      break;
  }
}

for (input of form.formInputs) {
  input.addEventListener('keyup', form.validate); // Fire validate funciton.
  var nameattr = input.getAttribute('placeholder');
  input.parentNode.setAttribute('data-field-name', nameattr); // Set attribute to each field to show specific error message.
}

var submit = document.querySelector('input[type=submit]');
submit.addEventListener('click', form.submit); // Fire submit function.
