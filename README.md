# Clean Nextjs Starter App

A modern, full-stack todo application built with Next.js 15, implementing Clean Architecture principles with TypeScript, authentication, and a robust testing suite.

![Todo App Screenshot](./docs/screenshot.png)

## 🚀 Features

- **Clean Architecture** - Separation of concerns with proper dependency inversion
- **Authentication** - Secure user registration and login with Better-Auth
- **Todo Management** - Create, toggle, soft delete, hard delete, and archive todos
- **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- **Type Safety** - Full TypeScript implementation
- **Testing Suite** - Unit, integration, e2e, and load testing
- **Database** - PostgreSQL with Drizzle ORM
- **Code Quality** - ESLint, Prettier, Husky, and lint-staged pre-commit hooks

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.17 or later)
- **npm** (v9.0 or later) or **pnpm** (recommended)
- **Docker** and **Docker Compose** (for local database)
- **Git** (for version control)

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kyle-hensman/clean-nextjs-starter-app.git
cd clean-nextjs-starter-app
```

### 2. Install Dependencies

```bash
# Using npm
npm install

# Using pnpm (recommended)
pnpm install
```

### 3. Environment Setup

Copy the environment variables and configure them:

```bash
cp .env.sample .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL=postgresql://postgresUser:postgresPassword@localhost/postgresDatabase

# Better Auth
BETTER_AUTH_SECRET=super_secret_string
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Start the Database

```bash
# Start PostgreSQL with Docker Compose
docker-compose up -d

# Verify the database is running
docker-compose ps
```

### 5. Database Migration and Seeding

```bash
# Generate and run migrations
pnpm db:generate
pnpm db:migrate

# Seed the database (optional)
pnpm db:seed

# Clear database and delete container (optional)
pnpm db:reset
```

### 6. Start the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Application Architecture

This application follows **Clean Architecture** principles with clear separation of concerns:

### Architecture Flow

1. **User Interaction** → User clicks a button in the React/Next.js frontend
2. **Server Action** → Button triggers Next.js server action with dependency injection
3. **Controller** → Controller handles authorization via Better-Auth and calls use cases
4. **Use Cases** → Business logic with dependency inversion using @evyweb/ioctopus
5. **Repository** → Data access layer communicating with PostgreSQL via Drizzle
6. **Response Mapping** → Data is shaped specifically for frontend consumption

### Project Structure

```
📁 clean-nextjs-starter-app/
├── 📁 app/                          # Next.js App Router (Framework Layer)
│   ├── 📁 (auth)/                   # Authentication routes
│   ├── 📁 dashboard/                # Protected dashboard routes
│   ├── 📁 api/                      # API routes
│   └── layout.tsx                   # Root layout
├── 📁 src/                          # Clean Architecture Core
│   ├── 📁 application/              # Use Cases & Business Logic
│   │   ├── 📁 repositories/
│   │   ├── 📁 services/
│   │   └── 📁 use-cases/
│   ├── 📁 infrastructure/           # External Concerns
│   │   ├── 📁 repositories/
│   │   └── 📁 services/
│   ├── 📁 interface-adapters/       # Controllers & Presenters
│   │   └── 📁 controllers/
│   └── 📁 entities/                 # Domain Models
├── 📁 tests/                        # Testing Suite
│   ├── 📁 unit/                     # Unit tests
│   ├── 📁 integration/              # Integration tests
│   └── 📁 e2e/                      # End-to-end tests
├── 📁 loadtests/                    # Artillery.io load tests
└── 📁 docs/                         # Documentation assets
```

### Key Differences: `app/` vs `src/`

**`app/` Directory (Next.js Framework Layer)**
- Contains only Next.js specific files and routing
- Pages, layouts, API routes, and middleware
- Framework-dependent code that handles HTTP requests/responses
- Should remain thin and delegate business logic to `src/`

**`src/` Directory (Clean Architecture Core)**
- Framework-agnostic business logic and domain models
- Can be easily ported to other frameworks or platforms
- Contains the core application logic following Clean Architecture patterns
- Independent of external frameworks and libraries

## 🗄️ Database Setup

### Local Development with Docker

The project includes a `docker-compose.yml` file for easy local PostgreSQL setup:

```yaml
services:
  db:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_USER: postgresUser
      POSTGRES_PASSWORD: postgresPassword
      POSTGRES_DB: postgresDatabase
    ports:
      - "5432:5432"
    volumes:
      - db_data:/var/lib/postgresql/data

volumes:
  db_data:
```

### Drizzle ORM Commands

```bash
# Generate migration files
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database with sample data
pnpm db:seed

# Open Drizzle Studio (database browser)
pnpm db:studio

# Reset database (drop all tables)
pnpm db:reset

# Create database backup
pnpm db:backup

# Restore from backup
pnpm db:restore backup.sql
```

### Manual Database Operations

```bash
# Connect to database via CLI
docker exec -it clean-nextjs-starter-app_postgres_1 psql -d $DATABASE_URL

# Export database schema
pg_dump -d $DATABASE_URL --schema-only > schema.sql

# Export data only
pg_dump -d $DATABASE_URL --data-only > data.sql
```

## 🏗️ Build & Deploy

### Development Build

```bash
# Run development server
pnpm dev

# Run with debugging
DEBUG=* pnpm dev
```

### Production Build

```bash
# Create production build
pnpm build

# Test production build locally
pnpm start
```

### Deployment Options

**Vercel (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod
```

**Docker Deployment**
```bash
# Build Docker image
docker build -t clean-nextjs-starter-app .

# Run container
docker run -p 3000:3000 clean-nextjs-starter-app
```

**Environment Variables for Production**
- Set `DATABASE_URL` to your production PostgreSQL connection string
- Configure `BETTER_AUTH_SECRET` with a secure random string
- Update `BETTER_AUTH_URL` to your production domain

## 🧪 Testing

This project includes a comprehensive testing strategy with four types of tests:

### Test Types

1. **Unit Tests** (`tests/unit/`)
   - Test individual functions and components in isolation
   - Mock all external dependencies
   - Fast execution and reliable feedback

2. **Integration Tests** (`tests/integration/`)
   - Test interactions between multiple components
   - Test database operations with test database
   - Verify use cases work with real repositories

3. **End-to-End Tests** (`tests/e2e/`)
   - Test complete user workflows
   - Uses Playwright for browser automation
   - Tests authentication flows and todo operations

4. **Load Tests** (`loadtests/`)
   - Performance testing with Artillery.io
   - Test API endpoints under various loads
   - Measure response times and throughput

### Running Tests

```bash
# Run all tests
pnpm test

# Run unit tests only
pnpm test:unit

# COMING SOON
# # Run integration tests
# pnpm test:integration

# COMING SOON
# # Run e2e tests
# pnpm test:e2e

# COMING SOON
# # Run load tests
# pnpm test:load

# Generate test coverage report
pnpm test:coverage

# COMING SOON
# # Run tests with UI (for debugging)
# pnpm test:ui
```

### Test Configuration

The project uses:
- **Vitest** - Fast unit testing framework
- **Playwright** - End-to-end testing
- **Artillery.io** - Load testing
- **Mock repositories** - For isolated unit testing

## 📦 Package Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint errors

# Database
pnpm db:generate      # Generate migrations
pnpm db:migrate       # Run migrations
pnpm db:seed          # Seed database
pnpm db:studio        # Open Drizzle Studio
pnpm db:reset         # Reset database

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
# pnpm test:integration # Run integration tests
# pnpm test:e2e         # Run e2e tests
# pnpm test:load        # Run load tests

# Code Quality
pnpm prepare          # Setup Husky hooks
# pnpm check-types      # Check TypeScript types
# pnpm check-format     # Check Prettier formatting
# pnpm check-lint       # Check ESLint rules
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Server-side API
- **Better-Auth** - Authentication solution
- **Drizzle ORM** - Type-safe database toolkit
- **PostgreSQL** - Relational database
- **@evyweb/ioctopus** - Dependency injection

### Development & Testing
- **Vitest** - Unit testing framework
- **Playwright** - E2E testing
- **Artillery.io** - Load testing
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **lint-staged** - Run linters on staged files

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Pre-commit Hooks

The project uses Husky and lint-staged to run checks before each commit:
- TypeScript type checking
- ESLint code linting
- Prettier code formatting
- Unit tests execution

## 🙏 Acknowledgments

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) by Robert C. Martin
- [Next.js](https://nextjs.org/) for the amazing React framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Drizzle ORM](https://orm.drizzle.team/) for the excellent TypeScript ORM

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or reach out to the maintainers.

---

**Happy coding! 🚀**