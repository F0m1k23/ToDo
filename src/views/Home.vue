<script setup>
import { usePostsStore } from '../stores/posts'
import ItemList from '@/components/ItemList.vue'
const postsStore = usePostsStore()
</script>
<template>
  <div class="container">
    <h1 class="title">Список задач</h1>
    <span class="counter">Всего задач: {{ postsStore.posts.length }}</span>
    <ul class="list">
      <ItemList
        v-for="post in postsStore.posts"
        :key="post.id"
        :post="post"
        @remove="postsStore.removePost(post.id)"
        @done="post.isDone = !post.isDone"
        @add-color="(id, color) => postsStore.addColor(post.id, color)"
      />
    </ul>
  </div>
</template>
<style scoped>
.title {
  margin: 40px 0px;
  text-align: center;
}
.counter {
  display: block;
  text-align: center;
  margin-bottom: 10px;
}
.list {
  margin: 40px 0px;
  list-style: none;
  padding: 0;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  gap: 20px;
  border-radius: 5px;
}
</style>
