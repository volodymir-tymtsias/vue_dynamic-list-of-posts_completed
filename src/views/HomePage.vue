<script>
  import { getPosts } from '@/api/posts';
  import { getLocalUser } from '@/helpers/getLocalUser';
  import PostLoader from '@/components/PostLoader.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import PostList from '@/components/PostList.vue';
  import MessageComponent from '@/components/MessageComponent.vue';
  import SidebarComponent from '@/components/SidebarComponent.vue';
  import AddPost from '@/components/AddPost.vue';

  export default {
    name: 'HomePage',
    components: {
      HeaderComponent,
      PostLoader,
      PostList,
      MessageComponent,
      SidebarComponent,
      AddPost,
    },
    data() {
      return {
        loading: false,
        errorMessage: '',
        posts: [],
        user: getLocalUser(),
        sidebarIsOpen: false,
        openedPostId: null,
        editingPostId: null,
        addingPost: false,
      };
    },
    mounted() {
      this.errorMessage = '';
      this.loading = true;
      getPosts(this.user.id)
        .then(({ data }) => {
          this.posts = data;
        })
        .catch(() => {
          this.errorMessage = 'Unable to load posts';
        })
        .finally(() => {
          this.loading = false;
        });
    },
    methods: {
      handlerAddNewPost() {
        this.addingPost = true;
        this.openedPostId = null;
        if (!this.sidebarIsOpen) {
          this.sidebarIsOpen = true;
        }
      },
      handlerCloseSidebar() {
        this.sidebarIsOpen = false;
        this.openedPostId = null;
        this.addingPost = false;
        this.editingPostId = null;
      },
      setOpenedPostId(postId) {
        this.addingPost = false;
        if (postId === this.openedPostId) {
          this.sidebarIsOpen = false;
          this.openedPostId = null;
        } else if (this.openedPostId === null) {
          this.sidebarIsOpen = true;
          this.openedPostId = postId;
        } else if (postId !== this.openedPostId && this.openedPostId !== null) {
          this.openedPostId = postId;
        }
      },
      handlerAddPost(newPost) {
        this.posts = [...this.posts, newPost];
        this.openedPostId = newPost.id;
        this.addingPost = false;
      }
    },
  }
</script>

<template>
  <header>
    <HeaderComponent :userName="user.name"/>
  </header>
  <main class="section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <div class="tile is-child box is-success">
            <div class="block">
              <div class="block is-flex is-justify-content-space-between">
                <h2 class="is-size-3">Posts</h2>
                <button 
                  type="button" 
                  class="button is-link"
                  :class="addingPost ? 'is-light' : ''"
                  @click="handlerAddNewPost"
                >
                  Add New Post
                </button>
              </div>

              <MessageComponent 
                :active="errorMessage !== ''"
                @hide="errorMessage = ''"
              >
                <p>{{ errorMessage }}</p>
              </MessageComponent>

              <PostLoader v-if="loading" />

              <template v-else>
                <template v-if="!errorMessage">
                  <PostList 
                    :posts="posts"
                    :openedPostId="openedPostId"
                    @set-opened-post-id="setOpenedPostId($event)"
                    v-if="posts.length > 0"
                  />

                  <div className="block" v-else>
                    <p className="is-size-6 has-text-centered">No posts yet</p>
                  </div>
                </template>
              </template>
            </div>
          </div>
        </div>

        <SidebarComponent :active="sidebarIsOpen">
          <AddPost
            :title="'Create new post'"
            :userId="user.id"
            @close="handlerCloseSidebar"
            @add-post="handlerAddPost"
            v-if="addingPost"
          />
        </SidebarComponent>
      </div>
    </div>
  </main>
</template>