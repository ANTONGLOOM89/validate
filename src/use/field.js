import { reactive, ref, watch } from 'vue'

export const useField = (field) => {
  const valid = ref(true)
  const value = ref(field.value)
  const errors = reactive({})

  watch(value, () => {
    valid.value = true
    Object.keys(field.validators ?? {}).map(name => {
      const isValid = field.validators[name](value.value)
      errors[name] = !isValid
      if (!isValid) valid.value = false
    })
  }, { immediate:true })

  return { value, valid, errors }
} 