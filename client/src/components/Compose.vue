<template lang="html">
<div class="md_test">
    <div class="controls">
        <h1>Compose</h1>
        <button type="button" @click="savePost">Save</button>
    </div>
    <div class="container">
        <div class="input">
            <textarea
                :value="input"
                @input="update">
            </textarea>
        </div>
        <div class="rendered" v-html="compiledMarkdown"></div>
    </div>
    <pre class="html-string">{{compiledMarkdown}}</pre>
</div>
</template>

<script>
import PostService from '@/services/PostService';
import marked      from 'marked';
import highlight   from 'highlight.js';
import debounce    from 'lodash/debounce';

marked.setOptions({
    highlight: function (code) {
        return highlight.highlightAuto(code).value;
    }
});

export default {
    name: 'md_test',
    data() {
        return {
            input: '## Markdown goes here'
        };
    },
    computed: {
        compiledMarkdown() {
            return marked(this.input, {
                gfm      : true,
                sanitize : true
            });
        }
    },
    methods: {
        update: debounce(function(e) {
            this.input = e.target.value;
        }, 300),

        savePost() {
            PostService.createPost({
                title  : 'Demo new post',
                body   : this.compiledMarkdown,
                topics : ['JavaScript']
            });
        }

    }
}
</script>

<style scoped lang="css">
.md_test {
    box-sizing: border-box;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
}

.controls {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}

.controls > h1 {
    margin: 0;
}

.controls > button {
    border: none;
    background-color: #ffcc99;
    border-radius: 3px;
    margin: 5px;
    font-weight: bold;
    cursor: pointer;
}

.controls > button:hover {
    background-color: #ffe6cc;
}

.container {
    flex: 1 auto;
    display: flex;
    flex-flow: row nowrap;
}

.input, .rendered {
    border: none;
    flex: 1;
    background: #f9f9f9;
    margin: 0;
    padding: 0;
}

.input textarea {
    display: inline-block;
    padding: 10px;
    width: 100%;
    height: 100%;
    resize: none;
    outline: none;
    border: none;
}

.rendered {
    border-left: 1px solid #ccc;
    overflow: auto;
    padding: 10px;
}

.html-string {
    flex: none;
    margin: 0;
    padding: 5px;
    background: #333;
    color: #DDD;
    overflow: auto;
}
</style>
