#!/bin/bash
# Quick setup script for Gene-Guard Backend with Claude AI

echo "🧬 Gene-Guard Backend Setup"
echo "============================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi

echo "✓ Node.js $(node --version)"

# Navigate to backend
cd "$(dirname "$0")"

# Check if dependencies installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
else
    echo "✓ Dependencies already installed"
fi

# Check for .env file
if [ ! -f ".env" ]; then
    echo "⚠️  Missing .env file"
    echo "   Creating from template..."
    cp .env.example .env
    echo ""
    echo "❌ IMPORTANT: Add your API key!"
    echo "   Edit backend/.env and replace:"
    echo "   ANTHROPIC_API_KEY=sk-ant-<paste-your-key-here>"
    echo ""
    echo "   Get your key from: https://console.anthropic.com/account/keys"
    exit 1
fi

# Check for API key
if ! grep -q "sk-ant-" .env; then
    echo "❌ No valid API key in .env"
    echo "   Please add your Anthropic API key to backend/.env"
    exit 1
fi

echo "✓ .env configured"

# Validate structure
echo "✓ Running validation tests..."
node test-backend.js

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the backend:"
echo "  npm start"
echo ""
echo "Then in another terminal, start the frontend:"
echo "  cd ../Gene-Guard-main && npm start"
echo ""
echo "Visit: http://localhost:3000/dna/agents"
