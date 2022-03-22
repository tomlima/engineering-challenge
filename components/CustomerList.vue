<template>
  <div class="card is-open">
    <h2>Clientes</h2>
    <hr />
    <div v-for="(customer, index) in customers" :key="index">
      <div class="card__wrapper">
        <h3>{{ customer.name }}</h3>
        <div>
          <i class="bx bx-user-plus" @click="openEmployeeForm(customer)"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customers: []
    }
  },
  methods: {
    openEmployeeForm(customer) {
      $nuxt.$emit('open-employee-form', customer)
    }
  },
  async fetch() {
    this.customers = await this.$content('customers').fetch()
  }
}
</script>
