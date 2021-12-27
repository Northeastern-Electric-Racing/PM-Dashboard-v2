# Onboarding

## Project Setup

First, ensure that you have [Node.js](https://nodejs.org/en/) installed.

[Clone the repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository), potentially using `git clone` in your preferred CLI to pull the project down to your computer.

Familiarize yourself with [common git commands](https://education.github.com/git-cheat-sheet-education.pdf), [CLI commands](https://www.w3schools.com/whatis/whatis_cli.asp), and [what Git is](https://www.atlassian.com/git/tutorials/what-is-git) if you aren't already.

In your CLI, navigate to the folder for the project and run `npm install` to instruct [npm](https://www.npmjs.com/about) to install all neccessary packages.

## Database

### Installation

The easiest way to install [PostgreSQL](https://www.postgresql.org) on a Mac is with [Postgres.app](https://postgresapp.com).
Alternative OS installs can be found [here](https://www.postgresql.org/download/).

### Database Initialization

After downloading and installing PostgreSQL properly, you'll need to run PostgreSQL and create a database named `nerpm`.
By default, PostgreSQL typically has a `postgres` database.
You can use `psql` in the CLI to create a database by running this SQL statement: `CREATE DATABASE nerpm;`.
Naming the new database `nerpm` will ensure it matches with the database URL specified in the project preparation section below.

### Project Preparation

Add a `.env` file to the project root directory via `touch .env` in the CLI or creating a file in your IDE.
Paste the following line into the `.env` file and replace `<USERNAME>` with your computer username.
`DATABASE_URL="postgresql://<USERNAME>:@localhost:5432/nerpm?schema=public"`

To test that things are working, run `npm run start` in the CLI and go to an example API route.
Example: `localhost:3000/.netlify/functions/users`.

If the above line in the `.env` file does not work, replace the line with the following and change `<PASSWORD>` to your `postgres` database password.
`DATABASE_URL="postgresql://postgres:<PASSWORD>@localhost:5432/nerpm?schema=public"`

## IDE: VSCode

Turn on `format on save` for Prettier.
Go to `Code > Preferences > Settings` (or via `cmd ,` on Mac) (or `File > Preferences > Settings` for Windows).
Search for `format on save` and make sure `Editor: Format On Save` is checked / yes.

Open settings and search for `open settings json`.
Click `Edit in settings.json` under the `[JSON] Configure settings to be overridden for [json] language` section.
Paste this into `settings.json`:

```json
"[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
},
"[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

Below are extensions for VSCode that might make your developer experience more enjoyable.
Only the starred ones are optional.

- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest) (`orta.vscode-jest`)
- [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) (`prisma.prisma`)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) (`dbaeumer.vscode-eslint`)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) (`esbenp.prettier-vscode`)
- [Babel\*](https://marketplace.visualstudio.com/items?itemName=mgmcdermott.vscode-language-babel) (`mgmcdermott.vscode-language-babel`)
- [Material Icon Theme\*](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme) (`pkief.material-icon-theme`)
