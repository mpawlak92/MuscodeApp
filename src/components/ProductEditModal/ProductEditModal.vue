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
          <form action="">
            <label class="modal__form-label" for="product-name"
              >Nazwa produktu</label
            >
            <input
              class="modal__form-input"
              ref="productNameInput"
              type="text"
              id="product-name"
              v-model="productName"
            />
            <span
              class="modal__form-error"
              v-for="(error, index) of v$.productName.$errors"
              :key="index"
            >
              <strong>{{ error.$message }}</strong>
            </span>

            <label class="modal__form-label" for="price">Cena</label>
            <input
              class="modal__form-input"
              type="number"
              id="price"
              v-model="producPrice"
              @keydown="onlyNumberAllowed"
            />
            <span
              class="modal__form-error"
              v-for="(error, index) of v$.producPrice.$errors"
              :key="index"
            >
              <strong>{{ error.$message }}</strong>
            </span>

            <label class="modal__form-label" for="sale-price"
              >Promocyjna cena</label
            >
            <input
              class="modal__form-input"
              type="number"
              id="sale-price"
              v-model="productSalePrice"
              @keydown="onlyNumberAllowed"
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
import { reactive, toRefs, ref, onMounted } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, minValue, minLength } from '@vuelidate/validators'

import BtnModel from '@/components/BtnModel/BtnModel.vue'
import ModalModel from '@/components//ModalModel/ModalModel.vue'

const productsStore = useProductsStore()

const props = defineProps({
  productId: {
    type: Number,
  },
})

const productNameInput = ref(null)
onMounted(() => {
  productNameInput.value.focus()
})

const emit = defineEmits(['closeModal'])

let productToEdit

if (productsStore.products[props.productId].id === props.productId) {
  productToEdit = productsStore.products[props.productId]
}

const getImageUrl = (assetName) => {
  return new URL(`../../assets/${assetName}.png`, import.meta.url).href
}

const modalData = reactive({
  productName: productToEdit.name,
  producPrice: productToEdit.price,
  productSalePrice: productToEdit.salePrice,
  productCurrency: productToEdit.currency,
  validationError: false,
})

const {
  productName,
  producPrice,
  productSalePrice,
  productCurrency,
  validationError,
} = toRefs(modalData)

const priceBiggerThanSalePrice = (value) => value >= productSalePrice.value
const onlyNumberAllowedREGEXP = /[0-9/]/

const onlyNumberAllowed = (e) => {
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

const rules = {
  productName: { minLength: minLength(3), required },
  producPrice: {
    minLength: minLength(1),
    minValue: minValue(0),
    required,
    priceBiggerThanSalePrice: helpers.withMessage(
      'Price have to be higher than sale price',
      priceBiggerThanSalePrice
    ),
  },
  productSalePrice: {
    minLength: minLength(1),
    minValue: minValue(0),
    required,
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

    productsStore.editProduct(newProduct, props.productId)

    emit('closeModal')
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
