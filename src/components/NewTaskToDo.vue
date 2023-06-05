<template>
  <div class="new-task">
    <input
      type="text"
      class="new-task__input"
      @keyup.enter="aproveNewTask"
      v-model="newTaskValue"
      required
      id="newTask"
      aria-label="it is field when you can write your new task and aprove it by enter"
    />
    <label for="newTask" class="new-task__placeholder">
      <span>+</span> Dodaj nowy element checklisty
    </label>
  </div>
  <div class="task-error">{{ newTaskError }}</div>
</template>

<script setup>
import { ref } from 'vue'
import '@/assets/base.css'
import { useTasksStore } from '@/stores/TasksStore'

const tasksStore = useTasksStore()

const newTaskValue = ref('')
const newTaskError = ref('')

const newTaskValidation = (newTaskValue) => {
  if (newTaskValue === '') {
    return 'Pole nie może byc puste'
  } else if (newTaskValue.length < 3) {
    return 'Nowy task musi mieć co najmniej 3 znaki'
  } else {
    return true
  }
}
const aproveNewTask = () => {
  newTaskError.value = ''
  const validationValue = newTaskValidation(newTaskValue.value)
  if (validationValue === true) {
    tasksStore.addNewTask(newTaskValue.value)
    newTaskValue.value = ''
  } else {
    newTaskError.value = validationValue

    setTimeout(() => {
      newTaskError.value = ''
    }, 5000)
  }
}
</script>

<style lang="scss" scoped>
.new-task {
  position: relative;
  border-bottom: 1px solid var(--color-border);

  &__input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 38px;
    padding: 0 0 0 13px;
    font-size: 0.83rem;
    line-height: 40px;
    border: none;

    &:focus {
      outline-color: var(--color-border);
    }
  }
  &__input:valid + &__placeholder {
    display: none;
  }
  &__placeholder {
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    color: var(--color-text);
    font-size: 0.83rem;
    line-height: 38px;
    pointer-events: none;

    span {
      position: relative;
      top: 3px;
      margin-right: 6px;
      font-size: 1.3rem;
      opacity: 0.6;
    }
  }
}
.task-error {
  margin: 0 auto;
  padding-top: 10px;
  color: red;
}
</style>
