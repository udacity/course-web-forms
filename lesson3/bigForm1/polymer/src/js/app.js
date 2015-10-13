var useDiffBilling = document.querySelector('.use-diff-billing');
var newBilling = document.querySelector('.new-billing');
var submit = document.querySelector('.submit');
var scroller = document.querySelector('paper-header-panel').scroller;

var currScrollTop, endScrollTop, diff;
function scrollDown () {
	scroller.scrollTop = scroller.scrollTop + diff/12;

	if (Math.abs(scroller.scrollTop - endScrollTop) > 10) {
		window.requestAnimationFrame(scrollDown);
	}
};

useDiffBilling.addEventListener('change', function (e) {
	newBilling.classList.toggle('fade-in');

	if (this.checked) {
		currScrollTop = scroller.scrollTop;
		endScrollTop = submit.getBoundingClientRect().bottom;
		diff = endScrollTop - currScrollTop;
		window.requestAnimationFrame(scrollDown);	
	}
});