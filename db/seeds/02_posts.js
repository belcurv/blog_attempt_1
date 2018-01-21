exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('posts').del()
        .then(function() {
            // Inserts seed entries
            return knex('posts').insert([
                {
                    title: 'Writing a Basic Node/Express App',
                    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit sapien vitae risus ullamcorper, in efficitur ipsum porta. Morbi aliquet augue at tellus porttitor vestibulum. Aliquam magna purus, rhoncus ac lacus sed, lacinia pretium nunc. Ut blandit commodo maximus. Suspendisse potenti. In sodales sapien lobortis sagittis sollicitudin. Ut a hendrerit lorem. Morbi a elit euismod, condimentum libero nec, tempor ex.'
                },
                {
                    title: 'Writing Modular JavaScript',
                    body: 'Cras non tincidunt nisl. Maecenas id facilisis leo. Donec a porttitor diam. Phasellus a sodales arcu. Nulla semper tempor libero, quis pretium felis sagittis sit amet. Proin fermentum finibus diam at aliquet. Aenean cursus metus quis velit efficitur, at facilisis neque tempor. Fusce dictum aliquet libero eget aliquam. Morbi a est finibus, tempor lacus ac, aliquam mauris. Donec ut nisi et mi lacinia condimentum. Phasellus sapien tellus, mollis at lectus ac, sodales gravida mauris. Ut sodales arcu vel nunc rhoncus, at vulputate enim hendrerit. Donec aliquet sed nibh at ornare. Aliquam dapibus vel odio sed posuere. Aliquam dignissim venenatis cursus. Maecenas venenatis vel odio id pharetra.'
                },
                {
                    title: 'Vanilla JS Single Page Applications',
                    body: 'Aenean placerat lacinia feugiat. Suspendisse pharetra diam sed mi pretium, egestas porttitor ante porttitor. Maecenas euismod turpis quis pharetra porttitor. Aenean in purus id nunc pulvinar tincidunt. Pellentesque maximus arcu in sodales consequat. Donec dapibus aliquet ex, id eleifend elit ultrices vitae. Nulla id nulla diam. In lobortis vel ligula mollis convallis. Sed laoreet ligula est, id pretium tortor efficitur a. Proin viverra quam nec scelerisque laoreet. Vivamus scelerisque magna at lectus commodo, sit amet porttitor purus venenatis.'
                }
            ]);
        });
};
