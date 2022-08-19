## Composteam backend - NestJS

[EN] Collective composting management site..
[FR] Site de gestion de compostage collectif.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Migration (Refactoring needed)

```bash
# Empty migration file creation
$ pnpm run migration:create ./src/migrations/MigrationFile  

# Auto-generated migration file creation (detects changes from src entities)
$ pnpm run migration:generate ./src/migrations/MigrationFile

# Migrations run
$ pnpm run migration:run
```