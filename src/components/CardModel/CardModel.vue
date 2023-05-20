<template>
  <div class="card" tabindex="0" :role="cardRole" :aria-label="cardDescription">
    <div class="card__heading-box">
      <h2
        class="card__heading"
        tabindex="0"
        role="title"
        :aria-label="'Card title: ' + props.cardTitle"
      >
        {{ props.cardTitle }}
      </h2>
      <slot name="card-heading"></slot>
    </div>
    <slot name="card-content"></slot>
  </div>
</template>

<script setup>
import '../../assets/base.css'

const props = defineProps({
  cardTitle: {
    type: String,
    default: 'Card title',
  },
  cardRole: {
    type: String,
    default: 'Container',
  },
  cardDescription: {
    type: String,
    default: 'It is card with some data inside',
  },
})
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 820px;
  margin: 10px;
  padding: 20px 20px;
  border-radius: 10px;
  background-color: var(--color-elements-background);
  box-shadow: 1px 1px 8px 1px var(--color-box-shadow);

  &:focus {
    border: 1px solid black;
  }
  &__heading-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
  }
  &__heading {
    color: var(--color-heading);
    font-size: 1rem;
    font-weight: 500;
  }
}
@media (min-width: 1000px) {
  .card {
    max-width: 100%;
    margin: 0px;
  }
}
</style>
