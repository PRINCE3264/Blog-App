<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogs } from '../stores/useBlogs'
import Swal from 'sweetalert2'

const router = useRouter()
const { addBlog } = useBlogs()

const form = reactive({
  title: '',
  description: '',
  content: '',
  category: 'Technology',
  imageUrl: '',
  author: ''
})

const isSubmitting = ref(false)

const categories = ['Technology', 'Programming', 'AI', 'Business', 'Lifestyle', 'Health']

const handleSubmit = async () => {
  isSubmitting.value = true
  
  // Basic validation check
  if (!form.title || !form.description || !form.content || !form.author) {
    Swal.fire({
      icon: 'error',
      title: 'Wait!',
      text: 'Please fill in all required fields.',
      confirmButtonColor: '#2563eb'
    })
    isSubmitting.value = false
    return
  }

  // Simulate a network delay for premium feel
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  addBlog({ ...form })
  isSubmitting.value = false
  
  Swal.fire({
    icon: 'success',
    title: 'Article Published!',
    text: 'Your insights have been added to the platform.',
    timer: 2000,
    showConfirmButton: false,
    background: '#ffffff',
    color: '#0f172a'
  }).then(() => {
    router.push('/')
  })
}

const goBack = () => router.back()
</script>

<template>
  <div class="add-blog-container animate-fade-in container">
    <div class="form-wrapper">
      <button @click="goBack" class="back-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Cancel and return
      </button>
      
      <div class="form-header">
        <h1 class="form-title">Create New <span class="gradient">Article</span></h1>
        <p>Share your knowledge with our global community.</p>
      </div>

      <form @submit.prevent="handleSubmit" class="blog-form glass">
        <div class="form-group grid-2">
          <div class="form-control">
            <label>Article Title *</label>
            <input type="text" v-model="form.title" placeholder="e.g., The Impact of AI on Future Jobs" required>
          </div>
          <div class="form-control">
            <label>Your Name *</label>
            <input type="text" v-model="form.author" placeholder="e.g., Jane Doe" required>
          </div>
        </div>

        <div class="form-group grid-2">
          <div class="form-control">
            <label>Category *</label>
            <select v-model="form.category">
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
          </div>
          <div class="form-control">
            <label>Cover Image URL (Optional)</label>
            <input type="url" v-model="form.imageUrl" placeholder="HTTPS image link">
          </div>
        </div>

        <div class="form-control">
          <label>Short Description *</label>
          <input type="text" v-model="form.description" placeholder="Summarize your article in 1-2 sentences" required>
        </div>

        <div class="form-control">
          <label>Article Content *</label>
          <textarea v-model="form.content" rows="10" placeholder="Write your thoughts here..." required></textarea>
        </div>

        <button type="submit" class="submit-btn" :disabled="isSubmitting">
          <span v-if="!isSubmitting">Publish Article</span>
          <span v-else class="loader"></span>
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.add-blog-container {
  padding-top: 10rem;
  padding-bottom: 5rem;
  max-width: 900px;
}

.back-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: var(--text-muted);
  font-weight: 500;
  margin-bottom: 2rem;
}

.back-link:hover {
  color: var(--text-primary);
}

.form-header {
  margin-bottom: 3rem;
}

.form-title {
  font-size: 3rem;
  line-height: 1.1;
  margin-bottom: 0.5rem;
  letter-spacing: -2px;
}

.form-header p {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.blog-form {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.grid-2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

.form-control {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-secondary);
  padding-left: 0.5rem;
}

input, select, textarea {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  background: rgba(255, 255, 255, 0.06);
  box-shadow: 0 0 15px rgba(124, 77, 255, 0.1);
}

.submit-btn {
  margin-top: 2rem;
  background: var(--gradient-primary);
  color: white;
  padding: 1.25rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

/* Success Layout - Handled by SweetAlert now */
.loader {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 640px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
  .blog-form {
    padding: 1.5rem;
  }
}
</style>
