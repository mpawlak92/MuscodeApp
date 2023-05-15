<script setup>
import '../src/assets/base.css'
import ProductCard from './components/ProductCard/ProductCard.vue'
import ProductsList from './components/ProductsList/ProductsList.vue'
import ToDoList from './components/ToDoList/TodoList.vue'
</script>

<template>
  <div class="head">
    <h1 class="head__text">Muscode App</h1>
  </div>
  <ToDoList />
  <ProductsList />
  <ProductCard />
  <ProductCard />
  <ProductCard />
</template>

<style lang="scss" scoped>
.head {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  &__text {
    color: var(--color-heading);
    font-size: 1.8rem;
    font-weight: 500;
  }
}
</style>
