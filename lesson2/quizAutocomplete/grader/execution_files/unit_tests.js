function performSubmission() {
	var grader = new Grader({
		// can add shared messages here
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('label', 1);
	}, {
	  wrongMessage: "There should be one <label>."
	}, false);

	grader.addTest(function() {
		return grader.hasCorrectLength('input', 1);
	}, {
	  wrongMessage: "There should be one <input>."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var input = $('input');
		var id = input.attr('id');
		
		var hasOneLabel = grader.hasCorrectLength('label[for="' + id + '"]', 1) || grader.hasParent(input, 'label');
		isCorrect = hasOneLabel;

	  return isCorrect;
	}, {
	  wrongMessage: "The <input> needs to be paired with the <label>."
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('input[type="email"]', 1);
	}, {
	  wrongMessage: "The <input> should be for type=\"email\"."
	}, false);

	grader.addTest(function() {
		return grader.hasAttr('input', 'autocomplete', 'email');
	}, {
	  wrongMessage: "The <input> needs to autcomplete email addresses."
	});

	grader.runTests(
		// {ignoreCheckpoints: true}
	);

	result = {
	  is_correct: grader.isCorrect,
	  test_feedback: grader.getFormattedWrongMessages('\n'),
	  test_comments: grader.getFormattedComments('\n'),
	  congrats: "Nicely done. Making it possible to autcomplete your forms will definitely make them faster to finish!"
	};
	return result;
}