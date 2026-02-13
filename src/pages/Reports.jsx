import styles from '../styles/modules/Reports.module.css'

export default function Reports() {
  // Year-wise report sections, inspired by pvpngo.org/annualreports.php.
  // Replace the '#' href values with actual PDF or image gallery links.
  const reports = [
    {
      year: '2024',
      title: 'Annual Report 2024',
      description:
        'Comprehensive overview of activities, impact and financial statements for the year 2024.',
      documents: [
        { label: 'View Full Annual Report (PDF)', href: '#' },
        { label: 'View Activity Highlights (Gallery)', href: '#' },
      ],
    },
    {
      year: '2023',
      title: 'Annual Report 2023',
      description:
        'Summary of key programmes, outcomes and audited financials for the year 2023.',
      documents: [
        { label: 'View Full Annual Report (PDF)', href: '#' },
        { label: 'View Activity Highlights (Gallery)', href: '#' },
      ],
    },
    {
      year: '2022-2023',
      title: 'Annual Report 2022-2023',
      description:
        'Annual report for 2022–2023, including programme photos, narrative report and financial summary.',
      documents: [
        { label: 'Page 1 – Cover & Overview', href: '#' },
        { label: 'Page 2 – Programmes', href: '#' },
        { label: 'Page 3 – Impact Snapshots', href: '#' },
        { label: 'Page 4 – Financial Summary', href: '#' },
        { label: 'Page 5 – Governance', href: '#' },
      ],
    },
    {
      year: '2020-2021',
      title: 'Activity Report 2020-2021',
      description:
        'Detailed activity reports covering March–July 2021 and October 2020–January 2021.',
      documents: [
        { label: 'Activities: 1st March – 31st July 2021', href: '#' },
        { label: 'Activities: 1st October 2020 – 31st January 2021', href: '#' },
      ],
    },
    {
      year: '2015-2016',
      title: 'Annual Reports 2015-2016',
      description:
        'Photo-wise annual report pages for the year 2015–2016, similar to the gallery layout on the reference site.',
      documents: [
        { label: 'Report Page 1', href: '#' },
        { label: 'Report Page 2', href: '#' },
        { label: 'Report Page 3', href: '#' },
        { label: 'Report Page 4', href: '#' },
        { label: 'Report Page 5', href: '#' },
        { label: 'Report Page 6', href: '#' },
        { label: 'Report Page 7', href: '#' },
        { label: 'Report Page 8', href: '#' },
      ],
    },
    {
      year: '2014-2015',
      title: 'Annual Reports 2014-2015',
      description:
        'Year-wise report pages capturing key initiatives, photographs and outcomes for 2014–2015.',
      documents: [
        { label: 'Report Page 1', href: '#' },
        { label: 'Report Page 2', href: '#' },
        { label: 'Report Page 3', href: '#' },
        { label: 'Report Page 4', href: '#' },
        { label: 'Report Page 5', href: '#' },
        { label: 'Report Page 6', href: '#' },
        { label: 'Report Page 7', href: '#' },
      ],
    },
    {
      year: '2013-2014',
      title: 'Annual Reports 2013-2014',
      description:
        'Archive of annual report pages for 2013–2014 with programme snapshots and financials.',
      documents: [
        { label: 'Report Page 1', href: '#' },
        { label: 'Report Page 2', href: '#' },
        { label: 'Report Page 3', href: '#' },
        { label: 'Report Page 4', href: '#' },
        { label: 'Report Page 5', href: '#' },
        { label: 'Report Page 6', href: '#' },
        { label: 'Report Page 7', href: '#' },
        { label: 'Report Page 8', href: '#' },
      ],
    },
  ]

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
        <div className={styles.reportList}>
          {reports.map((report) => (
            <article key={report.title} className={styles.reportParagraph}>
              <h2 className={styles.reportParagraphYear}>{report.year}</h2>
              <h3 className={styles.reportParagraphTitle}>{report.title}</h3>
              <p className={styles.reportParagraphText}>{report.description}</p>

              {report.documents && report.documents.length > 0 && (
                <p className={styles.reportParagraphLinks}>
                  {report.documents.map((doc, index) => (
                    <span key={index}>
                      <a href={doc.href} className={styles.reportLinkAnchor}>
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
      </section>
    </div>
  )
}