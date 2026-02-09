#!/bin/bash
set -e

echo "Uninstalling BitWall..."

# Remove autostart
rm -f ~/.config/autostart/bitwall.desktop
echo "  - Autostart entry removed"

# Disable and remove KWin script
kwriteconfig6 --file kwinscriptsrc --group "Script-bitwall" --key "Enabled" --delete 2>/dev/null || true
rm -rf "$HOME/.local/share/kwin/scripts/bitwall"
echo "  - KWin script removed"

# Remove legacy KWin rules (if any remain)
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
fi
echo "  - Legacy KWin rules removed"

# Reload KWin
qdbus6 org.kde.KWin /KWin reconfigure 2>/dev/null || dbus-send --type=method_call --dest=org.kde.KWin /KWin org.kde.KWin.reconfigure 2>/dev/null || true
echo "  - KWin reloaded"

# Remove config
rm -rf ~/.config/bitwall
echo "  - Config removed"

echo "BitWall uninstalled successfully!"
