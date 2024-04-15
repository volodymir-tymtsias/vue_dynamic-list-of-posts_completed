<script>
import NeedToRegister from '@/components/NeedToRegister.vue';

  export default {
    name: 'LoginPage',
    components: {
      NeedToRegister,
    },
    data() {
      return {
        email: '',
        userName: '',
        emailSent: false,
        loading: false,
        errorMessage: '',
        needRegister: false,
      };
    },
    methods: {
      handleSubmit(event) {
        console.log(event);
      }
    },
  }
</script>

<template>
  <section class="container is-flex is-justify-content-center">
    <form @submit.prevent="handleSubmit" class="box mt-5">
      <h1 class="title is-3">
        {{ emailSent ? 'You need to register' : 'Get your userId' }}
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
        v-if="emailSent && !errorMessage && needRegister"
      />

      <div class="field">
        <button 
          type="submit"
          class="button is-primary"
          :class="{ ['is-loading']: loading }"
          :disabled="!email"
        >
          {{ emailSent ? 'Register' : 'Login' }}
        </button>
      </div>
    </form>
  </section>
</template>