<template>
  <div class="products-card">
    <p>product card</p>
  </div>
</template>

<script setup>
import '../../assets/base.css'
</script>

<style lang="scss" scoped>
.products-card {
  width: 100%;
  grid-row: 3 / 4;
  border-radius: 10px;
  background-color: var(--color-elements-background);
  box-shadow: 1px 1px 8px 1px var(--color-box-shadow);
}
</style>
