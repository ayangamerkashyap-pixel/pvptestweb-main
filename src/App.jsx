import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import AboutUs from './pages/AboutUs'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import Vision from './pages/Vision'
import Reports from './pages/Reports'
import ReportSummary from './pages/ReportSummary'
import Contact from './pages/Contact'
import Donate from './pages/Donate'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:year" element={<ReportSummary />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donate" element={<Donate />} />
        </Route>
      </Routes>
    </Router>
  )
}