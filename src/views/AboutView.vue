<template>
  <div class="about-container animate-fade-in container">
    <header class="about-header">
      <h1 class="hero-title">Elevating the <span class="gradient">Narrative</span> of Innovation</h1>
      <p class="hero-subtitle">We are a collective of writers, designers, and tech enthusiasts dedicated to exploring the intersection of human creativity and technological advancement.</p>
    </header>

    <section class="about-section glass">
      <div class="about-grid">
        <div class="about-image-wrap">
          <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Our Team" class="about-image glass-card">
        </div>
        <div class="about-text">
          <h2>Our Vision</h2>
          <p>Founded in 2025, ModernBlog was born out of a desire to provide more than just news. We aim to provide deep-dive insights, thoughtful analysis, and a platform for voices that are shaping the future of our industry.</p>
          <p>Whether it's the latest in Quantum Computing or the subtle psychology behind a user interface, we believe every topic deserves a professional, high-fidelity treatment.</p>
        </div>
      </div>
    </section>

    <section class="stats-section">
      <div class="stat-card glass">
        <span class="stat-number">10k+</span>
        <span class="stat-label">Monthly Readers</span>
      </div>
      <div class="stat-card glass">
        <span class="stat-number">500+</span>
        <span class="stat-label">Articles Published</span>
      </div>
      <div class="stat-card glass">
        <span class="stat-number">50+</span>
        <span class="stat-label">Expert Authors</span>
      </div>
    </section>

    <section class="values-section container">
      <div class="section-title-wrap">
        <h2>Our Core <span class="gradient">Values</span></h2>
        <p>The principles that guide every article we publish.</p>
      </div>
      <div class="values-grid">
        <div class="value-card glass">
          <div class="value-icon">💎</div>
          <h3>Quality First</h3>
          <p>We prioritize deep, accurate insights over rapid, shallow updates.</p>
        </div>
        <div class="value-card glass">
          <div class="value-icon">🤝</div>
          <h3>Radical Transparency</h3>
          <p>Our authors are experts who cite their sources and state their biases.</p>
        </div>
        <div class="value-card glass">
          <div class="value-icon">🌱</div>
          <h3>Continuous Growth</h3>
          <p>We evolve alongside the technologies and industries we cover.</p>
        </div>
      </div>
    </section>

    <section class="authors-section container">
      <div class="section-title-wrap">
        <h2>Expert <span class="gradient">Voices</span></h2>
        <p>Connect with the minds behind the insights.</p>
      </div>
      <div class="authors-list">
        <div class="author-item glass">
          <div class="author-img-wrap">
            <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200" alt="Sarah Chen" class="author-img">
          </div>
          <div class="author-info-mini">
            <h4>Dr. Sarah Chen</h4>
            <span>Quantum Computing Expert</span>
          </div>
        </div>
        <div class="author-item glass">
          <div class="author-img-wrap">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Marcus Thorne" class="author-img">
          </div>
          <div class="author-info-mini">
            <h4>Marcus Thorne</h4>
            <span>Architect & Designer</span>
          </div>
        </div>
        <div class="author-item glass">
          <div class="author-img-wrap">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" alt="Elena Rodriguez" class="author-img">
          </div>
          <div class="author-info-mini">
            <h4>Elena Rodriguez</h4>
            <span>AI Researcher</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-container {
  padding-top: 10rem;
  padding-bottom: 5rem;
}

.about-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
}

.about-section {
  padding: 4rem;
  margin-bottom: 5rem;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 24px;
}

.about-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  letter-spacing: -1.5px;
}

.about-text p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.stats-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.stat-card {
  text-align: center;
  padding: 3rem 2rem;
}

.stat-number {
  display: block;
  font-size: 3rem;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;
}

/* New Sections Styles */
.section-title-wrap {
  text-align: center;
  margin-bottom: 4rem;
  margin-top: 8rem;
}

.section-title-wrap h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.value-card {
  padding: 3rem 2rem;
  text-align: center;
  transition: all 0.4s ease;
}

.value-card:hover {
  transform: translateY(-5px);
  border-color: var(--accent-primary);
}

.value-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.value-card h3 {
  margin-bottom: 1rem;
}

.value-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.authors-list {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

.author-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  border-radius: 50px;
}

.author-img-wrap {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid var(--accent-primary);
}

.author-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-info-mini h4 {
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
}

.author-info-mini span {
  font-size: 0.85rem;
  color: var(--text-muted);
}

@media (max-width: 992px) {
  .about-grid {
    grid-template-columns: 1fr;
  }
  .values-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .stats-section {
    grid-template-columns: 1fr;
  }
}
</style>
