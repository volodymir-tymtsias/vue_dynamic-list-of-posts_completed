<script>
  import CommentsList from './CommentsList.vue';

  export default {
    name: 'PostPreview',
    components: {
      CommentsList,
    },
    emits: ['delete', 'edit-post'],
    props: {
      post: Object,
    },
    data() {
      return {
        loading: false,
        errorMessage: '',
        comments: [],
      };
    },
    
  }
</script>

<template>
  <div class="block">
    <div
      class="is-flex is-justify-content-space-between is-align-items-center"
    >
      <h2>{{ `#${post.id}: ${post.title}` }}</h2>
      <div class="is-flex">
        <span 
          class="icon is-small is-right is-clickable"
          @click="$emit('edit-post')"
        >
          <i class="fas fa-pen-to-square"></i>
        </span>
        <span
          class="icon is-small is-right has-text-danger is-clickable ml-3"
          @click="$emit('delete')"
        >
          <i class="fas fa-trash"></i>
        </span>
      </div>
    </div>
    <p data-cy="PostBody">{{ post.body }}</p>

    <CommentsList :postId="post.id" :key="post.id"/>
  </div>
</template>