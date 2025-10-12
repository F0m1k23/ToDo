<script setup>
import { TrashIcon } from '@heroicons/vue/24/outline'
import { usePostsStore } from '@/stores/posts'

const props = defineProps({
  post: {
    type: Object,
    required: true,
  },
})
const emit = defineEmits(['remove', 'done', 'add-color'])
const postsStore = usePostsStore()
</script>

<template>
  <li
    :class="{
      'post-card--done': post.isDone,
      'post-card--not-done': !post.isDone,
    }"
    class="post-card"
    :style="{ backgroundColor: post.color }"
  >
    <div class="post-header">
      <h3 class="post-title">{{ post.title }}</h3>
      <button class="delete-btn" @click="$emit('remove')" aria-label="Удалить">
        <TrashIcon class="delete-icon" />
      </button>
    </div>

    <p class="post-desc">{{ post.description }}</p>

    <div class="post-footer">
      <div class="post-colors">
        <span
          v-for="color in post.colors"
          :key="color"
          @click="$emit('add-color', post.id, color)"
          :style="{
            backgroundColor: color,
            border: post.color === color ? '3px solid #6366f1' : 'none',
          }"
        ></span>
      </div>
      <label class="checkbox-label">
        <input
          @click="$emit('done', post.id)"
          class="checkbox"
          type="checkbox"
          v-model="post.isDone"
        />
        <span class="custom-checkbox"></span>
        <span class="checkbox-text">
          {{ post.isDone ? 'Готово' : 'В процессе' }}
        </span>
      </label>
    </div>
  </li>
</template>

<style scoped>
.posts {
  max-width: 1100px;
  margin: 60px auto;
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: center;
  padding: 0 20px;
}

.post-card {
  flex: 1 1 46%;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  padding: 62px 28px;
  box-shadow: 0 4px 20px rgba(99, 102, 241, 0.06);
  border: 1px solid rgba(99, 102, 241, 0.12);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 28px rgba(99, 102, 241, 0.12);
}

.post-title {
  font-size: 1.6rem;
  font-weight: 800;
  color: #3741d8;
  margin: 0;
}

.post-desc {
  font-size: 1.05rem;
  color: #475569;
  line-height: 1.5;
  opacity: 0.95;
  flex: 1 1 auto;
}

.post-card--done {
  background: linear-gradient(135deg, #6366f1, #60a5fa);
  color: white;
  box-shadow: 0 10px 24px rgba(99, 102, 241, 0.25);
}

.post-card--done .post-title,
.post-card--done .post-desc {
  color: white;
}

/* ---------- КНОПКИ ---------- */
.delete-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(239, 68, 68, 0.9);
  border: none;
  border-radius: 50%;
  width: 42px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.25);
}

.delete-btn:hover {
  background: rgba(220, 38, 38, 1);
  transform: scale(1.1);
}

/* ---------- ЧЕКБОКС ---------- */
.post-footer {
  display: flex;
  justify-content: space-between;
  gap: 50px;
  align-items: center;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.checkbox {
  display: none;
}

.custom-checkbox {
  width: 26px;
  height: 26px;
  border-radius: 8px;
  border: 2px solid #a5b4fc;
  position: relative;
  transition: all 0.25s;
}

.checkbox:checked + .custom-checkbox {
  background: linear-gradient(135deg, #6366f1, #60a5fa);
  border-color: transparent;
}

.checkbox:checked + .custom-checkbox::after {
  content: '';
  position: absolute;
  top: 5px;
  left: 9px;
  width: 6px;
  height: 12px;
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  transform: rotate(45deg);
}

.checkbox-text {
  font-weight: 600;
  color: #4f46e5;
}

.checkbox:checked ~ .checkbox-text {
  color: #2563eb;
}
.post-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.post-colors span {
  display: block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
}
/* //['red', 'green', 'blue', 'yellow', 'orange'],// */
.post-colors span:nth-child(1) {
  background: #f8afa8;
}
.post-colors span:nth-child(2) {
  background: #b8c4b9;
}
.post-colors span:nth-child(3) {
  background: #a8c0d1;
}
.post-colors span:nth-child(4) {
  background: #e8d9c9;
}
.post-colors span:nth-child(5) {
  background: #f8d4b8;
}

/* ---------- АДАПТИВНОСТЬ ---------- */
@media (max-width: 768px) {
  .post-card {
    flex: 0 1 100%;
  }
}
</style>
