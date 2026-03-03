<script setup>
import { computed, ref } from 'vue'
import { useBlogs } from '../stores/useBlogs'
import BlogCard from '../components/BlogCard.vue'

const { 
  blogs,
  isLoading,
  categories, 
  selectedCategory, 
  filteredBlogs,
  toggleLike,
  isBlogLiked
} = useBlogs()

// Professional Meta for Categories with unique colors
const categoryMeta = {
  'Technology': { 
    icon: '💻', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', 
    gradient: 'linear-gradient(135deg, #3b82f6, #2563eb)',
    desc: 'Cutting-edge hardware, software developments, and industry shifts.'
  },
  'AI': { 
    icon: '🤖', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', 
    gradient: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
    desc: 'Machine learning, neural networks, and the future of intelligence.'
  },
  'Programming': { 
    icon: '⚡', color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', 
    gradient: 'linear-gradient(135deg, #10b981, #059669)',
    desc: 'Development patterns, language updates, and architectural best practices.'
  },
  'Business': { 
    icon: '📈', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', 
    gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
    desc: 'Startup strategies, market analysis, and professional growth.'
  },
  'Lifestyle': { 
    icon: '🌿', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)', 
    gradient: 'linear-gradient(135deg, #ec4899, #db2777)',
    desc: 'Work-life balance, productivity hacks, and personal wellness.'
  },
  'All': { 
    icon: '🌟', color: '#2563eb', bg: 'rgba(37, 99, 235, 0.1)', 
    gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
    desc: 'Every story we have ever told, compiled in one curated stream.'
  }
}

const activeBlogs = computed(() => {
  return filteredBlogs?.value || [];
})
</script>

<template>
  <div class="explore-container animate-fade-in">
    <div class="explore-hero">
      <div class="container">
        <span class="badge">CURATED CONTENT</span>
        <h1 class="hero-title">Browse by <span class="gradient">Categories</span></h1>
        <p class="hero-subtitle">Discover expert perspectives and deep-dives across our most popular topics.</p>
      </div>
    </div>

    <div class="container">
      <div class="category-grid">
        <button 
          v-for="cat in categories" 
          :key="cat"
          class="category-card"
          :class="{ 'active': selectedCategory === cat }"
          @click="selectedCategory = cat"
          :style="{ '--cat-color': categoryMeta[cat]?.color || '#2563eb', '--cat-bg': categoryMeta[cat]?.bg || 'rgba(37,99,235,0.1)' }"
        >
          <div class="cat-icon-wrap" :style="{ background: selectedCategory === cat ? 'white' : folder-color }">
            <span class="cat-icon">{{ categoryMeta[cat]?.icon || '📄' }}</span>
          </div>
          <div class="cat-info">
            <span class="cat-name">{{ cat }}</span>
            <span class="cat-count">{{ blogs.filter(b => b.category === cat || cat === 'All').length }} Articles</span>
          </div>
          <div class="cat-progress" v-if="selectedCategory === cat"></div>
        </button>
      </div>

      <main class="explore-content">
        <div class="section-header">
          <div class="title-with-pill">
            <div class="color-pill" :style="{ background: categoryMeta[selectedCategory]?.gradient }"></div>
            <div>
              <h2>{{ selectedCategory }} <span class="muted">Insights</span></h2>
              <p class="section-desc">{{ categoryMeta[selectedCategory]?.desc }}</p>
            </div>
          </div>
          <div class="count-pill glass">{{ activeBlogs.length }} Articles found</div>
        </div>

        <div v-if="isLoading" class="blog-grid">
          <div v-for="i in 3" :key="i" class="skeleton-card glass-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-content">
              <div class="skeleton-line title"></div>
              <div class="skeleton-line desc"></div>
            </div>
          </div>
        </div>

        <transition-group 
          v-else-if="activeBlogs.length > 0" 
          name="list" 
          tag="div" 
          class="blog-grid"
        >
          <BlogCard 
            v-for="blog in activeBlogs" 
            :key="blog.id" 
            :blog="blog"
            :isLiked="isBlogLiked(blog.id)"
            @toggleLike="toggleLike"
          />
        </transition-group>

        <div v-else class="empty-state glass">
          <div class="empty-illustration">📭</div>
          <h3>No articles in this category</h3>
          <p>We are currently working on new content for this topic. Check back soon!</p>
          <button @click="selectedCategory = 'All'" class="reset-btn">View All articles</button>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.explore-container {
  padding-bottom: 8rem;
}

.explore-hero {
  padding: 12rem 0 6rem;
  background: radial-gradient(circle at top right, rgba(37, 99, 235, 0.05), transparent 40%),
              radial-gradient(circle at bottom left, rgba(139, 92, 246, 0.05), transparent 40%);
  text-align: center;
}

.badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: var(--bg-tertiary);
  color: var(--accent-primary);
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 1.5px;
  margin-bottom: 1.5rem;
  border: 1px solid var(--border-color);
}

.hero-title {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  letter-spacing: -3px;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-top: -3rem;
  margin-bottom: 6rem;
}

.category-card {
  padding: 1.75rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
  box-shadow: var(--shadow-sm);
  position: relative;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-8px);
  border-color: var(--cat-color);
  box-shadow: 0 15px 30px -10px var(--cat-bg);
}

.category-card.active {
  background: var(--cat-color);
  border-color: var(--cat-color);
  color: white;
  box-shadow: 0 15px 30px -10px var(--cat-bg);
}

.cat-icon-wrap {
  width: 54px;
  height: 54px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  background: var(--cat-bg) !important;
  transition: transform 0.3s ease;
}

.category-card.active .cat-icon-wrap {
  background: rgba(255, 255, 255, 0.2) !important;
}

.category-card:hover .cat-icon-wrap {
  transform: scale(1.1) rotate(5deg);
}

.cat-info {
  display: flex;
  flex-direction: column;
}

.cat-name {
  font-weight: 700;
  font-size: 1.1rem;
}

.cat-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 500;
}

.category-card.active .cat-count {
  color: rgba(255, 255, 255, 0.8);
}

.cat-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.4);
  width: 100%;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.5rem;
}

.title-with-pill {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.color-pill {
  width: 12px;
  height: 40px;
  border-radius: 6px;
}

.section-header h2 {
  font-size: 2.5rem;
  letter-spacing: -1.5px;
}

.section-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: 0.5rem;
}

.muted {
  opacity: 0.3;
}

.count-pill {
  padding: 0.6rem 1.5rem;
  border-radius: 50px;
  font-weight: 700;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
}

.empty-state {
  text-align: center;
  padding: 6rem 2rem;
  border-radius: 32px;
}

.empty-illustration {
  font-size: 4rem;
  margin-bottom: 1.5rem;
}

.reset-btn {
  margin-top: 2rem;
  padding: 0.8rem 2rem;
  background: var(--accent-primary);
  color: white;
  border-radius: 12px;
  font-weight: 700;
}

/* List Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media (max-width: 768px) {
  .hero-title { font-size: 2.75rem; }
  .section-header { flex-direction: column; align-items: flex-start; gap: 1.5rem; }
  .category-grid { grid-template-columns: 1fr 1fr; }
}
</style>
