<template>
  <li class="tasks-list__task">
    <input
      type="checkbox"
      @click.self="handleTaskState(props.id)"
      :checked="props.completed"
      :id="'task_' + props.id"
      class="tasks-list__checkbox"
      role="checkbox"
      aria-label="it is checkbox, if you finish your task you can press space for check it"
    />
    <label
      :for="'task_' + props.id"
      class="tasks-list__label"
      :class="{ 'tasks-list__done-task': currentTaskState }"
      tabindex="0"
      aria-label="description of your task todo"
      >{{ props.name }}</label
    >
    <button
      v-if="currentTaskState"
      @click="deleteTask(props.id)"
      class="tasks-list__delete-btn"
      tabindex="0"
      aria-label="button to delete task, press enter to delete"
    />
  </li>
</template>

<script setup>
import { useTasksStore } from '@/stores/TasksStore'

const tasksStore = useTasksStore()

let currentTaskState = false

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
const emit = defineEmits(['deleteTaskError'])

const deleteTask = (id) => {
  const isError = tasksStore.deleteTask(id)

  if (!isError) {
    emit('deleteTaskError', isError)
  }
}
const handleTaskState = (id) => {
  tasksStore.changeTaskComplitedState(id)
  tasksStore.updateDoneTasksCounter()
  currentTaskState = tasksStore.currentTaskState(id)
}
</script>

<style lang="scss" scoped>
.tasks-list {
  &__task {
    width: 95%;
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
  &__done-task {
    text-decoration: line-through;
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
      content: url(../assets/check.svg);
      display: block;
      margin-top: -1px;
    }
    &:hover {
      background-color: var(--color-background);
    }
    &:checked {
      // background-color: var(--color-checkbox-checked);
      border: 1px solid var(--color-checkbox-checked);
    }
  }

  &__delete-btn {
    width: 20px;
    height: 25px;
    margin-left: 5px;
    border: none;
    background: none;
    background-image: url(../../assets/trash.svg);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>
