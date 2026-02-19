import express from 'express'
import cors from 'cors'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000

// Simple admin credentials (for demo purposes only)
const ADMIN_TOKEN = 'pvp-admin-token'

// Middlewares
app.use(cors())
app.use(express.json())

// Directory to store uploaded files and JSON data
const uploadsDir = path.join(__dirname, 'uploads')
const reportsDataFile = path.join(__dirname, 'reports-data.json')
const galleryDataFile = path.join(__dirname, 'gallery-data.json')
const contactDataFile = path.join(__dirname, 'contact-data.json')
const newsDataFile = path.join(__dirname, 'news-data.json')
const adminConfigFile = path.join(__dirname, 'admin-config.json')

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true })
}

// Multer storage configuration: year-based folders for reports
const reportsStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { year } = req.body
    const yearFolder = year ? String(year).trim() : 'uncategorised'
    const dest = path.join(uploadsDir, yearFolder)
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true })
    }
    cb(null, dest)
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now()
    const safeOriginal = file.originalname.replace(/\s+/g, '_')
    cb(null, `${timestamp}-${safeOriginal}`)
  },
})

const uploadReportFile = multer({ storage: reportsStorage })

// Multer storage for gallery images
const galleryDir = path.join(uploadsDir, 'gallery')
if (!fs.existsSync(galleryDir)) {
  fs.mkdirSync(galleryDir, { recursive: true })
}

const galleryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, galleryDir)
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now()
    const safeOriginal = file.originalname.replace(/\s+/g, '_')
    cb(null, `${timestamp}-${safeOriginal}`)
  },
})

const uploadGalleryImage = multer({ storage: galleryStorage })

// Admin auth helpers
function getTokenFromRequest(req) {
  const authHeader = req.headers.authorization || ''
  if (authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7)
  }
  return null
}

function requireAdmin(req, res, next) {
  const token = getTokenFromRequest(req)
  if (token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  next()
}

// Generic JSON helpers
function readJson(filePath, fallback) {
  if (!fs.existsSync(filePath)) {
    return fallback
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    console.error(`Error reading ${filePath}`, e)
    return fallback
  }
}

function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

// Helper to read/write reports data
function readReports() {
  if (!fs.existsSync(reportsDataFile)) {
    return []
  }
  try {
    const raw = fs.readFileSync(reportsDataFile, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    console.error('Error reading reports-data.json', e)
    return []
  }
}

function writeReports(data) {
  writeJson(reportsDataFile, data)
}

// Helpers for other content
function readGallery() {
  return readJson(galleryDataFile, [])
}

function writeGallery(data) {
  writeJson(galleryDataFile, data)
}

function readContact() {
  // Default contact details based on current Contact page
  return readJson(contactDataFile, {
    addressLines: [
      'Purbottar Vikash Parishad',
      'Napukhuri Extension Part-II,',
      'P.o., P.S. & DIST: Tinsukia,',
      'Assam - 786125',
    ],
    email: 'purbottarvikashparishad@gmail.com',
    phone: '+91 9435135088',
    officeHours: [
      { dayRange: 'Monday - Friday', time: '9:00 AM - 5:00 PM' },
      { dayRange: 'Saturday', time: '10:00 AM - 2:00 PM' },
      { dayRange: 'Sunday', time: 'Closed' },
    ],
  })
}

function writeContact(data) {
  writeJson(contactDataFile, data)
}

function readNews() {
  // Seed with some default news if file does not exist
  return readJson(newsDataFile, [
    {
      id: 1,
      title: 'New Policy Implementation for Digital Infrastructure',
      category: 'Policy',
      date: 'Oct 24, 2024',
      description:
        'The organization has announced a comprehensive framework designed to modernize our digital backbone through strategic community partnerships.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDMdDudF3A9guMN-HxIXyappQUds2ItJit4k1_9br0X3m1EacygqIIw7IC01wCdA5n59Dj2b2J_8amNJ1Pn51nRNdfOWLhlgQXv1bynYJpok5k6SNaWDXAmIrOIjPyIHuUHNsyP-IMWgijfk3bZ4BX0I0MeqDO-QCUKdPYQpePWO4LIQ6FGXiCdLefd9qvH0vXs6Y6g9o4N-mo_PclL-2BCzYWrFP8UgVtu3SKGMoeudz9xVCInumLEDh26ZeKlE-_4E0FnusyjGeyr',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      id: 2,
      title: 'Health Camp Initiative Reaches 500+ Beneficiaries',
      category: 'Report',
      date: 'Oct 20, 2024',
      description:
        'Our latest health camp across rural communities has successfully provided medical check-ups and health services to over 500 individuals.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBfNA-m6Oq02g6mxFUy1Wh28vjhQodfBGkwKWCvXMfj39828fCZHOSXjTBf8FPo8o6dJ_86Ux5l0CmymM0twBM5muFoyroC6fE5njh6BUjcRxZVphd86Ihr_YK_s4Wvqqysh7e1YCQulzt1WRuQ8K8tl3aKuPc4MYRlfoAmp18sr1xs7MFgNByPY5ErH4-xSSlaAn3IXjI6k3Z_5rMY5PKr9gp-BjDtEXdRCMG39T2ENmzTxS0KN3A5b1rLnaUZ9yYRO35Tud0uCaPe',
      categoryColor: 'bg-green-100 text-green-700',
    },
    {
      id: 3,
      title: 'Community Outreach: Skill Training Program Launch',
      category: 'Community',
      date: 'Oct 15, 2024',
      description:
        'Launching a new skill training program to empower youth and create sustainable livelihood opportunities in rural areas.',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDm5tPmm312anWIrwUeP9SgC_8AEudxffH66TWgd1et9x2GMj6adSZxZlFDYzpUCPnBkZGdYjV8MYCAA3rSPEiHBoVHtKHtbyxKtmkq1odyx86kH_QK4WctZ6z4O3OYll7Shj52yJK2a0nBlRXL4D25sqoxzVP6gGeohVdzN9XvnN0B4acc9TIdhX2DmBnIFDQxSa06EUdSsS1rNISYzt9sCLOFcqqjjZibDypRiGkkOHOqCPF-K0UQb3Cf3dyBwHO13oMSEwqgPz__',
      categoryColor: 'bg-orange-100 text-orange-700',
    },
  ])
}

function writeNews(data) {
  writeJson(newsDataFile, data)
}

// Admin config (username/password) helpers
function readAdminConfig() {
  return readJson(adminConfigFile, {
    username: 'admin',
    password: 'pvp123',
  })
}

function writeAdminConfig(config) {
  writeJson(adminConfigFile, config)
}

// Serve uploaded files statically
app.use('/uploads', express.static(uploadsDir))

// --- Admin login ---
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body || {}
  const config = readAdminConfig()
  if (username === config.username && password === config.password) {
    return res.json({ token: ADMIN_TOKEN })
  }
  return res.status(401).json({ error: 'Invalid credentials' })
})

// Admin: change username/password
app.post('/api/admin/change-credentials', requireAdmin, (req, res) => {
  try {
    const { currentPassword, newUsername, newPassword } = req.body || {}
    const config = readAdminConfig()

    if (!currentPassword) {
      return res.status(400).json({ error: 'Current password is required' })
    }
    if (currentPassword !== config.password) {
      return res.status(401).json({ error: 'Current password is incorrect' })
    }

    const updated = {
      username: newUsername && newUsername.trim() ? newUsername.trim() : config.username,
      password: newPassword && newPassword.trim() ? newPassword.trim() : config.password,
    }

    writeAdminConfig(updated)

    res.json({ success: true, username: updated.username })
  } catch (error) {
    console.error('Error changing admin credentials', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// GET /api/reports - list all reports grouped by year
app.get('/api/reports', (req, res) => {
  const reports = readReports()
  res.json(reports)
})

// POST /api/reports - upload a new report file for a year (admin only)
// Expects multipart/form-data with fields: year, label (optional), type (optional), and file
app.post('/api/reports', requireAdmin, uploadReportFile.single('file'), (req, res) => {
  try {
    const { year, label, type } = req.body

    if (!year) {
      return res.status(400).json({ error: 'Year is required' })
    }
    if (!req.file) {
      return res.status(400).json({ error: 'File is required' })
    }

    const reports = readReports()
    const yearKey = String(year).trim()

    const existing = reports.find((r) => r.year === yearKey)
    const fileUrl = `/uploads/${yearKey}/${req.file.filename}`

    const documentEntry = {
      label: label || req.file.originalname,
      href: fileUrl,
      type: type || 'file',
    }

    if (existing) {
      existing.documents.push(documentEntry)
    } else {
      reports.push({
        year: yearKey,
        title: `Annual Report ${yearKey}`,
        description: `Reports and documents for the year ${yearKey}.`,
        documents: [documentEntry],
      })
    }

    writeReports(reports)

    res.status(201).json({ message: 'Report uploaded successfully', report: documentEntry })
  } catch (error) {
    console.error('Error uploading report', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// --- Gallery API ---
// Public: list gallery images
app.get('/api/gallery', (req, res) => {
  const gallery = readGallery()
  res.json(gallery)
})

// Admin: upload new gallery image (single)
app.post('/api/gallery', requireAdmin, uploadGalleryImage.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Image file is required' })
    }
    const { title } = req.body
    const gallery = readGallery()
    const id = Date.now()
    const imageUrl = `/uploads/gallery/${req.file.filename}`
    const entry = {
      id,
      title: title || req.file.originalname,
      src: imageUrl,
    }
    gallery.push(entry)
    writeGallery(gallery)
    res.status(201).json(entry)
  } catch (error) {
    console.error('Error uploading gallery image', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: upload multiple gallery images (batch)
app.post('/api/gallery/batch', requireAdmin, uploadGalleryImage.array('images', 20), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'At least one image file is required' })
    }

    const gallery = readGallery()
    const uploadedEntries = []

    req.files.forEach((file) => {
      const id = Date.now() + Math.random() * 1000 // Ensure unique IDs
      const imageUrl = `/uploads/gallery/${file.filename}`
      const entry = {
        id: Math.floor(id),
        title: file.originalname.replace(/\.[^/.]+$/, ''), // Remove extension as title
        src: imageUrl,
      }
      gallery.push(entry)
      uploadedEntries.push(entry)
    })

    writeGallery(gallery)
    res.status(201).json({
      message: `${uploadedEntries.length} image(s) uploaded successfully`,
      images: uploadedEntries,
    })
  } catch (error) {
    console.error('Error uploading gallery images', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: delete gallery image
app.delete('/api/gallery/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id)
    const gallery = readGallery()
    const image = gallery.find((item) => item.id === id)
    const updated = gallery.filter((item) => item.id !== id)
    writeGallery(updated)

    // Best-effort delete of physical file if it's under our uploads dir
    if (image && image.src && image.src.startsWith('/uploads/')) {
      const filePath = path.join(uploadsDir, image.src.replace('/uploads/', ''))
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.warn('Failed to delete gallery file', filePath, err)
          }
        })
      }
    }

    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting gallery image', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// --- Contact API ---
// Public: get contact info
app.get('/api/contact', (req, res) => {
  const contact = readContact()
  res.json(contact)
})

// Admin: update contact info
app.put('/api/contact', requireAdmin, (req, res) => {
  try {
    const current = readContact()
    const updated = { ...current, ...(req.body || {}) }
    writeContact(updated)
    res.json(updated)
  } catch (error) {
    console.error('Error updating contact', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// --- News & Events API ---
// Public: list news
app.get('/api/news', (req, res) => {
  const news = readNews()
  res.json(news)
})

// Admin: create news item
app.post('/api/news', requireAdmin, (req, res) => {
  try {
    const { title, category, date, description, image, categoryColor } = req.body || {}
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' })
    }
    const news = readNews()
    const id = Date.now()
    const item = {
      id,
      title,
      category: category || 'General',
      date: date || new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      description,
      image:
        image ||
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=500&fit=crop',
      categoryColor: categoryColor || 'bg-primary/10 text-primary',
    }
    news.push(item)
    writeNews(news)
    res.status(201).json(item)
  } catch (error) {
    console.error('Error creating news item', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Admin: delete news item
app.delete('/api/news/:id', requireAdmin, (req, res) => {
  try {
    const id = Number(req.params.id)
    const news = readNews()
    const filtered = news.filter((item) => item.id !== id)
    writeNews(filtered)
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting news item', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

app.get('/', (req, res) => {
  res.send('Content backend is running.')
})

app.listen(PORT, () => {
  console.log(`Reports backend listening on port ${PORT}`)
})

