<script>
import { createPost } from '@/api/posts';
import InputField from './InputField.vue';
import TextAreaField from './TextAreaField.vue';

  export default {
    name: 'AddPost',
    components: {
      InputField,
      TextAreaField,
    },
    emits: ['close', 'add-post'],
    props: {
      title: String,
      userId: Number,
    },
    data() {
      return {
        newTitle: '',
        errorTitle: '',
        errorPostBody: '',
        postBody: '',
        errorMessage: '',
        loading: false,
      };
    },
    watch: {
      newTitle: {
        handler() {
          if (this.errorTitle) {
            this.errorTitle = '';
          }
        },
      },
      postBody: {
        handler() {
          if (this.errorPostBody) {
            this.errorPostBody = '';
          }
        },
      }
    },
    methods: {
      handlerCloseSidebar() {
        this.$emit('close');
      },
      handlerSubmit() {
        this.errorMessage = '';
        this.newTitle = this.newTitle.trim();
        this.postBody = this.postBody.trim();

        if (!this.newTitle) {
          this.errorTitle = 'Title is required'
        }
        if (!this.postBody) {
          this.errorPostBody = 'Body is required'
        }
        if (this.errorTitle || this.errorPostBody) {
          return;
        }
        
        this.loading = true;
        createPost(this.userId, this.newTitle, this.postBody)
          .then(({ data }) => {
            this.$emit('add-post', data);
          })
          .catch(() => {
            this.errorMessage = 'Unable to create post';
          })
          .finally(() => {
            this.loading = false;
          });
      },
    },
  }
</script>

<template>
  <div class="content">
    <h2>{{ title }}</h2>

    <form @submit.prevent="handlerSubmit">
      <InputField
        :title="'Title'"
        :inputName="'title'"
        :placeholder="'Post title'"
        :errorMessage="errorTitle"
        v-model="newTitle"
      />

      <TextAreaField
        :title="'Write Post Body'"
        :inputName="'post-body'"
        :placeholder="'Post body'"
        :errorMessage="errorPostBody"
        v-model="postBody"
      />

      <div class="field is-grouped">
        <div class="control">
          <button type="submit" class="button is-link">
            {{ title === 'Post editing' ? 'Save' : 'Create' }}
          </button>
        </div>
        <div class="control">
          <button 
          type="reset" 
          class="button is-link is-light"
          @click="handlerCloseSidebar"
        >
          Cancel
        </button>
        </div>
      </div>
    </form>
  </div>
</template>