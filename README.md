# Purbottar Vikash Parishad - React Website

A modern, responsive React-based website for Purbottar Vikash Parishad NGO, built with Vite, React Router, and Tailwind CSS 4.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# Opens on http://localhost:3001

# Build for production
npm run build

# Preview production build
npm run preview
```

## ✨ Features

- **Modern React 19** - Latest React with hooks
- **React Router 7** - Client-side routing with 7 pages
- **Vite** - Ultra-fast build tool
- **Tailwind CSS 4** - Advanced styling framework
- **Dark Mode** - Toggle with localStorage persistence
- **Mobile Responsive** - Works on all devices with adaptive navbar
- **Image Gallery** - Lightbox modal with masonry layout
- **Contact Form** - Fully functional form handling
- **Smooth Animations** - Transitions and hover effects

## 📄 Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | HomePage | Hero section, news grid, photo gallery |
| `/about` | AboutUs | Organization history, mission, values |
| `/services` | Services | 6 service cards with icons |
| `/gallery` | Gallery | Image gallery with lightbox |
| `/vision` | Vision | Strategic objectives and goals |
| `/reports` | Reports | Annual reports with year selector |
| `/contact` | Contact | Contact form with map and hours |

## 📁 Project Structure

```
scaling-barnacle/
├── src/
│   ├── components/
│   │   ├── Header.jsx       # Logo & dark mode toggle
│   │   ├── Navbar.jsx       # Navigation & mobile menu
│   │   ├── Footer.jsx       # Footer with links
│   │   └── Layout.jsx       # Root layout wrapper
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── AboutUs.jsx
│   │   ├── Services.jsx
│   │   ├── Gallery.jsx
│   │   ├── Vision.jsx
│   │   ├── Reports.jsx
│   │   └── Contact.jsx
│   ├── App.jsx              # Router configuration
│   ├── main.jsx             # Entry point
│   └── index.css            # Global styles
├── Images/                  # Project assets
├── public/                  # Static files
├── dist/                    # Production build (generated)
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── netlify.toml
├── vercel.json
├── package.json
└── index.html

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Development

Start the development server with hot reload:

```bash
npm run dev
```

Opens at `http://localhost:3001` - Supports hot module replacement for instant feedback.

## 🏗️ Build & Deployment

### Build for Production
```bash
npm run build
```
Generates optimized files in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Netlify
```bash
netlify deploy --prod --dir=dist
```

### Deploy to Vercel
```bash
vercel --prod
```

## 🎨 Customization

### Theme Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: '#1152d4',           // Primary blue
  'background-light': '#f6f6f8', // Light mode background
  'background-dark': '#101622',  // Dark mode background
}
```

### Update Content
Modify the page components in `src/pages/`:
- Change text, images, and data
- Update contact information
- Add/remove services or sections

### Global Styles
Edit `src/index.css` for:
- Font imports
- Global Tailwind directives
- Custom CSS

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

Full responsiveness handled with Tailwind CSS breakpoints.

## 🌓 Dark Mode

Dark mode toggle in the header with localStorage persistence. Applies `dark` class to `<html>` element automatically.

## 📦 Production Build Stats

- **CSS**: 60.35 kB → 9.36 kB (gzipped)
- **JS**: 288.18 kB → 86.08 kB (gzipped)
- **Total**: ~95 kB (gzipped)
- **Build time**: ~2 seconds

## 🔧 Technologies

| Tool | Purpose |
|------|---------|
| **React 19** | UI library |
| **React Router 7** | Client-side routing |
| **Vite 7** | Build tool |
| **Tailwind CSS 4** | Styling |
| **PostCSS** | CSS processing |

## 📞 Deployment Configuration Files

- **netlify.toml** - Netlify deployment configuration
- **vercel.json** - Vercel deployment configuration

Both are pre-configured for automatic deployment from GitHub.

## 📚 Resources

- [React Documentation](https://react.dev)
- [React Router](https://reactrouter.com)
- [Vite Documentation](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)

## License

ISC

---

**Status**: ✅ Production Ready | **Build**: ✅ Optimized | **Deploy**: ✅ Configured
