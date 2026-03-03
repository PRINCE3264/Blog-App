<script setup>
import { ref, reactive } from 'vue'
import Swal from 'sweetalert2'

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  
  if (!form.name || !form.email || !form.subject || !form.message) {
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
  
  isSubmitting.value = false
  
  Swal.fire({
    icon: 'success',
    title: 'Message Sent!',
    text: 'Thank you for reaching out. We will get back to you soon.',
    timer: 3000,
    showConfirmButton: false,
    background: '#ffffff',
    color: '#0f172a'
  }).then(() => {
    // reset form
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  })
}
</script>

<template>
  <div class="contact-container animate-fade-in container">
    <header class="contact-header">
      <h1 class="hero-title">Get in <span class="gradient">Touch</span></h1>
      <p class="hero-subtitle">Have a question, feedback, or want to collaborate? We'd love to hear from you.</p>
    </header>

    <div class="contact-grid">
      <div class="contact-info glass">
        <h2>Contact Information</h2>
        <p class="info-desc">Fill out the form and our team will get back to you within 24 hours.</p>
        
        <div class="info-items">
          <div class="info-item">
            <span class="info-icon">📍</span>
            <div>
              <h3>Location</h3>
              <p>123 Innovation Drive, Tech City, TC 90210</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">✉️</span>
            <div>
              <h3>Email</h3>
              <p>hello@modernblog.com</p>
            </div>
          </div>
          <div class="info-item">
            <span class="info-icon">📞</span>
            <div>
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
          </div>
        </div>
        
        <div class="social-links">
          <a href="#" class="social-btn">Twitter</a>
          <a href="#" class="social-btn">LinkedIn</a>
          <a href="#" class="social-btn">GitHub</a>
        </div>
      </div>
      
      <div class="contact-form-wrap glass">
        <form @submit.prevent="handleSubmit" class="contact-form">
          <div class="form-group grid-2">
            <div class="form-control">
              <label>Your Name</label>
              <input type="text" v-model="form.name" placeholder="John Doe" required>
            </div>
            <div class="form-control">
              <label>Your Email</label>
              <input type="email" v-model="form.email" placeholder="john@example.com" required>
            </div>
          </div>
          
          <div class="form-control">
            <label>Subject</label>
            <input type="text" v-model="form.subject" placeholder="How can we help?" required>
          </div>
          
          <div class="form-control">
            <label>Message</label>
            <textarea v-model="form.message" rows="6" placeholder="Write your message here..." required></textarea>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isSubmitting">
            <span v-if="!isSubmitting">Send Message</span>
            <span v-else class="loader"></span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-container {
  padding-top: 10rem;
  padding-bottom: 5rem;
  max-width: 1200px;
}

.contact-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 4rem;
}

.hero-title {
  font-size: 3.5rem;
  letter-spacing: -2px;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: var(--text-secondary);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  align-items: start;
}

.contact-info {
  padding: 3rem;
  border-radius: 24px;
}

.contact-info h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.info-desc {
  color: var(--text-secondary);
  margin-bottom: 3rem;
  line-height: 1.6;
}

.info-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.info-item {
  display: flex;
  gap: 1.5rem;
  align-items: flex-start;
}

.info-icon {
  font-size: 1.5rem;
  background: var(--bg-secondary);
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
}

.info-item h3 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.info-item p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-btn {
  padding: 0.5rem 1rem;
  background: var(--bg-secondary);
  color: var(--text-primary);
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-btn:hover {
  background: var(--accent-primary);
  color: white;
}

.contact-form-wrap {
  padding: 3rem;
  border-radius: 24px;
}

.contact-form {
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

input, textarea {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--accent-primary);
  box-shadow: 0 0 15px rgba(37, 99, 235, 0.1);
}

.submit-btn {
  margin-top: 1rem;
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
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 15px 30px rgba(37, 99, 235, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

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

@media (max-width: 992px) {
  .contact-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

@media (max-width: 640px) {
  .grid-2 {
    grid-template-columns: 1fr;
  }
  .contact-info, .contact-form-wrap {
    padding: 2rem;
  }
}
</style>
