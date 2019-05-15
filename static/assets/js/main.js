	/*
        Phantom by Pixelarity
        pixelarity.com | hello@pixelarity.com
        License: pixelarity.com/license
    */

(function($) {

	var $window = $(window);
	var $body = $('body');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function() {
		window.setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Touch?
	if (browser.mobile) {
		$body.addClass('is-touch');
	}

	// Forms.
	var $form = $('form');

	// Auto-resizing textareas.
	$form.find('textarea').each(function() {

		var $this = $(this),
			$wrapper = $('<div class="textarea-wrapper"></div>'),
			$submits = $this.find('input[type="submit"]');

		$this
			.wrap($wrapper)
			.attr('rows', 1)
			.css('overflow', 'hidden')
			.css('resize', 'none')
			.on('keydown', function(event) {

				if (event.keyCode == 13
					&& event.ctrlKey) {

					event.preventDefault();
					event.stopPropagation();

					$(this).blur();

				}

			})
			.on('blur focus', function() {
				$this.val($.trim($this.val()));
			})
			.on('input blur focus --init', function() {

				$wrapper
					.css('height', $this.height());

				$this
					.css('height', 'auto')
					.css('height', $this.prop('scrollHeight') + 'px');

			})
			.on('keyup', function(event) {

				if (event.keyCode == 9)
					$this
						.select();

			})
			.triggerHandler('--init');

		// Fix.
		if (browser.name == 'ie'
			|| browser.mobile)
			$this
				.css('max-height', '10em')
				.css('overflow-y', 'auto');

	});

	// Menu.
	var locked = false;

	function lock() {

		if (locked)
			return false;

		locked = true;

		window.setTimeout(function() {
			locked = false;
		}, 350);

		return true;

	}

	function _show() {
		if (lock()) {
			$body.addClass('is-menu-visible');
		}
	}

	function hide() {
		if (lock()) {
			$body.removeClass('is-menu-visible');
		}
	}

	function toggle() {
		if (lock()) {
			$body.toggleClass('is-menu-visible');
		}
	}


	$body
		.on('click', '#menu', function(event) {
			event.stopPropagation();
		})
		.on('click', '#menu a', function(event) {

			var href = $(this).attr('href');

			event.preventDefault();
			event.stopPropagation();

			// Hide.
			hide();

			// Redirect.
			if (href === '#menu') {
				return;
			}

			window.setTimeout(function() {
				window.location.href = href;
			}, 350);

		});

	$body
		.on('click', 'a[href="#menu"]', function(event) {

			event.stopPropagation();
			event.preventDefault();

			toggle();
		})
		.on('click', function(event) {
			hide();
		})
		.on('keydown', function(event) {
			// Hide on escape.
			if (event.keyCode == 27) {
				hide();
			}
		});

})(jQuery);
