<template lang="pug">
.modal
  .modal__content
    .modal__header
      .modal__title Форма
      button.modal__close
        img(src="@/assets/images/close.svg", alt="close")
    //- form.form()
    //-   .form__group
    //-     input.form__control(
    //-       name="comment-text" 
    //-       type="text" 
    //-       placeholder="Email"
    //-       v-model="form.email.value"
    //-       @blur="emailBlur"
    //-     )
    //-     span.form__line
    //-     span.form__error(v-show="emaiError")
    //-     span.form__info(v-if="emaiErrorInfo") Please enter email
    //-   .form__group
    //-     input.form__control(
    //-       name="comment-text" 
    //-       type="password" 
    //-       placeholder="Password"
    //-       v-model="form.password.value"
    //-       @blur="form.password.blur"
    //-     )
    //-     span.form__line
    //-     span.form__error(v-show="!form.password.valid && form.password.touched")
    //-     span.form__info(v-if="form.password.errors.required && form.password.touched") Please enter password
    //-     span.form__info(v-else-if="form.password.errors.minLength && form.password.touched") Password lenght 8. Now {{form.password.value.length}}
    //-   .form__group
    //-     input.form__control(
    //-       name="comment-text" 
    //-       type="text" 
    //-       placeholder="name"
    //-       v-model="form.name.value"
    //-       @blur="form.name.blur"
    //-     )
    //-     span.form__line
    //-     span.form__error(v-show="!form.name.valid && form.name.touched")
    //-     span.form__info(v-if="form.name.errors.required && form.name.touched") Please enter password
    //-     span.form__info(v-else-if="form.name.errors.minLength && form.name.touched") Password lenght 8. Now {{form.name.value.length}}
    //- form.form()
    //-   .form__group
    //-     input.form__control(
    //-       v-for(item in array)
    //-       :type="form[item].type"
    //-     )
    form.form()
      .form__group(v-for="field in fields")
        input.form__control(
          :type="form[field].type"
          :placeholder="form[field].placeholder"
          v-model="form[field].value"
          @blur="form[field].blur"
        )
        span.form__line
        span.form__error(v-show="!form[field].valid && form[field].touched")
        span.form__info(v-if="form[field].errors.required && form[field].touched") Ввведите {{form[field].placeholder}}
        span.form__info(v-else-if="form[field].errors.minLength && form[field].touched") Болшше 8 знаков, сейчас {{form[field].value.length}}
    .form__group
      .btn(type='submit' :disabled="!form.valid" :class="{ 'btn__disabled': !form.valid }") Submit
</template>


<script setup>

const required = val => !!val
const minLength = num => val => val.length >= num

import { useForm } from '@/use/form'
const form = useForm({
  name: {
    value: "",
    validators: {required},
    type: 'text',
    placeholder: 'ФИО'
  },
  position: {
    value: "",
    validators: {required},
    type: 'text',
    placeholder: 'Ваша Должность'
  },
  phone: {
    value: "",
    validators: {required},
    type: 'text',
    placeholder: 'Ваш Контактный телефон'
  },
  email: {
    value: "",
    validators: { required },
    type: "text",
    placeholder: "Email"
  },
  password: {
    value: "",
    validators: { required, minLength: minLength(8) },
    type: "password",
    placeholder: "Пароль"
  }
})

const fields = Object.keys(form).filter(item => item !== 'valid')


</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

.modal {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(#000, .8);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  padding: 1rem;
  &__content {
    width: 100%;
    max-width: 50rem;
    padding: 3rem;
    background-color: #202020;;
    border-radius: .5rem;
    position: relative;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2.5rem;
  }
  &__title {
    color: #fff;
    font-size: 2rem;
  }
  &__close {
    background: none;
    border: none;
    cursor: pointer;
    transition: transform .2s linear;
    &:hover {
      transform: rotate(90deg)
    }
  }
}

.form {
  margin-bottom: 4rem;
  &__group {
    position: relative;
    margin-bottom: 1rem;  
  }
  &__control {
    width: 100%;
    height: 30px;
    padding: .5rem 0 .75rem;
    overflow: hidden;
    background: none;
    border: none;
    display: block;
    border-radius: 0;
    box-shadow: none;
    border-bottom: 1px solid #3f3f3f;
    font-family: inherit;
    font-size: 1.4rem;
    color: #fff;
    resize: none;
    outline:none;
    &::placeholder {
      color: rgba(#fff, .2);
    }
    &:focus + .form__line {
      width: 100%;
    }
  }
  &__error {
    width: 0;
    height: 1px;
    background-color: red;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 2;
    transition: width .2s linear;
    width: 100%;
  }
  &__line {
    width: 0;
    height: 1px;
    background-color: blue;
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 1;
    transition: width .2s linear;
  }
  &__info {
    position: absolute;
    bottom: -1.3rem;
    color: red;
  }
  &__footer {
    margin-top: 4rem;
  }
}

.btn {
  transition: background-color .2s linear;
  display: inline-block;
  font-family: inherit;
  vertical-align: top;
  font-size: 1.4rem;
  line-height: 1.1;
  background: #0000ff;
  border: none;
  cursor: pointer;
  padding: .8em 2em;
  border-radius: 5px;
  outline: none;
  color: #fff;
  &:hover {
    background: #0000C5;
  }
  &__disabled {
    background-color: #3f3f3f!important;
  }
}

</style>
