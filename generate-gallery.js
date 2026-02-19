import fs from 'fs'
import path from 'path'

const gallerySourceDir = './Images/Gallery'
const outputFile = './server/gallery-data.json'

function getAllImages(dir, baseRelativePath = '') {
  const images = []
  
  try {
    const files = fs.readdirSync(dir)
    
    for (const file of files) {
      const fullPath = path.join(dir, file)
      const stat = fs.statSync(fullPath)
      const relativePath = baseRelativePath ? `${baseRelativePath}/${file}` : file
      
      if (stat.isDirectory()) {
        // Recursively get images from subdirectories
        images.push(...getAllImages(fullPath, relativePath))
      } else if (stat.isFile()) {
        const ext = path.extname(file).toLowerCase()
        if (['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
          images.push({
            path: relativePath,
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

// Get all images
const allImages = getAllImages(gallerySourceDir)
console.log(`Found ${allImages.length} images`)

// Generate gallery data
const galleryData = generateGalleryData(allImages)

// Write to file
fs.writeFileSync(outputFile, JSON.stringify(galleryData, null, 2))
console.log(`Gallery data written to ${outputFile}`)

// Display summary
console.log('\nGallery Summary:')
allImages.forEach(img => {
  console.log(`  ${img.folder}: ${img.name}`)
})
