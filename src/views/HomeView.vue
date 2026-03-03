<script setup>
import { onMounted } from 'vue'
import { useBlogs } from '../stores/useBlogs'
import BlogCard from '../components/BlogCard.vue'

const { 
  isLoading,
  searchQuery, 
  selectedCategory, 
  categories, 
  paginatedBlogs, 
  currentPage, 
  totalPages,
  toggleLike,
  isBlogLiked
} = useBlogs()

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
})
</script>

<template>
  <div class="home-container animate-fade-in">
    <header class="home-header">
      <h1 class="hero-title">Discover the Best <span class="gradient">Insights</span> & Updates</h1>
      <p class="hero-subtitle">Exploring the intersection of technology, design, and future-thinking.</p>
      
      <div class="search-bar glass">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search for articles, trends, or authors..."
          class="search-input"
        >
      </div>
    </header>

    <div class="content-grid container">
      <aside class="sidebar">
        <div class="sidebar-section glass">
          <h4 class="sidebar-title">Categories</h4>
          <div class="category-list">
            <button 
              v-for="cat in categories" 
              :key="cat"
              class="category-btn"
              :class="{ 'active': selectedCategory === cat }"
              @click="selectedCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>
      </aside>

      <main class="main-content">
        <!-- Skeleton Loader -->
        <div v-if="isLoading" class="blog-grid">
          <div v-for="i in 6" :key="i" class="skeleton-card glass-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
              <div class="skeleton-line title"></div>
              <div class="skeleton-line desc"></div>
              <div class="skeleton-line desc last"></div>
            </div>
          </div>
        </div>

        <div v-else-if="paginatedBlogs.length > 0" class="blog-grid">
          <BlogCard 
            v-for="blog in paginatedBlogs" 
            :key="blog.id" 
            :blog="blog"
            :isLiked="isBlogLiked(blog.id)"
            @toggleLike="toggleLike"
          />
        </div>
        
        <div v-else class="empty-state glass">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="empty-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <h3>No articles found</h3>
          <p>We couldn't find any results for "{{ searchQuery }}". Try adjusting your search or filters.</p>
          <button @click="searchQuery = ''; selectedCategory = 'All'" class="reset-btn">Clear all filters</button>
        </div>

        <div v-if="totalPages > 1" class="pagination glass">
          <button 
            :disabled="currentPage === 1" 
            @click="currentPage--"
            class="page-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            Previous
          </button>
          <span class="page-info">Page <strong>{{ currentPage }}</strong> of {{ totalPages }}</span>
          <button 
            :disabled="currentPage === totalPages" 
            @click="currentPage++"
            class="page-btn"
          >
            Next
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  padding-top: 8rem;
  padding-bottom: 5rem;
}

.home-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
  padding: 0 2rem;
}

.hero-title {
  font-size: 3.5rem;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: -2px;
}

.gradient {
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 2.5rem;
}

.search-bar {
  display: flex;
  align-items: center;
  padding: 0.5rem 1.5rem;
  max-width: 600px;
  margin: 0 auto;
  border-radius: 50px;
}

.search-icon {
  color: var(--text-muted);
  margin-right: 1rem;
}

.search-input {
  background: transparent;
  border: none;
  outline: none;
  color: var(--text-primary);
  width: 100%;
  padding: 0.75rem 0;
  font-size: 1rem;
}

.content-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 3rem;
}

.sidebar-title {
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.sidebar-section {
  padding: 1.5rem;
  position: sticky;
  top: 8rem;
}

.category-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.category-btn {
  text-align: left;
  padding: 0.75rem 1rem;
  background: transparent;
  color: var(--text-secondary);
  border-radius: 10px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.category-btn.active {
  background: var(--accent-primary);
  color: white;
}

.category-btn:hover:not(.active) {
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-primary);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  margin-bottom: 1.5rem;
  opacity: 0.4;
}

.reset-btn {
  margin-top: 1.5rem;
  background: var(--accent-primary);
  color: white;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
}

.pagination {
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
}

.page-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 8px;
  font-size: 0.9rem;
  border: 1px solid var(--border-color);
}

.page-btn:hover:not(:disabled) {
  background: var(--bg-tertiary);
  border-color: var(--accent-primary);
}

.page-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.page-info {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 992px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    display: none; /* In a real app we'd make this a horizontal scroll */
  }
}

/* Skeleton Loader Styles */
.skeleton-card {
  height: 400px;
  overflow: hidden;
  border-color: rgba(0, 0, 0, 0.05);
}

.skeleton-image {
  height: 200px;
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skeleton-line {
  background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
}

.skeleton-line.title {
  height: 24px;
  width: 80%;
}

.skeleton-line.desc {
  height: 14px;
  width: 100%;
}

.skeleton-line.last {
  width: 60%;
}

@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>
