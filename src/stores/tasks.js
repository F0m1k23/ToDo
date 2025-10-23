import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
export const useTasksStore = defineStore('tasks', () => {
  const toast = useToast()

  const tasks = ref([])
  const menuItems = [
    { icon: '🏠', label: 'Дом' },
    { icon: '🚀', label: 'Учеба' },
    { icon: '💡', label: 'Идеи' },
    { icon: '👤', label: 'Работа' },
    { icon: '🎯', label: 'Цели' },
  ]

  if (localStorage.getItem('tasks')) {
    try {
      tasks.value = JSON.parse(localStorage.getItem('tasks'))
    } catch (e) {
      console.log(e, 'Ошибка сохранения')
      tasks.value = []
    }
  }
  const addTask = (task) => {
    if (task.title.trim() === '') {
      toast.error('Введите задачу')
      return
    }
    tasks.value.push({
      id: Date.now(),
      title: task.title,
      description: task.description,
      isDone: task.isDone,
      topic: task.topic,
    })
    toast.success('Задача добавлена')
  }

  const removeTask = (id) => {
    const taskId = tasks.value.find((item) => item.id === id)
    tasks.value = tasks.value.filter((task) => task !== taskId)
    toast.success('Задача удалена')
  }

  const taskDone = (id) => {
    const task = tasks.value.find((item) => item.id === id)
    if (task) {
      task.isDone = !task.isDone
      toast.success('Статус задачи изменен')
    }
  }

  const editTask = (item) => {
    const index = tasks.value.findIndex((task) => task.id === item.id)
    if (index !== -1) {
      tasks.value[index] = item
    }
    // if (newid !== -1) {
    //   tasks.value[newid] = { ...tasks.value[newid], ...id }
    //   console.log(tasks.value)
    // }
  }

  const allTasks = computed(() => tasks.value.filter((task) => !task.isDone))
  const isDoneArray = computed(() => tasks.value.filter((task) => task.isDone))

  watch(
    tasks,
    (newTask) => {
      localStorage.setItem('tasks', JSON.stringify(newTask))
    },
    {
      deep: true,
    },
  )

  return { tasks, addTask, removeTask, taskDone, isDoneArray, allTasks, menuItems, editTask }
})
