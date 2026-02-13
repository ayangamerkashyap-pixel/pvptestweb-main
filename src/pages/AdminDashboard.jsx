import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/modules/Reports.module.css'
import ReportsAdmin from './ReportsAdmin'
import {
  adminLogout,
  isAdminLoggedIn,
  fetchGallery,
  uploadGallery,
  deleteGalleryImage,
  fetchContact,
  updateContact,
  fetchNews,
  createNewsItem,
  deleteNewsItem,
  changeAdminCredentials,
} from '../api/reportsApi'

function AdminGallerySection() {
  const [images, setImages] = useState([])
  const [title, setTitle] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchGallery()
      .then(setImages)
      .catch(() => {})
  }, [])

  async function handleDelete(id) {
    if (!window.confirm('Delete this gallery image?')) return
    try {
      await deleteGalleryImage(id)
      setImages((prev) => prev.filter((img) => img.id !== id))
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to delete image.' })
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)
    if (!file) {
      setStatus({ type: 'error', message: 'Please choose an image file.' })
      return
    }
    try {
      setSubmitting(true)
      const created = await uploadGallery({ title, file })
      setImages((prev) => [...prev, created])
      setTitle('')
      setFile(null)
      e.target.reset()
      setStatus({ type: 'success', message: 'Image uploaded successfully.' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Upload failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#111827',
        }}
      >
        Gallery Images
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '32rem',
          marginBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>
          <label
            htmlFor="galleryTitle"
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Caption / Title (optional)
          </label>
          <input
            id="galleryTitle"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
            placeholder="e.g. Health Camp Initiative"
          />
        </div>

        <div>
          <label
            htmlFor="galleryFile"
            style={{
              display: 'block',
              fontSize: '0.9rem',
              fontWeight: 600,
              marginBottom: '0.25rem',
              color: '#111827',
            }}
          >
            Image File
          </label>
          <input
            id="galleryFile"
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            style={{
              width: '100%',
              padding: '0.4rem 0.3rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
          />
        </div>

        <button type="submit" className={styles.reportButton} disabled={submitting}>
          {submitting ? 'Uploading…' : 'Upload Image'}
        </button>

        {status && (
          <p
            style={{
              marginTop: '0.25rem',
              color: status.type === 'success' ? '#15803d' : '#b91c1c',
              fontSize: '0.85rem',
            }}
          >
            {status.message}
          </p>
        )}
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '1rem' }}>
        {images.map((img) => (
          <div
            key={img.id}
            style={{
              borderRadius: '0.75rem',
              overflow: 'hidden',
              border: '1px solid #e5e7eb',
              backgroundColor: '#f9fafb',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => handleDelete(img.id)}
              style={{
                position: 'absolute',
                top: '0.35rem',
                right: '0.35rem',
                padding: '0.15rem 0.45rem',
                borderRadius: '999px',
                border: '1px solid #fecaca',
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                fontSize: '0.7rem',
                cursor: 'pointer',
                zIndex: 1,
              }}
            >
              ✕
            </button>
            <img
              src={img.src}
              alt={img.title}
              style={{ width: '100%', height: '120px', objectFit: 'cover' }}
            />
            <div style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}>
              <div style={{ fontWeight: 600 }}>{img.title}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminContactSection() {
  const [contact, setContact] = useState(null)
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchContact()
      .then(setContact)
      .catch(() => {})
  }, [])

  if (!contact) {
    return <p className={styles.reportParagraphText}>Loading contact details…</p>
  }

  function handleChange(field, value) {
    setContact((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)
    try {
      setSubmitting(true)
      const updated = await updateContact(contact)
      setContact(updated)
      setStatus({ type: 'success', message: 'Contact details updated.' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Update failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#111827',
        }}
      >
        Contact Details
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '32rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Address (one line per row)
          </label>
          <textarea
            value={(contact.addressLines || []).join('\n')}
            onChange={(e) => handleChange('addressLines', e.target.value.split('\n'))}
            rows={4}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              resize: 'vertical',
              color: '#111827',
            }}
          />
        </div>

        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Email
          </label>
          <input
            type="email"
            value={contact.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
          />
        </div>

        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Phone
          </label>
          <input
            type="text"
            value={contact.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
          />
        </div>

        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Office Hours (one per line, “Day: Time”)
          </label>
          <textarea
            value={(contact.officeHours || [])
              .map((o) => `${o.dayRange}: ${o.time}`)
              .join('\n')}
            onChange={(e) =>
              handleChange(
                'officeHours',
                e.target.value.split('\n').map((line) => {
                  const [dayRange, time] = line.split(':').map((p) => p.trim())
                  return { dayRange: dayRange || '', time: time || '' }
                })
              )
            }
            rows={4}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              resize: 'vertical',
              color: '#111827',
            }}
          />
        </div>

        <button type="submit" className={styles.reportButton} disabled={submitting}>
          {submitting ? 'Saving…' : 'Save Contact Details'}
        </button>

        {status && (
          <p
            style={{
              marginTop: '0.25rem',
              color: status.type === 'success' ? '#15803d' : '#b91c1c',
              fontSize: '0.85rem',
            }}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  )
}

function AdminNewsSection() {
  const [news, setNews] = useState([])
  const [form, setForm] = useState({
    title: '',
    category: '',
    date: '',
    description: '',
    image: '',
  })
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchNews()
      .then(setNews)
      .catch(() => {})
  }, [])

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)
    if (!form.title || !form.description) {
      setStatus({ type: 'error', message: 'Title and description are required.' })
      return
    }
    try {
      setSubmitting(true)
      const created = await createNewsItem(form)
      setNews((prev) => [...prev, created])
      setForm({
        title: '',
        category: '',
        date: '',
        description: '',
        image: '',
      })
      setStatus({ type: 'success', message: 'News item created.' })
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Creation failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this news item?')) return
    try {
      await deleteNewsItem(id)
      setNews((prev) => prev.filter((n) => n.id !== id))
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Delete failed.' })
    }
  }

  return (
    <div>
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#111827',
        }}
      >
        News &amp; Events
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '36rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleChange('title', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '0.25rem',
              }}
            >
              Category
            </label>
            <input
              type="text"
              value={form.category}
              onChange={(e) => handleChange('category', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '0.9rem',
                color: '#111827',
              }}
              placeholder="e.g. Policy, Report"
            />
          </div>
          <div style={{ flex: 1 }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                marginBottom: '0.25rem',
              }}
            >
              Date (optional)
            </label>
            <input
              type="text"
              value={form.date}
              onChange={(e) => handleChange('date', e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '0.9rem',
                color: '#111827',
              }}
              placeholder="e.g. Oct 24, 2024"
            />
          </div>
        </div>

        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Description
          </label>
          <textarea
            value={form.description}
            onChange={(e) => handleChange('description', e.target.value)}
            rows={4}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              resize: 'vertical',
              color: '#111827',
            }}
          />
        </div>

        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Image URL (optional)
          </label>
          <input
            type="text"
            value={form.image}
            onChange={(e) => handleChange('image', e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
          />
        </div>

        <button type="submit" className={styles.reportButton} disabled={submitting}>
          {submitting ? 'Saving…' : 'Add News Item'}
        </button>

        {status && (
          <p
            style={{
              marginTop: '0.25rem',
              color: status.type === 'success' ? '#15803d' : '#b91c1c',
              fontSize: '0.85rem',
            }}
          >
            {status.message}
          </p>
        )}
      </form>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {news.map((item) => (
          <div
            key={item.id}
            style={{
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              padding: '0.75rem 1rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>
                {item.category} • {item.date}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</div>
            </div>
            <button
              type="button"
              onClick={() => handleDelete(item.id)}
              style={{
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                border: '1px solid #fecaca',
                backgroundColor: '#fee2e2',
                color: '#b91c1c',
                fontSize: '0.75rem',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function AdminAccountSection() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)

    if (!currentPassword) {
      setStatus({ type: 'error', message: 'Please enter your current password.' })
      return
    }

    if (newPassword && newPassword !== confirmPassword) {
      setStatus({ type: 'error', message: 'New password and confirm password do not match.' })
      return
    }

    try {
      setSubmitting(true)
      const result = await changeAdminCredentials({
        currentPassword,
        newUsername: newUsername || undefined,
        newPassword: newPassword || undefined,
      })

      setStatus({
        type: 'success',
        message:
          'Admin credentials updated successfully. Use the new username/password the next time you log in.' +
          (result.username ? ` (New username: ${result.username})` : ''),
      })
      setCurrentPassword('')
      setNewUsername('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to update credentials.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div>
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '1rem',
          color: '#111827',
        }}
      >
        Admin Account
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: '28rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Current Password
          </label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
          />
        </div>

        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            New Username (optional)
          </label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
            placeholder="Leave blank to keep current username"
          />
        </div>

        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            New Password (optional)
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
            placeholder="Leave blank to keep current password"
          />
        </div>

        <div>
          <label
            style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
          >
            Confirm New Password
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: '100%',
              padding: '0.5rem 0.75rem',
              borderRadius: '0.5rem',
              border: '1px solid #d1d5db',
              fontSize: '0.9rem',
              color: '#111827',
            }}
            placeholder="Re-enter new password"
          />
        </div>

        <button type="submit" className={styles.reportButton} disabled={submitting}>
          {submitting ? 'Saving…' : 'Update Admin Credentials'}
        </button>

        {status && (
          <p
            style={{
              marginTop: '0.25rem',
              color: status.type === 'success' ? '#15803d' : '#b91c1c',
              fontSize: '0.85rem',
            }}
          >
            {status.message}
          </p>
        )}
      </form>
    </div>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('gallery')
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login', { replace: true })
    }
  }, [navigate])

  function handleLogout() {
    adminLogout()
    navigate('/admin/login', { replace: true })
  }

  return (
    <div className={styles.reportsContainer}>
      <header className={styles.headerSection}>
        <h1 className={styles.headerTitle}>Admin Panel</h1>
        <div className={styles.headerUnderline} />
        <p className={styles.headerDescription}>
          Manage gallery images, contact details, annual reports, and news &amp; events shown on the website.
        </p>
      </header>

      <section className={styles.reportSection}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
            }}
          >
            {[
              { id: 'gallery', label: 'Gallery Images' },
              { id: 'contact', label: 'Contact Details' },
              { id: 'reports', label: 'Reports' },
              { id: 'news', label: 'News & Events' },
              { id: 'account', label: 'Admin Account' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: '0.4rem 0.9rem',
                  borderRadius: '999px',
                  border: '1px solid #d1d5db',
                  backgroundColor: activeTab === tab.id ? '#106100' : '#ffffff',
                  color: activeTab === tab.id ? '#ffffff' : '#111827',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease, color 0.2s ease',
                }}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={handleLogout}
            style={{
              padding: '0.4rem 0.9rem',
              borderRadius: '999px',
              border: '1px solid #fecaca',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Log out
          </button>
        </div>

        {activeTab === 'gallery' && <AdminGallerySection />}
        {activeTab === 'contact' && <AdminContactSection />}
        {activeTab === 'reports' && <ReportsAdmin />}
        {activeTab === 'news' && <AdminNewsSection />}
        {activeTab === 'account' && <AdminAccountSection />}
      </section>
    </div>
  )
}

