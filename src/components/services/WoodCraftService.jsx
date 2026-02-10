import styles from '../../styles/modules/Services.module.css';

export default function WoodCraftService() {
  const service = {
    icon: 'group',
    title: 'WOOD CRAFT WORK',
    description: 'There are some several skill hands in the interior villages of our districts. The organization selected the persons and supplied required raw materials for manufacturing different types of status, tubule, scenery etc. etc for development of their skillness and as well as to earn their livehood . For this act of kindness the skilled persons of these two districts very much grateful to our organization. The organization . the organization spent Raw Material, wages etc. for woodcraft Rs. 57,600/- (Rupees Fifty Seven Thousand Six Hundred) only for the year 2011-12.',
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
