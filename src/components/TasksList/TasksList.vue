<template>
  <span class="error" v-if="isError">
    Nie odnaleziono zadania do skasowania</span
  >
  <ul class="tasks-list">
    <TasksListItem
      v-for="task in tasksStore.tasks"
      :key="task.id"
      :id="task.id"
      :name="task.title"
      :complited="task.completed"
      @deleteTaskError="showError"
    />
  </ul>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/TasksStore'

import TasksListItem from '@/components//TasksListItem/TasksListItem.vue'

const isError = ref(false)

const tasksStore = useTasksStore()

const showError = () => {
  isError.value = true
  setTimeout(function () {
    isError.value = false
  }, 3000)
}
</script>

<style lang="scss" scoped>
.error {
  text-align: center;
  margin: 20px;
  color: red;
  font-weight: bold;
}
.tasks-list {
  margin: 15px 0 0 0;
  padding: 0;
  list-style: none;
}
</style>
