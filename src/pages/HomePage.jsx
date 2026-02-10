import { Link } from 'react-router-dom'
import { useState } from 'react'
import styles from '../styles/modules/HomePage.module.css'
import { galleryImages } from '../data/galleryData'
import HeroSlideshow from '../components/HeroSlideshow'

export default function HomePage() {
  const [selectedImage, setSelectedImage] = useState(null)
  const news = [
    {
      id: 1,
      title: 'New Policy Implementation for Digital Infrastructure',
      category: 'Policy',
      date: 'Oct 24, 2024',
      description: 'The organization has announced a comprehensive framework designed to modernize our digital backbone through strategic community partnerships.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMdDudF3A9guMN-HxIXyappQUds2ItJit4k1_9br0X3m1EacygqIIw7IC01wCdA5n59Dj2b2J_8amNJ1Pn51nRNdfOWLhlgQXv1bynYJpok5k6SNaWDXAmIrOIjPyIHuUHNsyP-IMWgijfk3bZ4BX0I0MeqDO-QCUKdPYQpePWO4LIQ6FGXiCdLefd9qvH0vXs6Y6g9o4N-mo_PclL-2BCzYWrFP8UgVtu3SKGMoeudz9xVCInumLEDh26ZeKlE-_4E0FnusyjGeyr',
      categoryColor: 'bg-primary/10 text-primary',
    },
    {
      id: 2,
      title: 'Health Camp Initiative Reaches 500+ Beneficiaries',
      category: 'Report',
      date: 'Oct 20, 2024',
      description: 'Our latest health camp across rural communities has successfully provided medical check-ups and health services to over 500 individuals.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfNA-m6Oq02g6mxFUy1Wh28vjhQodfBGkwKWCvXMfj39828fCZHOSXjTBf8FPo8o6dJ_86Ux5l0CmymM0twBM5muFoyroC6fE5njh6BUjcRxZVphd86Ihr_YK_s4Wvqqysh7e1YCQulzt1WRuQ8K8tl3aKuPc4MYRlfoAmp18sr1xs7MFgNByPY5ErH4-xSSlaAn3IXjI6k3Z_5rMY5PKr9gp-BjDtEXdRCMG39T2ENmzTxS0KN3A5b1rLnaUZ9yYRO35Tud0uCaPe',
      categoryColor: 'bg-green-100 text-green-700',
    },
    {
      id: 3,
      title: 'Community Outreach: Skill Training Program Launch',
      category: 'Community',
      date: 'Oct 15, 2024',
      description: 'Launching a new skill training program to empower youth and create sustainable livelihood opportunities in rural areas.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDm5tPmm312anWIrwUeP9SgC_8AEudxffH66TWgd1et9x2GMj6adSZxZlFDYzpUCPnBkZGdYjV8MYCAA3rSPEiHBoVHtKHtbyxKtmkq1odyx86kH_QK4WctZ6z4O3OYll7Shj52yJK2a0nBlRXL4D25sqoxzVP6gGeohVdzN9XvnN0B4acc9TIdhX2DmBnIFDQxSa06EUdSsS1rNISYzt9sCLOFcqqjjZibDypRiGkkOHOqCPF-K0UQb3Cf3dyBwHO13oMSEwqgPz__',
      categoryColor: 'bg-orange-100 text-orange-700',
    },
  ]

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
            <article
              key={item.id}
              className={styles.newsCard}
            >
              <div
                className={styles.newsCardImage}
                style={{ backgroundImage: `url("${item.image}")` }}
              />
              <div className={styles.newsCardContent}>
                <div className={styles.newsCardMeta}>
                  <span className={`${styles.newsCardCategory} ${item.categoryColor}`}>
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