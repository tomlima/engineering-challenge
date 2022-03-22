export default ({ app }, inject) => {
  let promises
  const invalidField = 'invalid-field'

  const validateForm = form => {
    promises = []
    return new Promise((res, rej) => {
      const formInputs = form.getElementsByTagName('input')
      formInputs.forEach(inputElement => {
        createValidationPromises(inputElement)
      })
      Promise.all(promises).then(results => {
        if (results.includes('invalid-field')) {
          rej('Revise os dados do formulário')
        }
        res()
      })
    })
  }

  const createValidationPromises = inputElement => {
    const functionToBeExecuted = inputElement.getAttribute('data-function')
    if (functionToBeExecuted) {
      promises.push(validationFunctions[functionToBeExecuted](inputElement))
    } else {
      promises.push(invalidField)
      addErrorClassToInput(inputElement)
    }
  }

  const validationFunctions = {
    onlyString: inputElement => {
      return new Promise((res, rej) => {
        if (
          !/^[A-Za-z\s]*$/.test(inputElement.value) ||
          validationFunctions.isNull(inputElement.value)
        ) {
          addErrorClassToInput(inputElement)
          res(invalidField)
        }
        res(true)
      })
    },

    cpf: inputElement => {
      return new Promise((res, rej) => {
        if (inputElement.value.length != 11) {
          addErrorClassToInput(inputElement)
          res(invalidField)
        }
        res(true)
      })
    },

    email: inputElement => {
      return new Promise((res, rej) => {
        if (
          validationFunctions.isNull(inputElement.value) ||
          !String(inputElement.value)
            .toLowerCase()
            .match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
        ) {
          addErrorClassToInput(inputElement)
          res(invalidField)
        }
        res(true)
      })
    },

    na: inputElement => {
      return new Promise((res, rej) => {
        if (validationFunctions.isNull(inputElement.value)) {
          addErrorClassToInput(inputElement)
          res(invalidField)
        }
        res(true)
      })
    },

    isNull: inputValue => {
      if (inputValue.length == 0) {
        return true
      }
      return false
    }
  }

  const addErrorClassToInput = input => {
    input.classList.add('has-error')
  }

  inject('validateForm', validateForm)
}
