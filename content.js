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
		// Get local storage
        chrome.storage.local.get().then((storage) => {
			// Select all <a href="http..."></a> tags
			$('a').each(function() {
				// Select aliexpress.com links
				if(/aliexpress([\.]{1})com|ru/i.test(this.hostname)) {
					// Select item links
					if(/^\/item\/(.+)$/i.test(this.pathname)) {
						// Replace links
                        var sep = ((storage['link'].indexOf('?') == -1) ? '?' : '&');
                        var sub = encodeURIComponent(storage['sub']);
                        var url = encodeURIComponent(this.href);
                        var erid = encodeURIComponent(storage['erid']);
						$(this).attr('href', storage['link'] + sep + 'sub=' + sub + '&to=' + url + '&erid=' + erid);
						// No referrer
						$(this).attr('rel', 'noreferrer');
					}
				}
			});
        });
		return replaceLinks;
	})();
	// Replacement for product-list (ajax)
	document.querySelectorAll('div').forEach(function(target) {
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
