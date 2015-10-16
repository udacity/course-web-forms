function performSubmission() {
	var grader = new Grader({
		// can add shared messages here
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('input', 2);
	}, {
	  wrongMessage: "There should be two <input>s."
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('input[type="checkbox"]', 1);
	}, {
	  wrongMessage: "One <input> should have type=\"checkbox\"."
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('input[type="tel"]', 1);
	}, {
	  wrongMessage: "One <input> should have type=\"tel\"."
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('label', 2);
	}, {
	  wrongMessage: "There should be two <label>s."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var elems = $('input');
		elems.each(function (index) {
			var id = $(this).attr('id') || "";
			if (index === 0) {
				isCorrect = id.length > 0;
			} else {
				isCorrect = isCorrect && id.length > 0;
			}
		});
	  return isCorrect;
	}, {
	  wrongMessage: "Each <input> needs an id."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var elems = $('input');
		if (elems.eq(0).attr('id') !== elems.eq(1).attr('id')) {
			isCorrect = true;
		}
	  return isCorrect;
	}, {
	  wrongMessage: "Each <input> needs a unique id."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var elems = $('label');
		elems.each(function (index) {
			var forValue = $(this).attr('for');
			if (index === 0) {
				isCorrect = forValue.length > 0;
			} else {
				isCorrect = isCorrect && forValue.length > 0;
			}
		});
	  return isCorrect;
	}, {
	  wrongMessage: "Each <label> needs a for attribute."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var elems = $('label');
		if (elems.eq(0).attr('for') !== elems.eq(1).attr('for')) {
			isCorrect = true;
		}
	  return isCorrect;
	}, {
	  wrongMessage: "Each <label> needs a unique for attribute."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var elems = $('input');
		elems.each(function (index) {
			var id = $(this).attr('id');
			var hasOneLabel = grader.hasCorrectLength('label[for="' + id + '"]', 1);
			if (index === 0) {
				isCorrect = hasOneLabel;
			} else {
				isCorrect = isCorrect && hasOneLabel;
			}
		});
	  return isCorrect;
	}, {
	  wrongMessage: "Each <input> needs to be paired with a single <label>."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var checkboxId = $('input[type="checkbox"]').attr('id');
		return !grader.isImmediateChild('input[type="checkbox"]', 'label[for="' + checkboxId + '"]');
	}, {
	  wrongMessage: "The checkbox <input> should not be a child of its <label>."
	});

	grader.addTest(function() {
		var isCorrect = false;
		var telId = $('input[type="tel"]').attr('id');
		return grader.isImmediateChild('input[type="tel"]', 'label[for="' + telId + '"]');
	}, {
	  wrongMessage: "The telephone <input> should be a child of its <label>."
	});

	grader.runTests(
		// {ignoreCheckpoints: true}
	);

	result = {
	  is_correct: grader.isCorrect,
	  test_feedback: grader.getFormattedWrongMessages('\n'),
	  test_comments: grader.getFormattedComments('\n'),
	  congrats: "You got the labels working! Nicely done."
	};
	return result;
}