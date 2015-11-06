function performSubmission() {
	var grader = new Grader();

	grader.addTest(function() {
		return grader.hasCorrectLength('#toggle > .markings', 1);
	}, {
	  wrongMessage: "The toggle is on the page."
	}, false);
	
	grader.runTests(
		// {ignoreCheckpoints: true}
	);

	result = {
	  is_correct: grader.isCorrect,
	  test_feedback: grader.getFormattedWrongMessages('\n'),
	  test_comments: grader.getFormattedComments('\n'),
	  congrats: "Sweet slider! Looks like you're getting the hang of touch events."
	};
	return result;
}