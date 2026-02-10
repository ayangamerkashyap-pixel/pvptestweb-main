import styles from '../../styles/modules/Services.module.css';

export default function EmpowermentService() {
  const service = {
    icon: 'group',
    title: 'EMPOWER DEVELOPMENT PROGRAM',
    description: 'The main motto of the organization is overall development of the backward villagers and tea garden peoples. The executive body has arranged different types of empower development program in many places during the year 2011-2012 and spent Rs. 16,300/-(Rupees Sixteen Thousand Three Hundred) only. The organization collected donation great success of the camp. The annual report consist of the above programs and detail of the organization apart from many more activities which has not mentioned in this report for the sake of brevity.',
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
