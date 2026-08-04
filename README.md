<div align="center">

<img src="assets/logo.jpeg" alt="DevCollab Logo" width="200" />

# DevCollab

**Internal team tool for profiles, chat, and task tracking with contribution tracking. Built as a team learning project practicing real GitHub workflows.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/Lodenix/devcollab?style=social)](https://github.com/Lodenix/devcollab)
[![GitHub forks](https://img.shields.io/github/forks/Lodenix/devcollab?style=social)](https://github.com/Lodenix/devcollab)
[![GitHub issues](https://img.shields.io/github/issues/Lodenix/devcollab)](https://github.com/Lodenix/devcollab/issues)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

</div>

---

## Overview

DevCollab is an internal team collaboration platform designed to streamline team workflows. It provides user profiles, real-time chat, task management, and contribution tracking—all built as a learning project to practice modern GitHub workflows and best practices.

This project is structured as a monorepo with a Next.js frontend and Node/Express backend, demonstrating scalable architecture patterns for internal tools.

## Features

- **User Profiles** — Manage team member profiles with roles and permissions
- **Real-time Chat** — Team communication with message history
- **Task Tracking** — Create, assign, and track tasks with status updates
- **Contribution Tracking** — Monitor team contributions and activity
- **Modern Stack** — Built with Next.js, Express, TypeScript, and PostgreSQL
- **Monorepo Structure** — Clean separation of frontend, backend, and shared code
- **CI/CD Ready** — GitHub Actions for automated testing and deployment

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14+, TypeScript, Tailwind CSS |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| Authentication | JWT (JSON Web Tokens) |
| Package Manager | npm workspaces |
| CI/CD | GitHub Actions |

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: use nvm)
- npm 9+
- PostgreSQL database
- Git

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Lodenix/devcollab.git
   cd devcollab
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   # Backend API
   cp apps/api/.env.example apps/api/.env
   # Edit apps/api/.env with your database credentials and JWT secret
   ```

4. **Start development servers**

   ```bash
   # From root - starts both web and api
   npm run dev

   # Or start individually
   npm run dev --workspace=apps/web
   npm run dev --workspace=apps/api
   ```

5. **Open in browser**

   - Frontend: [http://localhost:3000](http://localhost:3000)
   - API Health: [http://localhost:4000/health](http://localhost:4000/health)

## Project Structure

```
devcollab/
├── apps/
│   ├── web/              # Next.js frontend application
│   │   ├── src/          # Application source code
│   │   ├── public/       # Static assets
│   │   └── package.json
│   └── api/              # Express backend API
│       ├── src/
│       │   ├── routes/   # API route definitions
│       │   ├── controllers/  # Request handlers
│       │   ├── middleware/   # Authentication & validation
│       │   └── config/      # Configuration files
│       └── package.json
├── packages/
│   └── shared/           # Shared types and utilities
├── .github/
│   └── workflows/        # CI/CD pipelines
├── docs/                 # Project documentation
├── package.json          # Root package.json with workspaces
└── README.md
```

## Development

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start all development servers |
| `npm run dev --workspace=apps/web` | Start frontend only |
| `npm run dev --workspace=apps/api` | Start backend only |
| `npm run build` | Build all applications |
| `npm run lint` | Lint all codebases |
| `npm run test` | Run test suites |

### Branch Workflow

1. `main` — Production-ready code (protected)
2. `dev` — Development branch (default target for PRs)
3. Feature branches — Create from `dev` for new features

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request targeting `dev`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check endpoint |
| POST | `/api/auth/login` | User authentication |
| POST | `/api/auth/register` | User registration |
| GET | `/api/users` | List all users |
| GET | `/api/tasks` | List all tasks |
| POST | `/api/tasks` | Create a new task |

## Environment Variables

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/devcollab

# Authentication
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d

# Server
PORT=4000
NODE_ENV=development

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Roadmap

- [ ] User authentication and authorization
- [ ] Real-time chat with WebSockets
- [ ] Task management with drag-and-drop
- [ ] File sharing and attachments
- [ ] Activity dashboard and analytics
- [ ] Mobile responsive design
- [ ] Dark mode support
- [ ] Notification system

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

## Support

For support, email husseinyahaya640@gmail.com or open an issue on GitHub.

---

<div align="center">

**Built with ❤️ by the Lodenix Team**

[![GitHub](https://img.shields.io/badge/GitHub-Lodenix-181717?style=for-the-badge&logo=github)](https://github.com/Lodenix)

</div>