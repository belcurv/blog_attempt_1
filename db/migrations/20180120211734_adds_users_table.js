exports.up = function(knex, Promise) {
    return Promise.all([

        knex.schema.createTable('users', (table) => {

            table.increments('id').primary();
            table.string('username').notNullable();
            table.string('password').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());

        })

    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users')
    ]);
};
