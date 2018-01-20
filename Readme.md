### A Blog, Hopefully

*What's this?*

My attempt to put together an API for storing and retrieving blog posts, as well as a client SPA to consume it.

The back-end is your average Node/Express RESTful API. Postgres + KnexJS handle database calls.

The front-end will be a pure javascript single page application with routing and possibly a state container, depending on whether a case can be made for adding one.

*How to use this*

You'll need a `.env` file. It should contain your database credentials. For example:

```
DATABASE_USER=yourname
DATABASE_PASSWORD=yourpassword
DATABASE_NAME=yourdatabasename
```

You'll need Postgres installed on your machine. And a database to work with.

```
$ createdb <yourdatabasename>
```

You will probably need to add/update your user role password in the new database. Open `psql` shell and:

```
# ALTER USER <yourname> PASSWORD 'newPassword';
```

You'll need **KnexJS** installed globally to use the CLI - we use the CLI for running migrations.

```
$ knex migrate:latest
```

Then run the seed files (which I haven't written yet :) )...
