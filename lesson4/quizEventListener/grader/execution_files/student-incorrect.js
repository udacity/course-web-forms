/*
You can solve this quiz with vanilla JS or jQuery!
 */

(function() {
	var square = document.querySelector('#square');
	var output = document.querySelector('#output');

	/*
	If you want to use vanilla JS, your code goes here!
	 */
})();

/*
FYI, this is the jQuery way of running a locally scoped function on
document ready. Check out http://gregfranko.com/blog/jquery-best-practices/ to learn more.
 */
$(function(){
	var square = $('#square');
	var output = $('#output');

	/*
	Don't delete this or the square won't be draggable!
	 */
	square.draggable();
  
	/*
	If you want to use jQuery, your code goes here!
	 */
});