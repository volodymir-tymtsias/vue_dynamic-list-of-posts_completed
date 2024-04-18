<script>
  export default {
    name: 'TextAreaField',
    props: {
      title: String,
      inputName: String,
      errorMessage: String,
      placeholder: String,
      modelValue: String,
    },
    emits: ['update:modelValue'],
  }
</script>

<template>
  <div className="field" data-cy="BodyField">
    <label className="label" :htmlFor="`comment-${inputName}`">{{ title }}</label>
    <div className="control">
      <textarea
        :id="`comment-${inputName}`"
        :name="inputName"
        :placeholder="placeholder"
        class="textarea"
        :class="errorMessage ? 'is-danger' : ''"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>

    <p class="help is-danger" v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>