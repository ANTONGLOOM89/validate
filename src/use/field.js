import { reactive, ref, watch } from 'vue'

export const useField = (field) => {
  const valid = ref(true)
  const value = ref(field.value)
  const errors = reactive({})
  const touched = ref(false)

  watch(value, () => {
    valid.value = true
    Object.keys(field.validators ?? {}).map(name => {
      const isValid = field.validators[name](value.value)
      errors[name] = !isValid
      if (!isValid) valid.value = false
    })
  }, { immediate:true })

  return { value, valid, errors, touched, blur: () => touched.value = true, type: field.type, placeholder: field.placeholder }
} 