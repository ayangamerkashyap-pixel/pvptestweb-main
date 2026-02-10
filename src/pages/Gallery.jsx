import { useState } from 'react'
import styles from '../styles/modules/Gallery.module.css'
import { galleryImages } from '../data/galleryData'

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className={styles.galleryContainer}>
      {/* Header */}
      <section className={styles.headerSection}>
        <div className={styles.headerSection}>
          <h1 className={styles.headerTitle}>Photo Gallery</h1>
          <div className={styles.headerUnderline}></div>
          <p className={styles.headerDescription}>
            Glimpses of our community development programs and initiatives
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className={styles.gallerySection}>
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
    </div>
  )
}