import { ref, computed, watch, onMounted } from 'vue'
import defaultBlogs from '../data/blogs.json'

// --- GLOBAL STATE ---
const blogs = ref([])
const isLoading = ref(true)
const isInitialized = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('All')
const currentPage = ref(1)
const itemsPerPage = 6 

// --- GLOBAL ACTIONS ---
const saveToLocalStorage = () => {
  localStorage.setItem('vue_blog_data', JSON.stringify(blogs.value))
}

const fetchBlogs = async () => {
  if (isInitialized.value) return; 
  
  isLoading.value = true
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const storedBlogs = localStorage.getItem('vue_blog_data')
  let parsedBlogs = storedBlogs ? JSON.parse(storedBlogs) : []
  
  if (parsedBlogs.length < defaultBlogs.length) {
    const existingIds = parsedBlogs.map(b => b.id);
    const newDefaults = defaultBlogs.filter(b => !existingIds.includes(b.id));
    parsedBlogs = [...newDefaults, ...parsedBlogs];
    
    blogs.value = parsedBlogs;
    saveToLocalStorage()
  } else {
    blogs.value = parsedBlogs
  }
  
  isLoading.value = false
  isInitialized.value = true
}

const addBlog = (newBlog) => {
  const blogWithId = {
    ...newBlog,
    id: Date.now().toString(),
    likes: 0,
    date: new Date().toISOString().split('T')[0]
  }
  blogs.value = [blogWithId, ...blogs.value] // Trigger reactivity solidly
  saveToLocalStorage()
}

const toggleLike = (id) => {
  const blog = blogs.value.find(b => b.id === id)
  if (blog) {
    const likedKey = `liked_${id}`
    const isLiked = localStorage.getItem(likedKey) === 'true'
    if (isLiked) {
      blog.likes--
      localStorage.removeItem(likedKey)
    } else {
      blog.likes++
      localStorage.setItem(likedKey, 'true')
    }
    saveToLocalStorage()
  }
}

const isBlogLiked = (id) => {
  return localStorage.getItem(`liked_${id}`) === 'true'
}

const getBlogById = (id) => {
  const blog = blogs.value.find(b => b.id === id)
  if (blog && !blog.comments) {
    blog.comments = []
  }
  return blog
}

const editBlog = (id, updatedData) => {
  const index = blogs.value.findIndex(b => b.id === id)
  if (index !== -1) {
    blogs.value[index] = { ...blogs.value[index], ...updatedData }
    saveToLocalStorage()
  }
}

const deleteBlog = (id) => {
  blogs.value = blogs.value.filter(b => b.id !== id)
  saveToLocalStorage()
}

const addComment = (id, commentObj) => {
  const blog = blogs.value.find(b => b.id === id)
  if (blog) {
    if (!blog.comments) blog.comments = []
    blog.comments.push({
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      ...commentObj
    })
    saveToLocalStorage()
  }
}

// --- GLOBAL COMPUTED ---
const categories = computed(() => {
  const cats = blogs.value.map(blog => blog.category)
  return ['All', ...new Set(cats)]
})

const filteredBlogs = computed(() => {
  if (!blogs.value) return []
  return [...blogs.value]
    .filter(blog => {
      const matchesSearch = blog.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                           blog.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      const matchesCategory = selectedCategory.value === 'All' || blog.category === selectedCategory.value
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalPages = computed(() => {
  if (!filteredBlogs.value) return 1;
  return Math.ceil(filteredBlogs.value.length / itemsPerPage) || 1;
})

const paginatedBlogs = computed(() => {
  if (!filteredBlogs.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredBlogs.value.slice(start, end)
})

// --- GLOBAL WATCHERS ---
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

// --- COMPOSABLE EXPORT ---
export function useBlogs() {
  onMounted(() => {
    fetchBlogs()
  })

  return {
    blogs,
    isLoading,
    searchQuery,
    selectedCategory,
    categories,
    currentPage,
    totalPages,
    filteredBlogs,
    paginatedBlogs,
    addBlog,
    toggleLike,
    isBlogLiked,
    getBlogById,
    editBlog,
    deleteBlog,
    addComment
  }
}
