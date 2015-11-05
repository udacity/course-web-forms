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
		return grader.hasCorrectLength('input[type="datetime"]', 1) || grader.hasCorrectLength('input[type="datetime-local"]', 1);
	}, {
	  wrongMessage: "The <input> needs to encompass all of the original information. Research available input types and give it another shot."
	}, false);

	if (grader.hasCorrectLength('input[type="datetime"]', 1)) {
		grader.addTest(function() {
			return true;
		}, {
		  comment: "I see you used \"datetime\". That works, but it has some extra information that wasn't in the original form. Can you figure out what it is?"
		});
	}

	grader.runTests(
		// {ignoreCheckpoints: true}
	);

	var result = {
	  is_correct: grader.isCorrect,
	  test_feedback: grader.getFormattedWrongMessages('\n'),
	  test_comments: grader.getFormattedComments('\n'),
	  congrats: "Awesome! It's always a good idea to give a calendar to your users when they need one."
	};
	return result;
}