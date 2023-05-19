<template>
  <button
    :style="{
      color: color,
      backgroundColor: bgColor,
      fontSize: fontSize,
      border: border,
      padding: padding,
      margin: margin,
    }"
  >
    {{ props.content }}
  </button>
</template>

<script setup>
const props = defineProps({
  content: {
    type: String,
    default: 'Btn name',
  },
  color: {
    type: String,
    default: '#384a5c',
  },
  bgColor: {
    type: String,
    default: '#fff',
  },
  fontSize: {
    type: String,
    default: '1rem',
  },
  border: {
    type: String,
    default: '1px solid #b2b2b2',
  },
  padding: {
    type: String,
    default: '5px',
  },
  margin: {
    type: String,
    default: '5px 5px',
  },
})
</script>

<style lang="scss" scoped></style>
