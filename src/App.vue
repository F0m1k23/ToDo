<script setup>
import TodoForm from "./components/TodoForm.vue";
import Item from "./components/Item.vue";
import Header from "./components/Header.vue";
import Modal from "./components/Modal.vue";
import Tabs from "./components/Tabs.vue";
import { ref } from "vue";

// --------------------
// Реактивные переменные
// --------------------
const tasks = ref([]);
const tasksEnd = ref([]);
const taskDelete = ref([]);
const modalOpen = ref(null); // "End" | "Trash" | null

// --------------------
// Методы работы с задачами
// --------------------
const taskAdd = (task) => {
  tasks.value.push(task);
};

const deleteTask = (t) => {
  tasks.value = tasks.value.filter((item) => item !== t);
  tasksEnd.value = tasksEnd.value.filter((item) => item !== t);
  taskDelete.value.push(t);
};

const isDoneTask = (t) => {
  t.isDone = !t.isDone;
  if (t.isDone) {
    tasksEnd.value.push(t);
  } else {
    const index = tasksEnd.value.findIndex((task) => task === t);
    if (index !== -1) tasksEnd.value.splice(index, 1);
  }
};

const deleteTaskTasksEnd = (t) => {
  tasksEnd.value = tasksEnd.value.filter((item) => item !== t);
};

const delTaskArrayDel = (t) => {
  taskDelete.value = taskDelete.value.filter((item) => item !== t);
};

const restoreTask = (t) => {
  delTaskArrayDel(t);
  tasks.value.push(t);
};

// --------------------
// Методы управления модалками
// --------------------
const openEndModal = () => (modalOpen.value = "End");
const openDeleteModal = () => (modalOpen.value = "Trash");
</script>

<template>
  <Header @openEnd-modal="openEndModal" @openDel-modal="openDeleteModal" />

  <div
    class="flex flex-col items-center justify-center min-h-screen px-4 py-20"
  >
    <div class="flex gap-2 items-center mb-5">
      <h1 class="text-3xl font-bold text-gray-800">TodoList</h1>
      <span
        class="bg-red-500 w-6 h-6 flex items-center justify-center rounded-full text-white text-sm font-medium"
      >
        {{ tasks.length }}
      </span>
    </div>

    <div class="flex flex-col w-full max-w-lg m-0">
      <TodoForm @add-task="taskAdd" />
      <ul class="flex items-center px-10 mt-3 gap-5 text-gray-800"></ul>

      <ul class="flex flex-col items-center w-full mt-3 gap-2">
        <Item
          v-for="(t, i) in tasks"
          :key="i"
          :task="t"
          :isTrash="false"
          @delete-task="deleteTask(t)"
          @is-done="isDoneTask(t)"
        />
        <p v-if="tasks.length === 0" class="text-center text-gray-400 mt-4">
          Ничего нет
        </p>
      </ul>
    </div>
  </div>

  <!-- Модалка завершённых задач -->
  <Modal @close-modal="modalOpen = null" v-if="modalOpen === 'End'">
    <template #content>
      <li class="p-4 border-b font-semibold">Завершённые задачи:</li>
      <Item
        v-for="(t, i) in tasksEnd"
        :key="i"
        :task="t"
        :Done="false"
        @delete-task="deleteTaskTasksEnd(t)"
      />
      <span
        v-if="tasksEnd.length === 0"
        class="flex justify-center mt-5 text-gray-400"
      >
        НЕТ Завершённых
      </span>
    </template>
  </Modal>

  <!-- Модалка корзины -->
  <Modal @close-modal="modalOpen = null" v-if="modalOpen === 'Trash'">
    <template #content>
      <li class="p-4 border-b font-semibold">Удалённые задачи:</li>
      <Item
        v-for="(t, i) in taskDelete"
        :key="i"
        :task="t"
        :isTrash="true"
        :Done="false"
        @delete-task="delTaskArrayDel(t)"
        @resort-task="restoreTask(t)"
      />
      <span
        v-if="taskDelete.length === 0"
        class="flex justify-center mt-5 text-gray-400"
      >
        У вас нет удаленных задач
      </span>
    </template>
  </Modal>
</template>

<style scoped>
body {
  font-family: "Inter", sans-serif;
}
</style>
