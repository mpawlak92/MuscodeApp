<template>
  <ul class="tasks-list">
    <TaskListItem
      v-for="task in tasksStore.tasks"
      :key="task.id"
      :id="task.id"
      :name="task.title"
      :complited="task.completed"
    />
  </ul>
</template>

<script setup>
import TaskListItem from '../TaskListItem/TaskListItem.vue'
import { useTasksStore } from '../../stores/TasksStore'

const tasksStore = useTasksStore()
</script>

<style lang="scss" scoped>
.tasks-list {
  margin: 15px 0 0 0;
  padding: 0;
  list-style: none;
}

</style>
