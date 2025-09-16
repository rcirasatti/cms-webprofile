# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-16

### Added
- Initial release of CMS Web Profile
- Landing page with dynamic content management
- Admin dashboard with authentication
- Content management for all major sections:
  - Hero section with background image upload
  - About section with features and company info
  - Portfolio management with image upload
  - Projects showcase with categories
  - Clients section with logo management
  - Contact information management
- Activity logging system for audit trail
- Real-time preview in CMS
- Responsive design with Tailwind CSS
- Setup scripts for easy installation (Windows & Linux/Mac)
- Comprehensive documentation
- Database migrations and seeders with sample data
- RESTful API for landing page data

### Technical Features
- Laravel 11 backend with Inertia.js
- React 18 frontend with modern hooks
- SQLite/MySQL database support
- Vite build system
- Image upload and management
- Form validation and error handling
- Activity tracking with old/new value comparison
- Clean and maintainable code structure

### Database Schema
- `users` - Admin authentication
- `landing_page_contents` - Dynamic content storage
- `portfolios` - Portfolio items
- `projects` - Project listings
- `clients` - Client information
- `activities` - Activity logging

### Default Data
- Admin user (admin@omahiot.com / password123)
- Sample portfolio projects (Smart Koi Pond, Autofeeder, etc.)
- Company information and contact details
- Client logos and project showcase

### Setup & Deployment
- Automated setup scripts
- Environment configuration templates
- Production-ready build process
- Clean migration system
- Comprehensive README with troubleshooting

## [Unreleased]

### Planned
- Multi-language support
- Advanced image optimization
- Bulk content operations
- Advanced user roles and permissions
- Content versioning
- SEO optimization features
- Analytics integration