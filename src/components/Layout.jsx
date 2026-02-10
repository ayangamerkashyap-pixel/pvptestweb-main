import { Outlet } from 'react-router-dom'
import Header from './Header'
import Navbar from './Navbar'
import Footer from './Footer'
import styles from '../styles/modules/Layout.module.css'
import PageTransition from './PageTransition'

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <div className={styles.layoutHeader}>
        <Header />
      </div>
      <div className={styles.layoutNavbar}>
        <Navbar />
      </div>
      <main className={styles.layoutMain}>
        <div className={styles.mainContent}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>
      </main>
      <div className={styles.layoutFooter}>
        <Footer />
      </div>
    </div>
  )
}