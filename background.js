/*
 =========================================================================
 == AliExpress reLinker (ePN)                                           ==
 == Automatic replacement of links to ePN DeepLink for AliExpress.      ==
 == Author: Sergey Avdeev                                               ==
 == E-Mail: avdeevsv91@gmail.com                                        ==
 == URL: https://github.com/avdeevsv91/aliexpress_epn_relinker_chrome   ==
 =========================================================================
*/

// Listener for onInstalled action
chrome.runtime.onInstalled.addListener(function(object) {
	// Remove old links
	if(object.reason == 'update') {
		if(
			(localStorage.link == 'http://alipromo.com/redirect/cpa/o/o3dg77s3ecabxunu8mu33vxvw2nrlxyh/')
			||
			(localStorage.link == 'https://buyeasy.by/redirect/cpa/o/pyhi7gf87v3htw6xqch0xk4cpkyrpbyn/')
		) {
			localStorage.removeItem('link');
		}
	}
	// Set default values
	if(localStorage.link === undefined) {
		localStorage.link = 'https://gotbest.by/redirect/cpa/o/q296f8huk6xhzhjlofgbio114xtirhsp/';
	}
	if(localStorage.sub === undefined) {
		localStorage.sub = 'default_chrome';
	}
});

// Listener for getLocalStorage method
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	switch(request.method) {
		case 'getLocalStorage': // Return local storage object
			sendResponse(localStorage);
			break;
		default:
			sendResponse({}); // None
	}
});
