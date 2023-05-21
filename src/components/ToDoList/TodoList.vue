<template>
  <CardModel class="card-model-position" cardTitle="Lista todo">
    <template #card-heading>
      <p
        class="todo-list-heading"
        tabindex="0"
        aria-label="Information about nouber of done tasks"
      >
        Wykonane: {{ tasksStore.doneTasksCounter }}
      </p>
    </template>

    <template #card-content>
      <TasksList />
      <NewTaskToDo />
    </template>
  </CardModel>
</template>

<script setup>
import { useTasksStore } from '@/stores/TasksStore'

import '@/assets/base.css'

import CardModel from '@/components/CardModel/CardModel.vue'
import NewTaskToDo from '@/components/NewTaskToDo/NewTaskToDo.vue'
import TasksList from '@/components/TasksList/TasksList.vue'

const tasksStore = useTasksStore()
</script>

<style lang="scss" scoped>
.card-model-position {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-width: 400px;
}
.todo-list-heading {
  color: var(--color-heading);
  font-size: 1rem;
  font-weight: 500;
}
@media (min-width: 1000px) {
  .card-model-position {
    grid-column: 1/ 2;
    grid-row: 2 / 3;
  }
}
</style>
