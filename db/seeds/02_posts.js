exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('posts').del()
        .then(function() {
            // Inserts seed entries
            return knex('posts').insert([
                {
                    id: 1,
                    title: 'Writing a Basic Node/Express App',
                    body: 'Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App. Writing a Basic Node/Express App.',
                    topics: [5, 6, 8]
                },
                {
                    id: 2,
                    title: 'Writing Modular JavaScript',
                    body: 'Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript. Writing Modular JavaScript.',
                    topics: [1]
                },
                {
                    id: 3,
                    title: 'Vanilla JS Single Page Applications',
                    body: 'Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. Vanilla JS Single Page Applications. ',
                    topics: [3]
                }
            ]);
        });
};
