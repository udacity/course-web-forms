function performSubmission() {
	var grader = new Grader({
		// can add shared messages here
	});

	grader.addTest(function() {
	  return !grader.doesExist('select');
	}, {
	  wrongMessage: "There shouldn't be a \`<select>\` on the page."
	});

	grader.addTest(function() {
		var isCorrect = false;
		var elems = $('option');
		elems.each(function (index) {
			var hasValue = grader.hasCorrectAttr(this, 'value');
			if (index === 0) {
				isCorrect = hasValue;
			} else {
				isCorrect = isCorrect && hasValue;
			}
		});
	  return isCorrect;
	}, {
	  wrongMessage: "Each option needs a value."
	});

	grader.runTests();

	result = {
	  is_correct: grader.isCorrect,
	  test_feedback: grader.getFormattedWrongMessages(),
	  test_comments: grader.getFormattedComments(),
	  congrats: "Generic congrats message"
	};
	return result;
}