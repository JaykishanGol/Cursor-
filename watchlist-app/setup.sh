#!/bin/bash

echo "�� Watchlist App Setup"
echo "====================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "✅ .env file created!"
    echo ""
    echo "⚠️  IMPORTANT: Please edit .env and add your TMDB API key"
    echo "   1. Go to https://www.themoviedb.org/"
    echo "   2. Create an account and request an API key"
    echo "   3. Edit .env and replace 'your_tmdb_api_key_here' with your actual key"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
    echo ""
fi

echo "🚀 Starting development server..."
echo "   Open http://localhost:5173 in your browser"
echo ""

npm run dev
