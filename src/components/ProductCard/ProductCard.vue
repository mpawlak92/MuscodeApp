<template>
  <CardModel
    v-for="product in productsStore.products"
    :key="product.id"
    class="product-card card-model-position"
    :cardTitle="product.name"
    @click="toggleModalState(product.id)"
  >
    <template #card-content>
      <div v-if="product.salePrice !== 0" class="product-card__sash">
        {{
          -(
            ((product.price - product.salePrice) / product.price) *
            100
          ).toFixed(0)
        }}%
      </div>

      <img
        class="product-card__img"
        :src="getImageUrl(product.img)"
        :alt="product.alt"
      />

      <p>{{ isModalVisible }}</p>
      <div class="product-card__sale-price">
        {{
          product.salePrice === 0 && product.price === 0
            ? 'Brak produktu'
            : product.salePrice === 0
            ? product.price + ' ' + product.currency
            : product.salePrice + ' ' + product.currency
        }}
      </div>
      <div class="product-card__price">
        {{
          product.salePrice === 0
            ? null
            : product.price + ' ' + product.currency
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
import ProductEditModal from '../ProductEditModal/ProductEditModal.vue'
import '../../assets/base.css'
import CardModel from '../CardModel/CardModel.vue'
import { useProductsStore } from '@/stores/ProductsStore'

const productsStore = useProductsStore()

const modalIsActive = ref(false)
const productId = ref(0)

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
  overflow: hidden;
  cursor: pointer;
  transition: scale 0.5s;

  &:hover {
    scale: 1.02;
  }

  &__sash {
    display: none;
    position: absolute;
    right: -12%;
    top: 8%;
    justify-content: center;
    padding-top: 2px;
    width: 170px;
    height: 19px;
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
    font-size: 1rem;
    font-weight: bold;
    color: var(--color-btn);
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
