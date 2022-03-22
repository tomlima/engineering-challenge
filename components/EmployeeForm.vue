<template>
  <div class="card" :class="employeeForm ? 'is-open' : ''">
    <h2>
      <b>{{ customer.name }}</b>
    </h2>
    <span>
      Adicionar novo funcionário
    </span>
    <hr />
    <form id="employee">
      <div v-for="(field, index) in fields" :key="index">
        <span>{{ field.name }}</span>
        <input
          @focus="removeErrorClass($event)"
          :data-function="field.validator"
          :type="field.type"
        />
      </div>
      <a href="#" @click="addNewEmployee()">Cadastrar</a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      employeeForm: false,
      fields: [],
      customer: {}
    }
  },
  mounted() {
    $nuxt.$on('open-employee-form', customer => {
      this.customer = customer
      const benefitsIds = customer.benefits
      this.clearFormData()
      this.openEmployeeForm(benefitsIds)
    })
  },
  methods: {
    async openEmployeeForm(benefitsIds) {
      const customerBenefits = await this.getBenefits(benefitsIds)
      const formFields = await this.removeDuplicateFields(customerBenefits)
      this.fields = formFields
      this.employeeForm = true
    },
    async removeDuplicateFields(benefits) {
      const fields = benefits
        .flatMap(benefit => benefit.form)
        .filter(
          (value, index, self) =>
            index ===
            self.findIndex(valueOnIndex => valueOnIndex.name === value.name)
        )

      return fields
    },
    async getBenefits(benefitsIds) {
      const benefits = await this.$content('benefits')
        .where({ id: { $in: benefitsIds } })
        .fetch()
      return benefits
    },
    async addNewEmployee() {
      const formId = document.getElementById('employee')
      try {
        await this.$validateForm(formId)
        $nuxt.$emit('success', 'Funcionário cadastrado com sucesso!')
        this.clearFormData()
      } catch (message) {
        $nuxt.$emit('error', message)
      }
    },
    removeErrorClass(element) {
      const input = element.target
      input.classList.remove('has-error')
    },
    clearFormData() {
      document.getElementById('employee').reset()
    }
  }
}
</script>
