var grader = new Grader();

// var toggle = document.querySelector('#toggle');

grader.addTest(function() {
	toggle.dispatchEvent(new TouchEvent('start', {'bubbles': true, 'touches': [{'pageX': 300}]}));
	console.log('hi');
	return true;
	// return grader.hasCorrectLength('#toggle > .markings', 1);
}, {
  wrongMessage: "The toggle is on the page."
}, false);

grader.runTests(
	// {ignoreCheckpoints: true}
);

grader.onresult = function (result) {
	console.log(result);
};
// result = {
//   is_correct: grader.isCorrect,
//   test_feedback: grader.getFormattedWrongMessages('\n'),
//   test_comments: grader.getFormattedComments('\n'),
//   congrats: "Sweet slider! Looks like you're getting the hang of touch events."
// };