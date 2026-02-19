const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'

function getAuthToken() {
  if (typeof window === 'undefined') return null
  return window.localStorage.getItem('adminToken')
}

function authHeaders() {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

// --- Public APIs ---
export async function fetchReports() {
  const res = await fetch(`${API_BASE_URL}/api/reports`)
  if (!res.ok) {
    throw new Error('Failed to load reports')
  }
  const data = await res.json()
  // Prepend API base URL to relative document hrefs
  return data.map((report) => ({
    ...report,
    documents: report.documents?.map((doc) => ({
      ...doc,
      href: doc.href?.startsWith('/') ? `${API_BASE_URL}${doc.href}` : doc.href,
    })),
  }))
}

export async function fetchGallery() {
  const res = await fetch(`${API_BASE_URL}/api/gallery`)
  if (!res.ok) {
    throw new Error('Failed to load gallery')
  }
  const data = await res.json()
  // Prepend API base URL to relative image paths
  return data.map((img) => ({
    ...img,
    src: img.src?.startsWith('/') ? `${API_BASE_URL}${img.src}` : img.src,
  }))
}

export async function fetchContact() {
  const res = await fetch(`${API_BASE_URL}/api/contact`)
  if (!res.ok) {
    throw new Error('Failed to load contact details')
  }
  return res.json()
}

export async function fetchNews() {
  const res = await fetch(`${API_BASE_URL}/api/news`)
  if (!res.ok) {
    throw new Error('Failed to load news')
  }
  return res.json()
}

// --- Admin auth ---
export async function adminLogin({ username, password }) {
  const res = await fetch(`${API_BASE_URL}/api/admin/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Login failed')
  }

  if (typeof window !== 'undefined' && data.token) {
    window.localStorage.setItem('adminToken', data.token)
  }
  return data
}

export function adminLogout() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('adminToken')
  }
}

export function isAdminLoggedIn() {
  return !!getAuthToken()
}

// --- Admin-only APIs ---
export async function uploadReport({ year, label, type, file }) {
  const formData = new FormData()
  formData.append('year', year)
  if (label) formData.append('label', label)
  if (type) formData.append('type', type)
  formData.append('file', file)

  const res = await fetch(`${API_BASE_URL}/api/reports`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
    },
    body: formData,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to upload report')
  }

  return data
}

export async function updateReport(reportId, updates) {
  const res = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(updates),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update report')
  }

  return data
}

export async function deleteReport(reportId) {
  const res = await fetch(`${API_BASE_URL}/api/reports/${reportId}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete report')
  }

  return data
}

export async function uploadGallery({ title, file }) {
  const formData = new FormData()
  if (title) formData.append('title', title)
  formData.append('image', file)

  const res = await fetch(`${API_BASE_URL}/api/gallery`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
    },
    body: formData,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to upload image')
  }

  // Transform image URL to include API base URL
  if (data.src) {
    data.src = data.src?.startsWith('/') ? `${API_BASE_URL}${data.src}` : data.src
  }

  return data
}

export async function uploadGalleryBatch({ files }) {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('images', file)
  })

  const res = await fetch(`${API_BASE_URL}/api/gallery/batch`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
    },
    body: formData,
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to upload images')
  }

  // Transform image URLs to include API base URL
  if (data.images) {
    data.images = data.images.map((img) => ({
      ...img,
      src: img.src?.startsWith('/') ? `${API_BASE_URL}${img.src}` : img.src,
    }))
  }

  return data
}

export async function deleteGalleryImage(id) {
  const res = await fetch(`${API_BASE_URL}/api/gallery/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete image')
  }
  return data
}

export async function updateContact(details) {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(details),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update contact details')
  }
  return data
}

export async function createNewsItem(item) {
  const res = await fetch(`${API_BASE_URL}/api/news`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(item),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create news item')
  }
  return data
}

export async function deleteNewsItem(id) {
  const res = await fetch(`${API_BASE_URL}/api/news/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to delete news item')
  }
  return data
}

export async function changeAdminCredentials({ currentPassword, newUsername, newPassword }) {
  const res = await fetch(`${API_BASE_URL}/api/admin/change-credentials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ currentPassword, newUsername, newPassword }),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(data.error || 'Failed to update admin credentials')
  }
  return data
}


