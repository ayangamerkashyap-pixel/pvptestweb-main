import { useEffect, useState } from 'react'
import { uploadGallery, uploadGalleryBatch, fetchGallery, deleteGalleryImage } from '../api/reportsApi'
import styles from '../styles/modules/Gallery.module.css'

function GalleryManager() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [title, setTitle] = useState('')
  const [files, setFiles] = useState([])
  const [previews, setPreviews] = useState([])
  const [message, setMessage] = useState({ type: '', text: '' })
  const [colSpan, setColSpan] = useState('1')
  const [uploadMode, setUploadMode] = useState('batch') // 'single' or 'batch'

  // Fetch gallery images on mount
  useEffect(() => {
    loadGallery()
  }, [])

  const loadGallery = async () => {
    try {
      setLoading(true)
      const data = await fetchGallery()
      setImages(data)
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to load gallery images',
      })
    } finally {
      setLoading(false)
    }
  }

  // Preview images before upload
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files || [])
    setFiles(selectedFiles)

    // Create previews
    const newPreviews = []
    let loadedCount = 0

    if (selectedFiles.length === 0) {
      setPreviews([])
      return
    }

    selectedFiles.forEach((file) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push({
          file,
          preview: reader.result,
          name: file.name,
        })
        loadedCount++
        if (loadedCount === selectedFiles.length) {
          setPreviews(newPreviews)
        }
      }
      reader.readAsDataURL(file)
    })
  }

  // Handle single image upload
  const handleSingleUpload = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!files.length) {
      setMessage({ type: 'error', text: 'Please select an image file' })
      return
    }

    try {
      setUploading(true)
      const uploadedImage = await uploadGallery({ title, file: files[0] })

      // Add colSpan if provided
      if (colSpan) {
        uploadedImage.colSpan = parseInt(colSpan)
      }

      setImages((prev) => [...prev, uploadedImage])
      setMessage({
        type: 'success',
        text: `"${title || 'Image'}" uploaded successfully!`,
      })

      // Reset form
      setTitle('')
      setFiles([])
      setPreviews([])
      setColSpan('1')
      e.target.reset()
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to upload image',
      })
    } finally {
      setUploading(false)
    }
  }

  // Handle batch upload
  const handleBatchUpload = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    if (!files.length) {
      setMessage({ type: 'error', text: 'Please select at least one image file' })
      return
    }

    try {
      setUploading(true)
      const result = await uploadGalleryBatch({ files })

      // Add uploaded images to gallery
      setImages((prev) => [...prev, ...result.images])
      setMessage({
        type: 'success',
        text: result.message,
      })

      // Reset form
      setTitle('')
      setFiles([])
      setPreviews([])
      setColSpan('1')
      e.target.reset()
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to upload images',
      })
    } finally {
      setUploading(false)
    }
  }

  // Handle image deletion
  const handleDelete = async (id, imageName) => {
    if (!window.confirm(`Delete "${imageName}"?`)) return

    try {
      await deleteGalleryImage(id)
      setImages((prev) => prev.filter((img) => img.id !== id))
      setMessage({
        type: 'success',
        text: `"${imageName}" deleted successfully!`,
      })
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'Failed to delete image',
      })
    }
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: '#111827' }}>
        Gallery Manager
      </h1>

      {/* Upload Mode Selector */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '2rem',
          borderBottom: '2px solid #e5e7eb',
          paddingBottom: '1rem',
        }}
      >
        <button
          onClick={() => setUploadMode('batch')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: uploadMode === 'batch' ? '#2563eb' : '#e5e7eb',
            color: uploadMode === 'batch' ? '#fff' : '#374151',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          📦 Batch Upload (Multiple)
        </button>
        <button
          onClick={() => setUploadMode('single')}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: uploadMode === 'single' ? '#2563eb' : '#e5e7eb',
            color: uploadMode === 'single' ? '#fff' : '#374151',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
        >
          🖼️ Single Upload
        </button>
      </div>

      {/* Upload Form */}
      <div
        style={{
          backgroundColor: '#f9fafb',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '2rem',
          marginBottom: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1f2937' }}>
          {uploadMode === 'batch' ? 'Batch Upload Multiple Images' : 'Upload Single Image'}
        </h2>

        <form
          onSubmit={uploadMode === 'batch' ? handleBatchUpload : handleSingleUpload}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {uploadMode === 'single' && (
            <>
              {/* Title Input (Single Mode Only) */}
              <div>
                <label
                  htmlFor="imageTitle"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#374151',
                  }}
                >
                  Image Title (Optional)
                </label>
                <input
                  id="imageTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Health Camp Initiative"
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.9rem',
                    color: '#111827',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              {/* Grid Column Span (Single Mode Only) */}
              <div>
                <label
                  htmlFor="colSpan"
                  style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.5rem',
                    color: '#374151',
                  }}
                >
                  Grid Size (Optional)
                </label>
                <select
                  id="colSpan"
                  value={colSpan}
                  onChange={(e) => setColSpan(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.625rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.9rem',
                    color: '#111827',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="1">1x (Normal)</option>
                  <option value="2">2x (Large/Wide)</option>
                </select>
                <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  Choose how much space the image takes in the gallery grid
                </p>
              </div>
            </>
          )}

          {uploadMode === 'batch' && (
            <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #86efac', borderRadius: '0.375rem', padding: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#166534', fontWeight: '600' }}>
                💡 Batch Upload Tips:
              </p>
              <ul style={{ fontSize: '0.85rem', color: '#166534', marginTop: '0.5rem', paddingLeft: '1.25rem' }}>
                <li>Select multiple images at once (up to 20 files)</li>
                <li>Image titles will be generated from filenames</li>
                <li>All images will have default grid size (1x)</li>
                <li>Perfect for uploading event photos in bulk</li>
              </ul>
            </div>
          )}

          {/* File Input */}
          <div>
            <label
              htmlFor="imageFile"
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: '#374151',
              }}
            >
              Select {uploadMode === 'batch' ? 'Image Files' : 'Image File'} *
            </label>
            <input
              id="imageFile"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              multiple={uploadMode === 'batch'}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                border: '2px dashed #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.9rem',
                color: '#111827',
                boxSizing: 'border-box',
                backgroundColor: '#fafbfc',
                cursor: 'pointer',
              }}
            />
            <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.25rem' }}>
              {uploadMode === 'batch'
                ? 'Select up to 20 images. Supported formats: JPG, PNG, WebP'
                : 'Supported formats: JPG, PNG, WebP (Recommended size: 500x400px or 600x400px)'}
            </p>
          </div>

          {/* File Count */}
          {files.length > 0 && (
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: '#dbeafe',
                border: '1px solid #93c5fd',
                borderRadius: '0.375rem',
                color: '#1e40af',
                fontSize: '0.9rem',
              }}
            >
              📊 {files.length} file{files.length > 1 ? 's' : ''} selected
              {uploadMode === 'batch' && (
                <p style={{ fontSize: '0.8rem', marginTop: '0.25rem', opacity: 0.9 }}>
                  Total size: {(files.reduce((acc, f) => acc + f.size, 0) / 1024 / 1024).toFixed(2)} MB
                </p>
              )}
            </div>
          )}

          {/* Image Previews */}
          {previews.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  marginBottom: '0.75rem',
                  color: '#374151',
                }}
              >
                {uploadMode === 'batch' ? 'Preview All Images' : 'Preview'}:
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: uploadMode === 'batch' ? 'repeat(auto-fill, minmax(100px, 1fr))' : '1fr',
                  gap: '0.75rem',
                  marginBottom: '1rem',
                }}
              >
                {previews.map((preview, idx) => (
                  <div
                    key={idx}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.375rem',
                      overflow: 'hidden',
                      backgroundColor: '#fff',
                    }}
                  >
                    <img
                      src={preview.preview}
                      alt={preview.name}
                      style={{
                        width: '100%',
                        height: uploadMode === 'batch' ? '100px' : '250px',
                        objectFit: 'cover',
                      }}
                    />
                    {uploadMode === 'batch' && (
                      <p
                        style={{
                          fontSize: '0.65rem',
                          padding: '0.25rem',
                          color: '#6b7280',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          textAlign: 'center',
                        }}
                        title={preview.name}
                      >
                        {preview.name}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status Message */}
          {message.text && (
            <div
              style={{
                padding: '0.75rem',
                borderRadius: '0.375rem',
                backgroundColor: message.type === 'success' ? '#dcfce7' : '#fee2e2',
                color: message.type === 'success' ? '#166534' : '#991b1b',
                fontSize: '0.9rem',
                border: `1px solid ${message.type === 'success' ? '#86efac' : '#fca5a5'}`,
              }}
            >
              {message.text}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={uploading || files.length === 0}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: uploading || files.length === 0 ? '#d1d5db' : '#2563eb',
              color: '#fff',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '1rem',
              fontWeight: '600',
              cursor: uploading || files.length === 0 ? 'not-allowed' : 'pointer',
              opacity: uploading || files.length === 0 ? 0.6 : 1,
              transition: 'background-color 0.2s',
            }}
          >
            {uploading
              ? uploadMode === 'batch'
                ? `⏳ Uploading ${files.length} files...`
                : '⏳ Uploading...'
              : uploadMode === 'batch'
              ? `📤 Upload ${files.length} Image${files.length > 1 ? 's' : ''}`
              : '📤 Upload Image'}
          </button>
        </form>
      </div>

      {/* Manage Gallery Section */}
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '2rem',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1f2937' }}>
          Current Gallery ({images.length} images)
        </h2>

        {loading ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>Loading gallery...</p>
        ) : images.length === 0 ? (
          <p style={{ color: '#6b7280', textAlign: 'center', padding: '2rem' }}>
            No images in gallery yet. Upload your first image above!
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {images.map((image) => (
              <div
                key={image.id}
                style={{
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  overflow: 'hidden',
                  backgroundColor: '#f9fafb',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
              >
                {/* Image Thumbnail */}
                <img
                  src={image.src}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    backgroundColor: '#e5e7eb',
                  }}
                />

                {/* Image Info */}
                <div style={{ padding: '0.75rem' }}>
                  <h3
                    style={{
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem',
                      color: '#111827',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                    title={image.title}
                  >
                    {image.title}
                  </h3>

                  <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                    ID: {image.id}
                  </p>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(image.id, image.title)}
                    style={{
                      width: '100%',
                      padding: '0.5rem',
                      backgroundColor: '#ef4444',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '0.25rem',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#dc2626'
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = '#ef4444'
                    }}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default GalleryManager
