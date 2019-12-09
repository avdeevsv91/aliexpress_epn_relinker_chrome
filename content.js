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
	function replaceLinks() {
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
					// Replace links
					var url = encodeURIComponent(this.href);
					$(this).attr('href', link+separator+'sub='+sub+'&to='+url);
					// No referrer
					if(storage.noreferrer == 'true') {
						$(this).attr('rel', 'noreferrer');
					}
				}
			});
		});
	}
	// MutationObserver for replace links function
	function replaceObserver(selector) {
		var targets = document.querySelectorAll(selector);
		if(targets) {
			targets.forEach(function(target) {
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
				return observer;
			});
		}
		return false;
	}
	// URL parser
	var $_GET = {};
	var __GET = window.location.search.substring(1).split('&');
	for(var i=0; i<__GET.length; i++) {
		var getVar = __GET[i].split('=');
		$_GET[getVar[0]] = (getVar[1]==undefined?'':getVar[1]);
	}
	// The logic of determining the need for replacing links
	if($_GET['aff_trace_key']) { // URL contains information about ePN
		// Set (or update) relinker cookie
		var cookie = {
			url: 'https://aliexpress.com',
			name: 'relinker',
			value: Math.floor(new Date().getTime()/1000).toString(),
			domain: '.aliexpress.com',
			path: '/'
		};
		chrome.runtime.sendMessage({method: 'setCookie', details: cookie}, function(cookie) {
			// Сookies successfully installed/updated
		});
	} else { // Initialize the replacement of links
		// Check cookies on the availability of information about ePN
		chrome.runtime.sendMessage({method: 'getCookie', details: {name: 'relinker', url: window.location.href}}, function(cookie) {
			chrome.runtime.sendMessage({method: 'getLocalStorage'}, function(storage) {
				if((cookie === null) || (storage.forced == 'true' && Math.floor(new Date().getTime()/1000)-cookie.value > storage.ttl)) {
					// Replacement for product-list (ajax)
					replaceObserver('ul');
					// Replacement of links on DOM ready
					replaceLinks();
				}
			});
		});
	}
});
