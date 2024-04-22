<script>
  import { deleteComment, getComments } from '@/api/comments';
  import MessageComponent from './MessageComponent.vue';
  import PostLoader from './PostLoader.vue';
  import NoCommentsYet from './NoCommentsYet.vue';

  export default {
    name: 'CommentsList',
    components: {
      MessageComponent,
      PostLoader,
      NoCommentsYet,
    },
    props: {
      postId: Number,
    },
    data() {
      return {
        loading: false,
        errorMessage: '',
        comments: [],
        visibleComments: [],
      };
    },
    mounted() {
      this.errorMessage = '';
      this.loading = true;
      getComments(this.postId)
        .then(({ data }) => {
          this.comments = data;
          this.visibleComments = data;
        })
        .catch(() => {
          this.errorMessage = 'Unable to load comments';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    methods: {
      handlerDeleteComment(commentId) {
        this.errorMessage = '';
        this.visibleComments = this.comments
          .filter(comment => comment.id !== commentId);
        deleteComment(commentId)
          .then(() => {
            this.comments = this.visibleComments;
          })
          .catch(() => {
            this.errorMessage = 'Unable to delete comments';
            this.visibleComments = this.comments;
          })
      },
    },
  }
</script>

<template>
  <MessageComponent
    :active="errorMessage !== ''"
    @hide="errorMessage = ''"
  >
    <p>{{ errorMessage }}</p>
  </MessageComponent>

  <PostLoader v-if="loading" />

  <template v-else>
    <template v-if="!errorMessage">
      <article 
        class="message is-small"
        v-for="comment of visibleComments" 
        :key="comment.id"
      >
        <div class="message-header">
          <a :href="`mailto:${comment.email}`">{{ comment.name }}</a>
          <button 
            type="button" 
            class="delete is-small" 
            aria-label="delete"
            @click="handlerDeleteComment(comment.id)"
          >
            delete button
          </button>
        </div>
        <div class="message-body">{{ comment.body }}</div>
      </article>
    </template>

    <NoCommentsYet 
      :text="'comments'"
      v-if="!errorMessage && comments.length === 0"
    />

    <button 
      type="button" 
      class="button is-link"
      v-if="!errorMessage"
    >
      Write a comment
    </button>
  </template>
</template>