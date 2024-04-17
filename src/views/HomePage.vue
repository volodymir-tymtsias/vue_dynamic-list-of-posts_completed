<script>
  import { getPosts } from '@/api/posts';
  import { getLocalUser } from '@/helpers/getLocalUser';
  import PostLoader from '@/components/PostLoader.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';
  import PostList from '@/components/PostList.vue';
  import MessageComponent from '@/components/MessageComponent.vue';
  import SidebarComponent from '@/components/SidebarComponent.vue';

  export default {
    name: 'HomePage',
    components: {
      HeaderComponent,
      PostLoader,
      PostList,
      MessageComponent,
      SidebarComponent,
    },
    data() {
      return {
        loading: false,
        errorMessage: '',
        posts: [],
        user: getLocalUser(),
        sidebarIsOpen: false,
        openedPostId: null,
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
      handleAddNewPost() {
        
      },
      handleToggleOpenSidebar() {
        this.sidebarIsOpen = !this.sidebarIsOpen;
      },
      setOpenPostId(postId) {
        console.log(postId, )
        if (postId === this.openedPostId) {
          this.handleToggleOpenSidebar();
          this.openedPostId = null;
        } else if (this.openedPostId === null) {
          this.handleToggleOpenSidebar();
          this.openedPostId = postId;
        } else if (postId !== this.openedPostId && this.openedPostId !== null) {
          this.openedPostId = postId;
        }
      },
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
                <button type="button" class="button is-link">Add New Post</button>
              </div>

              <PostLoader v-if="loading" />

              <template v-else>
                <template v-if="!errorMessage">
                  <PostList 
                    :posts="posts"
                    :openedPostId="openedPostId"
                    @setOpenPostId="setOpenPostId($event)"
                    v-if="posts.length > 0"
                  />

                  <div className="block" v-else>
                    <p className="is-size-6 has-text-centered">No posts yet</p>
                  </div>
                </template>
              </template>

              <MessageComponent 
                class="is-danger" 
                :active="errorMessage !== ''"
                @hide="errorMessage = ''"
              >
                <p>{{ errorMessage }}</p>
              </MessageComponent>
            </div>
          </div>
        </div>

        <SidebarComponent :active="sidebarIsOpen">
          <div className="block">
            <div
              class="is-flex is-justify-content-space-between is-align-items-center"
            >
              <h2>#post id: post title</h2>
              <div class="is-flex">
                <span class="icon is-small is-right is-clickable">
                  <i class="fas fa-pen-to-square"></i>
                </span>
                <span
                  class="icon is-small is-right has-text-danger is-clickable ml-3"
                >
                  <i class="fas fa-trash"></i>
                </span>
              </div>
            </div>
            <p>post body</p>
          </div>
        </SidebarComponent>
      </div>
    </div>
  </main>
</template>