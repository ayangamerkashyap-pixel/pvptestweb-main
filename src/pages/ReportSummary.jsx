import { Link, useParams } from 'react-router-dom'
import styles from '../styles/modules/Reports.module.css'

// Simple mapping from year/year-range to the same metadata used on the main Reports page.
// If you later move the data to a shared file, you can import it here instead.
const reports = [
  {
    year: '2024',
    title: 'Annual Report 2024',
    description:
      'Comprehensive overview of activities, impact and financial statements for the year 2024.',
    details: [
      'Expanded outreach programmes across health, education and livelihoods.',
      'Strengthened partnerships with community organisations and donors.',
      'Improved monitoring and evaluation systems to track impact.',
    ],
  },
  {
    year: '2023',
    title: 'Annual Report 2023',
    description:
      'Summary of key programmes, outcomes and audited financials for the year 2023.',
    details: [
      'Consolidated core programmes with focus on sustainability.',
      'Introduced new initiatives in child education and women empowerment.',
      'Documented financial performance and utilisation of grants.',
    ],
  },
  {
    year: '2022-2023',
    title: 'Annual Report 2022-2023',
    description:
      'Annual report for 2022–2023, including programme photos, narrative report and financial summary.',
    details: [
      'Photo-based documentation of major programmes throughout the year.',
      'Narrative reports highlighting key milestones and community stories.',
      'Summary of income, expenditure and audit remarks.',
    ],
  },
  {
    year: '2020-2021',
    title: 'Activity Report 2020-2021',
    description:
      'Detailed activity reports covering March–July 2021 and October 2020–January 2021.',
    details: [
      'Activities from 1st March to 31st July 2021.',
      'Activities from 1st October 2020 to 31st January 2021.',
      'Relief and rehabilitation support during the pandemic period.',
    ],
  },
  {
    year: '2015-2016',
    title: 'Annual Reports 2015-2016',
    description:
      'Photo-wise annual report pages for the year 2015–2016, similar to the gallery layout on the reference site.',
    details: [
      'Series of photo pages capturing major activities.',
      'Snapshots of beneficiaries, trainings and community events.',
      'Brief financial overview for the year.',
    ],
  },
  {
    year: '2014-2015',
    title: 'Annual Reports 2014-2015',
    description:
      'Year-wise report pages capturing key initiatives, photographs and outcomes for 2014–2015.',
    details: [
      'Key initiatives started during the year.',
      'Coverage of outreach programmes in different regions.',
      'Highlights of donor support and collaborations.',
    ],
  },
  {
    year: '2013-2014',
    title: 'Annual Reports 2013-2014',
    description:
      'Archive of annual report pages for 2013–2014 with programme snapshots and financials.',
    details: [
      'Foundational programmes and early-stage initiatives.',
      'Photographs showcasing field-level activities.',
      'Summary of financials and organisational growth.',
    ],
  },
]

export default function ReportSummary() {
  const { year } = useParams()

  const report = reports.find((r) => r.year === year)

  if (!report) {
    return (
      <div className={styles.reportsContainer}>
        <header className={styles.headerSection}>
          <h1 className={styles.headerTitle}>Report Summary</h1>
          <div className={styles.headerUnderline} />
          <p className={styles.headerDescription}>
            The requested report could not be found. Please go back to the reports list and try
            again.
          </p>
          <p style={{ marginTop: '1.5rem' }}>
            <Link to="/reports" className={styles.reportLinkAnchor}>
              ← Back to all Annual Reports
            </Link>
          </p>
        </header>
      </div>
    )
  }

  return (
    <div className={styles.reportsContainer}>
      <header className={styles.headerSection}>
        <h1 className={styles.headerTitle}>{report.title}</h1>
        <div className={styles.headerUnderline} />
        <p className={styles.headerDescription}>{report.description}</p>
        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#6b7280' }}>
          Year / Period:&nbsp;
          <strong>{report.year}</strong>
        </p>
      </header>

      <section className={styles.reportSection}>
        <div className={styles.reportGrid}>
          <article className={styles.reportCard}>
            <div className={styles.reportHeader}>
              <div className={styles.reportYear}>{report.year}</div>
              <div className={styles.reportTitle}>Summary at a Glance</div>
            </div>

            <div className={styles.reportContent}>
              <ul className={styles.reportLinksList}>
                {report.details.map((item, index) => (
                  <li key={index} className={styles.reportLinkItem}>
                    {item}
                  </li>
                ))}
              </ul>

              <div className={styles.reportButtons}>
                <Link
                  to="/reports"
                  className={`${styles.reportButton} ${styles.reportButtonSecondary}`}
                >
                  ← Back to All Reports
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
}

