# CMS Web Profile

[![Laravel](https://img.shields.io/badge/Laravel-11-red.svg)](https://laravel.com)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-1.0-purple.svg)](https://inertiajs.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC.svg)](https://tailwindcss.com)
[![PHP](https://img.shields.io/badge/PHP-8.2+-777BB4.svg)](https://php.net)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

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

### Quick Setup (Recommended)

For fastest setup, use our automated setup scripts:

**Windows (PowerShell):**
```powershell
git clone https://github.com/rcirasatti/cms-webprofile.git
cd cms-webprofile
.\setup.ps1
```

**Linux/Mac (Bash):**
```bash
git clone https://github.com/rcirasatti/cms-webprofile.git
cd cms-webprofile
chmod +x setup.sh
./setup.sh
```

The setup script will automatically:
- Install PHP and Node.js dependencies
- Create `.env` file from template
- Generate application key
- Create SQLite database
- Run migrations and seeders
- Build frontend assets

### Manual Setup Instructions

If you prefer manual setup or the script doesn't work:

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
   
   # Or for SQLite (simpler for development) - DEFAULT
   DB_CONNECTION=sqlite
   # Create the database file (see step 6)
   ```

6. **Create database** (if using SQLite)
   ```bash
   # Linux/Mac
   touch database/database.sqlite
   
   # Windows PowerShell
   New-Item -ItemType File -Path database/database.sqlite -Force
   
   # Windows Command Prompt
   type nul > database\database.sqlite
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

### Troubleshooting

**Common Issues:**

1. **Permission denied on setup.sh**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **SQLite database creation fails**
   - Make sure `database/` folder exists
   - Create empty file manually: `touch database/database.sqlite`

3. **Composer install fails**
   - Make sure PHP 8.2+ is installed
   - Check composer requirements: `composer check-platform-reqs`

4. **npm install fails**
   - Make sure Node.js 18+ is installed
   - Try clearing cache: `npm cache clean --force`

## Default Login

After running seeders, you can login with:
- **Email**: admin@omahiot.com
- **Password**: password123

## Application URLs

Once the server is running (`php artisan serve`), you can access:

- **🏠 Landing Page**: http://localhost:8000
- **🔐 Admin Login**: http://localhost:8000/login
- **📊 CMS Dashboard**: http://localhost:8000/dashboard (after login)
- **🏗️ CMS Sections**:
  - Hero: http://localhost:8000/cms/hero
  - About: http://localhost:8000/cms/about
  - Portfolio: http://localhost:8000/cms/portfolio
  - Projects: http://localhost:8000/cms/projects
  - Clients: http://localhost:8000/cms/clients
  - Contact: http://localhost:8000/cms/contact

## What You Get

After successful setup, your application will have:

✅ **Landing Page** with sample content including:
- Hero section with call-to-action
- About section with company features
- Portfolio showcase (3 sample projects)
- Projects gallery
- Client logos section
- Contact information

✅ **Admin Panel** with:
- Real-time content editing
- Image upload functionality
- Activity logging (track all changes)
- User-friendly forms with validation
- Live preview of changes

✅ **Sample Data** including:
- IoT projects (Smart Koi Pond, Autofeeder, etc.)
- Company information
- Contact details
- Admin user account

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
- `landing_page_contents` - Dynamic content storage (key-value pairs by section)
- `portfolios` - Portfolio items with images, descriptions, and features
- `projects` - Project listings with categories
- `clients` - Client information and logos
- `activities` - Activity logging for audit trail
- `users` - Admin users with authentication

## Project Structure

```
├── app/
│   ├── Http/Controllers/
│   │   ├── CmsController.php      # Main CMS logic
│   │   └── Api/LandingPageController.php  # API for landing page
│   ├── Models/
│   │   ├── LandingPageContent.php # Dynamic content model
│   │   ├── Portfolio.php          # Portfolio model
│   │   ├── Project.php            # Projects model
│   │   ├── Client.php             # Clients model
│   │   └── Activity.php           # Activity logging
│   └── Services/
│       └── ActivityService.php    # Activity logging service
├── resources/
│   ├── js/
│   │   ├── Pages/
│   │   │   ├── LandingPage.jsx    # Public landing page
│   │   │   ├── Dashboard.jsx      # Admin dashboard
│   │   │   └── CMS/               # CMS pages
│   │   │       ├── Hero/
│   │   │       ├── About/
│   │   │       ├── Portfolio/
│   │   │       ├── Project/
│   │   │       ├── Client/
│   │   │       └── Contact/
│   │   └── Components/
│   │       ├── sections/          # Landing page sections
│   │       └── ui/                # Reusable UI components
│   └── css/
├── database/
│   ├── migrations/                # Database migrations
│   └── seeders/                   # Sample data seeders
└── routes/
    ├── web.php                    # Web routes
    └── api.php                    # API routes
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
