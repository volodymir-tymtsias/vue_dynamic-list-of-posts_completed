<script>
  import { getUser } from '@/api/users';
  import { getLocalUser } from '@/helpers/getLocalUser';
  import PostLoader from '@/components/PostLoader.vue';
  import HeaderComponent from '@/components/HeaderComponent.vue';

  export default {
    name: 'HomePage',
    components: {
      HeaderComponent,
      PostLoader,
    },
    data() {
      return {
        loading: false,
        errorMessage: '',
        user: getLocalUser(),
      };
    },
    watch: {
      user: {
        deep: true,
        handler() {
          localStorage.setItem('user', JSON.stringify(this.user));
        },
      }
    },
    mounted() {
      if (this.user.id) {
        this.errorMessage = '';
        this.loading = true;
        getUser(this.user.id)
          .then(({ data }) => {
            this.user = data;
          })
          .catch(() => {
            this.errorMessage = 'Unable to load user';
          })
          .finally(() => {
            this.loading = false;
          });
      } else {
        this.$router.push({ path: "/login" });
      }
    },
    methods: {
      
    },
  }
</script>

<template>
  <header>
    <HeaderComponent :userName="this.user.name"/>
  </header>
  <PostLoader v-if="loading" />
  <p>HomePage</p>
</template>