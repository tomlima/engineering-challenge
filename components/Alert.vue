<template>
  <div class="message" :class="showAlert ? ['is-open', type] : ''">
    <p>{{ message }}</p>
    <span @click="showAlert = false">X</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: '',
      showAlert: false,
      type: ''
    }
  },
  mounted() {
    $nuxt.$on('error', message => {
      this.type = 'error'
      this.message = message
      this.showAlert = true
    })
    $nuxt.$on('success', message => {
      this.type = 'success'
      this.message = message
      this.showAlert = true
    })
  }
}
</script>

<style lang="scss" scoped>
.message {
  color: #fff;
  height: 100px;
  border-radius: 30px 0 0 30px;
  position: fixed;
  width: 20%;
  right: -100%;
  top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: 0.5s all ease;
  &.error {
    background-color: tomato;
  }
  &.success {
    background-color: rgb(61, 197, 168);
  }
  &.is-open {
    right: 0%;
    transition: 0.5s all ease;
  }
  span {
    position: absolute;
    font-weight: 700;
    right: 25px;
    top: 15px;
    cursor: pointer;
  }
}
</style>
