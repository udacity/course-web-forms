var APP = (function() {
/**
 * Creates an Array of DOM nodes that match the selector
 * @param selector {string} CSS selector - selector to match against
 * @return {array} Array of DOM nodes
 */
function getDomNodeArray(selector) {
  var nodes = Array.prototype.slice.apply(document.querySelectorAll(selector));
  if (!nodes) {
    nodes = [];
  }
  return nodes;
}

/*
Generate all the options for the date entries
 */
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
var newGuest = document.querySelector('input.new-guest');
var people = document.querySelector('.attendees');
newGuest.onkeydown = function (evt) {
  if (evt.keyIdentifier === "Enter") {
    var enteredPerson = document.createElement('div');
    var deletePerson = document.createElement('button');
    deletePerson.innerHTML = "-";
    deletePerson.parent = enteredPerson;

    deletePerson.onclick = function () {
      people.removeChild(this.parent);
    };
    enteredPerson.innerHTML = newGuest.value;
    enteredPerson.value = newGuest.value; // for easy access later
    enteredPerson.appendChild(deletePerson);

    people.appendChild(enteredPerson);
    newGuest.value = "";
  }
};

/*
class="model model-*" Refer to inputs by the name after class model-*
 */
function Model() {
  var self = this;

  function Binding(elem, value) {
    elem = elem || null;
    value = value || null;

    this.elem = elem;
    this.value = value;
    this.hasChanged = false;
    this.oninput = function() {};
  }

  // pulls values from elems of class="model model-*" to create Model's raw info and set up 1-way binding
  getDomNodeArray('.model').forEach(function (elem) {
    var elClassList = elem.classList,
        classListCounter = 0,
        className;

    while(classListCounter < elClassList.length) {
      className = elClassList.item(classListCounter);

      var possiblyMatch = className.match(/model\-/g);
      if (possiblyMatch) {
        // create the Model value
        var name = className.slice(6);
        var value = elem.value;

        // set default values
        if (name.indexOf("Month") > -1) {
          value = value - 1;
        } else if (name.indexOf("Time" > -1)) {
          value = value || '00:00';
        }

        self[name] = self[name] || new Binding(elem, value);
        elem.binding = elem.binding || self[name];

        // bind data oninput
        elem.oninput = function () {
          self[name].hasChanged = true;
          self[name] = self[name] || new Binding(elem, value);
          self[name].value = elem.value;
          self.updateCalculations();
          
          // for callbacks
          self[name].oninput();
        };
      }

      ++classListCounter;
    }
  });

  self.updateCalculations = function () {
    self.startMin = self.startMin || new Binding(null, self.startTime.value.split(':')[1]);
    self.startHour = self.startHour || new Binding(null, self.startTime.value.split(':')[0]);
    self.endMin = self.endMin || new Binding(null, self.endTime.value.split(':')[1]);
    self.endHour = self.endHour || new Binding(null, self.endTime.value.split(':')[0]);

    self.date = self.date || new Binding();

    self.date.value = new Date(self.startYear.value, self.startMonth.value, self.startDay.value);
  };

  self.updateCalculations();
};

/*
To create a placeholder effect. Assumes that display element starts with 'placeholder' class
 */
function displayWithPlaceholder (inputBinding, displayElem, placeholder) {
  if (displayElem.classList.contains('placeholder')) {
    displayElem.classList.remove('placeholder');
  };
  if (inputBinding.value === "") {
    inputBinding.value = placeholder;
    // let the model know that input has gone back to default
    inputBinding.hasChanged = false;

    displayElem.classList.add('placeholder');
  }
  displayElem.innerHTML = inputBinding.value;
};
var model = new Model();

// Update the view oninput
model.title.oninput = function () {
  var titleDisplay = document.querySelector('.title-display');
  displayWithPlaceholder(model.title, titleDisplay, "Untitled Event");
};

model.description.oninput = function () {
  var descriptionDisplay = document.querySelector('.card-detail-actual.what');
  displayWithPlaceholder(model.description, descriptionDisplay, "Description");
};

model.location.oninput = function () {
  var locationDisplay = document.querySelector('.card-detail-actual.where');
  displayWithPlaceholder(model.location, locationDisplay, "Place");
};

var whenDisplay = document.querySelector('.card-detail-actual.when');
getDomNodeArray('.input-datetime').forEach(function (elem) {
  elem.binding.oninput = function () {
    // TODO: a bit hacky
    var timeToDisplay = model.date.value.toDateString() + " from " + model.startTime.value + " to " + model.endTime.value;
    displayWithPlaceholder({value: timeToDisplay}, whenDisplay, "Time");
  };
});

function validate() {
  var self = this;
  var allGood = false;
  var errorMessage = "Please correct the following errors: <br>";
  var people = getDomNodeArray('.people>div');
  
  var validations = [
    {
      errorMessage: "Please include a title.",
      validationMethod: function() {
        return model.title.hasChanged;
      }
    },
    {
      errorMessage: "Please include a description.",
      validationMethod: function () {
        return model.description.hasChanged;
      }
    },
    {
      errorMessage: "Please include guests.",
      validationMethod: function () {
        if (people.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    {
      errorMessage: "Please include valid email addresses.",
      validationMethod: function () {
        var areReal = false;
        var emailRegex = new RegExp("^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$");
        people.forEach(function (guest, index) {
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
      }
    }
  ];

  validations.forEach(function (val, index) {
    if (val.validationMethod(self)) {
      if (index === 0) {
        allGood = true;
      } else {
        allGood = allGood && true;
      }
    } else {
      allGood = allGood && false;
      errorMessage = errorMessage + val.errorMessage + '<br>';
    }
  });
  errorMessage = errorMessage.trim();
  
  return {
    isValid: allGood,
    errorMessage: errorMessage
  }
};

var createButton = document.querySelector('button#create');
createButton.onclick = function () {
  var validState = validate();

  if (!validState.isValid) {
    var errorMessage = document.querySelector('.error-message');
    errorMessage.innerHTML = validState.errorMessage;
  } else {
    alert("Valid form. Thanks for submitting!");
  }
};

})();
