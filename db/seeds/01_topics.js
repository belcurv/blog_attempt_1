exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('topics').del()
        .then(function() {
            // Inserts seed entries
            return knex('topics').insert([
                {
                    topic: 'jQuery'
                },
                {
                    topic: 'JavaScript'
                },
                {
                    topic: 'es2015'
                },
                {
                    topic: 'Vue.js'
                },
                {
                    topic: 'Node.js'
                },
                {
                    topic: 'Express'
                },
                {
                    topic: 'GraphQL'
                },
                {
                    topic: 'REST'
                },
                {
                    topic: 'Promises'
                },
                {
                    topic: 'MongoDB'
                },
                {
                    topic: 'Mongoose'
                },
                {
                    topic: 'Postgres'
                }

            ]);
        });
};
