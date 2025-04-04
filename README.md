# Fullstack Car list demo w/ Next.js and prisma</h1>

<p align="center">
 Basic CRUD for car list
</p>

<p align="center">
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#clone-and-run-locally"><strong>Clone and run locally</strong></a> ·
  <a href="#testing"><strong>Testing</strong></a> ·
  <a href="#tech-stack"><strong>Tech stack</strong></a> ·
  <a href="#project-structure"><strong>Project Structure</strong></a> ·
  <a href="#feedback-and-issues"><strong>Feedback</strong></a>
<br/>

## Features
![Screen Recording GIF (3)](https://github.com/user-attachments/assets/8747f508-d931-40ce-8137-0a2a6f73abd5)

- Display car list
- New Car Data
- Update Car Data
- Delete Car Data by car_id

- fully responsive

![Screen Recording GIF (4)](https://github.com/user-attachments/assets/7e449fd7-eb88-413e-a1ec-f8422387d3fb)

## Clone and run locally

### Prerequisites

you’ll need the following installed on your machine:

- Node.js - https://nodejs.org
- Git version control - https://git-scm.com/
- Docker desktop - https://www.docker.com/get-started
- Package manager such as npm or pnpm

### Getting Started

#### With Docker

1. Clone the repo and rename `.env.example` in root to `.env.prod`, and rename `.env.example` in `client/` and `server/` to `.env`

2. Everything else are already handled by `Makefile`. run this command on root

   ```bash
   make run-docker-build
   ```

3. It will start client on port 3000, server on port 8000, and prisma studio on port 5555

#### Without Docker

you will need PostgresQL installed on your machine

1. Clone the repo and rename `.env.example` in `client/` and `server/` to `.env`

2. Change `DATABASE_URL` in server `.env` to match your postgresql connection string

3. Clone the repo and install dependencies by running this command on root

   ```bash
   make setup
   ```

   this will install dependencies for both client and server

4. then run the following:

   ```
   make run-dev-client
   make run-dev-server
   ```

   this will start client on port 3000, server on port 8000

5. If you want to run prisma studio to manually manage the database, run

   ```bash
   make run-prisma-studio
   ```

   this will start prisma studio on port 5555

## Testing endpoints

only cover APIs test at this moment.

run

```bash
make test-api
```

## Tech Stacks

- [NextJS](https://nextjs.org/) <img src="https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  - App Router
  - Client
  - Server
- [Express](https://expressjs.com/) for Backend server<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" />
- [Prisma](https://www.prisma.io/) as ORM <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" />
- [Tailwind CSS](https://tailwindcss.com) for styling <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
- [shadcn/ui](https://ui.shadcn.com/) for basic component <img src="https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white" />

## Project-structure

```
📦 /client
 +- 📂 src/                   # application layer containing:
 |  +-- 📂 app/               # pages Router
 |  |   |
 |  |   +- 📄 page.tsx/       # pages Router
 |  |   +- 📄 globals.css     # CSS variable setup for Tailwind
 |  |   +- 📄 app.tsx         # main application component
 |  |   +- 📄 layout.tsx      # main layout
 |  |
 |  +-- 📂 components/        # shared components used across the entire application
 |  +-- 📂 lib/               # reusable libraries preconfigured for the application
 |  +-- 📂 service/           # shared service used across the application
 |  +-- 📂 type/              # shared types used across the application
 |
 +-- 📂 public/               # static assets (images, favicon, etc.)
 +-- 📄 next.config.ts        # Next.js configuration
 +-- 📄 package.json          # dependencies and scripts
 +-- 📄 tsconfig.json         # typescript configuration
```

```
📦 /server
 +- 📂 generated/                   # primsa generated database client
 +- 📂 prisma/                      # primsa
 |  |
 |  +-- 📂 migrations/              # DB migration
 |  +-- 📄 schema.prisma            # schema file
 |
 +- 📂 src/                         # MVC
 |  |
 |  +-- 📂 cars/
 |      |
 |      +- 📄 cars.controller.ts/   # controller
 |      +- 📄 cars.model.ts         # model
 |      +- 📄 cars.routes.ts        # routes
 |
 +-- 📄 index.ts                    # entries
 +-- 📄 package.json                # dependencies and scripts
 +-- 📄 tsconfig.json               # typescript configuration
```

## Feedback and issues

Please open issues or send feedback to nattawat.arch@gmail.com
