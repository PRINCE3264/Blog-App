<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useBlogs } from '../stores/useBlogs'
import Swal from 'sweetalert2'

const route = useRoute()
const router = useRouter()
const { getBlogById, toggleLike, isBlogLiked, editBlog, deleteBlog, addComment, categories } = useBlogs()

const blog = computed(() => getBlogById(route.params.id))
const newComment = ref({ username: '', text: '' })

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (!blog.value) {
    router.push('/')
  }
})

const goBack = () => router.back()

const handleEdit = () => {
  const cats = categories.value.filter(c => c !== 'All')
  if (cats.length === 0) cats.push('Technology', 'Programming', 'AI', 'Business', 'Lifestyle')
  
  Swal.fire({
    title: '<span style="font-family: Outfit, sans-serif; font-weight: 800;">Edit Article</span>',
    html: `
      <div style="text-align: left; display: flex; flex-direction: column; gap: 1rem; padding: 0 10px;">
        <div class="swal-field">
          <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-secondary); font-size: 0.9rem;">Article Title</label>
          <input id="swal-title" class="swal2-input" value="${blog.value.title}" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
        </div>
        <div style="display: flex; gap: 1rem;">
          <div style="flex: 1;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-secondary); font-size: 0.9rem;">Author Name</label>
            <input id="swal-author" class="swal2-input" value="${blog.value.author}" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
          </div>
          <div style="flex: 1;">
            <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-secondary); font-size: 0.9rem;">Topic</label>
            <select id="swal-category" class="swal2-input" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
              ${cats.map(c => `<option value="${c}" ${c === blog.value.category ? 'selected' : ''}>${c}</option>`).join('')}
            </select>
          </div>
        </div>
        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-secondary); font-size: 0.9rem;">Short Description</label>
          <input id="swal-desc" class="swal2-input" value="${blog.value.description}" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
        </div>
        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-secondary); font-size: 0.9rem;">Cover Image URL</label>
          <input id="swal-image" class="swal2-input" value="${blog.value.imageUrl || ''}" style="margin: 0; width: 100%; border-radius: 10px; font-size: 1rem;">
        </div>
        <div>
          <label style="display: block; font-weight: 600; margin-bottom: 0.4rem; color: var(--text-secondary); font-size: 0.9rem;">Full Content</label>
          <textarea id="swal-content" class="swal2-textarea" style="margin: 0; width: 100%; height: 120px; border-radius: 10px; font-size: 1rem;">${blog.value.content}</textarea>
        </div>
      </div>
    `,
    width: '640px',
    showCancelButton: true,
    confirmButtonText: 'Save Changes',
    confirmButtonColor: '#2563eb',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    preConfirm: () => {
      const title = document.getElementById('swal-title').value
      const author = document.getElementById('swal-author').value
      const category = document.getElementById('swal-category').value
      const description = document.getElementById('swal-desc').value
      const content = document.getElementById('swal-content').value
      const imageUrl = document.getElementById('swal-image').value
      
      if (!title || !author || !description || !content) {
        Swal.showValidationMessage('All required fields must be filled')
        return false
      }
      return { title, author, category, description, content, imageUrl: imageUrl || blog.value.imageUrl }
    }
  }).then((res) => {
    if (res.isConfirmed) {
      editBlog(blog.value.id, res.value)
      Swal.fire({
        icon: 'success',
        title: 'Updated!',
        text: 'Your article has been updated.',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        confirmButtonColor: '#2563eb'
      })
    }
  })
}

const handleDelete = () => {
  Swal.fire({
    title: 'Are you sure?',
    text: "This article will be permanently deleted!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    background: 'var(--bg-primary)',
    color: 'var(--text-primary)',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      deleteBlog(blog.value.id)
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'The article has been removed.',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        confirmButtonColor: '#2563eb'
      }).then(() => router.push('/'))
    }
  })
}

const submitComment = () => {
  if (newComment.value.username && newComment.value.text) {
    addComment(blog.value.id, {
      username: newComment.value.username,
      text: newComment.value.text
    })
    newComment.value.username = ''
    newComment.value.text = ''
    Swal.fire({
      icon: 'success',
      title: 'Comment added successfully',
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
    })
  }
}
</script>

<template>
  <div v-if="blog" class="detail-container animate-fade-in">
    <div class="detail-header container">
       <button @click="goBack" class="back-btn glass">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        Back to Explore
      </button>
      
      <div class="meta-info">
        <span class="category-pill">{{ blog.category }}</span>
        <span class="reading-time">8 min read</span>
      </div>
      
      <h1 class="blog-title">{{ blog.title }}</h1>
      
      <div class="author-profile">
        <div class="author-avatar">{{ blog.author.charAt(0) }}</div>
        <div class="author-details">
          <span class="author-name">{{ blog.author }}</span>
          <span class="post-date">Published on {{ blog.date }}</span>
        </div>
      </div>
    </div>

    <div class="hero-image-wrap container">
      <img :src="blog.imageUrl" :alt="blog.title" class="hero-image glass-card">
    </div>

    <div class="article-content container">
      <div class="content">
        <p class="lead-paragraph">{{ blog.description }}</p>
        <div class="main-text">{{ blog.content }}</div>
        <div class="content-divider glass"></div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>

      <div class="content-actions glass">
        <div class="engagement">
          <button class="action-btn" :class="{ 'liked': isBlogLiked(blog.id) }" @click="toggleLike(blog.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" :fill="isBlogLiked(blog.id) ? '#ff4081' : 'none'" :stroke="isBlogLiked(blog.id) ? '#ff4081' : 'currentColor'" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
            {{ blog.likes }} Likes
          </button>
          <button class="action-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
            Share
          </button>
        </div>

        <div class="admin-actions">
          <button class="action-btn edit-btn" @click="handleEdit">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            Edit
          </button>
          <button class="action-btn delete-btn" @click="handleDelete">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            Delete
          </button>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="comments-section">
        <h3>Comments ({{ blog.comments ? blog.comments.length : 0 }})</h3>
        
        <form @submit.prevent="submitComment" class="comment-form">
          <h4>Leave a comment</h4>
          <input v-model="newComment.username" type="text" placeholder="Your Name" required class="comment-input" />
          <textarea v-model="newComment.text" placeholder="What are your thoughts?" required rows="3" class="comment-input"></textarea>
          <button type="submit" class="comment-btn">Post Comment</button>
        </form>

        <div class="comment-list">
          <div v-for="comment in blog.comments || []" :key="comment.id" class="comment-item">
            <div class="comment-header">
              <span class="comment-author">{{ comment.username }}</span>
              <span class="post-date">{{ comment.date }}</span>
            </div>
            <p>{{ comment.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.detail-container {
  padding-top: 10rem;
  padding-bottom: 5rem;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  color: var(--text-secondary);
  font-weight: 500;
  margin-bottom: 2rem;
}

.back-btn:hover {
  color: var(--accent-primary);
  background: var(--bg-secondary);
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.category-pill {
  background: var(--accent-primary);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.reading-time {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.blog-title {
  font-size: 4rem;
  line-height: 1.1;
  margin-bottom: 2rem;
  max-width: 900px;
  letter-spacing: -3px;
}

.author-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 4rem;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  border: 2px solid var(--bg-tertiary);
}

.author-name {
  display: block;
  font-size: 1.1rem;
  font-weight: 600;
}

.post-date {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.hero-image-wrap {
  margin-bottom: 4rem;
}

.hero-image {
  width: 100%;
  height: 600px;
  object-fit: cover;
  border-radius: 32px;
}

.article-content {
  display: grid;
  grid-template-columns: 1fr;
  max-width: 800px;
  gap: 3rem;
}

.lead-paragraph {
  font-size: 1.4rem;
  color: var(--text-primary);
  line-height: 1.6;
  margin-bottom: 2.5rem;
  font-weight: 400;
  opacity: 0.9;
}

.main-text {
  font-size: 1.15rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  white-space: pre-line;
}

.content-divider {
  height: 1px;
  margin: 3rem 0;
}

.content-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 50px;
  margin-top: 4rem;
}

.engagement {
  display: flex;
  gap: 2rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: transparent;
  color: var(--text-secondary);
  font-weight: 600;
  font-size: 1rem;
}

.action-btn.liked {
  color: #ff4081;
}

.admin-actions {
  display: flex;
  gap: 1.5rem;
}

.edit-btn:hover { color: var(--accent-primary); }
.delete-btn:hover { color: #ef4444; }

/* Comments Styling */
.comments-section {
  margin-top: 4rem;
  padding-top: 3rem;
  border-top: 1px solid var(--border-color);
}

.comments-section h3 {
  font-size: 1.8rem;
  margin-bottom: 2rem;
}

.comment-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 3rem;
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.comment-input {
  padding: 0.8rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
}

.comment-input:focus {
  border-color: var(--accent-primary);
  outline: none;
}

.comment-btn {
  align-self: flex-start;
  background: var(--accent-primary);
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 12px;
  font-weight: 700;
}

.comment-btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.comment-item {
  background: var(--bg-secondary);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid var(--border-color);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.comment-author {
  font-weight: 700;
  color: var(--text-primary);
}

@media (max-width: 992px) {
  .blog-title {
    font-size: 3rem;
  }
  .hero-image {
    height: 400px;
  }
}

@media (max-width: 640px) {
  .content-actions {
    flex-direction: column;
    gap: 1.5rem;
  }
  .admin-actions {
    width: 100%;
    justify-content: flex-start;
  }
  .blog-title {
    font-size: 2.25rem;
  }
  .hero-image {
    height: 300px;
  }
}
</style>
