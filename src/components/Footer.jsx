import { Link } from 'react-router-dom'
import styles from '../styles/modules/Footer.module.css'
import logo from '../../Images/Logo.jpg'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerGrid}>
          {/* Logo & About */}
          <div className={styles.footerSection}>
            <div className={styles.footerLogo}>
              <img src={logo} alt="Logo" className={styles.footerLogoImg} />
              <span className={`${styles.footerLogoText}`}>PVP</span>
            </div>
            <p className={`${styles.footerDescription}`}>
              Dedicated to serving communities with integrity, transparency, and excellence in every initiative we undertake.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} title="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
              </a>
              <a href="#" className={styles.socialLink} title="LinkedIn">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
              </a>
              <a href="#" className={styles.socialLink} title="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSectionTitle}>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/" className={styles.footerLink}>Home</Link></li>
              <li><Link to="/about" className={styles.footerLink}>About Us</Link></li>
              <li><Link to="/services" className={styles.footerLink}>Services</Link></li>
              <li><Link to="/gallery" className={styles.footerLink}>Gallery</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSectionTitle}>Support</h4>
            <ul className={styles.footerLinks}>
              <li><Link to="/contact" className={styles.footerLink}>Contact Us</Link></li>
              <li><Link to="/privacy-policy" className={styles.footerLink}>Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className={styles.footerLink}>Terms of Service</Link></li>
              <li><Link to="/donate" className={styles.footerLink}>Donate</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.footerSection}>
            <h4 className={styles.footerSectionTitle}>Official Address</h4>
            <p className={`${styles.footerDescription} mb-4`}>
              Napukhuri Extension Part-II,<br/>
              P.o., P.S. & DIST: Tinsukia,<br/>
              Pin: 786125, ASSAM
            </p>
            <p className={styles.footerDescription}>
              <a href="tel:9435135088" className={styles.footerLink}>Phone: 9435135088</a><br/>
              <a href="mailto:purbottarvikashparishad@gmail.com" className={styles.footerLink}>Email: purbottarvikashparishad@gmail.com</a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.footerBottom}>
          <p className={styles.footerCopyright}>© {currentYear} Purbottar Vikash Parishad. All Rights Reserved</p>
          <div className={styles.footerCredit}>
            <span className="material-symbols-outlined" style={{fontSize: '1rem'}}>verified_user</span>
            <span>Designed by Ayan Kashyap</span>
          </div>
        </div>
      </div>
    </footer>
  )
}