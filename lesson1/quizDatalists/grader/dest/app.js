// sends message to iframe to call performSubmission() when the iframe is ready
// retrieves message from iframe and outputs to DOM
// JSON.stringify() message

var outputCorrect = document.querySelector('.result-correct');
var outputIncorrect = document.querySelector('.result-incorrect');

window.addEventListener('message', function(message) {
	var result = JSON.stringify(message.data);

	if (message.source.location.pathname.match('\-correct')) {
		outputCorrect.innerHTML = result;
	}

	if (message.source.location.pathname.match('\-incorrect')) {
		outputIncorrect.innerHTML = result;
	}
})