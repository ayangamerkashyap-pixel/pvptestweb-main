import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from '../styles/modules/HomePage.module.css'
import { fetchGallery, fetchNews } from '../api/reportsApi'
import HeroSlideshow from '../components/HeroSlideshow'

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const [galleryImages, setGalleryImages] = useState([])
  const [news, setNews] = useState([])

  useEffect(() => {
    fetchGallery()
      .then(setGalleryImages)
      .catch(() => {})

    fetchNews()
      .then(setNews)
      .catch(() => {})
  }, [])

  return (
    <div className={styles.homePageContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <HeroSlideshow />
      </section>

      {/* News & Events Section */}
      <section className={styles.newsSection}>
        <div className={styles.newsSectionHeader}>
          <div className={styles.newsSectionTitleRow}>
            <div>
              <h2 className={styles.newsSectionTitle}>News & Events</h2>
              <p className={styles.newsSectionDescription}>Stay informed with our latest updates and official announcements</p>
            </div>
            <Link className={styles.viewAllLink}>
              View all <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
          </div>
          <div className={styles.titleUnderline}></div>
        </div>
        <div className={styles.newsGrid}>
          {news.map((item) => (
            <article key={item.id} className={styles.newsCard}>
              <div
                className={styles.newsCardImage}
                style={{ backgroundImage: `url("${item.image}")` }}
              />
              <div className={styles.newsCardContent}>
                <div className={styles.newsCardMeta}>
                  <span className={`${styles.newsCardCategory} ${item.categoryColor || 'bg-primary/10 text-primary'}`}>
                    {item.category}
                  </span>
                  <span className={styles.newsCardDate}>{item.date}</span>
                </div>
                <h3 className={styles.newsCardTitle}>{item.title}</h3>
                <p className={styles.newsCardDescription}>{item.description}</p>
                <a className={styles.newsCardLink}>
                  Read More <span className="material-symbols-outlined text-xs">east</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className={styles.gallerySection}>
        <h2 className={styles.gallerySectionTitle}>Photo Gallery</h2>
        <div className={styles.galleryGrid}>
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={styles.galleryItem}
              onClick={() => setSelectedImage(image)}
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.title}
                className={styles.galleryImage}
              />

              {/* Overlay */}
              <div className={styles.galleryItemOverlay}>
                <div>
                  <p className={styles.galleryItemTitle}>{image.title}</p>
                  <p className={styles.galleryItemCaption}>
                    <span className="material-symbols-outlined text-sm">zoom_in</span>
                    Click to view
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedImage(null)}
              className={styles.closeButton}
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Image */}
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className={styles.modalImage}
            />

            {/* Title */}
            <div className={styles.modalInfo}>
              <h2>{selectedImage.title}</h2>
              <p style={{fontSize: '0.875rem', opacity: 0.7, marginTop: '0.5rem'}}>
                <span className="material-symbols-outlined" style={{fontSize: '0.875rem'}}>image</span>
                Click outside to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action Stats Section */}
      {/* <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-primary to-blue-700 rounded-3xl p-12 text-white overflow-hidden relative">
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl font-black mb-12 text-center">Our Impact</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-5xl font-black mb-3">50+</div>
                <p className="text-white/90 font-semibold">Communities Served</p>
                <p className="text-white/70 text-xs mt-1">Across the region</p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-5xl font-black mb-3">10K+</div>
                <p className="text-white/90 font-semibold">Lives Impacted</p>
                <p className="text-white/70 text-xs mt-1">Direct beneficiaries</p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-5xl font-black mb-3">25+</div>
                <p className="text-white/90 font-semibold">Active Programs</p>
                <p className="text-white/70 text-xs mt-1">Ongoing initiatives</p>
              </div>
              <div className="backdrop-blur-md bg-white/10 rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="text-5xl font-black mb-3">15+</div>
                <p className="text-white/90 font-semibold">Years Experience</p>
                <p className="text-white/70 text-xs mt-1">Since inception</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  )
}