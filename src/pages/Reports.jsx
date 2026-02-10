import { useState } from 'react'
import styles from '../styles/modules/Reports.module.css'

export default function Reports() {
  const [selectedYear, setSelectedYear] = useState(2024)

  const reports = {
    2024: {
      title: 'Annual Report 2024',
      description:
        'A detailed overview of our programs, impact, and finances for the year 2024.',
      highlights: [
        { stat: '5,000+', label: 'Beneficiaries Reached' },
        { stat: '150+', label: 'Health Camps' },
        { stat: '1,200', label: 'Students Supported' },
        { stat: '800+', label: 'Skills Trained' },
      ],
    },
    2023: {
      title: 'Annual Report 2023',
      description: 'Program summaries, outcomes and financial statements for 2023.',
      highlights: [
        { stat: '4,500+', label: 'Beneficiaries Reached' },
        { stat: '140+', label: 'Health Programs' },
        { stat: '1,000', label: 'Students Assisted' },
        { stat: '700+', label: 'Trained' },
      ],
    },
  }

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

      {/* Reports Grid */}
      <section className={styles.reportSection}>
        <div className={styles.reportGrid}>
          {Object.keys(reports)
            .sort((a, b) => Number(b) - Number(a))
            .map((year) => {
              const r = reports[year]
              return (
                <article key={year} className={styles.reportCard}>
                  <div className={styles.reportHeader}>
                    <div className={styles.reportYear}>{year}</div>
                    <div className={styles.reportTitle}>{r.title}</div>
                  </div>

                  <div className={styles.reportContent}>
                    <p className={styles.reportDescription}>{r.description}</p>

                    <div className={styles.reportMeta}>
                      {r.highlights.map((h, i) => (
                        <div key={i} className={styles.reportMetaItem}>
                          <div className={styles.reportMetaLabel}>{h.stat}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{h.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className={styles.reportButtons}>
                      <a href="#" className={`${styles.reportButton} ${styles.reportButtonPrimary}`}>
                        <span className="material-symbols-outlined">picture_as_pdf</span>
                        Download PDF
                      </a>
                      <a href="#" className={`${styles.reportButton} ${styles.reportButtonSecondary}`}>
                        View Summary
                      </a>
                    </div>
                  </div>
                </article>
              )
            })}
        </div>
      </section>
    </div>
  )
}