// BitWall KWin script - keeps wallpaper window below all others
// Compatible with KDE Plasma 6 Wayland
//
// Window must NOT use focusable:false (causes override_redirect on X11,
// making the window unmanaged). Instead we handle focus via acceptFocus here.
function setupBitwallWindow(window) {
    if (window.resourceClass !== 'bitwall') return;

    // Skip the settings window
    if (window.caption === 'BitWall Settings') return;

    // Place in BelowLayer - below panels and normal windows
    window.keepBelow = true;
    window.skipTaskbar = true;
    window.skipPager = true;
    window.skipSwitcher = true;

    // Watch for caption changes - undo if this is actually the settings window
    window.captionChanged.connect(function () {
        if (window.caption === 'BitWall Settings') {
            window.keepBelow = false;
            window.skipTaskbar = false;
            window.skipPager = false;
            window.skipSwitcher = false;
        }
    });
}

workspace.windowAdded.connect(setupBitwallWindow);

// Apply to existing windows
var windows = workspace.windowList();
for (var i = 0; i < windows.length; i++) {
    setupBitwallWindow(windows[i]);
}
