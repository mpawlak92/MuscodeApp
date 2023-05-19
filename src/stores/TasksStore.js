import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasksStore', {
  state: () => ({
    tasks: [
      {
        id: 1,
        title: 'Lorem ipsum dolor sit amet, consectetur',
        completed: false,
      },
      {
        id: 2,
        title: 'Sed do eiusmod tempor incididunt',
        completed: false,
      },
      {
        id: 3,
        title: 'Labore et dolore magna aliqua',
        completed: false,
      },
      {
        id: 4,
        title: 'Sed ut perspiciatis unde omnis iste natus',
        completed: false,
      },
      {
        id: 5,
        title: 'Minima veniam, quis nostrum qxercitationem',
        completed: false,
      },
    ],
    doneTasksCounter: 0,
  }),
  actions: {
    changeTaskComplitedState(id) {
      Array.from(this.tasks).forEach((task) => {
        if (task.id === id) {
          task.completed = !task.completed
        }
      })
    },
    updateDoneTasksCounter() {
      let counter = 0
      this.doneTasksCounter = Array.from(this.tasks).forEach((task) => {
        if (task.completed === true) {
          //   console.log('1')
          counter++
          //   this.doneTasksCounter++
          //   console.log(this.doneTasksCounter)
        }
      })
      this.doneTasksCounter = counter
    },
    addNewTask(task) {
      this.tasks.push({
        id: 0,
        title: task,
        completed: false,
      })
    },
  },
})
