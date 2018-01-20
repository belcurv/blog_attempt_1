exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('topics', (table) => {
            table.increments('id').primary();
            table.string('topic').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        }),

        knex.schema.createTable('posts', (table) => {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.text('body').notNullable();
            table.integer('views').defaultTo(0);
            table.integer('likes').defaultTo(0);
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        }),

        // create join table for many-to-many between posts and topics
        knex.schema.createTable('topics_posts', (table) => {
            table.increments('id').primary();
            table.integer('post_id').references('id').inTable('posts');
            table.integer('topic_id').references('id').inTable('topics');
            table.timestamp('created_at').defaultTo(knex.fn.now());
            table.timestamp('updated_at').defaultTo(knex.fn.now());
        })
    ]);



};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('topics_posts'),
        knex.schema.dropTable('posts'),
        knex.schema.dropTable('topics')
    ]);
};
