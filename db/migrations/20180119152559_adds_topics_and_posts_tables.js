exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('topics', (table) => {
            table.increments();
            table.string('topic').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('posts', (table) => {
            table.increments();
            table.string('title').notNullable();
            table.text('body').notNullable();
            table.integer('views').defaultTo(0);
            table.integer('likes').defaultTo(0);
            table.specificType('topics', 'jsonb[]');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    ]);



};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('posts'),
        knex.schema.dropTable('topics')
    ]);
};
