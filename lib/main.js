/**  
 * Fennec+
 * current features:
 *  - view image
 *  - view source
 */
// console.log('running...');

const { data, loadReason } = require("sdk/self");
const nw = require('./nativewindow');
const sp = require('sdk/simple-prefs');
const tabs = require('sdk/tabs');
const _ = require("sdk/l10n").get;
const utils = require('sdk/window/utils');

const browser = utils.getMostRecentBrowserWindow().BrowserApp;

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

var viewSourceId = nw.addMenu({
	label: _('viewsource_id'),
	callback: function() {
		openTab("view-source:" + tabs.activeTab.url);
	}
});

function handleUnload (reason) {
  if (reason !== 'shutdown') {
    nw.removeContextMenu(viewImgId);
    nw.removeMenu(viewSourceId);
  }
};

exports.onUnload = handleUnload;


function openTab(uri) {
  let currentTabId = browser.selectedTab.id;
  browser.addTab(
    uri, {
    selected: true,
    parentId: currentTabId});
}
