import Vue     from 'vue';
import Router  from 'vue-router';
import Posts   from '@/components/Posts';
import Compose from '@/components/Compose';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path      : '/',
            name      : 'Posts',
            component : Posts
        },
        {
            path      : '/compose',
            name      : 'Compose',
            component : Compose
        }
    ]
});
