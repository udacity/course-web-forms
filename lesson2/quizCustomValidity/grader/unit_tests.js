(function(window){
var firstPasswordInput = document.querySelector('#first');
var secondPasswordInput = document.querySelector('#second');
var submit = document.querySelector('#submit');
var form = document.querySelector('form');
var firstNativesCV = firstPasswordInput.setCustomValidity;
var secondNativesCV = secondPasswordInput.setCustomValidity;
var firstStudentMessage = null;
var secondStudentMessage = null;

var grader = new Grader({
	// can add shared messages here
});

alert = function() {};

if (form) {
	document.querySelector('form').onsubmit = function (event) {
		return false;
	};
}

submit.onclick = submit.onclick || function(){};

var allOfSubmitOnclick = submit.onclick.toString(); 
var functionBody = allOfSubmitOnclick.slice(allOfSubmitOnclick.indexOf("{") + 1, allOfSubmitOnclick.lastIndexOf("}"));

if (functionBody.length > 0) {
	grader.addTest(function () {
		window.dispatchEvent(new CustomEvent('ud-onsubmit', {'detail': 'passed'}));
		return true;
	}, {
		wrongMessage: "intentionally left blank"
	})
}

firstPasswordInput.setCustomValidity = function (message) {
	firstStudentMessage = message;
	if (grader.is_correct) {
		window.dispatchEvent(new CustomEvent('ud-message', {'detail': 'passed'}));
	}
	firstNativesCV.call(this, message);
};

secondPasswordInput.setCustomValidity = function (message) {
	secondStudentMessage = message;
	if (grader.is_correct) {
		window.dispatchEvent(new CustomEvent('ud-message', {'detail': 'passed'}));
	}
	secondNativesCV.call(this, message);
};

function setOnePassword (password) {
	firstPasswordInput.value = password;
	secondPasswordInput.value = "";
	submit.onclick();
};

function setBothPasswords (password1, password2) {
	firstPasswordInput.value = password1;
	secondPasswordInput.value = password2 || password1;
	submit.onclick();
}

var shortPasswords = [
	'1',
	'a',
	'$',
	'asdfasdf',
	'123456789012345',
	'abcdefhightiofn'
]

var longPasswords = [
	'abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc',
	'12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890'
]

var symbollessPasswords = [
	'abc123ABCCBA321abc',
	'cameronsTESTpassword1',
	'notarealPASSword123'
]

var numberlessPasswords = [
	'abcABCabcABCabcABC!@#',
	'!@#$%abcABCabcABCabc!',
	'!password!PASSWORD!'
]

var uppercaselessPasswords = [
	'thispasswordisalllowercase1!@#',
	'password!@#123123password',
	'notarealpassword!#$%1'
]

var lowercaselessPasswords = [
	'ALLCAPSBABY!1!1!1!1!1!',
	'LOWERCASELETTERSAREFORCHUMPS1111!!!!!',
	'THISISTHEINTERNETSOIMGOINGTOYELL!!!!1111111!?'
]

var illegalCharacterPasswords = [
	'Password123!@#()',
	'pASSWORD321!asdf<>',
	'1fakepAssword$$$$$$$+[]()'
]

var incorrectPasswords = [
	{
		pw: 'abc123',
		expected: [
			'16',
			'symbol',
			'uppercase'
		]
	},
	{
		pw: 'abc123ABC1!',
		expected: [
			'16'
		]
	},
	{
		pw: 'CBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCCBAABCC1!',
		expected: [
			'lowercase',
			'100'
		]
	},
	{
		pw: 'password1',
		expected: [
			'16',
			'uppercase',
			'symbol'
		]
	},
	{
		pw: 'badpassword1!@#AASDF()',
		expected: [
			'illegal'
		]
	},
	{
		pw: 'cameroniscoolbuthatessybols1O1O1O',
		expected: [
			'symbol'
		]
	}
]

var correctPasswords = [
	'ThisPasswordWorks1!',
	'notAgreatPassword2@',
	'P@$$w0rd1234abcdefg',
	'coolBEANSy0!1997',
	'whatAMiDOINGwithMYlife1!@#'
]

grader.addTest(function() {
  var allPass = false;
	correctPasswords.forEach(function (pw, index) {
		setBothPasswords(pw, pw + 'randomletters');

		var re = new RegExp('match', 'i');
		var includesMessage = false;
	  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
	  	includesMessage = true;
	  }

	  if (index === 0) {
	  	allPass = includesMessage;
	  } else {
	  	allPass = allPass && includesMessage;
	  }
	});
	if (allPass) {
		window.dispatchEvent(new CustomEvent('ud-matching', {'detail': 'passed'}));
	}
	return allPass;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
  var allHaveMessage = false;
	shortPasswords.forEach(function (pw, index) {
		setBothPasswords(pw);

	  var re = new RegExp('16', 'i');
		var includesMessage = false;
	  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
	  	includesMessage = true;
	  }
		
		if (index === 0) {
			allHaveMessage = includesMessage;
		} else {
			allHaveMessage = allHaveMessage && includesMessage;
		}
	});
	if (allHaveMessage) {
		window.dispatchEvent(new CustomEvent('ud-short', {'detail': 'passed'}));
	}
	return allHaveMessage;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
  var allHaveMessage = false;
	longPasswords.forEach(function (pw, index) {
		setBothPasswords(pw);

	  var re = new RegExp('100', 'i');
	  var includesMessage = false;
	  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
	  	includesMessage = true;
	  }
		
		if (index === 0) {
			allHaveMessage = includesMessage;
		} else {
			allHaveMessage = allHaveMessage && includesMessage;
		}
	});	
	if (allHaveMessage) {
		window.dispatchEvent(new CustomEvent('ud-long', {'detail': 'passed'}));
	}
	return allHaveMessage;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
  var allHaveMessage = false;
	symbollessPasswords.forEach(function (pw, index) {
		setBothPasswords(pw);

	  var re = new RegExp('symbol', 'i');
	  var includesMessage = false;
	  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
	  	includesMessage = true;
	  }
		
		if (index === 0) {
			allHaveMessage = includesMessage;
		} else {
			allHaveMessage = allHaveMessage && includesMessage;
		}
	});
	if (allHaveMessage) {
		window.dispatchEvent(new CustomEvent('ud-symbol', {'detail': 'passed'}));
	}
	return allHaveMessage;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
  var allHaveMessage = false;
	numberlessPasswords.forEach(function (pw, index) {
		setBothPasswords(pw);

	  var re = new RegExp('number', 'i');
	  var includesMessage = false;
	  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
	  	includesMessage = true;
	  }
		
		if (index === 0) {
			allHaveMessage = includesMessage;
		} else {
			allHaveMessage = allHaveMessage && includesMessage;
		}
	});
	if (allHaveMessage) {
		window.dispatchEvent(new CustomEvent('ud-number', {'detail': 'passed'}));
	}
	return allHaveMessage;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
  var allHaveMessage = false;
	lowercaselessPasswords.forEach(function (pw, index) {
		setBothPasswords(pw);

	  var re = new RegExp('lower', 'i');
	  var includesMessage = false;
	  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
	  	includesMessage = true;
	  }
		
		if (index === 0) {
			allHaveMessage = includesMessage;
		} else {
			allHaveMessage = allHaveMessage && includesMessage;
		}
	});
	if (allHaveMessage) {
		window.dispatchEvent(new CustomEvent('ud-lowercase', {'detail': 'passed'}));
	}
	return allHaveMessage;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
  var allHaveMessage = false;
	uppercaselessPasswords.forEach(function (pw, index) {
		setBothPasswords(pw);

	  var re = new RegExp('upper', 'i');
	  var includesMessage = false;
	  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
	  	includesMessage = true;
	  }
		
		if (index === 0) {
			allHaveMessage = includesMessage;
		} else {
			allHaveMessage = allHaveMessage && includesMessage;
		}
	});
	if (allHaveMessage) {
		window.dispatchEvent(new CustomEvent('ud-uppercase', {'detail': 'passed'}));
	}
	return allHaveMessage;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
  var allHaveMessage = false;
	illegalCharacterPasswords.forEach(function (pw, index) {
		setBothPasswords(pw);

	  var re = new RegExp('illegal', 'i');
	  var includesMessage = false;
	  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
	  	includesMessage = true;
	  }
		
		if (index === 0) {
			allHaveMessage = includesMessage;
		} else {
			allHaveMessage = allHaveMessage && includesMessage;
		}
	});
	if (allHaveMessage) {
		window.dispatchEvent(new CustomEvent('ud-illegal', {'detail': 'passed'}));
	}
	return allHaveMessage;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
	var hasAllMessages = false;
	incorrectPasswords.forEach(function (combo) {
		setBothPasswords(combo.pw);

		combo.expected.forEach(function (msg, index) {
		  var includesMessage = false;
		  var re = new RegExp(msg, 'i');
		  if ((firstStudentMessage && firstStudentMessage.match(re)) || (secondStudentMessage && secondStudentMessage.match(re))) {
		  	includesMessage = true;
		  }
		  if (index === 0) {
		  	hasAllMessages = includesMessage;
		  } else {
		  	hasAllMessages = hasAllMessages && includesMessage;
		  }
		});
	});
	if (hasAllMessages) {
		window.dispatchEvent(new CustomEvent('ud-incorrect', {'detail': 'passed'}));
	}
	return hasAllMessages;
}, {
	wrongMessage: "intentionally left blank"
});

grader.addTest(function() {
  var allPass = false;
	correctPasswords.forEach(function (pw, index) {
		setBothPasswords(pw);

		var noMessage = false;
	  if (firstStudentMessage === '' && secondStudentMessage === '') {
	  	noMessage = true;
	  }

	  if (index === 0) {
	  	allPass = noMessage;
	  } else {
	  	allPass = allPass && noMessage;
	  }
	});
	if (allPass) {
		window.dispatchEvent(new CustomEvent('ud-correct', {'detail': 'passed'}));
	}
	return allPass;
}, {
	wrongMessage: "intentionally left blank"
});

grader.runTests(
	// {ignoreCheckpoints: true}
);
setBothPasswords('');
})(window);