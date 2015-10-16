function performSubmission() {
	var grader = new Grader({
		// can add shared messages here
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('input[type="number"]', 4);
	}, {
	  wrongMessage: "There should be four <input type=\"number\">s."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var inputs = $('input');
		inputs.each(function (index) {
			var id = $(this).attr('id');
			var hasOneLabel = grader.hasCorrectLength('label[for="' + id + '"]', 1 || grader.hasParent(this, 'label'));
			
			// a bit of a hack to ignore the submit button
			if ($(this).attr('type') === 'submit') {
				hasOneLabel = true;
			}

			if (index === 0) {
				isCorrect = hasOneLabel;
			} else {
				isCorrect = isCorrect && hasOneLabel;
			}
		})

	  return isCorrect;
	}, {
	  wrongMessage: "Each <input> needs to be paired with a single <label> (except the submit button)."
	});

	grader.addTest(function() {
		var input = $('input[type="number"]').eq(0);

		var hasMin = grader.hasAttr(input, 'min', '0');
		var hasMax = grader.hasAttr(input, 'max', '100');
		var hasStep = grader.hasAttr(input, 'step', '10');

		return hasMin && hasMax && hasStep;
	}, {
	  wrongMessage: "The first <input type=\"number\"> needs the correct min, max, and step."
	});

	grader.addTest(function() {
		var input = $('input[type="number"]').eq(1);

		var hasMin = grader.hasAttr(input, 'min', '0');
		var hasMax = grader.hasAttr(input, 'max', '100');
		var hasStep = grader.hasAttr(input, 'step', '10');

		return hasMin && hasMax && hasStep;
	}, {
	  wrongMessage: "The second <input type=\"number\"> needs the correct min, max, and step."
	});

	grader.addTest(function() {
		var input = $('input[type="number"]').eq(2);

		var hasMin = grader.hasAttr(input, 'min', '0');
		var hasMax = grader.hasAttr(input, 'max', '100');
		var hasStep = grader.hasAttr(input, 'step', '10');

		return hasMin && hasMax && hasStep;
	}, {
	  wrongMessage: "The third <input type=\"number\"> needs the correct min, max, and step."
	});

	grader.addTest(function() {
		var input = $('input[type="number"]').eq(3);

		var hasMin = grader.hasAttr(input, 'min', '0');
		var hasMax = grader.hasAttr(input, 'max', '100');
		var hasStep = grader.hasAttr(input, 'step', '10');

		return hasMin && hasMax && hasStep;
	}, {
	  wrongMessage: "The fourth <input type=\"number\"> needs the correct min, max, and step."
	});

	if (grader.hasAttr('input#grade', 'pattern')) {
		grader.addTest(function() {
			return true;
		}, {
		  comment: "Looks like you added a pattern attribute to the grade input. Cool! Is it working?"
		});
	}

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