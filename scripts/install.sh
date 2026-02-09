#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Installing BitWall..."

# Copy autostart desktop file
mkdir -p ~/.config/autostart
cp "$PROJECT_DIR/resources/bitwall.desktop" ~/.config/autostart/bitwall.desktop
echo "  - Autostart entry created"

# Install KWin script for window management
KWIN_SCRIPT_DIR="$HOME/.local/share/kwin/scripts/bitwall"
mkdir -p "$KWIN_SCRIPT_DIR/contents/code"
cp "$PROJECT_DIR/resources/kwin-script/metadata.json" "$KWIN_SCRIPT_DIR/metadata.json"
cp "$PROJECT_DIR/resources/kwin-script/contents/code/main.js" "$KWIN_SCRIPT_DIR/contents/code/main.js"
echo "  - KWin script installed"

# Enable the KWin script
kwriteconfig6 --file kwinscriptsrc --group "Script-bitwall" --key "Enabled" "true" 2>/dev/null || true
echo "  - KWin script enabled"

# Remove legacy KWin rules (if any)
kwriteconfig6 --file kwinrulesrc --group "bitwall-wallpaper" --delete-group 2>/dev/null || true
EXISTING_RULES=$(kreadconfig6 --file kwinrulesrc --group "General" --key "rules" 2>/dev/null || echo "")
if echo "$EXISTING_RULES" | grep -q "bitwall-wallpaper"; then
    NEW_RULES=$(echo "$EXISTING_RULES" | tr ',' '\n' | grep -v "bitwall-wallpaper" | paste -sd ',' -)
    if [ -n "$NEW_RULES" ]; then
        RULE_COUNT=$(echo "$NEW_RULES" | tr ',' '\n' | grep -c '.')
        kwriteconfig6 --file kwinrulesrc --group "General" --key "rules" "$NEW_RULES" 2>/dev/null || true
        kwriteconfig6 --file kwinrulesrc --group "General" --key "count" "$RULE_COUNT" 2>/dev/null || true
    else
        kwriteconfig6 --file kwinrulesrc --group "General" --key "rules" --delete 2>/dev/null || true
        kwriteconfig6 --file kwinrulesrc --group "General" --key "count" --delete 2>/dev/null || true
    fi
    echo "  - Legacy KWin rules removed"
fi

# Reload KWin
qdbus6 org.kde.KWin /KWin reconfigure 2>/dev/null || dbus-send --type=method_call --dest=org.kde.KWin /KWin org.kde.KWin.reconfigure 2>/dev/null || true
echo "  - KWin reloaded"

echo "BitWall installed successfully!"
