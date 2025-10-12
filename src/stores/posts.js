import { ref, computed, reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { v4 as uuidv4 } from 'uuid'
export const usePostsStore = defineStore('counter', () => {
  const posts = ref(JSON.parse(localStorage.getItem('posts') || '[]'))
  const post = reactive({
    id: null,
    title: '',
    isDone: false,
    description: '',
    topics: [],
    colors: ['#f87171', '#60a5fa', '#34d399', '#facc15', '#a78bfa', '#ffffff'],
    color: '#ffffff',
  })
  const container = ref(null)
  function addPost(post) {
    if (!post.title || !post.description) {
      alert('Заполните все поля')
      return
    }
    posts.value.push({
      id: uuidv4(),
      title: post.title,
      isDone: post.isDone,
      description: post.description,
      topics: post.topics,
      colors: post.colors,
      color: post.color,
    })
    console.log(post)
    console.log(posts.value)
  }
  const addColor = (id, color) => {
    console.log(id, color)
    const post = posts.value.find((post) => post.id === id)
    post.color = color
  }
  function removePost(id) {
    posts.value = posts.value.filter((post) => post.id !== id)
  }
  watch(
    posts,
    (newPosts) => {
      localStorage.setItem('posts', JSON.stringify(newPosts))
    },
    { deep: true },
  )
  return { posts, container, addPost, removePost, post, addColor }
})
