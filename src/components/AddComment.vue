<script>
  import InputField from './InputField.vue';
  import TextAreaField from './TextAreaField.vue';

  export default {
    name: 'AddComment',
    components: {
      InputField,
      TextAreaField,
    },
    emits: ['close', 'add-comment'],
    props: {
      
    },
    data() {
      return {
        authorName: '',
        authorEmail: '',
        commentBody: '',
        errorAauthorName: '',
        errorAuthorEmail: '',
        errorCommentBody: '',
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
            this.authorEmail = '';
          }
        },
      },
      commentBody: {
        handler() {
          if (this.commentBody) {
            this.commentBody = '';
          }
        },
      }
    },
    methods: {
      handlerCloseAddCommentForm() {
        this.$emit('close');
      },
    }
  }
</script>

<template>
  <form @submit.prevent="handlerSubmit">
    <InputField
      :title="'Author Name'"
      :inputName="'author-name'"
      :placeholder="'Name Surname'"
      :errorMessage="errorAauthorName"
      v-model="authorName"
    />

    <InputField
      :title="'Author Email'"
      :inputName="'author-email'"
      :placeholder="'Your Email'"
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
        <button type="submit" class="button is-link">
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