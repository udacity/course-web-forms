function performSubmission() {
	var grader = new Grader({
		// can add shared messages here
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('label', 1);
	}, {
	  wrongMessage: "There should be one <label>."
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('input', 1);
	}, {
	  wrongMessage: "There should be one <input>."
	}, false);

	grader.addTest(function() {
		return grader.hasCorrectLength('input[type="text"]', 1);
	}, {
	  wrongMessage: "The <input> should have type=\"text\"."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var input = $('input');
		var id = input.attr('id');
		
		var hasOneLabel = grader.hasCorrectLength('label[for="' + id + '"]', 1);
		isCorrect = hasOneLabel;

	  return isCorrect;
	}, {
	  wrongMessage: "The <input> needs to be paired with a single <label>."
	});

	grader.addTest(function() {
		return grader.hasAttr('input', 'placeholder', 'Event Name');
	}, {
		wrongMessage: "The input should have a placeholder set to 'Event Name'."
	});

	grader.runTests(
		// {ignoreCheckpoints: true}
	);

	result = {
	  is_correct: grader.isCorrect,
	  test_feedback: grader.getFormattedWrongMessages('\n'),
	  test_comments: grader.getFormattedComments('\n'),
	  congrats: "The placeholder is looking good! Good job!"
	};
	return result;
}