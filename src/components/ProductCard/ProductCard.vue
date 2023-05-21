<template>
  <CardModel
    v-for="product in productsStore.products"
    :key="product.id"
    class="product-card card-model-position"
    :cardTitle="product.name"
    cardRole="button"
    cardDescription="It is card with product, you can click it or press enter key for edit product data"
    @click="toggleModalState(product.id)"
    @keyup.enter="toggleModalState(product.id)"
  >
    <template #card-content>
      <div v-if="product.salePrice !== 0" class="product-card__sash">
        {{ showDiscountPercent(product.salePrice, product.price) }}
      </div>

      <img
        class="product-card__img"
        :src="getImageUrl(product.img)"
        :alt="product.alt"
        tabindex="0"
        role="img"
      />

      <p>{{ isModalVisible }}</p>
      <div
        class="product-card__sale-price"
        tabindex="0"
        role="contentinfo"
        aria-label="Product sale price"
      >
        {{
          showProductSalePrice(
            product.salePrice,
            product.price,
            product.currency
          )
        }}
      </div>
      <div
        class="product-card__price"
        tabindex="0"
        role="contentinfo"
        aria-label="Product price"
      >
        {{
          showProductPrice(product.salePrice, product.price, product.currency)
        }}
      </div>
    </template>
  </CardModel>
  <teleport to="#modals">
    <ProductEditModal
      v-if="modalIsActive"
      :productId="productId"
      @closeModal="toggleModalState(null)"
    />
  </teleport>
</template>

<script setup>
import { ref } from 'vue'
import { useProductsStore } from '@/stores/ProductsStore'

import '@/assets/base.css'

import CardModel from '@/components/CardModel/CardModel.vue'
import ProductEditModal from '@/components/ProductEditModal/ProductEditModal.vue'

const productsStore = useProductsStore()

const modalIsActive = ref(false)
const productId = ref(0)

const showProductSalePrice = (salePrice, price, currency) => {
  if (salePrice === 0 && price === 0) {
    return 'Brak produktu'
  } else if (salePrice === 0) {
    return price + ' ' + currency
  } else {
    return salePrice + ' ' + currency
  }
}

const showProductPrice = (salePrice, price, currency) => {
  if (salePrice === 0) {
    return null
  } else {
    return price + ' ' + currency
  }
}

const showDiscountPercent = (salePrice, price) => {
  return (-((price - salePrice) / price) * 100).toFixed(0) + '%'
}
const getImageUrl = (assetName) => {
  return new URL(`../../assets/${assetName}.png`, import.meta.url).href
}
function toggleModalState(id) {
  productId.value = id
  modalIsActive.value = !modalIsActive.value
}
</script>

<style lang="scss" scoped>
.product-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  cursor: pointer;
  overflow: hidden;
  transition: scale 0.5s;

  &:hover {
    scale: 1.02;
  }

  &__sash {
    display: none;
    justify-content: center;
    position: absolute;
    right: -12%;
    top: 8%;
    width: 170px;
    height: 19px;
    padding-top: 2px;
    color: #fff;
    font-size: 0.75rem;
    font-weight: 500;
    background-color: #000;
    transform: rotate(45deg);
  }
  &__img {
    display: block;
    max-width: 100%;
    height: 200px;
    margin: 15px auto;
  }
  &__sale-price {
    text-align: center;
    color: var(--color-btn);
    font-size: 1rem;
    font-weight: bold;
  }
  &__price {
    text-align: center;
    margin-top: 5px;
    text-decoration: line-through;
  }
}
@media (min-width: 100px) {
  .card-model-position {
    grid-row: 3 / 4;
  }
}
@media (min-width: 350px) {
  .product-card__sash {
    display: flex;
  }
}
</style>
