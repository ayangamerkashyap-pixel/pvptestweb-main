import { useEffect, useState } from 'react'
import styles from '../styles/modules/Reports.module.css'
import { fetchReports } from '../api/reportsApi'

export default function Reports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true
    async function load() {
      try {
        const data = await fetchReports()
        if (isMounted) {
          // Sort by year descending if possible
          const sorted = [...data].sort((a, b) => {
            const ay = parseInt(String(a.year).slice(0, 4), 10)
            const by = parseInt(String(b.year).slice(0, 4), 10)
            if (isNaN(ay) || isNaN(by)) return 0
            return by - ay
          })
          setReports(sorted)
        }
      } catch (e) {
        console.error(e)
        if (isMounted) {
          setError('Unable to load reports right now. Please try again later.')
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }
    load()
    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div className={styles.reportsContainer}>
      {/* Header */}
      <header className={styles.headerSection}>
        <h1 className={styles.headerTitle}>Annual Reports</h1>
        <div className={styles.headerUnderline} />
        <p className={styles.headerDescription}>
          Access our comprehensive archive of annual performance reports,
          financial statements, and strategic reviews. Download full PDFs or
          view summaries of impact and financials.
        </p>
      </header>

      {/* Year-wise Reports in Paragraph Form */}
      <section className={styles.reportSection}>
        {loading && (
          <p className={styles.reportParagraphText}>Loading reports...</p>
        )}

        {!loading && error && (
          <p className={styles.reportParagraphText} style={{ color: '#b91c1c' }}>
            {error}
          </p>
        )}

        {!loading && !error && reports.length === 0 && (
          <p className={styles.reportParagraphText}>
            No reports have been uploaded yet. Please check back later.
          </p>
        )}

        {!loading && !error && reports.length > 0 && (
          <div className={styles.reportList}>
            {reports.map((report) => (
              <article key={report.year} className={styles.reportParagraph}>
                <h2 className={styles.reportParagraphYear}>{report.year}</h2>
                <h3 className={styles.reportParagraphTitle}>{report.title}</h3>
                <p className={styles.reportParagraphText}>{report.description}</p>

                {report.documents && report.documents.length > 0 && (
                  <p className={styles.reportParagraphLinks}>
                    {report.documents.map((doc, index) => (
                      <span key={index}>
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
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}