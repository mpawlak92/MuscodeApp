<template>
  <div class="head">
    <h1 class="head__text">Muscode App</h1>
  </div>
  <ToDoList />
  <ProductsList />
  <ProductCard />
</template>

<script setup>
import '@/assets/base.css'
import ProductCard from '@/components/ProductCard/ProductCard.vue'
import ProductsList from '@/components/ProductsList/ProductsList.vue'
import ToDoList from '@/components/ToDoList/TodoList.vue'
</script>

<style lang="scss" scoped>
.head {
  display: flex;
  justify-content: center;
  width: 100%;

  &__text {
    margin: 40px 0 28px 0;
    color: var(--color-heading);
    font-size: 1.85rem;
    font-weight: 500;
  }
}
@media (min-width: 1000px) {
  .head {
    display: grid;
    grid-column: 1 / 4;
    grid-row: 1 / 2;
  }
}
</style>
