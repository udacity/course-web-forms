(function() {
	/*
	The actual grey box your finger touches.
	 */
	var toggle = document.querySelector('#toggle');
	/*
	The line that the toggle slides over.
	 */
	var line = document.querySelector('#line');

	/*
	Keeps track of touches and determines where the toggle should be on the slider.
	 */
	function ToggleTracker (toggle, line) {
		var toggleRect = toggle.getBoundingClientRect(),
				lineRect = line.getBoundingClientRect();
		
		this._max = lineRect.width - toggleRect.width;
		this._half = this._max / 2;
		
		this._touchOffset = 0;
	};

	ToggleTracker.prototype = {
		_touches: [],
		/*
		Call this to register a movement
		 */
		addMovement: function (touchX) {
			this._touches[0] = this._touches[1] || touchX;
			this._touches[1] = touchX;
		},
		getTranslateX: function () {		
			/*
			How far the finger actually moved
			 */
			var	dx = this._touches[1] - this._touches[0];
			
			/*
			transform: translateX() works by translating from a starting point. The idea is to
			sum every dx to find the current distance from the origin.
			 */
			this._touchOffset = this._touchOffset + dx;

			/*
			I don't want to overwrite _touchOffset as it needs to stay constant between touches.
			 */
			var reportedValue = this._touchOffset;

			/*
			Make sure the toggle doesn't slide off the slider!
			 */
			if (reportedValue < 0) {
				reportedValue = 0;
			} else if (reportedValue > this._max) {
				reportedValue = this._max;
			}

			return reportedValue;
		}
	}

	/*
	You could create multiple ToggleTrackers for multiple toggles.
	 */
	var toggleTracker = new ToggleTracker(toggle, line);
	
	/*
	Meant to be called by requestAnimationFrame for silky smooth 60fps performance.
	#perfmatters - https://www.udacity.com/course/browser-rendering-optimization--ud860
	 */
	function slide() {
		var translateX = toggleTracker.getTranslateX();
		toggle.style.webkitTransform = "translateX(" + translateX + "px)";
		toggle.style.transform = "translateX(" + translateX + "px)";
	}
	
	/*
	Global flag to indicate whether the toggle is in the process of sliding.
	 */
	var sliding = false;
	(function attachEventListeners() {
		/*
		The idea is:
			1) On start, set flag that toggle has started sliding. Attach the event to
				 the toggle itself.
			2) On move, if sliding has been activated, then register a new position
				 and animate the move. Movement doesn't need to be limited to the toggle
				 as it's easy for a finger/mouse to slip off.
			3) On end, set flag that the toggle has stopped sliding. Once again, it
				 doesn't need to be limited to the toggle as the finger/mouse can come
				 up anywhere in the window.
		 */

		toggle.addEventListener('touchstart', function (event) {
			sliding = true;
			toggleTracker.addMovement(event.touches[0].pageX);
		});
		window.addEventListener('touchmove', function (event) {		
			if (sliding) {
				toggleTracker.addMovement(event.touches[0].pageX);
				requestAnimationFrame(slide);
			}		
		});
		window.addEventListener('touchend', function (event) {				
			sliding = false;
		});

		toggle.addEventListener('mousedown', function (event) {				
			sliding = true;
			toggleTracker.addMovement(event.pageX);
		});
		window.addEventListener('mousemove', function (event) {				
			if (sliding) {
				toggleTracker.addMovement(event.pageX);
				requestAnimationFrame(slide);
			}
		});
		window.addEventListener('mouseup', function (event) {				
			sliding = false;
		});
	})();
})();