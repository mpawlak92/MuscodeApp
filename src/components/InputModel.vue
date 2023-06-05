<template>
  <label
    :class="{ 'modal__form-label': inputAllocation === 'modal' }"
    :for="props.inputId"
    >{{ props.labelName }}</label
  >
  <input
    :class="{ 'modal__form-input': inputAllocation === 'modal' }"
    :type="props.inputType"
    :id="props.inputId"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    @keydown="validationNumberInput"
  />
  <slot></slot>
</template>

<script setup>
// defineProps(['modelValue'])
defineEmits(['update:modelValue'])
const props = defineProps({
  inputId: {
    type: String,
    required: true,
  },
  inputType: {
    type: String,
    required: true,
  },
  labelName: {
    type: String,
    required: true,
  },
  inputAllocation: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  reference: {
    type: String,
    default: null,
  },
})

const onlyNumberAllowedREGEXP = /[0-9/]/

const validationNumberInput = (e) => {
  if (props.inputType !== 'number') return
  if (
    e.keyCode == 37 ||
    e.keyCode == 38 ||
    e.keyCode == 39 ||
    e.keyCode == 40 ||
    e.keyCode == 8 ||
    e.keyCode == 9 ||
    e.keyCode == 46
  ) {
    return
  }
  if (!onlyNumberAllowedREGEXP.test(e.key)) {
    e.preventDefault()
  }
}
</script>

<style lang="scss" scoped>
.container-for-positioning {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
.modal {
  position: fixed;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: var(--color-elements-background);
  &__head {
    display: flex;
    align-items: center;
    width: 100%;
    height: 90px;
    padding-left: 10px;
    font-size: 0.64rem;
    border-bottom: 4px solid #39428e;
    h1 {
      color: var(--color-heading);
      font-weight: 500;
    }
  }
  &__product-img {
    display: block;
    width: 32%;
    aspect-ratio: 1/1;
    margin: 30px auto 25px auto;
    border-radius: 50%;
    box-shadow: 1px 1px 4px 4px var(--color-box-shadow);
  }
  &__form-label,
  &__form-input {
    display: block;
    width: calc(100% - 20px);
    margin: 0 10px;
    padding-left: 5px;
  }
  &__form-label {
    color: var(--color-heading);
    font-size: 0.8rem;
    opacity: 0.7;
  }
  &__form-input {
    height: 20px;
    margin-bottom: 15px;
    margin-top: 8px;
    border: none;
    border-bottom: 1px solid var(--color-border);
  }
  &__form-input:focus {
    border-bottom: 2px solid var(--color-border);
    outline-color: transparent;
  }
  &__form-error,
  &__save-error {
    display: block;
    padding-left: 5px;
    color: red;
  }

  &__form-error {
    width: calc(100% - 20px);
    margin: -8px 10px 12px;
  }
  &__save-error {
    width: 60%;
    margin: 0 auto;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
  }
  &__btns {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    padding: 10px 5px;
  }
}

@media (min-width: 576px) {
  .container-for-positioning {
    justify-content: space-between;
  }

  .modal {
    width: 70vw;
    &__btns {
      border-top: 1px solid var(--color-border);
    }
  }
}
@media (min-width: 768px) {
  .modal {
    width: 50vw;
  }
}
@media (min-width: 1200px) {
  .modal {
    width: 40vw;
  }
}
@media (min-width: 1400px) {
  .modal {
    width: 32vw;
  }
}
</style>
