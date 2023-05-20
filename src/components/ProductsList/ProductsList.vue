<template>
  <CardModel class="card-model-position" cardTitle="Lista Produktów">
    <template #card-content>
      <table class="product-table">
        <thead>
          <tr>
            <th class="product-table__id">#</th>
            <th class="product-table__name">nazwa</th>
            <th class="product-table__sale-price">promocyjna cena</th>
            <th class="product-table__price">cena</th>
            <th class="product-table__currency">waluta</th>
          </tr>
        </thead>
        <tbody>
          <tr :key="key" v-for="(product, key) in productsStore.products">
            <td class="product-table__id">{{ product.id }}</td>
            <td class="product-table__name">
              {{
                product.salePrice === 0 && product.price === 0
                  ? `
                  ${product.name} - Brak produktu`
                  : product.name
              }}
            </td>
            <td class="product-table__sale-price">
              {{
                product.salePrice === 0 && product.price === 0
                  ? null
                  : product.salePrice === 0
                  ? null
                  : product.salePrice
              }}
            </td>
            <td class="product-table__price">
              {{
                product.salePrice === 0 && product.price === 0
                  ? null
                  : product.price
              }}
            </td>
            <td class="product-table__currency">
              {{
                product.salePrice === 0 && product.price === 0
                  ? null
                  : product.currency
              }}
            </td>
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
  display: none;
}
.product-table {
  width: 100%;
  margin: 12px 0;
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
    padding-top: 5px;
    padding-bottom: 5px;
  }

  thead {
    text-align: left;
  }
  thead tr > * {
    text-transform: uppercase;
    font-size: 0.71rem;
    font-weight: 500;
    // letter-spacing: 0.5px;
  }

  &__id {
    width: 7%;
    padding-left: 10px;
  }

  &__name {
    width: 43%;
    padding-left: 8px;
  }

  &__sale-price {
    width: 22%;
    padding-left: 8px;
  }

  &__price {
    width: 16%;
  }
  &__currency {
    width: 12%;
    padding-left: 1px;
  }
}
@media (min-width: 660px) {
  .card-model-position {
    grid-column: 2/ 4;
    grid-row: 2 / 3;
    display: block;
  }
}
</style>
