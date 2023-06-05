<template>
  <CardModel
    class="card-model-position"
    cardTitle="Lista Produktów"
    cardDescription="table with products list"
  >
    <template #card-content>
      <table class="product-table">
        <thead>
          <tr>
            <th
              class="product-table__id"
              tabindex="0"
              aria-label="table heading with product id"
            >
              #
            </th>
            <th
              class="product-table__name"
              tabindex="0"
              aria-label="table heading with product name"
            >
              nazwa
            </th>
            <th
              class="product-table__sale-price"
              tabindex="0"
              aria-label="table heading with product sale price"
            >
              promocyjna cena
            </th>
            <th
              class="product-table__price"
              tabindex="0"
              aria-label="table heading with product price"
            >
              cena
            </th>
            <th
              class="product-table__currency"
              tabindex="0"
              aria-label="table heading with currency"
            >
              waluta
            </th>
          </tr>
        </thead>
        <tbody>
          <tr :key="key" v-for="(product, key) in productsStore.products">
            <td
              class="product-table__id"
              tabindex="0"
              aria-label="table cell with product id"
            >
              {{ product.id }}
            </td>
            <td
              class="product-table__name"
              tabindex="0"
              aria-label="table cell with product name"
            >
              {{
                product.salePrice === 0 && product.price === 0
                  ? `
                  ${product.name} - Brak produktu`
                  : product.name
              }}
            </td>
            <td
              class="product-table__sale-price"
              tabindex="0"
              aria-label="table cell with product sale price"
            >
              {{
                product.salePrice === 0 && product.price === 0
                  ? null
                  : product.salePrice === 0
                  ? null
                  : product.salePrice
              }}
            </td>
            <td
              class="product-table__price"
              tabindex="0"
              aria-label="table cell with product price"
            >
              {{
                product.salePrice === 0 && product.price === 0
                  ? null
                  : product.price
              }}
            </td>
            <td
              class="product-table__currency"
              tabindex="0"
              aria-label="table cell with product currency"
            >
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
import { useProductsStore } from '@/stores/ProductsStore'

import '@/assets/base.css'

import CardModel from '@/components/CardModel.vue'

const productsStore = useProductsStore()
</script>

<style lang="scss" scoped>
.card-model-position {
  display: none;
}
.product-table {
  width: 100%;
  margin: 12px 0;
  font-size: 0.78rem;
  border-collapse: collapse;

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
    font-size: 0.71rem;
    font-weight: 500;
    text-transform: uppercase;
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
    display: block;
    grid-column: 2/ 4;
    grid-row: 2 / 3;
  }
}
</style>
