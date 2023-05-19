<template>
  <li class="tasks-list__task">
    <input
      @click.self="handleTaskState(props.id)"
      type="checkbox"
      :checked="props.completed"
      :id="'task_' + props.id"
      class="tasks-list__checkbox"
    />
    <label :for="'task_' + props.id" class="tasks-list__label">{{ props.name }}</label>
  </li>
</template>

<script setup>
import { useTasksStore } from '../../stores/TasksStore'

const tasksStore = useTasksStore()

const props = defineProps({
  id: {
    type: Number,
    reequred: true
  },
  name: {
    type: String,
    reequred: true
  },
  completed: {
    type: Boolean,
    reequred: true
  }
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
    appearance: none;
    height: 18px;
    width: 19px;
    padding: 3px 3px;
    margin: 10px 7px 10px 10px;
    background-color: none;
    border-radius: 50%;
    border: 1px solid var(--color-border);
    cursor: pointer;

    &:checked::after {
      content: url(../../assets/check.svg);
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
