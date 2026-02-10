import styles from '../styles/modules/Contact.module.css'
import Navbar from '../components/Navbar'
import ImpactSection from '../components/ImpactSection'
import DonationForm from '../components/DonationForm'
import Footer from '../components/Footer'

export default function Contact() {
  return (
    <section className={styles.headerSection}>
            <div className={styles.headerSection}>
              <h1 className={styles.headerTitle}>Donation</h1>
              <div className={styles.headerUnderline}></div>
              <p className={styles.headerDescription}>
                Account Name	:	Purbottar Vikash Parishad.
              <p>Name of the Bank	:	Union Bank of India.</p>
              <p> Bank Account No	:	383202010057530.</p>
              <p>  IFSC Code	:	UBINO538329.</p>
              <p> Branch Address	:	AT Road,
              Siding Bazar,</p>
              <p> P.O.Tinsukia,
              Dist.Tinsukia,</p>
              <p>  Pincode: 786125.</p>
              </p>
            </div>
          </section>
  )
}
