var outputCorrect = document.querySelector('.result-correct');
var outputIncorrect = document.querySelector('.result-incorrect');

window.addEventListener('message', function(message) {
	var result = JSON.stringify(message.data);

	if (message.source.location.pathname.match('\-correct')) {
		outputCorrect.innerText = result;
	}

	if (message.source.location.pathname.match('\-incorrect')) {
		outputIncorrect.innerText = result;
	}
})