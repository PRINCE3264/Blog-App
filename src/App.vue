<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <div class="app-wrapper">
    <Navbar />
    
    <main class="main-content-layout">
      <router-view v-slot="{ Component, route }">
        <transition name="fade" mode="out-in">
          <component v-if="Component" :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>
    
    <footer class="main-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <router-link to="/" class="logo logo-small">
            <span class="gradient-text">MODERN</span><span class="logo-bold">BLOG</span>
          </router-link>
          <p class="brand-desc">A premium platform exploring the edge of technology, design, and innovation. Stay ahead with our expert insights.</p>
          <div class="social-links">
            <a href="#" class="social-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
            <a href="#" class="social-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="#" class="social-btn"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
          </div>
        </div>
        
        <div class="footer-col">
          <h4>Platform</h4>
          <router-link to="/">Explore</router-link>
          <router-link to="/">Articles</router-link>
          <router-link to="/">Authors</router-link>
          <router-link to="/add-blog">Publish</router-link>
        </div>

        <div class="footer-col">
          <h4>Topics</h4>
          <router-link to="/">Technology</router-link>
          <router-link to="/">AI & Future</router-link>
          <router-link to="/">Business</router-link>
          <router-link to="/">Programming</router-link>
        </div>

        <div class="footer-col">
          <h4>Company</h4>
          <router-link to="/">About Us</router-link>
          <router-link to="/">Contact</router-link>
          <router-link to="/">Privacy Policy</router-link>
          <router-link to="/">Terms of Service</router-link>
        </div>
      </div>

      <div class="container">
        <div class="footer-divider"></div>
        <div class="footer-bottom">
          <p>&copy; 2025 ModernBlog Platform. Crafted with excellence by the team.</p>
          <p>Powered by Vue 3 & Design Excellence</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style>
@import './assets/style.css';

.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content-layout {
  flex: 1;
}

/* Professional Footer Styles */
.main-footer {
  padding-top: 6rem;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
}

.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 4rem;
  margin-bottom: 4rem;
}

.logo-small {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  display: inline-block;
}

.brand-desc {
  color: var(--text-secondary);
  max-width: 320px;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all 0.3s ease;
}

.social-btn:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(37, 99, 235, 0.1);
}

.footer-col h4 {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  color: var(--text-primary);
}

.footer-col a {
  display: block;
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: 0.75rem;
}

.footer-col a:hover {
  color: var(--accent-primary);
  padding-left: 5px;
}

.footer-divider {
  height: 1px;
  background: var(--border-color);
  margin-bottom: 2rem;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 3rem;
  color: var(--text-muted);
  font-size: 0.85rem;
}

/* Typography Helpers */
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

/* Page Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 640px) {
  .footer-bottom {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}
</style>
