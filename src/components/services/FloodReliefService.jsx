import styles from '../../styles/modules/Services.module.css';

export default function FloodReliefService() {
  const service = {
    icon: 'home',
    title: 'FLOOD RELIEF PROGRAM',
    description: 'During the rainy season the suburbs of Tinsukia town affects by flood. The major principle of the organization is to give support to the moribund people by any cause. The members of the organization collect the sample medicine from different sources and requesting some renowned physician to attend in the flood relief camp for the dying peoples. The organization releases thousand of money for the flood affected people for this year. During the financial year 2011-2012 the organization expenditure is Rs 24,900/- (Rupees Twenty Four Thousand Nine Hundred) only.',
    color: 'from-purple-500 to-pink-500',
  };

  return (
    <div className={styles.serviceCard}>
      {/* Color Bar */}
      <div style={{ background: `linear-gradient(to right, rgb(147, 51, 234), rgb(236, 72, 153))` }} className={styles.serviceColorBar}></div>
      
      {/* Content */}
      <div className={styles.serviceContent}>
        {/* Icon */}
        <div className={styles.serviceIcon} style={{ background: `linear-gradient(135deg, rgb(147, 51, 234), rgb(236, 72, 153))` }}>
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
