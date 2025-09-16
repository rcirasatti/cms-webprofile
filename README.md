# CMS Web Profile

A modern Content Management System for company web profiles built with Laravel and React.js (Inertia.js).

## Features

- 🏠 **Landing Page Management**: Dynamic hero, about, portfolio, projects, clients, and contact sections
- 📝 **CMS Interface**: User-friendly admin panel for content management
- 📊 **Activity Logging**: Track all content changes with detailed audit trail
- 🎨 **Responsive Design**: Mobile-first design with Tailwind CSS
- 🔒 **Authentication**: Secure login system for admin access
- 📱 **Real-time Preview**: See changes instantly in the CMS
- 🚀 **Modern Stack**: Laravel 11 + React.js + Inertia.js + Vite

## Tech Stack

- **Backend**: Laravel 11, PHP 8.2+
- **Frontend**: React.js, Inertia.js, Tailwind CSS
- **Database**: MySQL/SQLite
- **Build Tool**: Vite
- **Authentication**: Laravel Breeze

## Installation

### Prerequisites

- PHP 8.2 or higher
- Composer
- Node.js 18+ and npm
- MySQL (or SQLite for development)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/rcirasatti/cms-webprofile.git
   cd cms-webprofile
   ```

2. **Install PHP dependencies**
   ```bash
   composer install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Environment setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Configure database** (edit `.env` file)
   ```env
   # For MySQL
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=cms_webprofile
   DB_USERNAME=root
   DB_PASSWORD=your_password
   
   # Or for SQLite (simpler for development)
   DB_CONNECTION=sqlite
   # Make sure database/database.sqlite exists
   ```

6. **Create database** (if using SQLite)
   ```bash
   touch database/database.sqlite
   ```

7. **Run migrations and seeders**
   ```bash
   php artisan migrate
   php artisan db:seed
   ```

8. **Build frontend assets**
   ```bash
   npm run build
   ```

9. **Start the development server**
   ```bash
   php artisan serve
   ```

## Default Login

After running seeders, you can login with:
- **Email**: admin@omahiot.com
- **Password**: password123

## Development

For development with hot reloading:

```bash
# Terminal 1: Start Laravel server
php artisan serve

# Terminal 2: Start Vite dev server
npm run dev
```

## CMS Sections

The CMS allows you to manage:

- **Hero Section**: Main banner with title, subtitle, background image
- **About Section**: Company information with features and experience
- **Portfolio**: Product/service showcases with images and descriptions
- **Projects**: Company projects with categories
- **Clients**: Client logos and information
- **Contact**: Contact information and details

## Database Structure

Main tables:
- `landing_page_contents` - Dynamic content storage
- `portfolios` - Portfolio items
- `projects` - Project listings
- `clients` - Client information
- `activities` - Activity logging
- `users` - Admin users

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
