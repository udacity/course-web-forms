/*
Feeling up for a little challenge? Hook up the logic to animate the progress bar when the billing
and shipping addresses are different!
 */

// Scroll animation logic for different billing addresses
var useDiffBilling = document.querySelector('.use-diff-billing');
var newBilling = document.querySelector('.new-billing');
var submit = document.querySelector('.submit');
var scroller = document.querySelector('paper-header-panel').scroller;
var startDist = submit.getBoundingClientRect().bottom - useDiffBilling.getBoundingClientRect().bottom;
var endDist, originalTop, diff;

function scrollDown () {
	scroller.scrollTop = scroller.scrollTop + diff/12;
	if (scroller.scrollTop - originalTop - diff < -diff/12) {
		window.requestAnimationFrame(scrollDown);
	}
};

useDiffBilling.addEventListener('change', function (e) {
	newBilling.classList.toggle('fade-in');

	if (this.checked) {
		window.setTimeout(function() {
			originalTop = scroller.scrollTop;
			endDist = submit.getBoundingClientRect().bottom - useDiffBilling.getBoundingClientRect().bottom;
			diff = endDist - startDist;
			window.requestAnimationFrame(scrollDown);	
		}, 200)
	}
});

// This example displays an address form, using the autocomplete feature
// of the Google Places API to help users fill in the information.
// https://developers.google.com/maps/documentation/javascript/examples/places-autocomplete-addressform
var placeSearch, autocompleteInputs = [
  // Priority should be greater than 0
  {
    // Billing address has priority if filled out
    selector: '#bill-address',
    priority: 2
  }, {
    selector: '#ship-address',
    priority: 1
  }
];

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};
var fullAddress = {};

function initAutocomplete() {
	// Create the autocomplete objects, restricting the search to geographical
	// location types.
	autocompleteInputs.forEach(function(element) {
		element.element = document.querySelector(element.selector);

		element.googleAutocomplete = new google.maps.places.Autocomplete(
			(element.element.$.input),
			{type: ['geocode']}
		);
		// When the user selects an address from the dropdown, populate the address
		// fields in the form.
		element.googleAutocomplete.addListener('place_changed', fillInAddress);
		// When the user clears the input
		element.element.addEventListener('blur', fillInAddress);
	});
};

/*
Determines how the zip field should be filled
 */
function fillInAddress() {

	var priority = 0;
	var target, googleAutocomplete;
	var zipInput = document.querySelector('gold-zip-input');

	// Find the input with higest priority
	autocompleteInputs.forEach(function(element) {
		var value = element.element.$.input.value;
		// Input gets priority only if there's an address
		if (element.priority > priority && value) {
			priority = element.priority;
			googleAutocomplete = element.googleAutocomplete;
		}
	});

	if (googleAutocomplete) {
		// Get the place details from the autocomplete object.
		var place = googleAutocomplete.getPlace();
		// Get each component of the address from the place details
		// and fill the corresponding field on the form.
		for (var i = 0; i < place.address_components.length; i++) {
			var addressType = place.address_components[i].types[0];
			if (componentForm[addressType]) {
				var val = place.address_components[i][componentForm[addressType]];
				fullAddress[addressType] = val;
				if (addressType === 'postal_code') {
					zipInput.value = val;
					zipInput.oninput();
				}
			}
		}
	}
};

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle({
        center: geolocation,
        radius: position.coords.accuracy
      });
      autocomplete.setBounds(circle.getBounds());
    });
  }
};

// Set up the logic to change the progress bar
var progressBar = document.querySelector('paper-progress');

function ProgressTracker (inputs, progressBar) {
	var self = this;
	this.progressBar = progressBar;
	this.inputs = inputs;

	this.inputs.forEach(function (input) {
		input.element = document.querySelector(input.selector);
		input.added = false;
		input.isValid = null;

	  input.element.oninput = function () {
	  	input.isValid = self.determineStatus(input);
	  	self.adjustProgressIfNecessary(input);
	  };
	});
};

ProgressTracker.prototype = {
	determineStatus: function (input) {
		var isValid = false;
		
		if (input.element.value.length > 0) {
			isValid = true;
		} else {
			isValid = false;
		}

		try {
			isValid = isValid && input.element.validate();
		} catch (e) {
			console.log(e);
		}
		return isValid;
	},
	adjustProgressIfNecessary: function (input) {
		var newAmount = this.progressBar.value;

		if (input.added && !input.isValid) {
			newAmount = newAmount - input.amount;
			input.added = false;
		} else if (!input.added && input.isValid) {
			newAmount = newAmount + input.amount;
			input.added = true;
		}

		this.progressBar.value = newAmount;
	}
};

// If you're feeling ambitious, you could add the logic to handle changed billing addresses here!
var inputs = [
	{
		selector: '#cc-number',
		amount: 16
	}, {
		selector: '#cc-exp',
		amount: 16
	}, {
		selector: '#cc-zip',
		amount: 16
	}, {
		selector: '#cc-cvc',
		amount: 16
	}, {
		selector: '#ship-name',
		amount: 16
	}, {
		selector: '#ship-address',
		amount: 20
	}
];

var progressTracker = new ProgressTracker(inputs, progressBar);
