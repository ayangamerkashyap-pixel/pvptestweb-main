import { useEffect, useState } from 'react'
import styles from '../styles/modules/HomePage.module.css'
import hero1 from '../../Images/Hero/hero1.jpg'
import hero2 from '../../Images/Hero/hero2.jpg'
import hero3 from '../../Images/Hero/hero3.jpg'
import hero4 from '../../Images/Hero/hero4.jpg'
import hero5 from '../../Images/Hero/hero5.jpg'
import hero7 from '../../Images/Hero/hero7.jpg'
import hero8 from '../../Images/Hero/hero8.jpg'
import hero9 from '../../Images/Hero/hero9.jpg'
import hero10 from '../../Images/Hero/hero10.jpg'

// hero6 was a PHP/html page in the original Images/Hero folder — exclude it
const images = [hero1, hero2, hero3, hero4, hero5, hero7, hero8, hero9, hero10]

export default function HeroSlideshow() {
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % images.length)
    }, 4000)
    return () => clearInterval(t)
  }, [isPaused])

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length)
  const next = () => setIndex((i) => (i + 1) % images.length)

  return (
    <div
      className={styles.heroContainer}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={styles.heroImage} style={{position: 'relative'}}>
        {images.map((src, i) => (
          <div
            key={i}
            aria-hidden={i !== index}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: i === index ? 1 : 0,
              transition: 'opacity 700ms ease',
              zIndex: i === index ? 1 : 0,
            }}
          />
        ))}

        {/* overlay gradient to match previous look */}
        <div style={{position: 'absolute', inset: 0, background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5))', zIndex: 2}} />

        <div className={styles.heroContent} style={{position: 'relative', zIndex: 3}}>
          <h2 className={styles.heroTitle}>Welcome to Purbottar Vikash Parishad</h2>
          <p className={styles.heroDescription}>
            Purbottar Vikash Parishad is a reputed NGO in Assam serving needy, poor and backward communities of the region with health, education, and livelihood programs.
          </p>
          <div className={styles.heroCTA}>
            <a href="/services" className={`${styles.heroButton} ${styles.heroButtonPrimary}`}>
              Explore Services
            </a>
            <a href="/reports" className={`${styles.heroButton} ${styles.heroButtonSecondary}`}>
              Latest Reports
            </a>
          </div>
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={prev}
        aria-label="Previous slide"
        style={{
          position: 'absolute',
          top: '50%',
          left: 12,
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          border: 'none',
          color: 'white',
          width: 40,
          height: 40,
          borderRadius: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 20,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        onClick={next}
        aria-label="Next slide"
        style={{
          position: 'absolute',
          top: '50%',
          right: 12,
          transform: 'translateY(-50%)',
          background: 'rgba(0,0,0,0.4)',
          border: 'none',
          color: 'white',
          width: 40,
          height: 40,
          borderRadius: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 20,
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dots */}
      <div style={{display: 'flex', justifyContent: 'center', gap: 8, marginTop: 12}}>
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: 'none',
              background: i === index ? 'white' : 'rgba(255,255,255,0.5)',
              cursor: 'pointer',
            }}
          />
        ))}
      </div>
    </div>
  )
}
