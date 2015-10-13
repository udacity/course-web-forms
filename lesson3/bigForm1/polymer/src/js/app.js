function getDomNodeArray(selector) {
  var nodes = Array.prototype.slice.apply(document.querySelectorAll(selector));
  if (!nodes) {
    nodes = [];
  }
  return nodes;
}

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
var placeSearch, autocomplete;
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
  // Create the autocomplete object, restricting the search to geographical
  // location types.
  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('ship-address')),
      {types: ['geocode']});

  // When the user selects an address from the dropdown, populate the address
  // fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

  // Get each component of the address from the place details
  // and fill the corresponding field on the form.
  for (var i = 0; i < place.address_components.length; i++) {
    var addressType = place.address_components[i].types[0];

    if (componentForm[addressType]) {
      var val = place.address_components[i][componentForm[addressType]];
	    fullAddress[addressType] = val;
	    if (addressType === "postal_code") {
	    	document.querySelector('gold-zip-input').value = val;
	    }
    }
  }
}

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
}

// TODO: finish

function incrementProgress(amount) {
	var progressBar = document.querySelector('paper-progress');

	var newAmount = progressBar.value + amount;
	if (newAmount > 100) {
		newAmount = 100;
	} else if (newAmount < 0) {
		newAmount = 0;
	}
	progressBar.value = newAmount;
};

var progressAmounts = [
	{
		selector: '#bill-name',
		amount: '16'
	},
	{
		selector: '#bill-address',
		amount: '16'
	},
	{
		selector: '#cc-number',
		amount: '16'
	},
	{
		selector: '#cc-exp',
		amount: '16'
	},
	{
		selector: '#ship-name',
		amount: '16'
	},
	{
		selector: '#ship-address',
		amount: '20'
	}
]

progressAmounts.forEach(function (input) {
  input.onsubmit
});