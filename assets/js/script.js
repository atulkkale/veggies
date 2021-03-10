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
  errorCount: { 0: null, 1: null }, // If any of the form field is valid then it will set to object otherwise null.
  formInputs: document.querySelectorAll('input[type=text]'),
  validate: function (e) {
    var regex;

    this === form.formInputs['0']
      ? (regex = /^[a-zA-Z]{2,15}$/)
      : (regex = /^[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,5}$/);
    identifyAndValidate(this, regex);
  },
  directvalidate: function (e) {
    if (form.formInputs[0].value === '' && form.formInputs[1].value === '') {
      e.preventDefault();
      removeOrAddError(
        ['syntanerror', 'lenerror', 'validfield', 'gmailerror'],
        'onsubmitval',
        this
      );
      removeOrAddError(
        ['syntanerror', 'onsubmitval', 'validfield', 'gmailerror'],
        'lenerror',
        form.formInputs[0]
      );
      removeOrAddError(
        ['syntanerror', 'onsubmitval', 'validfield', 'gmailerror'],
        'lenerror',
        form.formInputs[1]
      );
    } else if (form.formInputs[0].value === '') {
      e.preventDefault();
      removeOrAddError(
        ['syntanerror', 'lenerror', 'validfield', 'gmailerror'],
        'onsubmitval',
        this
      );
      removeOrAddError(
        ['syntanerror', 'onsubmitval', 'validfield', 'gmailerror'],
        'lenerror',
        form.formInputs[0]
      );
    } else if (form.formInputs[1].value === '') {
      e.preventDefault();
      removeOrAddError(
        ['syntanerror', 'lenerror', 'validfield', 'gmailerror'],
        'onsubmitval',
        this
      );
      removeOrAddError(
        ['syntanerror', 'onsubmitval', 'validfield', 'gmailerror'],
        'lenerror',
        form.formInputs[1]
      );
    } else if (form.errorCount['0'] === null || form.errorCount['1'] === null) {
      e.preventDefault();
      removeOrAddError(
        ['syntanerror', 'lenerror', 'validfield', 'gmailerror'],
        'onsubmitval',
        this
      );
    } else {
      e.preventDefault(); // For form to submit this have to be removed.
      this.parentNode.classList.remove('onsubmitval');
    }
  },
};

function removeOrAddError(remove, apply, element) {
  // This function shows and removes error massage on each fields.
  for (r of remove) {
    element.parentNode.classList.remove(r);
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

function identifyAndValidate(currElement, regex) {
  // This field identify diffrent input and validate the field according it.
  var lenmin;
  var lenmax;
  var error;
  if (currElement === form.formInputs['0']) {
    lenmin = 2;
    lenmax = 15;
    error = 'syntanerror';
    removeerror = 'gmailerror';
  } else {
    lenmin = 5;
    lenmax = 20;
    error = 'gmailerror';
    removeerror = 'syntanerror';
  }

  if (currElement.value.length < lenmin || currElement.value.length > lenmax) {
    removeOrAddError(
      ['validfield', 'syntanerror', 'onsubmitval'],
      'lenerror',
      currElement
    );
  } else if (!regex.test(currElement.value)) {
    removeOrAddError(
      ['validfield', 'lenerror', 'onsubmitval', removeerror],
      error,
      currElement
    );
  } else {
    removeOrAddError(
      ['syntanerror', 'lenerror', 'onsubmitval', 'gmailerror'],
      'validfield',
      currElement
    );
  }
}

for (input of form.formInputs) {
  input.addEventListener('keyup', form.validate); // Fire validate funciton.
  var nameattr = input.getAttribute('placeholder');
  input.parentNode.setAttribute('data-field-name', nameattr); // Set attribute to each field to show specific error message.
}

var submit = document.querySelector('input[type=submit]');
submit.addEventListener('click', form.directvalidate); // Fire directvalidate function.
