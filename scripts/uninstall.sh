#!/bin/bash
set -e

echo "Uninstalling BitWall..."

# Remove autostart
rm -f ~/.config/autostart/bitwall.desktop
echo "  - Autostart entry removed"

# Remove KWin rules
RULE_GROUP="bitwall-wallpaper"
CONFIG_FILE="kwinrulesrc"

# Delete the rule group entirely
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "Description" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "wmclass" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "wmclassmatch" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "below" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "belowrule" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skiptaskbar" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skiptaskbarrule" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skippager" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skippagerrule" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skipswitcher" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skipswitcherrule" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "acceptfocus" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "acceptfocusrule" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "noborder" --delete 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "noborderrule" --delete 2>/dev/null || true

# Remove from rules list and update count
EXISTING_RULES=$(kreadconfig6 --file "$CONFIG_FILE" --group "General" --key "rules" 2>/dev/null || echo "")
if [ -n "$EXISTING_RULES" ]; then
    NEW_RULES=$(echo "$EXISTING_RULES" | tr ',' '\n' | grep -v "$RULE_GROUP" | paste -sd ',' -)
    RULE_COUNT=$(echo "$NEW_RULES" | tr ',' '\n' | grep -c '.' 2>/dev/null || echo "0")
    kwriteconfig6 --file "$CONFIG_FILE" --group "General" --key "rules" "$NEW_RULES" 2>/dev/null || true
    kwriteconfig6 --file "$CONFIG_FILE" --group "General" --key "count" "$RULE_COUNT" 2>/dev/null || true
fi
echo "  - KWin rules removed"

# Reload KWin
qdbus6 org.kde.KWin /KWin reconfigure 2>/dev/null || dbus-send --type=method_call --dest=org.kde.KWin /KWin org.kde.KWin.reconfigure 2>/dev/null || true
echo "  - KWin reloaded"

# Remove config
rm -rf ~/.config/bitwall
echo "  - Config removed"

echo "BitWall uninstalled successfully!"
