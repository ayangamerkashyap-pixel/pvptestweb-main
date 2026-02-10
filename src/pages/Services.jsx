import { Link } from 'react-router-dom'
import styles from '../styles/modules/Services.module.css'
import ChildWelfareService from '../components/services/ChildWelfareService'
import EducationalService from '../components/services/EducationalService'
import EmbroideryTrainingService from '../components/services/EmbroideryTrainingService'
import AwarenessService from '../components/services/AwarenessService'
import FloodReliefService from '../components/services/FloodReliefService'
import HealthCampService from '../components/services/HealthCampService'
import WoodCraftService from '../components/services/WoodCraftService'
import EmpowermentService from '../components/services/EmpowermentService'

export default function Services() {
  const serviceComponents = [
    ChildWelfareService,
    EducationalService,
    EmbroideryTrainingService,
    AwarenessService,
    FloodReliefService,
    HealthCampService,
    WoodCraftService,
    EmpowermentService,
  ]

  return (
    <div className={styles.servicesContainer}>
      {/* Header Section */}
      <section className={styles.headerSection}>
        <div className={styles.headerSection}>
          <h1 className={styles.headerTitle}>Our Services</h1>
          <div className={styles.headerUnderline}></div>
          <p className={styles.headerDescription}>
            The organization has been organized and executed different program of awareness, training, camps etc. etc The details of the programs organized by the organization during the financial year 2012-13 the brief of the each program has been mentioned below:-
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className={styles.servicesSection}>
        <div className={styles.servicesGrid}>
          {serviceComponents.map((ServiceComponent, index) => (
            <ServiceComponent key={index} />
          ))}
        </div>

        {/* Call to Action */}
        {/* <div className={styles.ctaSection}>
          <div className={styles.ctaBackground}></div>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Need Our Help?</h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              If you or your community needs support with any of our services, we are here to help. Get in touch with us to learn more about how we can assist you.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-all hover:shadow-xl"
            >
              <span className="material-symbols-outlined">mail</span>
              Contact Us Today
            </Link>
          </div>
        </div> */}
      </section>

      {/* Impact Section */}
      {/* <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black mb-4">Service Highlights</h2>
          <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 text-center hover:shadow-lg transition-all">
            <div className="text-4xl font-black text-primary mb-2">50+</div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">Communities Reached</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Active programs</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 text-center hover:shadow-lg transition-all">
            <div className="text-4xl font-black text-primary mb-2">10K+</div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">Direct Beneficiaries</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Individuals served</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 text-center hover:shadow-lg transition-all">
            <div className="text-4xl font-black text-primary mb-2">25+</div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">Programs Active</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Ongoing initiatives</p>
          </div>
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800 text-center hover:shadow-lg transition-all">
            <div className="text-4xl font-black text-primary mb-2">15+</div>
            <p className="text-gray-600 dark:text-gray-400 font-semibold">Years Experience</p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">Since inception</p>
          </div>
        </div>
      </section> */}
    </div>
  )
}