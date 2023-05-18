<template>
  <CardModel
    v-for="(product, key) in productsStore.products"
    :key="key"
    class="product-card card-model-position"
    :cardTitle="product.name"
  >
    <template #card-content>
      <div v-if="product.salePrice !== 0" class="product-card__sash">
        -{{ (((product.price % product.salePrice) / product.price) * 100).toFixed(0) }}%
      </div>
      <img class="product-card__img" :src="getImageUrl(product.img)" />
      <div class="product-card__sale-price">
        {{
          product.salePrice === 0
            ? product.price + ' ' + product.currency
            : product.salePrice + ' ' + product.currency
        }}
      </div>
      <div class="product-card__price">
        {{ product.salePrice === 0 ? null : product.price + ' ' + product.currency }}
      </div>
    </template>
  </CardModel>
</template>

<script setup>
import '../../assets/base.css'
import CardModel from '../CardModel/CardModel.vue'
import { useProductsStore } from '@/stores/ProductsStore'

const getImageUrl = (assetName) => {
  return new URL(`../../assets/${assetName}.png`, import.meta.url).href
}
const productsStore = useProductsStore()
</script>

<style lang="scss" scoped>
.card-model-position {
  grid-row: 3 / 4;
}
.product-card {
  position: relative;
  width: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: scale 0.5s;

  &:hover {
    scale: 1.02;
  }

  &__sash {
    position: absolute;
    right: -12%;
    top: 8%;
    display: flex;
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
</style>
