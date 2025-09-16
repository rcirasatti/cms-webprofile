# CMS Web Profile Setup Script for Windows
Write-Host "🚀 Setting up CMS Web Profile..." -ForegroundColor Green

# Check if composer is installed
if (!(Get-Command composer -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Composer is not installed. Please install Composer first." -ForegroundColor Red
    exit 1
}

# Check if npm is installed
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed. Please install Node.js and npm first." -ForegroundColor Red
    exit 1
}

Write-Host "📦 Installing PHP dependencies..." -ForegroundColor Yellow
composer install

Write-Host "📦 Installing Node.js dependencies..." -ForegroundColor Yellow
npm install

Write-Host "🔧 Setting up environment..." -ForegroundColor Yellow
if (!(Test-Path .env)) {
    Copy-Item .env.example .env
    Write-Host "✅ .env file created" -ForegroundColor Green
} else {
    Write-Host "⚠️  .env file already exists, skipping..." -ForegroundColor Yellow
}

Write-Host "🔑 Generating application key..." -ForegroundColor Yellow
php artisan key:generate

Write-Host "🗄️  Setting up database..." -ForegroundColor Yellow
# Create SQLite database if it doesn't exist
if (!(Test-Path database/database.sqlite)) {
    New-Item -ItemType File -Path database/database.sqlite -Force
    Write-Host "✅ SQLite database created" -ForegroundColor Green
}

Write-Host "🔄 Running migrations..." -ForegroundColor Yellow
php artisan migrate

Write-Host "🌱 Running seeders..." -ForegroundColor Yellow
php artisan db:seed

Write-Host "🏗️  Building frontend assets..." -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "🎉 Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "🔐 Default admin login:" -ForegroundColor Cyan
Write-Host "   Email: admin@omahiot.com" -ForegroundColor White
Write-Host "   Password: password123" -ForegroundColor White
Write-Host ""
Write-Host "🚀 To start the application:" -ForegroundColor Cyan
Write-Host "   php artisan serve" -ForegroundColor White
Write-Host ""
Write-Host "📱 For development with hot reload:" -ForegroundColor Cyan
Write-Host "   Terminal 1: php artisan serve" -ForegroundColor White
Write-Host "   Terminal 2: npm run dev" -ForegroundColor White
Write-Host ""