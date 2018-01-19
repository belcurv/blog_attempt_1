exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('topics').del()
        .then(function() {
            // Inserts seed entries
            return knex('topics').insert([
                {
                    id: 1,
                    topic: 'jQuery'
                },
                {
                    id: 2,
                    topic: 'JavaScript'
                },
                {
                    id: 3,
                    topic: 'es2015'
                },
                {
                    id: 4,
                    topic: 'Vue.js'
                },
                {
                    id: 5,
                    topic: 'Node.js'
                },
                {
                    id: 6,
                    topic: 'Express'
                },
                {
                    id: 7,
                    topic: 'GraphQL'
                },
                {
                    id: 8,
                    topic: 'REST'
                },
                {
                    id: 9,
                    topic: 'Promises'
                },
                {
                    id: 10,
                    topic: 'MongoDB'
                },
                {
                    id: 11,
                    topic: 'Mongoose'
                },
                {
                    id: 12,
                    topic: 'Postgres'
                }

            ]);
        });
};
