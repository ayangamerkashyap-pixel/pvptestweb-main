import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from '../styles/modules/Reports.module.css'
import { adminLogin, isAdminLoggedIn } from '../api/reportsApi'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAdminLoggedIn()) {
      navigate('/admin', { replace: true })
    }
  }, [navigate])

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)
    if (!username || !password) {
      setStatus({ type: 'error', message: 'Please enter username and password.' })
      return
    }

    try {
      setSubmitting(true)
      await adminLogin({ username, password })
      setStatus({ type: 'success', message: 'Login successful. Redirecting…' })
      navigate('/admin', { replace: true })
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Login failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.reportsContainer}>
      <header className={styles.headerSection}>
        <h1 className={styles.headerTitle}>Admin Login</h1>
        <div className={styles.headerUnderline} />
        <p className={styles.headerDescription}>
          Please sign in to manage gallery images, contact details, reports, and news &amp; events.
        </p>
      </header>

      <section className={styles.reportSection}>
        <form
          onSubmit={handleSubmit}
          style={{
            maxWidth: '24rem',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <div>
            <label
              htmlFor="username"
              style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '0.9rem',
                color: '#111827',
              }}
              placeholder="admin"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              style={{ display: 'block', fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.75rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                fontSize: '0.9rem',
                color: '#111827',
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className={styles.reportButton}
            style={{ maxWidth: '100%' }}
            disabled={submitting}
          >
            {submitting ? 'Signing in…' : 'Sign In'}
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
      </section>
    </div>
  )
}

