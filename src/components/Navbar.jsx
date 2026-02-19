import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from '../styles/modules/Navbar.module.css'
import logo from '../../Images/Logo.jpg'

export default function Navbar() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

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
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          <div className={styles.logoSection}>
            <img src={logo} alt="Purbottar Vikash Parishad Logo" className={styles.logo} />
            <div className={styles.logoTextGroup}>
              <span className={styles.logoTitle}>Purbottar Vikash Parishad</span>
              <span className={styles.logoTagline}>Tinsukia</span>
            </div>
          </div>

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
            <Link to="/contact" className={styles.contactBtn}>
              Contact Us
            </Link>

            {/* Mobile Menu Button */}
            <button
              className={styles.mobileMenuButton}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
          </div>
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