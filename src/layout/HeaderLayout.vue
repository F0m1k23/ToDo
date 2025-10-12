<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'
import { ref, reactive } from 'vue'
import Modal from '@/components/Modal.vue'
import { usePostsStore } from '../stores/posts'
const postsStore = usePostsStore()
const post = reactive({
  id: null,
  title: '',
  isDone: false,
  description: '',
  topics: [],
  colors: ['#f87171', '#60a5fa', '#34d399', '#facc15', '#a78bfa', '#ffffff'],
  color: '#ffffff',
})
const isOpen = ref(false)
</script>
<template>
  <header class="header">
    <div class="container">
      <div class="header__row">
        <div class="header__logo">
          <router-link class="logo" to="/">ToDo</router-link>
        </div>
        <button @click="isOpen = true">
          <PlusIcon class="header__icon" />
        </button>
      </div>
    </div>
  </header>
  <Modal v-if="isOpen" @close-modal="isOpen = false">
    <h2>Добавить пост</h2>
    <form>
      <input v-model="post.title" class="form__title" type="text" placeholder="Заголовок" />
      <textarea
        v-model="post.description"
        class="form__subtitle"
        placeholder="Описание"
        rows="4"
      ></textarea>
      <input type="text" class="topic" placeholder="Тема" />
      <button @click.prevent="postsStore.addPost(post)" class="form__button" type="submit">
        Добавить
      </button>
    </form>
  </Modal>
</template>
<style scoped>
.header {
  backdrop-filter: blur(12px);
  background: rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(99, 102, 241, 0.15);
  padding: 20px 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.08);
}

.header__row {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.header__logo {
  padding: 0;
  margin: 0;
  font-size: 28px;
  font-weight: 900;
  background: linear-gradient(90deg, #6366f1, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
}

.header__icon {
  display: block;
  width: 22px;
  height: 22px;
  cursor: pointer;
}

.header button {
  background: linear-gradient(135deg, #6366f1, #60a5fa);
  border: none;
  border-radius: 14px;
  color: white;
  font-weight: 600;
  padding: 10px 18px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.25);
  transition: all 0.25s;
}

.header button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(99, 102, 241, 0.35);
}

/* ---------- ФОРМА ---------- */
form {
  width: 700px;
  width: 100%;
  margin: 40px auto;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(10px);
  padding: 36px 32px;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08);
  display: flex;
  flex-direction: column;
  gap: 18px;
}

form h2 {
  font-size: 1.8rem;
  font-weight: 800;
  background: linear-gradient(90deg, #6366f1, #60a5fa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 10px;
}

.form__title,
.form__subtitle,
.topic {
  border: none;
  background: rgba(240, 243, 255, 0.8);
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 1.05rem;
  transition: all 0.25s;
}

.form__title:focus,
.topic:focus,
.form__subtitle:focus {
  outline: none;
  background: #fff;
  box-shadow: 0 0 0 2px #6366f1;
}

.form__button {
  background: linear-gradient(135deg, #6366f1, #60a5fa);
  border: none;
  border-radius: 12px;
  padding: 14px 0;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.25s;
}

.form__button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(99, 102, 241, 0.25);
}
</style>
