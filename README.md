# SQL AI

SQL AI is a full-stack developer tool that turns plain-English questions into production-ready SQL, then wraps that capability in a polished web app, a VS Code extension, and a deployment pipeline that is ready to move beyond a demo.

This project is where I wanted to show more than "I can call an LLM API." It demonstrates product design, backend engineering, authentication, caching, rate limiting, testing, infrastructure-as-code, and developer experience in one system.

## Why This Project Stands Out

- Built a complete AI feature, not just a prototype: prompt-to-SQL generation, explanations, performance hints, history, auth, caching, and usage controls.
- Designed for real usage patterns: JWT auth, request validation, per-user query history, daily quotas, cache-first query handling, and email notifications.
- Shipped across multiple surfaces: a React web app for end users and a VS Code extension for developer workflows.
- Extended into DevOps: Terraform provisions cloud services, and Ansible automates server setup for repeatable deployment.

## What It Does

Users can describe the data they want in natural language, choose a SQL dialect, and receive:

- the generated SQL query
- a plain-English explanation
- performance-oriented hints when relevant

The platform also keeps a query history, caches repeated requests, protects the API with auth and middleware, and alerts users as they approach daily usage limits.

## Architecture

### Frontend

- React + Vite SPA
- Login, signup, dashboard, and query history views
- Token-based session handling via `localStorage`
- Fast interaction flow for prompting, result review, and SQL copy-to-clipboard

### Backend

- Node.js + Express API
- Prisma ORM with PostgreSQL
- Zod request validation
- JWT authentication
- Upstash Redis caching
- groq integration for SQL generation
- Resend-powered transactional emails
- Arcjet middleware for request protection

### VS Code Extension

- Custom sidebar webview
- Query generation without leaving the editor
- Local query history inside the extension UI
- Dialect-aware workflow designed for developers

### Infrastructure

- Docker Compose for local Postgres + Redis
- Terraform for provisioning Railway, Neon, and Upstash resources
- Ansible for Linux server configuration, Nginx, PM2, SSL, and firewall setup

## Technical Highlights

### AI orchestration

The backend uses a structured system prompt and response parser so the model returns SQL, explanation text, and performance hints in a predictable format. That keeps the AI feature usable inside an actual product instead of as a loose text-generation demo.

### Cache-first query pipeline

Repeated prompts are hashed into deterministic Redis keys using prompt + dialect + schema. Cached results are returned quickly and still persisted into query history, which improves responsiveness while preserving user activity.

### Usage controls

The app tracks per-user daily query counts in PostgreSQL, enforces a hard daily cap, and sends a usage alert when a user reaches 80% of the allowed limit. This is the kind of operational thinking AI products need once people actually start using them.

### Defensive backend design

Input validation is enforced with Zod, routes are protected with JWT middleware, and the API includes dedicated auth, query, health, and history endpoints with clear separation of concerns.

### End-to-end product scope

This repo is intentionally broader than a single app screen:

- user-facing web product
- developer-facing editor extension
- tested backend services
- deployable infrastructure

That combination reflects the kind of ownership I like to take on projects.

## Data Model

The Prisma schema centers around three core models:

- `User` for authentication and ownership
- `QueryHistory` for storing generated SQL requests and outputs
- `UsageLog` for daily quota tracking

This gives the product clean support for user isolation, observability, and feature expansion.

## API Surface

Main backend routes:

- `POST /auth/register`
- `POST /auth/login`
- `GET /health`
- `GET /history/history`
- `DELETE /history/:id`
- `POST /query/query`

## Testing

The backend includes Jest + Supertest coverage for:

- registration and login flows
- duplicate-account handling
- auth-protected query access
- validation failures
- successful SQL generation responses

This was important to me because AI features still need conventional software reliability around them.

## Local Setup

### 1. Install dependencies

From the repo root:

```bash
npm install
```

For the React frontend:

```bash
cd frontend
npm install
```

### 2. Start local services

```bash
docker-compose up -d
```

This starts:

- PostgreSQL on `5432`
- Redis on `6379`

### 3. Configure environment variables

You will need environment files for the backend and frontend.

Backend values typically include:

```env
PORT=3000
DATABASE_URL=...
JWT_SECRET=...
GROQ_API_KEY=...
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
RESEND_API_KEY=...
RESEND_FROM_EMAIL=...
```

Frontend values typically include:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Run the backend

```bash
npm run dev:backend
```

### 5. Run the frontend

```bash
cd frontend
npm run dev
```

### 6. Run tests

```bash
npm test
```

## Build Commands

Backend and extension build from the repo root:

```bash
npm run build
```

Extension watch mode:

```bash
npm run dev:extension
```

## Deployment Story

This project includes the pieces needed for a realistic deployment path:

- `infra/terraform` provisions managed database, cache, and app infrastructure
- `infra/ansible` automates server hardening and runtime setup
- Railway is used for application hosting
- Neon provides Postgres
- Upstash provides Redis

I wanted the repo to reflect an engineer who can build the feature, ship the service, and think about operations too.

## Skills Demonstrated

- Full-stack application architecture
- AI feature integration with structured outputs
- Authentication and route protection
- Database design with Prisma + PostgreSQL
- Caching and performance optimization
- API validation and backend safeguards
- Developer tooling via VS Code extension APIs
- Automated testing with Jest and Supertest
- Infrastructure as code with Terraform
- Environment and server automation with Ansible

## What I'd Improve Next

- add schema-aware prompting directly from connected databases
- support more SQL dialects and query linting
- add streaming or incremental AI responses
- improve observability with structured logs and metrics
- expand test coverage around caching and quota edge cases

## Repo Structure

```text
sqlai/
|-- backend/      # Express API, Prisma schema, tests, AI + cache services
|-- frontend/     # React web app
|-- extension/    # VS Code extension + webview UI
|-- infra/        # Terraform and Ansible deployment automation
`-- docker-compose.yml
```

## Closing Note

SQL AI represents the kind of projects I enjoy most: products that sit at the intersection of AI, developer experience, and production-minded engineering. The goal was to build something that feels useful, opinionated, and technically complete enough to show how I think across the stack.
