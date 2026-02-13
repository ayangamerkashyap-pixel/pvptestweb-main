import { useState } from 'react'
import styles from '../styles/modules/Reports.module.css'
import { uploadReport } from '../api/reportsApi'

export default function ReportsAdmin() {
  const [year, setYear] = useState('')
  const [label, setLabel] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus(null)

    if (!year || !file) {
      setStatus({ type: 'error', message: 'Please provide a year and choose a file.' })
      return
    }

    try {
      setSubmitting(true)
      await uploadReport({
        year,
        label: label || file.name,
        type: 'file',
        file,
      })
      setStatus({ type: 'success', message: 'Report uploaded successfully.' })
      setYear('')
      setLabel('')
      setFile(null)
      e.target.reset()
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Upload failed.' })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.reportsContainer}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Upload Reports
        </h2>
        <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
          Upload annual report files here. Uploaded files will automatically appear on the
          public Annual Reports page grouped by year.
        </p>
      </div>
      <section className={styles.reportSection}>
        <form onSubmit={handleSubmit} className={styles.reportForm}>
          <div className={styles.formGroup}>
            <label htmlFor="year" className={styles.formLabel}>
              Year / Period
            </label>
            <input
              id="year"
              type="text"
              className={styles.formInput}
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="e.g. 2024 or 2023-2024"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="label" className={styles.formLabel}>
              Document Label (optional)
            </label>
            <input
              id="label"
              type="text"
              className={styles.formInput}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Full Annual Report (PDF)"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="file" className={styles.formLabel}>
              Report File (PDF / image / other)
            </label>
            <input
              id="file"
              type="file"
              className={styles.formInput}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <button
            type="submit"
            className={styles.reportButton}
            disabled={submitting}
          >
            {submitting ? 'Uploading...' : 'Upload Report'}
          </button>

          {status && (
            <p
              style={{
                marginTop: '1rem',
                color: status.type === 'success' ? '#15803d' : '#b91c1c',
                fontSize: '0.9rem',
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
