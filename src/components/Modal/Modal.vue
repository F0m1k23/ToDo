<script setup>
import { XMarkIcon } from '@heroicons/vue/24/solid'
// const emit = defineEmits(['close-modal'])
</script>
<template>
  <div @click="$emit('close-modal')" class="modal">
    <div @click.stop class="modal-body">
      <div class="flex items-center justify-between">
        <h3></h3>
        <XMarkIcon
          @click="$emit('close-modal')"
          class="close h-4 w-4 hover:text-red-500 transition duration-300 cursor-pointer"
        />
      </div>
      <div class="flex flex-col gap-3">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  inset: 0; /* top:0; right:0; bottom:0; left:0 */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(15, 23, 42, 0.6), rgba(15, 23, 42, 0.6));
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  z-index: 60;
  padding: 24px;
  box-sizing: border-box;
  animation: modal-fade 180ms ease-out;
}

.modal-body {
  position: relative;
  background: linear-gradient(180deg, #ffffff, #fbfbfd);
  width: 100%;
  max-width: 720px;
  border-radius: 12px;
  padding: 28px 28px 24px;
  box-shadow: 0 10px 30px rgba(2,6,23,0.2), 0 2px 6px rgba(2,6,23,0.08);
  transform-origin: center;
  animation: modal-pop 220ms cubic-bezier(.2,.9,.2,1);
}

.modal-body h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
}

.modal .close {
  position: absolute;
  top: 14px;
  right: 14px;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #475569;
  background: transparent;
  transition: all 160ms ease;
}

.modal .close:hover {
  background: rgba(15, 23, 42, 0.06);
  color: #ef4444; /* red-500 */
  transform: translateY(-1px);
}

.modal .close:active {
  transform: translateY(0);
}

.modal .flex {
  gap: 12px;
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .modal-body {
    padding: 20px;
    max-width: 92%;
    border-radius: 10px;
  }
  .modal .close {
    top: 10px;
    right: 10px;
    width: 32px;
    height: 32px;
  }
}

@keyframes modal-pop {
  0% { opacity: 0; transform: scale(.96); }
  100% { opacity: 1; transform: scale(1); }
}

@keyframes modal-fade {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
</style>