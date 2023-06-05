<template>
  <ModalModel @keyup.esc="$emit('closeModal')">
    <template #modalContent>
      <div
        class="modal"
        tabindex="0"
        aria-label="Ii is modal for edit product informations"
      >
        <div
          class="modal__head"
          tabindex="0"
          aria-label="Name of editing product"
          ref="productNameInput"
        >
          <h1>Edycja produktu: {{ productToEdit.name }}</h1>
        </div>
        <img
          :src="getImageUrl(productToEdit.img)"
          alt="avatar with is a product image in cirlce brder"
          class="modal__product-img"
          tabindex="0"
        />

        <div class="container-for-positioning">
          <form>
            <InputModel
              labelName="Nazwa produktu"
              inputType="text"
              inputId="product-name"
              inputAllocation="modal"
              v-model="productName"
            />
            <span
              class="modal__form-error"
              v-for="(error, index) of v$.productName.$errors"
              :key="index"
            >
              <strong>{{ error.$message }}</strong>
            </span>

            <InputModel
              labelName="Cena"
              inputType="number"
              inputId="price"
              inputAllocation="modal"
              v-model="producPrice"
            />
            <span
              class="modal__form-error"
              v-for="(error, index) of v$.producPrice.$errors"
              :key="index"
            >
              <strong>{{ error.$message }}</strong>
            </span>

            <InputModel
              labelName="Promocyjna cena"
              inputType="number"
              inputId="sale-price"
              inputAllocation="modal"
              v-model="productSalePrice"
            />
            <span
              class="modal__form-error"
              v-for="(error, index) of v$.productSalePrice.$errors"
              :key="index"
            >
              <strong>{{ error.$message }}</strong>
            </span>

            <label class="modal__form-label" for="currency">Waluta</label>
            <select
              class="modal__form-input"
              name="currency"
              id="currency"
              v-model="productCurrency"
            >
              <option selected>$</option>
              <option>PLN</option>
              <option>EUR</option>
            </select>
          </form>

          <div v-show="validationError" class="modal__save-error">
            Musisz wypełnic wszystkie pola poprawnie aby zapisać zmiany!
          </div>
          <div v-show="productNotFoundError" class="modal__save-error">
            Nie znaleziono produktu
          </div>

          <div class="modal__btns">
            <BtnModel
              :content="'Zapisz'"
              :bgColor="'#862583'"
              :color="'#fff'"
              :fontSize="'0.8rem'"
              :padding="'7px 13px'"
              :border="'none'"
              @click="saveNewProductData"
            />
            <BtnModel
              :content="'Anuluj'"
              :fontSize="'0.8rem'"
              :padding="'6px 12px'"
              :margin="'5px 5px 5px 0'"
              @click="$emit('closeModal')"
            />
          </div>
        </div>
      </div>
    </template>
  </ModalModel>
</template>

<script setup>
import { useProductsStore } from '@/stores/ProductsStore'
import { onMounted, reactive, ref, toRefs } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, minLength, maxLength } from '@vuelidate/validators'

import BtnModel from '@/components/BtnModel.vue'
import ModalModel from '@/components/ModalModel.vue'
import InputModel from './InputModel.vue'

const productsStore = useProductsStore()

const props = defineProps({
  productId: {
    type: Number,
  },
})

let productToEdit
;(function setProductToEditIfExist() {
  if (productsStore.products[props.productId].id === props.productId) {
    productToEdit = productsStore.products[props.productId]
  }
})()

const productNameInput = ref(null)
onMounted(() => {
  productNameInput.value.focus()
})

const emit = defineEmits(['closeModal'])

const getImageUrl = (assetName) => {
  return new URL(`../assets/${assetName}.png`, import.meta.url).href
}

const modalData = reactive({
  productName: productToEdit.name,
  producPrice: productToEdit.price,
  productSalePrice: productToEdit.salePrice,
  productCurrency: productToEdit.currency,
  validationError: false,
  productNotFoundError: false,
})

const {
  productName,
  producPrice,
  productSalePrice,
  productCurrency,
  validationError,
  productNotFoundError,
} = toRefs(modalData)

const priceBiggerThanSalePrice = (value) => value >= productSalePrice.value

const rules = {
  productName: {
    minLength: helpers.withMessage(
      'Minimalna długość nazwy to 3 znaki',
      minLength(3)
    ),
    required: helpers.withMessage('Pole nie może być puste', required),
  },
  producPrice: {
    required: helpers.withMessage('Pole nie może być puste', required),
    priceBiggerThanSalePrice: helpers.withMessage(
      'Cena promocyjna nie może przekraczać wartości podstawowej ceny produktu',
      priceBiggerThanSalePrice
    ),
    maxLengthValue: helpers.withMessage(
      'Pole może zawierać maksymalnie 15 znaków',
      maxLength(15)
    ),
  },
  productSalePrice: {
    required: helpers.withMessage('Pole nie może być puste', required),
    maxLengthValue: helpers.withMessage(
      'Pole może zawierać maksymalnie 15 znaków',
      maxLength(15)
    ),
  },
}

const v$ = useVuelidate(rules, modalData)
v$.value.$validate()

const saveNewProductData = async () => {
  const result = await v$.value.$validate()

  if (result) {
    validationError.value = false

    const newProduct = {
      name: productName,
      salePrice: productSalePrice,
      price: producPrice,
      currency: productCurrency,
    }

    const updated = productsStore.editProduct(newProduct, props.productId)
    console.log(updated)

    if (updated) {
      emit('closeModal')
    } else {
      productNotFoundError.value = true
    }
  } else {
    validationError.value = true
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
