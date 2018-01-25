<template lang="html">
<div class="posts">
    <h3>{{hello}}</h3>
    <div class="" v-for="post in allPosts" :key="post.id">
        <hr>
        <h2>{{post.title}}
            <span class="post-date">Posted: {{post.created_at | DateParser}}</span>
        </h2>
        <ul>
            <li v-for="(topic, ind) in post.topics" :key="ind">
                {{topic}}
            </li>
        </ul>
        <p class="rendered" v-html="post.body"></p>
    </div>
</div>
</template>

<script>
import PostService from '@/services/PostService';
import DateParser  from '@/filters/DateParser';

export default {
    name: 'Posts',
    data() {
        return {
            hello    : 'Posts go here',
            allPosts : []
        };
    },
    mounted() {
        PostService.getAllPosts()
            .then(res => {
                this.allPosts = res;
            });
    },
    filters: {
        DateParser
    }
}
</script>

<style scoped lang="css">
.post-date {
    font-size: .6em;
    font-weight: 500;
    color: #666;
    margin-left: .5em;
}

ul {
    list-style: none;
    margin: 0;
    padding: 0;
}

li {
    font-size: .8em;
    display: inline-block;
    background: #f3f3f3;
    margin: 0 3px;
    padding: 3px 5px;
}
</style>
