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
	// Get information from manifest
	var manifest = chrome.runtime.getManifest();
	document.title = chrome.i18n.getMessage('settings_title')+manifest.short_name; // i18n
	$('#name').html(manifest.short_name);
	$('#version').html(chrome.i18n.getMessage('version_title')+manifest.version); // i18n
	$('#author').attr('href', manifest.homepage_url);
	$('#author').html(manifest.author);
	// i18n locales
	$('#saved').html(chrome.i18n.getMessage('saved_message'));
	$('label[for=link_input]').html(chrome.i18n.getMessage('deeplink_label'));
    $('label[for=erid_token]').html(chrome.i18n.getMessage('erid_label'));
	$('label[for=sub_input]').html(chrome.i18n.getMessage('sub_label'));
	$('input[type=submit]').val(chrome.i18n.getMessage('submit_value'));
	$('#author_title').html(chrome.i18n.getMessage('author_title'));
	// Restore options from local storage
	$('input[type!=submit]').each(function() {
        let item = $(this).attr('name');
        chrome.storage.local.get([item]).then((result) => {
            $(this).val(result[item]);
        });
	});
	// Save options to local storage
	$('#save').click(function() {
		$('input[type!=submit]').each(function() {
            chrome.storage.local.set({[$(this).attr('name')]: $(this).val()});
		});
		$('#saved').hide();
		$('#saved').slideDown('slow');
	});
});
