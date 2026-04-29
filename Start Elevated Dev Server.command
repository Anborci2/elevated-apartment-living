#!/bin/bash

# ─── Elevated Apartment Locating — Local Dev Server ─────────────────────────
# Double-click this file in Finder to start the Next.js dev server.
# Accessible from any device on the same WiFi network.
# ────────────────────────────────────────────────────────────────────────────

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PORT=3000
export PATH="$HOME/.nvm/versions/node/v24.14.1/bin:/opt/homebrew/bin:$PATH"

# Get local network IP (10.0.0.x range)
LOCAL_IP=$(ifconfig | grep 'inet 10\.' | awk '{print $2}' | head -1)
[ -z "$LOCAL_IP" ] && LOCAL_IP="unavailable"

clear
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "    Elevated Apartment Locating — Dev Server"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo " Local:    http://localhost:$PORT"
echo " Mobile:   http://$LOCAL_IP:$PORT"
echo ""
echo " Open the Mobile URL on any phone or tablet"
echo " connected to the same WiFi network."
echo ""
echo " Changes save automatically — just refresh"
echo " the browser to see updates."
echo ""
echo " Press Ctrl+C to stop the server."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Open browser after a short delay so the server is ready
(sleep 2 && open -a Safari "http://localhost:$PORT") &

cd "$SCRIPT_DIR"
npm run dev -- -H 0.0.0.0
