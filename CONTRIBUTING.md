# Contributing to CMS Web Profile

Thank you for considering contributing to CMS Web Profile! This document provides guidelines for contributing to this project.

## Development Setup

1. Follow the installation instructions in [README.md](README.md)
2. Create a new branch for your feature: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test your changes thoroughly
5. Commit with descriptive messages
6. Push and create a Pull Request

## Code Style

### PHP (Laravel)
- Follow PSR-12 coding standards
- Use meaningful variable and method names
- Add docblocks for classes and complex methods
- Keep methods focused and small

### JavaScript/React
- Use functional components with hooks
- Follow React best practices
- Use descriptive component and variable names
- Keep components small and focused

### Database
- Use descriptive migration names
- Include both up() and down() methods
- Use appropriate data types and constraints
- Add indexes for frequently queried columns

## Testing

Before submitting a PR:
- Test all CMS functionality
- Verify landing page displays correctly
- Check responsive design on mobile/tablet
- Test with fresh database migration/seeding

## Commit Guidelines

Use conventional commit messages:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example: `feat: add portfolio image upload functionality`

## Pull Request Process

1. Update documentation if needed
2. Add tests for new features
3. Ensure all tests pass
4. Update CHANGELOG.md if applicable
5. Request review from maintainers

## Reporting Issues

When reporting issues:
- Use clear, descriptive titles
- Include steps to reproduce
- Provide environment details (PHP/Node versions)
- Include error messages and logs
- Attach screenshots if relevant

## Questions?

Feel free to open an issue for questions or discussions about the project.