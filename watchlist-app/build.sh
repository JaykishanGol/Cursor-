#!/bin/bash

echo "�� Starting build process..."

# Ensure we're in the right directory
cd /opt/render/project/src || cd .

# Check Node version
echo "📦 Node version: $(node --version)"
echo "📦 NPM version: $(npm --version)"

# Install dependencies
echo "📥 Installing dependencies..."
npm ci

# Run build
echo "🏗️ Building application..."
npm run build

# Verify build output
if [ -d "dist" ]; then
    echo "✅ Build successful! Contents of dist:"
    ls -la dist/
else
    echo "❌ Build failed - dist directory not found"
    exit 1
fi

echo "🎉 Build completed successfully!"
