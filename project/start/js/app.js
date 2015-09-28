/**
 * Creates an Array of DOM nodes that match the selector
 * @param selector {string} CSS selector - selector to match against
 * @return {array} Array of DOM nodes
 */
function getDomNodeArray(selector) {
  var nodes = Array.prototype.slice.apply(document.querySelectorAll(selector));
  return nodes;
}

var daySelectors = getDomNodeArray('.day');
daySelectors.forEach(function (selectElement) {
  for (day = 1; day < 32; day++) {
    var newOption = document.createElement('option');
    if (day < 10) {
      day = "0" + day;
    } else {
      day = day + "";
    }
    newOption.innerHTML = day;
    selectElement.appendChild(newOption);
  }
});

var monthSelectors = getDomNodeArray('.month');
monthSelectors.forEach(function (selectElement) {
  for (month = 1; month < 13; month++) {
    var newOption = document.createElement('option');
    if (month < 10) {
      month = "0" + month;
    } else {
      month = month + "";
    }
    newOption.innerHTML = month;
    selectElement.appendChild(newOption);
  }
});

var yearSelectors = getDomNodeArray('.year');
yearSelectors.forEach(function (selectElement) {
  for (year = 2015; year < 2021; year++) {
    var newOption = document.createElement('option');
    newOption.innerHTML = year + "";
    selectElement.appendChild(newOption);
  }
});

/*
Adding guests
 */
var person = getDomNodeArray('.person')[0];
var people = getDomNodeArray('.people')[0];
person.onkeydown = function (evt) {
  if (evt.keyIdentifier === "Enter") {
    var enteredPerson = document.createElement('div');
    var deletePerson = document.createElement('button');
    deletePerson.innerHTML = "-";
    deletePerson.parent = enteredPerson;

    deletePerson.onclick = function () {
      people.removeChild(this.parent);
    };
    enteredPerson.innerHTML = person.value;
    enteredPerson.value = person.value; // for easy access later
    enteredPerson.appendChild(deletePerson);

    people.appendChild(enteredPerson);
    person.value = "";
  }
};

/*
To create a placeholder effect. Assumes that display element starts with 'placeholder' class
 */

function displayWithPlaceholder (input, displayElem, placeholder) {
  if (displayElem.classList.contains('placeholder')) {
    displayElem.classList.remove('placeholder');
  }
  if (input === "") {
    input = placeholder;
    displayElem.classList.add('placeholder');
  }
  displayElem.innerHTML = input;
};

function inputToDisplayWithPlaceholder(inputSelector, displaySelector, placeholder) {
  var inputElem = document.querySelector(inputSelector);
  var displayElem = document.querySelector(displaySelector);
  placeholder = placeholder || "Placeholder";

  inputElem.oninput = function () {
    var currentInput = inputElem.value;

    displayWithPlaceholder(currentInput, displayElem, placeholder);
  };
};

inputToDisplayWithPlaceholder('input.title', '.title-display', "Untitled Event");
inputToDisplayWithPlaceholder('input.description', '.detail-actual.what', "Description");
inputToDisplayWithPlaceholder('input.location', '.detail-actual.where', "Place");

/*
Render the times with placeholders
 */
var whenDisplay = document.querySelector('.detail-actual.when');
getDomNodeArray('.input-datetime').forEach(function (input) {
  input.oninput = function () {
    validator.getStartTime();
    validator.getEndTime();

    var timeToDisplay = validator.startDate + " - " + validator.endDate;

    displayWithPlaceholder(timeToDisplay, whenDisplay, "Time");
  };
});

/*
Validating all the inputs
 */
function Validator () {
  this.collectInfo();
};

Validator.prototype.collectInfo = function () {
  this.getStartAndEndDatetimes();
  this.getGuests();
};

Validator.prototype.validate = function () {
  var allGood = false;
  this.errorMessage = "Error: there are the following errors:<br>";
  this.collectInfo();
  
  var self = this;

  var validations = [
    {
      method: this.hasTitle,
      errorMessage: "Please include a title."
    },
    {
      method: this.hasDescription,
      errorMessage: "Please include a description."
    },
    {
      method: this.doesEndAfterStart,
      errorMessage: "Please include valid dates."
    },
    {
      method: this.hasGuests,
      errorMessage: "Please include guests."
    },
    {
      method: this.allGuestEmailsAreReal,
      errorMessage: "Please include valid email addresses."
    }
  ];

  validations.forEach(function (val, index) {
    if (val.method(self)) {
      if (index === 0) {
        allGood = true;
      } else {
        allGood = allGood && true;
      }
    } else {
      allGood = allGood && false;
      self.errorMessage = self.errorMessage + val.errorMessage + '<br>';
    }
  });
  this.errorMessage = this.errorMessage.trim();
  return allGood;
};

Validator.prototype.getGuests = function () {
  this.guests = getDomNodeArray('.people>div');
};

Validator.prototype.getStartAndEndDatetimes = function () {
  this.getStartTime();
  this.getEndTime();
};

Validator.prototype.getStartTime = function () {
  var startDay = document.querySelector('.start-date .day').value;
  var startMonth = document.querySelector('.start-date .month').value - 1;
  var startYear = document.querySelector('.start-date .year').value;
  
  var startTime = document.querySelector('.start-time').value || '00:00';
  var startMin = startTime.split(':')[1];
  var startHour = startTime.split(':')[0];
  
  this.startDate = new Date(startYear, startMonth, startDay, startHour, startMin);
};

Validator.prototype.getEndTime = function () {
  var endDay = document.querySelector('.end-date .day').value;
  var endMonth = document.querySelector('.end-date .month').value - 1;
  var endYear = document.querySelector('.end-date .year').value;
  
  var endTime = document.querySelector('.end-time').value || '00:00';
  var endMin = endTime.split(':')[1];
  var endHour = endTime.split(':')[0];

  this.endDate = new Date(endYear, endMonth, endDay, endHour, endMin);
};

Validator.prototype.doesEndAfterStart = function (self) {
  var endsLater = false;
  if (self.endDate - self.startDate > 0) {
    endsLater = true;
  }
  return endsLater;
};

Validator.prototype.hasTitle = function () {
  var hasTitle = false;
  var title = document.querySelector('input.title').value;
  if (title !== "") {
    hasTitle = true;
  }
  return hasTitle;
};

Validator.prototype.hasDescription = function () {
  var hasDescription = false;
  var description = document.querySelector('input.description').value;
  if (description !== "") {
    hasDescription = true;
  }
  return hasDescription;
};

Validator.prototype.hasGuests = function (self) {
  var hasGuests = false;
  var numberOfGuests = self.guests.length;
  if (numberOfGuests > 0) {
    hasGuests = true;
  }
  return hasGuests;
};

Validator.prototype.allGuestEmailsAreReal = function (self) {
  var areReal = false;
  var emailRegex = new RegExp("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$");
  self.guests.forEach(function (guest, index) {
    var result = emailRegex.exec(guest.value);
    if (result && result['index'] === 0) {
      if (index === 0) {
        areReal = true;
      } else {
        areReal = areReal && true;
      }
    } else {
      areReal = areReal && false;
    }
  });
  return areReal;
};

var validator = new Validator();

var createButton = document.querySelector('button#create');
createButton.onclick = function () {
  var isValid = validator.validate();

  if (!isValid) {
    var errorMessage = document.querySelector('.error-message');
    errorMessage.innerHTML = validator.errorMessage;
  } else {
    alert("Valid form. Thanks for submitting!");
  }
};
