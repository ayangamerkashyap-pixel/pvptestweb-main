import styles from '../../styles/modules/Services.module.css';

export default function ChildWelfareService() {
  const service = {
    icon: 'favorite',
    title: 'CHILD WELFARE PROGRAMME',
    description: 'Upper Assam mainly the District of Dibrugarh and Tinsukia are famous for TEA. There are many villages & lots of Tea Gardens in these two districts. The organization has provided different types of children protection, welfare schemes and mainly health care. The organization has taken major steps in favour of orphan/homeless children of Assam. It was observed by the organization. That there are thousand of orphan/homeless children passing their lives miserably and was minutely felt most of them would become extremist, involves themselves in anti-social activities and ultimately pollute the society. There is vital planning to start a shelter home for the orphans/homeless children to provide free food, cloths and shelter with proper education to build the nation.',
    color: 'from-red-500 to-pink-500',
  };

  return (
    <div className={styles.serviceCard}>
      {/* Color Bar */}
      <div style={{ background: `linear-gradient(to right, rgb(239, 68, 68), rgb(236, 72, 153))` }} className={styles.serviceColorBar}></div>
      
      {/* Content */}
      <div className={styles.serviceContent}>
        {/* Icon */}
        <div className={styles.serviceIcon} style={{ background: `linear-gradient(135deg, rgb(239, 68, 68), rgb(236, 72, 153))` }}>
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
