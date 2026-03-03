<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogs } from '../stores/useBlogs'
import Swal from 'sweetalert2'

const isScrolled = ref(false)
const router = useRouter()
const { addBlog, categories } = useBlogs()

const isDarkMode = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value
  if (isDarkMode.value) {
    document.documentElement.setAttribute('data-theme', 'dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
    localStorage.setItem('theme', 'light')
  }
}

const initTheme = () => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'dark') {
    isDarkMode.value = true
    document.documentElement.setAttribute('data-theme', 'dark')
  }
}


const openPublishModal = () => {
  const cats = categories.value.filter(c => c !== 'All')
  if (cats.length === 0) cats.push('Technology', 'Programming', 'AI', 'Business', 'Lifestyle')

  Swal.fire({
    title: '<span style="font-family: Outfit, sans-serif; font-weight: 800;">Create New Article</span>',
    html: `
      <div style="text-align: left; display: flex; flex-direction: column; gap: 1rem; padding: 0 10px;">
        <div class="swal-field">
          <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: #475569; font-size: 0.9rem;">Article Title</label>
          <input id="swal-title" class="swal2-input" placeholder="e.g., The Future of Web Design" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
        </div>
        <div style="display: flex; gap: 1rem;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: #475569; font-size: 0.9rem;">Author Name</label>
            <input id="swal-author" class="swal2-input" placeholder="Jane Doe" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: #475569; font-size: 0.9rem;">Topic</label>
            <select id="swal-category" class="swal2-input" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
              ${cats.map(c => `<option value="${c}">${c}</option>`).join('')}
            </select>
          </div>
        </div>
        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: #475569; font-size: 0.9rem;">Short Description</label>
          <input id="swal-desc" class="swal2-input" placeholder="1-2 sentences overview" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
        </div>
        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: #475569; font-size: 0.9rem;">Cover Image URL (Optional)</label>
          <input id="swal-image" class="swal2-input" placeholder="https://example.com/image.jpg" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
        </div>
        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: #475569; font-size: 0.9rem;">Full Content</label>
          <textarea id="swal-content" class="swal2-textarea" placeholder="Start writing..." style="margin: 0; width: 100%; height: 120px; border-radius: 10px; font-size: 1rem;"></textarea>
        </div>
      </div>
    `,
    width: '640px',
    showCancelButton: true,
    confirmButtonText: 'Publish Now',
    cancelButtonText: 'Discard',
    confirmButtonColor: '#2563eb',
    cancelButtonColor: '#64748b',
    background: '#ffffff',
    customClass: {
      popup: 'swal2-custom-border',
      title: 'swal2-title-custom'
    },
    focusConfirm: false,
    preConfirm: () => {
      const title = document.getElementById('swal-title').value
      const author = document.getElementById('swal-author').value
      const category = document.getElementById('swal-category').value
      const description = document.getElementById('swal-desc').value
      const content = document.getElementById('swal-content').value
      const inputImage = document.getElementById('swal-image').value // Custom image capture

      if (!title || !author || !description || !content) {
        Swal.showValidationMessage('All required fields must be filled')
        return false
      }

      return { 
        title, 
        author, 
        category, 
        description, 
        content,
        // Fallback to stock photo if user leaves link empty
        imageUrl: inputImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800'
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      addBlog(result.value)
      Swal.fire({
        icon: 'success',
        title: 'Article Published!',
        text: 'Your article is now live on the platform.',
        timer: 2000,
        showConfirmButton: false,
        iconColor: '#2563eb'
      })
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  initTheme()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-container container">
      <router-link to="/" class="logo">
        <span class="gradient-text">MODERN</span><span class="logo-bold">BLOG</span>
      </router-link>
      <div class="nav-links">
      <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/explore" class="nav-link">Explore</router-link>
        <router-link to="/about" class="nav-link">About</router-link>
        <router-link to="/contact" class="nav-link">Contact</router-link>
        <button @click="toggleTheme" class="theme-toggle" aria-label="Toggle Dark Mode">
          <svg v-if="!isDarkMode" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
        </button>
        <button @click="openPublishModal" class="nav-link btn-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          Publish Article
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: transparent;
}

.navbar-scrolled {
  padding: 0.75rem 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.03);
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: 'Outfit', sans-serif;
  font-size: 1.6rem;
  font-weight: 500;
  letter-spacing: -1.5px;
  color: var(--text-primary);
  display: flex;
  align-items: center;
}

.logo-bold {
  font-weight: 800;
  margin-left: 2px;
}

.gradient-text {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--text-secondary);
  transition: all 0.3s ease;
  position: relative;
}

.theme-toggle {
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  background: var(--accent-primary);
  color: white;
  transform: rotate(15deg) scale(1.1);
}

.nav-link:not(.btn-primary)::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--accent-primary);
  transition: width 0.3s ease;
}

.nav-link:not(.btn-primary):hover::after {
  width: 100%;
}

.nav-link:hover {
  color: var(--text-primary);
}

.btn-primary {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--accent-primary);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 14px;
  box-shadow: 0 8px 20px rgba(37, 99, 235, 0.2);
  font-weight: 700;
}

.btn-primary:hover {
  transform: translateY(-2px);
  background: #1d4ed8;
  box-shadow: 0 12px 25px rgba(37, 99, 235, 0.3);
  color: white;
}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }
}
</style>
