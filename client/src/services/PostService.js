// hits 'api/posts' endpoints

import Api from '@/services/Api';

export default {

    /** GET ALL POSTS
     *  @returns   {Promise}   Promise + payload: JSON array of posts
    */
    getAllPosts() {
        return Api()
            .get('api/posts')
            .then(response => response.data);
    },


    /** GET ONE POST
     *  @param     {String}   id   _id of the post to fetch
     *  @returns   {Promise}       Promise + payload: JSON post
    */
    getOnePost(id) {
        return Api()
            .get(`api/posts/${id}`)
            .then(response => response.data);
    },


    /** CREATE A POST
     *  @param    {String}   post  { title: String, body: String, topics: Array }
     *  @returns  {Promise}        Promise + payload: JSON post
    */
    createPost(post) {
        return Api()
            .post(`api/posts`, post)
            .then(response => response.json);
    }

}
