// BitWall KWin script - ensures wallpaper window stays below all others
// Compatible with KDE Plasma 6
function applyBitwallRules(window) {
    if (window.resourceClass === 'bitwall') {
        window.keepBelow = true;
        window.skipTaskbar = true;
        window.skipPager = true;
        window.skipSwitcher = true;
    }
}

workspace.windowAdded.connect(applyBitwallRules);

// Also check existing windows
var windows = workspace.windowList;
for (var i = 0; i < windows.length; i++) {
    applyBitwallRules(windows[i]);
}
