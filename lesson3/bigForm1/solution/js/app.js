// http://stackoverflow.com/questions/5911236/identify-card-type-from-card-number
function getCardType(number) {
  // visa
  var re = new RegExp("^4");
  if (number.match(re) != null)
      return "Visa";

  // Mastercard
  re = new RegExp("^5[1-5]");
  if (number.match(re) != null)
      return "Mastercard";

  // AMEX
  re = new RegExp("^3[47]");
  if (number.match(re) != null)
      return "AMEX";

  // Discover
  re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
  if (number.match(re) != null)
      return "Discover";

  // Diners
  re = new RegExp("^36");
  if (number.match(re) != null)
      return "Diners";

  // Diners - Carte Blanche
  re = new RegExp("^30[0-5]");
  if (number.match(re) != null)
      return "Diners - Carte Blanche";

  // JCB
  re = new RegExp("^35(2[89]|[3-8][0-9])");
  if (number.match(re) != null)
      return "JCB";

  // Visa Electron
  re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
  if (number.match(re) != null)
      return "Visa Electron";

  return "";
}

var submit = document.querySelector('#submit');
submit.onclick = function () {
  alert("All of your information was valid, right? I'll just go ahead and assume that it is ;)\n\nThanks for your submission!");
};

var ccInput = document.querySelector('#cc-number');
var ccType = document.querySelector('#cc-type');
ccInput.oninput = function () {
  ccType.value = getCardType(ccInput.value);
};

var sameAsShipping = document.querySelector('#same-as-shipping');
sameAsShipping.onchange = function () {
	document.querySelector('.billing-inputs').classList.toggle('hide');
};
