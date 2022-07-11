import { ref, reactive, computed } from 'vue'
import { useField } from './field'
export const useForm = (init = {}) => {
  const form = reactive({})
  for ( const [key, value] of Object.entries(init)) {
    form[key] = useField(value)
  }

  form.valid = computed(() => {
    return Object.keys(form)
    .filter(item => item !== 'valid')
    .reduce((total, item) => {
      total = form[item].valid
      return total
    }, true)
  })

  return form
}