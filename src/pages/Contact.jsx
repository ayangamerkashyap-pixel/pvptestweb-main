import { useEffect, useState } from 'react'
import styles from '../styles/modules/Contact.module.css'
import { fetchContact } from '../api/reportsApi'

export default function Contact() {
  const [contact, setContact] = useState(null)

  useEffect(() => {
    fetchContact()
      .then(setContact)
      .catch(() => {})
  }, [])

  if (!contact) {
    return (
      <div className={styles.contactContainer}>
        <div className={styles.contactContent}>
          <p>Loading contact details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactContent}>
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Have questions or want to know more about our programs? We'd love to hear from you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {/* Contact Info Card 1 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-100 dark:border-slate-800 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-blue-50 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">location_on</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Address</h3>
          <p className="text-gray-600 dark:text-gray-400">
            {contact.addressLines?.map((line, i) => (
              <span key={i}>
                {line}
                {i < contact.addressLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>

        {/* Contact Info Card 2 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-100 dark:border-slate-800 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-blue-50 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">mail</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Email</h3>
          <p className="text-gray-600 dark:text-gray-400">
            <a href={`mailto:${contact.email}`} className="hover:text-primary transition-colors">
              {contact.email}
            </a>
          </p>
        </div>

        {/* Contact Info Card 3 */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 border border-gray-100 dark:border-slate-800 text-center hover:shadow-lg transition-shadow">
          <div className="w-16 h-16 bg-blue-50 dark:bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-3xl">phone</span>
          </div>
          <h3 className="text-xl font-bold mb-2">Phone</h3>
          <p className="text-gray-600 dark:text-gray-400">
            <a href={`tel:${contact.phone?.replace(/\s/g, '')}`} className="hover:text-primary transition-colors">
              {contact.phone}
            </a>
          </p>
        </div>
      </div>



      {/* Map & Additional Info */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Office Location</h2>
          <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-100 dark:border-slate-800 h-96 mb-8">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3538.319565445402!2d95.32963631153153!3d27.52152937619075!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x373f6ae56b190925%3A0xf663d6c40e617d6!2sPurbottar%20Vikash%20Parishad!5e0!3m2!1sen!2sin!4v1770715482487!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 border border-blue-200 dark:border-blue-700">
            <h3 className="text-lg font-bold mb-4">Office Hours</h3>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              {contact.officeHours?.map((oh, i) => (
                <li key={i} className="flex justify-between">
                  <span>{oh.dayRange}:</span>
                  <span className="font-semibold">{oh.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}