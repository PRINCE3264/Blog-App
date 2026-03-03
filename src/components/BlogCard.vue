<script setup>
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const props = defineProps({
  blog: {
    type: Object,
    required: true
  },
  isLiked: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggleLike'])
const router = useRouter()

const navigateToDetail = () => {
  router.push(`/blog/${props.blog.id}`)
}

const handleLike = () => {
  emit('toggleLike', props.blog.id)
  
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    background: '#ffffff',
    color: '#0f172a'
  })

  Toast.fire({
    icon: 'success',
    title: props.isLiked ? 'Removed from favorites' : 'Added to favorites'
  })
}
</script>

<template>
  <div class="blog-card glass-card" @click="navigateToDetail">
    <div class="card-image-wrap">
      <img :src="blog.imageUrl" :alt="blog.title" class="card-image">
      <span class="category-tag">{{ blog.category }}</span>
    </div>
    <div class="card-content">
      <div class="card-meta">
        <span class="author">{{ blog.author }}</span>
        <span class="separator">•</span>
        <span class="date">{{ blog.date }}</span>
      </div>
      <h3 class="card-title">{{ blog.title }}</h3>
      <p class="card-description">{{ blog.description }}</p>
      
      <div class="card-footer">
        <button class="like-btn" :class="{ 'is-liked': isLiked }" @click.stop="handleLike">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" :fill="isLiked ? '#ff4081' : 'none'" :stroke="isLiked ? '#ff4081' : 'currentColor'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          <span>{{ blog.likes }}</span>
        </button>
        <button class="read-more">Read More
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-card {
  cursor: pointer;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-image-wrap {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.blog-card:hover .card-image {
  transform: scale(1.1);
}

.category-tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  color: white;
  padding: 0.35rem 0.75rem;
  border-radius: 8px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.card-meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: var(--text-muted);
}

.separator { opacity: 0.3; }

.card-title {
  font-size: 1.25rem;
  line-height: 1.4;
  margin-bottom: 0.75rem;
  transition: color 0.3s ease;
}

.blog-card:hover .card-title {
  color: var(--accent-primary);
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-footer {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.like-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--text-secondary);
  font-weight: 600;
  transition: all 0.3s ease;
}

.like-btn.is-liked {
  color: #ff4081;
}

.like-btn:hover {
  transform: scale(1.1);
}

.read-more {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--accent-primary);
  font-weight: 600;
  font-size: 0.9rem;
}

.read-more:hover svg {
  transform: translateX(5px);
}

.read-more svg {
  transition: transform 0.3s ease;
}
</style>
