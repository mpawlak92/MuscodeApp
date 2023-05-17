<template>
  <CardModel class="card-model-position" cardTitle="Lista Produktów">
    <template #card-content>
      <table class="product-table">
        <thead>
          <tr>
            <th class="product-table__id">#</th>
            <th class="product-table__name">nazwa</th>
            <th class="product-table__slae-price">promocyjna cena</th>
            <th class="product-table__price">cena</th>
            <th class="product-table__currency">waluta</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="key" v-for="(product, key) in productsStore.products">
            <td class="product-table__id">{{ product.id }}</td>
            <td class="product-table__name">{{ product.name }}</td>
            <td class="product-table__slae-price">
              {{ product.salePrice === 0 ? null : product.salePrice }}
            </td>
            <td class="product-table__price">{{ product.price }}</td>
            <td class="product-table__currency">{{ product.currency }}</td>
          </tr>
        </tbody>
      </table>
    </template>
  </CardModel>
</template>

<script setup>
import '../../assets/base.css'
import CardModel from '../CardModel/CardModel.vue'

import { useProductsStore } from '../../stores/ProductsStore'

const productsStore = useProductsStore()
</script>

<style lang="scss" scoped>
.card-model-position {
  grid-column: 2/ 4;
  grid-row: 2 / 3;
}
.product-table {
  width: 100%;
  margin: 10px 0;
  border-collapse: collapse;
  font-size: 0.78rem;

  tr {
    border-bottom: 1px solid var(--color-border);
  }
  tbody tr:hover {
    background-color: var(--color-table-row);
    cursor: default;
  }

  th,
  td {
    padding: 5px 5px;
    padding-left: 10px;
  }

  thead {
    text-align: left;
  }
  thead tr > * {
    text-transform: uppercase;
    font-size: 0.71rem;
    font-weight: 500;
    letter-spacing: 0.5px;
  }

  &__id {
    width: 6%;
  }

  &__name {
    width: 42%;
  }

  &__sale-price {
    width: 22%;
  }

  &__price,
  &__currency {
    width: 15%;
  }
}
</style>
