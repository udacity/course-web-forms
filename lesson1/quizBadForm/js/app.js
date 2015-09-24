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

function Validator () {
  this.getStartAndEndDatetimes();
  this.getGuests();
};

Validator.prototype.getStartAndEndDatetimes = function () {
  var startDay = document.querySelector('.start-date .day').value;
  var startMonth = document.querySelector('.start-date .month').value - 1;
  var startYear = document.querySelector('.start-date .year').value;
  var endDay = document.querySelector('.end-date .day').value;
  var endMonth = document.querySelector('.end-date .month').value - 1;
  var endYear = document.querySelector('.end-date .year').value;
  
  var startTime = document.querySelector('.start-time').value || '00:00';
  var startMin = startTime.split(':')[1];
  var startHour = startTime.split(':')[0];

  var endTime = document.querySelector('.end-time').value || '00:00';
  var endMin = endTime.split(':')[1];
  var endHour = endTime.split(':')[0];

  this.startDate = new Date(startYear, startMonth, startDay, startHour, startMin);
  this.endDate = new Date(endYear, endMonth, endDay, endHour, endMin);
};

Validator.prototype.getGuests = function () {
  this.guests = getDomNodeArray('.people>div');
};

Validator.prototype.doesEndAfterStart = function () {
  var endsLater = false;
  if (this.endDate - this.startDate > 0)  {
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

Validator.prototype.hasGuests = function () {
  var hasGuests = false;
  var numberOfGuests = this.guests.length;
  if (numberOfGuests > 0) {
    hasGuests = true;
  }
  return hasGuests;
};

Validator.prototype.allGuestEmailsAreReal = function () {
  var areReal = false;
  var emailRegex = new RegExp("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$");
  this.guests.forEach(function (guest, index) {
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

var createButton = document.querySelector('button#create');
createButton.onclick = function () {
  // validate
  var validator = new Validator();
  console.log(validator.allGuestEmailsAreReal());

  // submit
};
