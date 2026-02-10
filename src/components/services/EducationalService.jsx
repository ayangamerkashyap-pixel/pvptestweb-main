import styles from '../../styles/modules/Services.module.css';

export default function EducationalService() {
  const service = {
    icon: 'school',
    title: 'EDUCATIONAL PROGRAMME',
    description: 'In the two districts Dibrugarh & Tinsukia the literacy percentage is very negligible the organization has decided to aware the value of the education and organized several awareness of education in the interior places of the above two districts. It required the organization to spent Rs. 18,800/- (Rupees Eighteen Thousand Eight Hundred) only for overall success of the target to aware the people this area during the financial year 2012-2013.',
    color: 'from-blue-500 to-cyan-500',
  };

  return (
    <div className={styles.serviceCard}>
      {/* Color Bar */}
      <div style={{ background: `linear-gradient(to right, rgb(59, 130, 246), rgb(34, 211, 238))` }} className={styles.serviceColorBar}></div>
      
      {/* Content */}
      <div className={styles.serviceContent}>
        {/* Icon */}
        <div className={styles.serviceIcon} style={{ background: `linear-gradient(135deg, rgb(59, 130, 246), rgb(34, 211, 238))` }}>
          <span className="material-symbols-outlined">
            {service.icon}
          </span>
        </div>
        
        {/* Title & Description */}
        <h3 className={styles.serviceTitle}>
          {service.title}
        </h3>
        <p className={styles.serviceDescription}>
          {service.description}
        </p>
        
        {/* Link */}
        {/* <a className={styles.serviceLink}>
          Learn More
          <span className="material-symbols-outlined text-lg">
            arrow_forward
          </span>
        </a> */}
      </div>
    </div>
  );
}
