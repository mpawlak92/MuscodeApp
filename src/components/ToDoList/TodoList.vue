<template>
  <CardModel class="card-model-position" cardTitle="Lista Produktów">
    <template #card-heading>
      <p class="todo-list-heading">Wykonane: {{ tasksStore.doneTasksCounter }}</p>
    </template>
    <template #card-content>
      <TaskList />
      <NewTaskToDo />
    </template>
  </CardModel>
</template>

<script setup>
import '../../assets/base.css'

import CardModel from '../CardModel/CardModel.vue'
import NewTaskToDo from '@/components/NewTaskToDo/NewTaskToDo.vue'
import TaskList from '../TaskList/Tasklist.vue'

import { useTasksStore } from '../../stores/TasksStore'

const tasksStore = useTasksStore()
</script>

<style lang="scss" scoped>
.card-model-position {
  grid-column: 1/ 2;
  grid-row: 2 / 3;
}
.todo-list-heading {
  color: var(--color-heading);
  font-weight: 500;
  font-size: 1rem;
}
</style>
