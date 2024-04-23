<script>
  import AddComment from './AddComment.vue';
  import CommentsList from './CommentsList.vue';

  export default {
    name: 'PostPreview',
    components: {
      CommentsList,
      AddComment,
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
        addCommentsIsOpen: false,
        authorName: '',
        authorEmail: '',
      };
    },
    methods: {
      toggleAddCommentsIsOpen() {
        this.addCommentsIsOpen = !this.addCommentsIsOpen;
      },
      handlerAddComment(event) {
        this.authorName = event.name;
        this.authorEmail = event.email;
      }
    }
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

    <CommentsList 
      :postId="post.id" 
      @open-form="toggleAddCommentsIsOpen"
      v-if="!addCommentsIsOpen"
    />

    <AddComment
      :postId="post.id"
      :name="this.authorName"
      :email="this.authorEmail"
      @close="toggleAddCommentsIsOpen"
      @add-comment="handlerAddComment"
      v-if="addCommentsIsOpen"
    />
  </div>
</template>