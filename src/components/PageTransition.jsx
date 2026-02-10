import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const location = useLocation()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // trigger a short hide -> show cycle on route change to animate
    setVisible(false)
    const t = setTimeout(() => setVisible(true), 20)
    return () => clearTimeout(t)
  }, [location.pathname])

  return (
    <div className={`page-fade ${visible ? 'in' : ''}`} key={location.pathname}>
      {children}
    </div>
  )
}
