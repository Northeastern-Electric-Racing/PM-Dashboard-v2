# Prisma Migration Tools

## `npm prisma:seed`

### What it does

This command seeds the database, which means populating the database with initial data it requires to run.
It can be dummy data, basic user accounts, a default language, etc.

### Why to use it

While developing the application, we need some data to be present in order for something to appear on the front end to interact with. Running this command populates the database with a basic set of data for development purposes.

For more detailed information about [prisma seed](https://www.prisma.io/docs/guides/database/seed-database), click the link.

## `npm prisma:reset`

### What it does

This command drops the database if possible or performs a soft reset if the database cannot be deleted.
If the database is dropped, it creates a new database with the same name and runs all migrations and seed scripts.
If `npm prisma:reset` runs without any errors, then the `npm prisma:seed` function is auto-invoked, meaning you do not need to run the `npm prisma:seed` command again.

### Why to use it

If you need to undo manual changes or if there are migration history conflicts, you should run this command.

You use this command to also restore the data to its original state if you sufficiently modified the data in the front end.

For more detailed information about [prisma reset](https://www.prisma.io/docs/concepts/components/prisma-migrate), click the link.

## `npm prisma:migrate`

### What it does

This command enables you to keep your database schema in sync with the prisma schema.

### Why to use it

After you make a change to the prisma schema, you should run this function to update the database schema.
Each time you run this command, it generates an SQL file that is added to the `migrations` folder.

For more detailed information about [prisma migrate](https://www.prisma.io/docs/concepts/components/prisma-migrate), click the link.

## `npm prisma:generate`

### What it does

This command generates and initializes the prisma client.
The prisma client is an auto-generated library that allows us to access data in our application.

Note: The command `npm install` will automatically run `npm prisma:generate`.

### Why to use it

After changes are made to the prisma schema, you need to run this function to update the prisma client.

For more detailed information about [prisma generate](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client), click the link.
