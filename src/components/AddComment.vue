<script>
  import { createComment } from '@/api/comments';
  import InputField from './InputField.vue';
  import MessageComponent from './MessageComponent.vue';
  import TextAreaField from './TextAreaField.vue';

  export default {
    name: 'AddComment',
    components: {
      InputField,
      TextAreaField,
      MessageComponent,
    },
    emits: ['close', 'add-comment'],
    props: {
      postId: Number,
      name: String,
      email: String,
    },
    data() {
      return {
        loading: false,
        authorName: this.name,
        authorEmail: this.email,
        commentBody: '',
        errorAauthorName: '',
        errorAuthorEmail: '',
        errorCommentBody: '',
        errorMessage: '',
      };
    },
    watch: {
      authorName: {
        handler() {
          if (this.errorAauthorName) {
            this.errorAauthorName = '';
          }
        },
      },
      authorEmail: {
        handler() {
          if (this.authorEmail) {
            this.errorAuthorEmail = '';
          }
        },
      },
      commentBody: {
        handler() {
          if (this.commentBody) {
            this.errorCommentBody = '';
          }
        },
      }
    },
    methods: {
      handlerCloseAddCommentForm() {
        this.$emit('close');
      },
      handlerSubmit() {
        this.errorMessage = '';
        this.authorName = this.authorName.trim();
        this.authorEmail = this.authorEmail.trim();
        this.commentBody = this.commentBody.trim();

        if (!this.authorName) {
          this.errorAauthorName = 'Author Name is required'
        }
        if (!this.authorEmail) {
          this.errorAuthorEmail = 'Author Email is required'
        }
        if (!this.commentBody) {
          this.errorCommentBody = 'Comment Body is required'
        }
        if (this.errorAauthorName || this.errorAuthorEmail || this.errorCommentBody) {
          return;
        }

        this.loading = true;

        createComment(this.postId, this.authorName, this.authorEmail, this.commentBody)
          .then(({ data }) => {
            this.$emit('add-comment', data);
            this.$emit('close');
          })
          .catch(() => {
            this.errorMessage = 'Unable to create comment';
          })
          .finally(() => {
            this.loading = false;
          });
      },
    }
  }
</script>

<template>
  <MessageComponent
    :active="errorMessage !== ''"
    @hide="errorMessage = ''"
  >
    <p>{{ errorMessage }}</p>
  </MessageComponent>

  <form @submit.prevent="handlerSubmit">
    <InputField
      :title="'Author Name'"
      :inputName="'author-name'"
      :placeholder="'Name Surname'"
      :type="'text'"
      :errorMessage="errorAauthorName"
      v-model="authorName"
    />

    <InputField
      :title="'Author Email'"
      :inputName="'author-email'"
      :placeholder="'Your Email'"
      :type="'email'"
      :errorMessage="errorAuthorEmail"
      v-model="authorEmail"
    />

    <TextAreaField
      :title="'Write Comment Body'"
      :inputName="'comment-body'"
      :placeholder="'Your comment'"
      :errorMessage="errorCommentBody"
      v-model="commentBody"
    />

    <div class="field is-grouped">
      <div class="control">
        <button 
          type="submit" 
          class="button is-link"
          :class="{ 'is-loading': loading }"
          :disabled="loading"
        >
          Add Comment
        </button>
      </div>
      <div class="control">
        <button 
        type="reset" 
        class="button is-link is-light"
        @click="handlerCloseAddCommentForm"
      >
        Cancel
      </button>
      </div>
    </div>
  </form>
</template>