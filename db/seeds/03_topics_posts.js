/*
'id': Integer
'post_id': Integer
'topic_id': Integer
*/

exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('topics_posts').del().then(function() {
        // Inserts seed entries
        return knex('topics_posts').insert([
            {
                id: 1,
                post_id: 1,
                topic_id: 5
            },
            {
                id: 2,
                post_id: 1,
                topic_id: 6
            },
            {
                id: 3,
                post_id: 1,
                topic_id: 8
            },
            {
                id: 4,
                post_id: 2,
                topic_id: 1
            },
            {
                id: 5,
                post_id: 2,
                topic_id: 2
            },
            {
                id: 6,
                post_id: 2,
                topic_id: 9
            },
            {
                id: 7,
                post_id: 3,
                topic_id: 2
            },
            {
                id: 8,
                post_id: 3,
                topic_id: 3
            },
            {
                id: 9,
                post_id: 3,
                topic_id: 9
            }
        ]);
    });
};
