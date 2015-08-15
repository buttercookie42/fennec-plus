/**  
 * Fennec+
 * current features:
 *  - view image
 *  - view source
 *  - download mp3s
 */
// console.log('running...');

var { data, loadReason } = require("sdk/self");
let nw = require('./nativewindow');
let sp = require('sdk/simple-prefs');
let tabs = require('sdk/tabs');
var _ = require("sdk/l10n").get;
const utils = require('sdk/window/utils');

var browser = utils.getMostRecentBrowserWindow().BrowserApp;

var DEBUG = sp.prefs.DEBUG;

sp.on('DEBUG', function() {
	DEBUG = sp.prefs.DEBUG;
	console.log('DEBUG set to '+DEBUG);
});

// 'view image' context menu item
var pp = function(o) { return JSON.stringify(o,null,'')};

var viewImgId = nw.addContextMenu({
	name: _('viewimage_id'),
	context: nw.SelectorContext("img"),
	callback: function(target) {
		openTab(target.currentURI.spec);
	}
});

nw.addMenu({
	label: _('viewsource_id'),
	callback: function() {
		openTab("view-source:" + tabs.activeTab.url);
	}
});


function openTab(uri) {
  let currentTabId = browser.selectedTab.id;
  browser.addTab(
    uri, {
    selected: true,
    parentId: currentTabId});
}
