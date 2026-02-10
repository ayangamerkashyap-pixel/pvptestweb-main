import styles from '../../styles/modules/Services.module.css';

export default function HealthCampService() {
  const service = {
    icon: 'group',
    title: 'HEALTH CAMP PROGRAM',
    description: 'To work or serve the society the health takes the major role to reach the goal. The organization has organized several health programs in the suburbs of Tinsukia town for awareness of health. The organization distributed free medicine and free health check-up of the villagers for Rs. 12,500/- (Rupees Twelve Thousand Five Hundred) only for the financial year 2011-12. The above programs have already been successfully completed during the financial year 2011-12. The organization has been serving the society by its decided workers and volunteers and planning to take further some vital steps for this running year 2012-13. 013.',
    color: 'from-indigo-500 to-purple-500',
  };

  return (
    <div className={styles.serviceCard}>
      {/* Color Bar */}
      <div style={{ background: `linear-gradient(to right, rgb(79, 70, 229), rgb(147, 51, 234))` }} className={styles.serviceColorBar}></div>
      
      {/* Content */}
      <div className={styles.serviceContent}>
        {/* Icon */}
        <div className={styles.serviceIcon} style={{ background: `linear-gradient(135deg, rgb(79, 70, 229), rgb(147, 51, 234))` }}>
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
