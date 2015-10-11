var useDiffBilling = document.querySelector('.use-diff-billing');
var newBilling = document.querySelector('.new-billing');
var submit = document.querySelector('.submit');
var scroller = document.querySelector('paper-header-panel').scroller;


function scroll () {
	var currScrollTop = scroller.scrollTop;
	var endScrollTop = submit.getBoundingClientRect().bottom;

	if (currScrollTop < endScrollTop) {
		var diff = endScrollTop - currScrollTop;
	} else {
		var diff = currScrollTop - endScrollTop;
	}

	scroller.scrollTop = currScrollTop + diff/12;

	if (scroller.scrollTop !== endScrollTop) {
		window.requestAnimationFrame(scroll);
	}
};

useDiffBilling.addEventListener('change', function (e) {
	newBilling.classList.toggle('fade-in');

	window.requestAnimationFrame(scroll);



	/*
	The 'smooth' part of the transition only works with Firefox, but it still looks cool.
	 */
	// document.querySelector('.submit').scrollIntoView({behavior: 'smooth', block: 'end'});
});