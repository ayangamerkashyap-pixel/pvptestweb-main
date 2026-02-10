import styles from '../../styles/modules/Services.module.css';

export default function AwarenessService() {
  const service = {
    icon: 'agriculture',
    title: 'AWARENESS MEETINGS',
    description: 'Right from the inception of the organization the executives had very much interested to organize awareness programs in the interior and backward areas of these districts to protect from "HIV VIRUS", Cleanliness, awareness from cheating funds, Govt. Schemes MGNRDA The organization managed to organize attractive seminars, meetings, street drama, awareness processions in various places with collaboration with other NGO\'s during the financial year 2012-11 The organization has spent Rs. 11,490/- (Rupees Eleven Thousand Four Hundred Ninety) only for great success of the above awareness.',
    color: 'from-amber-500 to-orange-500',
  };

  return (
    <div className={styles.serviceCard}>
      {/* Color Bar */}
      <div style={{ background: `linear-gradient(to right, rgb(217, 119, 6), rgb(234, 88, 12))` }} className={styles.serviceColorBar}></div>
      
      {/* Content */}
      <div className={styles.serviceContent}>
        {/* Icon */}
        <div className={styles.serviceIcon} style={{ background: `linear-gradient(135deg, rgb(217, 119, 6), rgb(234, 88, 12))` }}>
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
