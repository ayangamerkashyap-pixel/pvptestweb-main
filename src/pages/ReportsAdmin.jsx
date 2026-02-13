import { useEffect, useState } from 'react'
import styles from '../styles/modules/Reports.module.css'
import { fetchReports, uploadReport, updateReport, deleteReport } from '../api/reportsApi'

export default function ReportsAdmin() {
  const [year, setYear] = useState('')
  const [label, setLabel] = useState('')
  const [file, setFile] = useState(null)
  const [status, setStatus] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [reports, setReports] = useState([])
  const [loadingReports, setLoadingReports] = useState(true)
  const [reportsError, setReportsError] = useState(null)
  const [editingReportId, setEditingReportId] = useState(null)
  const [editForm, setEditForm] = useState({
    year: '',
    title: '',
    description: '',
  })

  useEffect(() => {
    let isMounted = true
    async function loadReports() {
      try {
        const data = await fetchReports()
        if (isMounted) {
          const sorted = [...data].sort((a, b) => {
            const ay = parseInt(String(a.year).slice(0, 4), 10)
            const by = parseInt(String(b.year).slice(0, 4), 10)
            if (Number.isNaN(ay) || Number.isNaN(by)) return 0
            return by - ay
          })
          setReports(sorted)
        }
      } catch (err) {
        if (isMounted) {
          setReportsError(err.message || 'Failed to load existing reports.')
        }
      } finally {
        if (isMounted) {
          setLoadingReports(false)
        }
      }
    }

    loadReports()
    return () => {
      isMounted = false
    }
  }, [])

  function startEditing(report) {
    setEditingReportId(report.id)
    setEditForm({
      year: report.year || '',
      title: report.title || '',
      description: report.description || '',
    })
    setStatus(null)
  }

  function cancelEditing() {
    setEditingReportId(null)
    setEditForm({
      year: '',
      title: '',
      description: '',
    })
  }

  function handleEditChange(field, value) {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleEditSubmit(e) {
    e.preventDefault()
    if (!editingReportId) return
    setStatus(null)

    try {
      const updated = await updateReport(editingReportId, editForm)
      setReports((prev) =>
        prev.map((r) => (r.id === editingReportId ? { ...r, ...updated } : r))
      )
      setStatus({ type: 'success', message: 'Report details updated.' })
      cancelEditing()
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to update report.' })
    }
  }

  async function handleDelete(reportId) {
    if (!window.confirm('Delete this report and all its documents?')) return
    setStatus(null)
    try {
      await deleteReport(reportId)
      setReports((prev) => prev.filter((r) => r.id !== reportId))
      setStatus({ type: 'success', message: 'Report deleted.' })
      if (editingReportId === reportId) {
        cancelEditing()
      }
    } catch (err) {
      setStatus({ type: 'error', message: err.message || 'Failed to delete report.' })
    }
  }

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
      // Refresh list of reports so the new upload appears below
      setLoadingReports(true)
      setReportsError(null)
      try {
        const data = await fetchReports()
        const sorted = [...data].sort((a, b) => {
          const ay = parseInt(String(a.year).slice(0, 4), 10)
          const by = parseInt(String(b.year).slice(0, 4), 10)
          if (Number.isNaN(ay) || Number.isNaN(by)) return 0
          return by - ay
        })
        setReports(sorted)
      } catch (err) {
        setReportsError(err.message || 'Failed to refresh reports after upload.')
      } finally {
        setLoadingReports(false)
      }
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

      <section className={styles.reportSection}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Existing Reports
        </h3>

        {loadingReports && (
          <p className={styles.reportParagraphText}>Loading existing reports...</p>
        )}

        {!loadingReports && reportsError && (
          <p
            className={styles.reportParagraphText}
            style={{ color: '#b91c1c' }}
          >
            {reportsError}
          </p>
        )}

        {!loadingReports && !reportsError && reports.length === 0 && (
          <p className={styles.reportParagraphText}>
            No reports have been uploaded yet.
          </p>
        )}

        {!loadingReports && !reportsError && reports.length > 0 && (
          <div className={styles.reportList}>
            {reports.map((report) => (
              <article key={report.id || report.year} className={styles.reportParagraph}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '1rem',
                    marginBottom: '0.5rem',
                  }}
                >
                  <div>
                    <h4 className={styles.reportParagraphYear}>{report.year}</h4>
                    <h5 className={styles.reportParagraphTitle}>
                      {report.title || 'Untitled report'}
                    </h5>
                    <p
                      className={styles.reportParagraphText}
                      style={{ marginTop: '0.25rem' }}
                    >
                      {report.description || 'No description provided.'}
                    </p>
                  </div>
                  {report.id && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      <button
                        type="button"
                        className={styles.reportButton}
                        style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}
                        onClick={() => startEditing(report)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className={`${styles.reportButton} ${styles.reportButtonSecondary}`}
                        style={{
                          fontSize: '0.8rem',
                          padding: '0.25rem 0.75rem',
                          backgroundColor: '#fee2e2',
                          color: '#b91c1c',
                          borderColor: '#fecaca',
                        }}
                        onClick={() => handleDelete(report.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>

                {report.documents && report.documents.length > 0 && (
                  <p className={styles.reportParagraphLinks}>
                    {report.documents.map((doc, index) => (
                      <span key={doc.id || index}>
                        <a
                          href={doc.href}
                          className={styles.reportLinkAnchor}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {doc.label}
                        </a>
                        {index < report.documents.length - 1 && <span> | </span>}
                      </span>
                    ))}
                  </p>
                )}

                {editingReportId === report.id && (
                  <form
                    onSubmit={handleEditSubmit}
                    style={{
                      marginTop: '0.75rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px dashed #e5e7eb',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                    }}
                  >
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          marginBottom: '0.2rem',
                        }}
                      >
                        Year / Period
                      </label>
                      <input
                        type="text"
                        value={editForm.year}
                        onChange={(e) => handleEditChange('year', e.target.value)}
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          marginBottom: '0.2rem',
                        }}
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        value={editForm.title}
                        onChange={(e) => handleEditChange('title', e.target.value)}
                        className={styles.formInput}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          display: 'block',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          marginBottom: '0.2rem',
                        }}
                      >
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={editForm.description}
                        onChange={(e) => handleEditChange('description', e.target.value)}
                        className={styles.formInput}
                        style={{ resize: 'vertical' }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        justifyContent: 'flex-end',
                        marginTop: '0.25rem',
                      }}
                    >
                      <button
                        type="button"
                        className={`${styles.reportButton} ${styles.reportButtonSecondary}`}
                        style={{ fontSize: '0.8rem', padding: '0.25rem 0.75rem' }}
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className={styles.reportButton}
                        style={{ fontSize: '0.8rem', padding: '0.25rem 0.9rem' }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
