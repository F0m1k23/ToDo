<script setup>
import { reactive, ref, watch } from "vue";

const emit = defineEmits(["add-task"]);

const task = reactive({ title: "", isDone: false });
const errorArr = ref([]);
const touched = ref(false);

const validFunc = () => {
  errorArr.value = [];
  if (task.title.trim() === "") {
    errorArr.value.push("Заполните поле");
    return false;
  }
  return true;
};

const addTask = () => {
  touched.value = true;
  if (validFunc()) {
    emit("add-task", {
      title: task.title,
      isDone: task.isDone,
      date: new Date().getTime(),
    });
    task.title = "";
    touched.value = false;
  }
};

watch(task, () => {
  errorArr.value = [];
});
</script>

<template>
  <!-- Ошибки -->
  <div class="flex flex-col gap-1 mb-2">
    <p
      v-for="error in errorArr"
      :key="error"
      class="text-red-500 text-sm text-center"
    >
      {{ error }}
    </p>
  </div>

  <!-- Форма добавления задачи -->
  <div class="flex gap-2 w-full max-w-md mx-auto">
    <input
      v-model="task.title"
      type="text"
      placeholder="Введите задачу"
      class="flex-1 border border-amber-200 rounded-lg py-2 px-3 focus:outline-none focus:border-amber-400 transition-colors"
    />
    <button
      @click="addTask"
      class="bg-amber-400 text-white font-medium px-4 py-2 rounded-lg hover:bg-amber-500 transition-colors cursor-pointer"
    >
      Добавить
    </button>
  </div>
</template>
