import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const gallerySourceDir = path.join(__dirname, 'Images', 'Gallery')
const uploadsDir = path.join(__dirname, 'server', 'uploads', 'gallery')
const outputFile = path.join(__dirname, 'server', 'gallery-data.json')

function getAllImages(dir, baseRelativePath = '') {
  const images = []
  
  try {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      const relativePath = baseRelativePath ? `${baseRelativePath}/${file}` : file
      
      if (stat.isDirectory()) {
        images.push(...getAllImages(fullPath, relativePath))
      } else if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase()
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          images.push({
            path: relativePath,
            fullPath: fullPath,
            name: file,
            folder: baseRelativePath || 'Root'
          })
        }
      }
    }
  } catch (err) {
    console.error(`Error reading directory ${dir}:`, err)
  }
  
  return images
}

function copyFile(src, dest) {
  const dir = path.dirname(dest)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.copyFileSync(src, dest)
}

function generateGalleryData(allImages) {
  let id = 1708272859000
  
  return allImages.map(img => {
    const title = img.folder === 'Root' 
      ? img.name.replace(/\.[^.]+$/, '') 
      : `${img.folder} - ${img.name.replace(/\.[^.]+$/, '')}`
    
    return {
      id: id++,
      title: title,
      src: `/uploads/gallery/${img.path.replace(/\\/g, '/')}`
    }
  })
}

console.log('🖼️  Gallery Image Import Tool\n')
console.log(`Source: ${gallerySourceDir}`)
console.log(`Destination: ${uploadsDir}\n`)

// Get all images
const allImages = getAllImages(gallerySourceDir)
console.log(`✓ Found ${allImages.length} images\n`)

// Copy files
console.log('Copying images...')
allImages.forEach(img => {
  const destPath = path.join(uploadsDir, img.path)
  copyFile(img.fullPath, destPath)
  console.log(`  ✓ ${img.folder}/${img.name}`)
})

// Generate gallery data
const galleryData = generateGalleryData(allImages)

// Write to file
fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2))
console.log(`\n✓ Gallery data written to gallery-data.json`)

console.log(`\n📊 Summary: ${allImages.length} images imported and ready!`)
