#!/bin/bash

echo "🚀 Setting up CMS Web Profile..."

# Check if composer is installed
if ! command -v composer &> /dev/null; then
    echo "❌ Composer is not installed. Please install Composer first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

echo "📦 Installing PHP dependencies..."
composer install

echo "📦 Installing Node.js dependencies..."
npm install

echo "🔧 Setting up environment..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ .env file created"
else
    echo "⚠️  .env file already exists, skipping..."
fi

echo "🔑 Generating application key..."
php artisan key:generate

echo "🗄️  Setting up database..."
# Create SQLite database if it doesn't exist
if [ ! -f database/database.sqlite ]; then
    touch database/database.sqlite
    echo "✅ SQLite database created"
fi

echo "🔄 Running migrations..."
php artisan migrate

echo "🌱 Running seeders..."
php artisan db:seed

echo "🏗️  Building frontend assets..."
npm run build

echo ""
echo "🎉 Setup complete!"
echo ""
echo "🔐 Default admin login:"
echo "   Email: admin@omahiot.com"
echo "   Password: password123"
echo ""
echo "🚀 To start the application:"
echo "   php artisan serve"
echo ""
echo "📱 For development with hot reload:"
echo "   Terminal 1: php artisan serve"
echo "   Terminal 2: npm run dev"
echo ""