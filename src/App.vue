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

<script setup>
import '../src/assets/base.css'
import ProductCard from './components/ProductCard/ProductCard.vue'
import ProductsList from './components/ProductsList/ProductsList.vue'
import ToDoList from './components/ToDoList/TodoList.vue'
</script>

<style lang="scss" scoped>
.head {
  width: 100%;
  display: flex;
  justify-content: center;
  grid-column: 1 / 4;
  grid-row: 1 / 2;
  &__text {
    margin: 40px 0 28px 0;
    color: var(--color-heading);
    font-size: 1.85rem;
    font-weight: 500;
  }
}
</style>
