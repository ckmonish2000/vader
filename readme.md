# Vader

This project was originally an idea to simplify debugging and environment validation for developers and teams. After some brainstorming, we settled on the name **Vader**—not just because it sounds cool, but because it brings order to the chaos of debugging environments.

Vader is a **self-hostable, open-source tool** for automating **environment checks, system inspections, and debugging workflows**. The goal is to help developers and teams quickly verify their setup and generate structured logs without manual intervention.

With Vader, senior engineers can **define diagnostic scripts**, and junior engineers or contributors can execute them with a single command to **collect system information, validate dependencies, and debug faster**.

Video demo here: [Vader Demo](https://www.loom.com/share/bbe81b692a2640a8b09f5991efbb1460?sid=77df57e0-ed35-452d-9027-4d0d2bae70cb)

## Features

- Help developers quickly diagnose and verify their local environments.
- Reduce back-and-forth debugging by generating structured reports.
- Automate environment validation with custom, reusable scripts.
- Assist open-source maintainers by ensuring bug reports contain necessary system details.

## Run Locally

### Requirements

- **Node.js** version 16.13 or newer
- A **database**. Vader supports [PostgreSQL](https://www.postgresql.org/)
- Vader requires `pnpm` to be installed if not already present. Can be done with:
  ```bash
  npm i -g pnpm
  ```

### Installation Steps

Clone the project:

```bash
git clone https://github.com/ckmonish2000/Vader.git
```

Go to the project directory:

```bash
cd Vader
```

Install dependencies:

```bash
pnpm install
```

Set up your environment variables:

```bash
cp .env.example .env
```

### Backend Run Instructions

1. Navigate to the backend package:

```bash
cd packages/backend
```

2. Run database migrations:

```bash
npx prisma migrate dev
```

3. Run the seed script:

```bash
pnpm run seed
```

4. Start the backend server:

```bash
pnpm run dev
```

### Frontend Run Instructions

1. In a new terminal, navigate to the dashboard package:

```bash
cd packages/dashboard
```

2. Start the development server:

```bash
pnpm run dev
```

## CLI Usage

Vader provides a CLI tool to run predefined scripts.

1. **Run a script**:

```bash
vader run <script-name>
```

2. **List available scripts**:

```bash
vader help
```

3. **Export logs to a file**:

```bash
vader run <script-id>
```

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file. You can do so using the `.env.example` file already present by running:

```bash
cp .env.example .env
```

## Contributing

Contributions are always welcome!

We'd love help improving the dashboard UI, adding more diagnostic commands, or optimizing the CLI tool. If you're interested in contributing, please check out the issues tab and open a PR.

## License

Vader is licensed under the **AGPL-3.0 / Business Source License (BUSL-1.1)**, ensuring that while it's open-source, commercial exploitation by cloud providers is restricted.

[AGPL-3.0](https://www.gnu.org/licenses/agpl-3.0.html) / [BUSL-1.1](https://mariadb.com/bsl11/)
