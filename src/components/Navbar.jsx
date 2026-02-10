import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import styles from '../styles/modules/Navbar.module.css'

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isActive = (path) => location.pathname === path

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Gallery', path: '/gallery' },
    { label: 'Vision & Mission', path: '/vision' },
    { label: 'Annual Report', path: '/reports' },
    { label: 'Donate', path: '/donate' },
  ]

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          <div className={styles.navLinks}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.navRight}>
            {/* <div className={styles.searchBox}>
              <span className="material-symbols-outlined">search</span>
              <input
                className={styles.searchInput}
                placeholder="Search resources..."
                type="text"
              />
            </div> */}
            <Link
              to="/contact"
              className={styles.contactBtn}
            >
              Contact Us
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={styles.mobileMenuButton}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className={styles.contactBtn}
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  )
}