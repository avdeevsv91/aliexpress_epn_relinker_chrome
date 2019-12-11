/*
 =========================================================================
 == AliExpress reLinker (ePN)                                           ==
 == Automatic replacement of links to ePN DeepLink for AliExpress.      ==
 == Author: Sergey Avdeev                                               ==
 == E-Mail: avdeevsv91@gmail.com                                        ==
 == URL: https://github.com/avdeevsv91/aliexpress_epn_relinker_chrome   ==
 =========================================================================
*/

// Document Object Model (DOM) is ready
$(document).ready(function() {
	// Replace links function
	var replaceLinks = (function replaceLinks() {
		// Get local storage object from background.js
		chrome.runtime.sendMessage({method: 'getLocalStorage'}, function(storage) {
			// Get settings from local storage
			var link = storage.link;
			var sub = encodeURIComponent(storage.sub);
			var separator = ((link.indexOf('?')==-1)?'?':'&');
			// Select all <a href="http..."></a> tags
			$('a').each(function() {
				// Select aliexpress.com links
				if(/aliexpress([\.]{1})com/i.test(this.hostname)) {
					// Select item links
					if(/^\/item\/(.+)$/i.test(this.pathname)) {
						// Replace links
						var url = encodeURIComponent(this.href);
						$(this).attr('href', link+separator+'sub='+sub+'&to='+url);
						// No referrer
						$(this).attr('rel', 'noreferrer');
					}
				}
			});
		});
		return replaceLinks;
	})();
	// Replacement for product-list (ajax)
	document.querySelectorAll('ul').forEach(function(target) {
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				replaceLinks();
			});
		});
		observer.observe(target, {
			attributes: true,
			childList: true,
			characterData: true
		});
	});
});
