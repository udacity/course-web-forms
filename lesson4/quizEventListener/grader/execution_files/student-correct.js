/*
You can solve this quiz with vanilla JS or jQuery!
 */

(function() {
  var square = document.querySelector('#square');
  var output = document.querySelector('#output');

  var updatingInProcess = false;
  function showTouchEnd() {
    output.innerHTML = 'touchend';

    /*
    Hide the fact that touchend occured after 2s so that you can click again.
     */
    if (!updatingInProcess) {
      updatingInProcess = true;
      setTimeout(function () {
        output.innerHTML = '';
        updatingInProcess = false;
      }, 2000);
    }
  }

  square.addEventListener('touchend', showTouchEnd, false);
})();

$(function(){
  /*
  FYI, this is the jQuery way of running a locally scoped function on
  document ready. Check out http://gregfranko.com/blog/jquery-best-practices/
  to learn more.
   */
  var square = $('#square');
  var output = $('#output');

  /*
  Don't delete this or the square won't be draggable!
   */
  square.draggable();

  /*
  Here's the same technique w/jQuery. It's commented out because there's no need
  for identical JS and jQuery event listeners on the same node.
   */
  /*
  var updatingInProcess = false;
  square.on('touchend', function() {
    if (!updatingInProcess) {
      updatingInProcess = true;
      output.html('touchend');
      setTimeout(function() {
        output.fadeOut(500);
        updatingInProcess = false;
      }, 2000);
    }
  });
   */
  });