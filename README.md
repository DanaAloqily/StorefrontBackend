# StorefrontBackend

Building a backend API in Nodejs for a storefront, by creating REST APIs that the frontend developer will use to integrate the backend with the fronend

The database schema and and API endpoint route info are mentioned in the [REQUIREMENT.md]

### Installing

run the following commands

-to install the projects packages/dependencies

""" npm run install """

# Database setup

Create DB

- connect to the default postgres database as the server's root user `psql -U postgres`
- In psql run the following to create a user
  - `CREATE USER postgres WITH PASSWORD 'Dev29499';`
- In psql run the following to create the dev and test database
  - `CREATE DATABASE storefront_dev;`
  - `CREATE DATABASE storefront_test;`
- Connect to the databases and grant all privileges
  - Grant for dev database
    - `\c storefront_dev`
    - `GRANT ALL PRIVILEGES ON DATABASE storefront_dev TO postgres;`
  - Grant for test database
    - `\c storefront_test`
    - `GRANT ALL PRIVILEGES ON DATABASE storefront_test TO postgres;`

### Migrate Database

Navigate to the root directory and run the command below to migrate the database
`db-migare up`

### Setup environment

## .env

create a '.env' file with all required env variables

POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=storefront_dev
POSTGRES_DB_TEST=storefront_test
POSTGRES_USER=postgres
POSTGRES_PASSWORD=Dev29499

BCRYPT_PASSWORD=Akvk
SALT_ROUNDS=10
TOKEN_SECRET=cardigan

# Envioremnet

NODE_env = dev

## Start App

run the followin command to start the app
`npm run dev`

### Running Ports

After start up, the server will start on port `3000` and the database on port `5432`

## Endpoint Access

All endpoints are described in the [REQUIREMENT.md](REQUIREMENTS.md) file.

## Token and Authentication

Tokens are passed along with the http header as

```
Authorization   Bearer <token>

// for token testing, token in postman must be same as token created for the same user (id)

```

## Testing

Run test with

`npm run test`
