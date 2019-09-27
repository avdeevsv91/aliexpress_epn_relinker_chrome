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
	$('label[for=sub_input]').html(chrome.i18n.getMessage('sub_label'));
	$('label[for=forced_input]').html(chrome.i18n.getMessage('forced_label'));
	$('label[for=ttl_input]').html(chrome.i18n.getMessage('ttl_label'));
	$('label[for=noreferrer_input]').html(chrome.i18n.getMessage('noreferrer_label'));
	$('input[type=submit]').val(chrome.i18n.getMessage('submit_value'));
	$('#author_title').html(chrome.i18n.getMessage('author_title'));
	
	// Restore options from local storage
	var restore_options = function() {
		var name = $(this).attr('name');
		if($(this).attr('type')=='checkbox') {
			if(localStorage[name]=='true') {
				$(this).attr('checked', true);
			} else {
				$(this).attr('checked', false);
			}
		} else {
			$(this).val(localStorage[name]);
		}
	};
	$('input[type!=submit]').each(restore_options);
	$('select').each(restore_options);

	// Save options to local storage
	var save_options = function() {
		var name = $(this).attr('name');
		if($(this).attr('type')=='checkbox') {
			if($(this).is(':checked')) {
				localStorage[name] = true;
			} else {
				localStorage[name] = false;
			}
		} else {
			localStorage[name] = $(this).val();
		}
	};
	$('#save').click(function() {
		$('input[type!=submit]').each(save_options);
		$('select').each(save_options);
		$('#saved').hide();
		$('#saved').slideDown('slow');
	});
	
	// Other actions
	$('input[id=forced_input]').change(function(){ // Change forced mode checkbox state
		if($(this).is(':checked')) {
			$('label[for=ttl_input]').slideDown('slow');
			$('input[id=ttl_input]').slideDown('slow');
		} else {
			$('label[for=ttl_input]').slideUp('slow');
			$('input[id=ttl_input]').slideUp('slow');
		}
	});
	if($('input[id=forced_input]').is(':checked')) { // Show tll settings if forced mode enable (on startup)
		$('label[for=ttl_input]').show();
		$('input[id=ttl_input]').show();
	}
});
