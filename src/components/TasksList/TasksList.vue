<template>
  <ul class="tasks-list">
    <TasksListItem
      v-for="task in tasksStore.tasks"
      :key="task.id"
      :id="task.id"
      :name="task.title"
      :complited="task.completed"
    />
  </ul>
</template>

<script setup>
import { useTasksStore } from '@/stores/TasksStore'

import TasksListItem from '@/components//TasksListItem/TasksListItem.vue'

const tasksStore = useTasksStore()
</script>

<style lang="scss" scoped>
.tasks-list {
  margin: 15px 0 0 0;
  padding: 0;
  list-style: none;
}
</style>
