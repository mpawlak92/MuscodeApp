<template>
  <div class="todo-list">
    <div class="todo-list__heading-box">
      <h2 class="todo-list__heading">Lista todo</h2>
      <p class="todo-list__heading">Wykonane: {{ tasksStore.doneTasksCounter }}</p>
    </div>
    <TaskList />
    <NewTaskToDo />
  </div>
</template>

<script setup>
import '../../assets/base.css'
import TaskList from '../TaskList/Tasklist.vue'
import NewTaskToDo from '@/components/NewTaskToDo/NewTaskToDo.vue'
import { useTasksStore } from '../../stores/TasksStore'

const tasksStore = useTasksStore()
</script>

<style lang="scss" scoped>
.todo-list {
  width: 100%;
  grid-column: 1/ 2;
  grid-row: 2 / 3;
  padding: 20px 20px;
  border-radius: 10px;
  background-color: var(--color-elements-background);
  box-shadow: 1px 1px 8px 1px var(--color-box-shadow);

  &__heading-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
  }
  &__heading {
    font-size: 1rem;
    font-weight: 500;
  }
}
</style>
