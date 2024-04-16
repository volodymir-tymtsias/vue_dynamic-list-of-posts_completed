<script>
import { createUser, getUser, getUsers } from '@/api/users';
import NeedToRegister from '@/components/NeedToRegister.vue';

  export default {
    name: 'LoginPage',
    components: {
      NeedToRegister,
    },
    data() {
      let user = {};
      const jsonData = localStorage.getItem('user') || '{}';

      try {
        user = JSON.parse(jsonData);
      } catch (e) {
        this.errorMessage = 'Error reading local storage';
      }

      return {
        email: '',
        userName: '',
        loading: false,
        errorMessage: '',
        needRegister: false,
        users: [],
        user,
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
        getUser(this.user.id)
          .then(({ data }) => {
            this.user = data;
            this.$router.push({ path: "/" });
          })
          .catch(() => {
            this.errorMessage = 'Unable to load user';
          });
      }
    },
    methods: {
      handleSubmit() {
        this.errorMessage = '';
        this.loading = true;

        if (!this.needRegister) {
          getUsers()
            .then(({ data }) => {
              this.users = data;

              const user = this.users.find(item => item.email === this.email);

              if (user) { 
                this.user = user;
                this.$router.push({ path: "/" });
              } else {
                this.needRegister = true;
              }
            })
            .catch(() => {
              this.errorMessage = 'Unable to read users';
            })
            .finally(() => {
              this.loading = false;
            });
        } else {
          createUser(this.userName, this.email)
            .then(({ data }) => {
              this.user = data;
              this.$router.push({ path: "/" });
              this.needRegister = false;
            })
            .catch(() => {
              this.errorMessage = 'Unable to create user';
            })
            .finally(() => {
              this.loading = false;
            });
        }
      }
    },
  }
</script>

<template>
  <section class="container is-flex is-justify-content-center">
    <form @submit.prevent="handleSubmit" class="box mt-5">
      <h1 class="title is-3">
        {{ needRegister ? 'You need to register' : 'Get your userId' }}
      </h1>

      <div class="field">
        <label class="label" htmlFor="user-email"> Email </label>

        <div class="control has-icons-left" :class="{ ['is-loading']: loading }">
          <input
            type="email"
            id="user-email"
            name="email"
            class="input"
            placeholder="Enter your email"
            required
            v-model="email"
          />

          <span class="icon is-small is-left">
            <i class="fas fa-envelope"></i>
          </span>
        </div>

        <p class="help is-danger" v-if="errorMessage">{{ errorMessage }}</p>
      </div>

      <NeedToRegister 
        v-model="userName" 
        :loading="loading"
        v-if="!errorMessage && needRegister"
      />

      <div class="field">
        <button 
          type="submit"
          class="button is-primary"
          :class="{ ['is-loading']: loading }"
          :disabled="!email"
        >
          {{ needRegister ? 'Register' : 'Login' }}
        </button>
      </div>
    </form>
  </section>
</template>