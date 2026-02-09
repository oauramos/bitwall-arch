#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

echo "Installing BitWall..."

# Copy autostart desktop file
mkdir -p ~/.config/autostart
cp "$PROJECT_DIR/resources/bitwall.desktop" ~/.config/autostart/bitwall.desktop
echo "  - Autostart entry created"

# Setup KWin rules
RULE_GROUP="bitwall-wallpaper"
CONFIG_FILE="kwinrulesrc"

kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "Description" "BitWall Wallpaper" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "wmclass" "bitwall" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "wmclassmatch" "2" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "below" "true" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "belowrule" "2" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skiptaskbar" "true" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skiptaskbarrule" "2" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skippager" "true" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skippagerrule" "2" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skipswitcher" "true" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "skipswitcherrule" "2" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "acceptfocus" "false" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "acceptfocusrule" "2" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "noborder" "true" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "$RULE_GROUP" --key "noborderrule" "2" 2>/dev/null || true

# Read existing rules and append ours if not present
EXISTING_RULES=$(kreadconfig6 --file "$CONFIG_FILE" --group "General" --key "rules" 2>/dev/null || echo "")

if [ -z "$EXISTING_RULES" ]; then
    RULES_LIST="$RULE_GROUP"
elif echo "$EXISTING_RULES" | grep -q "$RULE_GROUP"; then
    RULES_LIST="$EXISTING_RULES"
else
    RULES_LIST="$EXISTING_RULES,$RULE_GROUP"
fi

# Count rules
RULE_COUNT=$(echo "$RULES_LIST" | tr ',' '\n' | grep -c '.')

kwriteconfig6 --file "$CONFIG_FILE" --group "General" --key "rules" "$RULES_LIST" 2>/dev/null || true
kwriteconfig6 --file "$CONFIG_FILE" --group "General" --key "count" "$RULE_COUNT" 2>/dev/null || true
echo "  - KWin rules configured"

# Reload KWin
qdbus6 org.kde.KWin /KWin reconfigure 2>/dev/null || dbus-send --type=method_call --dest=org.kde.KWin /KWin org.kde.KWin.reconfigure 2>/dev/null || true
echo "  - KWin reloaded"

echo "BitWall installed successfully!"
