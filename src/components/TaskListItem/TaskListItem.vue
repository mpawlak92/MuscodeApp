<template>
  <li class="tasks-list__task">
    <input
      @click.self="handleTaskState(props.id)"
      type="checkbox"
      :checked="props.completed"
      :id="'task_' + props.id"
      class="tasks-list__checkbox"
      role="checkbox"
      aria-label="it is checkbox, if you finish your task you can press space for check it"
    />
    <label
      :for="'task_' + props.id"
      class="tasks-list__label"
      tabindex="0"
      aria-label="description of your task todo"
      >{{ props.name }}</label
    >
  </li>
</template>

<script setup>
import { useTasksStore } from '@/stores/TasksStore'

const tasksStore = useTasksStore()

const props = defineProps({
  id: {
    type: Number,
    reequred: true,
  },
  name: {
    type: String,
    reequred: true,
  },
  completed: {
    type: Boolean,
    reequred: true,
  },
})

const handleTaskState = (id) => {
  tasksStore.changeTaskComplitedState(id)
  tasksStore.updateDoneTasksCounter()
}
</script>

<style lang="scss" scoped>
.tasks-list {
  &__task {
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--color-border);
  }
  &__label {
    width: 100%;
    padding-bottom: 2px;
    font-size: 0.83rem;
    cursor: pointer;
  }
  &__checkbox {
    height: 18px;
    width: 19px;
    margin: 10px 7px 10px 10px;
    padding: 3px 3px;
    background-color: none;
    border: 1px solid var(--color-border);
    border-radius: 50%;
    cursor: pointer;
    appearance: none;

    &:checked::after {
      content: url(../../assets/check.svg);
      display: block;
      margin-top: -1px;
    }
    &:hover {
      background-color: var(--color-background);
    }
    &:checked {
      background-color: var(--color-checkbox-checked);
    }
  }
}
</style>
