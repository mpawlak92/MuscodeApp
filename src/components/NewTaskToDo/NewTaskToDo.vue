<template>
  <div class="new-task">
    <input
      @keyup.enter="aproveNewTask"
      type="text"
      class="new-task__input"
      v-model="newTaskValue"
      required
    />
    <div class="new-task__placeholder"><span>+</span> Dodaj nowy element checklisty</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import '../../assets/base.css'
import { useTasksStore } from '../../stores/TasksStore'

const tasksStore = useTasksStore()

const newTaskValue = ref('')

const aproveNewTask = () => {
  tasksStore.addNewTask(newTaskValue.value)
  newTaskValue.value = ''
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
    line-height: 40px;
    padding: 0 0 0 13px;
    font-size: 0.83rem;
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
    pointer-events: none;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    line-height: 38px;
    font-size: 0.83rem;
    color: var(--color-text);

    span {
      position: relative;
      top: 3px;
      margin-right: 6px;
      font-size: 1.3rem;
      opacity: 0.6;
    }
  }
}
</style>
