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
	// Set default values
    chrome.storage.local.get(['link']).then((result) => {
        if(result.link === undefined) {
            chrome.storage.local.set({link: 'https://gotbest.by/redirect/cpa/o/q296f8huk6xhzhjlofgbio114xtirhsp/'});
        }
    });
    chrome.storage.local.get(['erid']).then((result) => {
        if(result.erid === undefined) {
            chrome.storage.local.set({erid: '2SDnjdSefDU'});
        }
    });
    chrome.storage.local.get(['sub']).then((result) => {
        if(result.sub === undefined) {
            chrome.storage.local.set({sub: 'default_chrome'});
        }
    });
});
