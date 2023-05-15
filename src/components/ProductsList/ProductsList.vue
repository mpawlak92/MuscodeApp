<template>
  <div class="products-list">
    <p>product List</p>
  </div>
</template>

<script setup>
import '../../assets/base.css'
</script>

<style lang="scss" scoped>
.products-list {
  width: 100%;
  grid-column: 2/ 4;
  grid-row: 2 / 3;
  border-radius: 10px;
  background-color: var(--color-elements-background);
  box-shadow: 1px 1px 8px 1px var(--color-box-shadow);
}
</style>
