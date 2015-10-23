function performSubmission() {
	var grader = new Grader({
		// can add shared messages here
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('option', 4);
	}, {
	  wrongMessage: "There should be four <options>."
	});

	grader.addTest(function() {
		return grader.hasCorrectLength('input', 1);
	}, {
	  wrongMessage: "There should be one <input>."
	});

	grader.addTest(function() {
	  return !grader.doesExist('select');
	}, {
	  wrongMessage: "There shouldn't be a <select> on the page."
	});

	grader.addTest(function() {
	  return grader.doesExist('datalist') && grader.hasCorrectLength('datalist', 1);
	}, {
	  wrongMessage: "There should be one <datalist> on the page."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var elems = $('option');
		elems.each(function (index) {
			var isImmediateChild = grader.isImmediateChild(this, 'datalist');
			if (index === 0) {
				isCorrect = isImmediateChild;
			} else {
				isCorrect = isCorrect && isImmediateChild;
			}
		});
	  return isCorrect;
	}, {
	  wrongMessage: "<option>s should be children of the <datalist>."
	}, false);

	grader.addTest(function() {
		var isCorrect = false;
		var elems = $('option');
		elems.each(function (index) {
			var hasValue = grader.hasAttr(this, 'value');
			if (index === 0) {
				isCorrect = hasValue;
			} else {
				isCorrect = isCorrect && hasValue;
			}
		});
	  return isCorrect;
	}, {
	  wrongMessage: "Each <option> needs a value attribute."
	}, false);

	grader.addTest(function() {
		return grader.hasAttr('datalist', 'id')
	}, {
	  wrongMessage: "<datalist> needs an id."
	});

	grader.addTest(function() {
		return grader.hasAttr('input', 'list');
	}, {
	  wrongMessage: "The <input> needs a list attribute"
	});

	grader.addTest(function() {
		var areSame = false;
		var listAttr = $('input').attr('list');
		var datalistId = $('datalist').attr('id');
		if (listAttr === datalistId) {
			areSame = true;
		}
		return areSame;
	}, {
	  wrongMessage: "<input list> needs to match <datalist id>"
	});

	grader.runTests();

	result = {
	  is_correct: grader.isCorrect,
	  test_feedback: grader.getFormattedWrongMessages('\n'),
	  test_comments: grader.getFormattedComments('\n'),
	  congrats: "Great job! Datalists are really useful :)"
	};
	return result;
}