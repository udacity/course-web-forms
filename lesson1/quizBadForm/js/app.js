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
    enteredPerson.appendChild(deletePerson);

    people.appendChild(enteredPerson);
    person.value = "";
  }
};