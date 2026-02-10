import styles from '../../styles/modules/Services.module.css';

export default function EmbroideryTrainingService() {
  const service = {
    icon: 'business_center',
    title: 'EMBROIDERY TRAINING',
    description: 'The maximum percentage of the people of this area are living under poverty line. The organization took resolution to provide training of cutting embroidery & tailoring to the educated poor girls and women for their self employment and ahs equipped with movable requirements for training and running smoothly and lot of women and girls established themselves. The organization has spent Rs. 14,500/- (Rupees Fourteen Thousand Five Hundred) only for the financial year 2012-13.',
    color: 'from-green-500 to-emerald-500',
  };

  return (
    <div className={styles.serviceCard}>
      {/* Color Bar */}
      <div style={{ background: `linear-gradient(to right, rgb(34, 197, 94), rgb(16, 185, 129))` }} className={styles.serviceColorBar}></div>
      
      {/* Content */}
      <div className={styles.serviceContent}>
        {/* Icon */}
        <div className={styles.serviceIcon} style={{ background: `linear-gradient(135deg, rgb(34, 197, 94), rgb(16, 185, 129))` }}>
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
