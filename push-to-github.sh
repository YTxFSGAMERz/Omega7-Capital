#!/bin/bash
# =============================================
# Omega 7 Capital - GitHub Push Script
# =============================================
# This script pushes the project source code to GitHub.
#
# Usage:
#   ./push-to-github.sh <GITHUB_PAT> [REPO_NAME] [USERNAME]
#
# Examples:
#   ./push-to-github.sh ghp_xxxxxxxxxxxx
#   ./push-to-github.sh ghp_xxxxxxxxxxxx omega7-capital
#   ./push-to-github.sh ghp_xxxxxxxxxxxx omega7-capital myusername
#
# To get a Personal Access Token:
#   1. Go to https://github.com/settings/tokens/new
#   2. Give it a description (e.g., "Omega7 Push")
#   3. Select scopes: repo, delete_repo
#   4. Click "Generate token"
#   5. Copy the token (starts with ghp_)
# =============================================

set -e

PAT="${1:?Error: Personal Access Token is required.\n\nUsage: $0 <GITHUB_PAT> [REPO_NAME] [USERNAME]\n\nGet a token at: https://github.com/settings/tokens/new?scopes=repo,delete_repo}"
REPO_NAME="${2:-omega7-capital}"

echo "🔍 Validating token..."
USERNAME=$(curl -s -H "Authorization: Bearer $PAT" https://api.github.com/user | grep -o '"login":"[^"]*"' | cut -d'"' -f4)

if [ -z "$USERNAME" ]; then
    echo "❌ Invalid token or insufficient permissions."
    echo "   Make sure your token has 'repo' and 'delete_repo' scopes."
    exit 1
fi

echo "✅ Authenticated as: $USERNAME"
echo "📦 Repository: $REPO_NAME"
echo ""

# Check if repo exists
REPO_CHECK=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $PAT" "https://api.github.com/repos/$USERNAME/$REPO_NAME")

if [ "$REPO_CHECK" = "200" ]; then
    echo "📝 Repository exists. Will push to it."
else
    echo "📝 Creating new repository..."
    CREATE_RESULT=$(curl -s -X POST \
        -H "Authorization: Bearer $PAT" \
        -H "Accept: application/vnd.github+json" \
        https://api.github.com/user/repos \
        -d "{\"name\":\"$REPO_NAME\",\"description\":\"Omega 7 Capital - Premium Venture Capital Website\",\"private\":false,\"auto_init\":false}")

    if echo "$CREATE_RESULT" | grep -q '"full_name"'; then
        echo "✅ Repository created successfully!"
    else
        echo "❌ Failed to create repository."
        echo "$CREATE_RESULT" | head -5
        exit 1
    fi
fi

# Configure git
cd "$(dirname "$0")"
git config user.name "Z User" 2>/dev/null || true
git config user.email "z@container" 2>/dev/null || true

# Set up remote
git remote remove origin 2>/dev/null || true
git remote add origin "https://${PAT}@github.com/${USERNAME}/${REPO_NAME}.git"

echo ""
echo "🚀 Pushing code to GitHub..."

# Push
if git push -u origin main --force 2>&1; then
    # Clean up PAT from remote URL
    git remote set-url origin "https://github.com/${USERNAME}/${REPO_NAME}.git"
    echo ""
    echo "🎉 Success! Your code is now on GitHub."
    echo "🔗 https://github.com/${USERNAME}/${REPO_NAME}"
else
    git remote remove origin 2>/dev/null || true
    echo ""
    echo "❌ Push failed. Please check your token and try again."
    exit 1
fi
