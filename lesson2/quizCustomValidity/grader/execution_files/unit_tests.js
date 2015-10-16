function performSubmission() {
	var grader = new Grader({
		// can add shared messages here
	});
	window.setTimeout(function () {
		$('#submit').click();
	}, 500)

	grader.runTests(
		// {ignoreCheckpoints: true}
	);

	result = {
	  is_correct: grader.isCorrect,
	  test_feedback: grader.getFormattedWrongMessages('\n'),
	  test_comments: grader.getFormattedComments('\n'),
	  congrats: "Great job! Using validation attributes will help make your forms faster and more accurate."
	};
	return result;
}