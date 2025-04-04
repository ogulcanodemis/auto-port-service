import React, { useState } from 'react';
import './PhotosTab.css';

interface Photo {
  id: number;
  url: string;
  isSelected: boolean;
}

const PhotosTab: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([
    { id: 1, url: '/assets/car-photo-1.jpg', isSelected: false },
    { id: 2, url: '/assets/car-photo-2.jpg', isSelected: false },
  ]);
  
  const [isDragging, setIsDragging] = useState(false);
  
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  };
  
  const handleFiles = (files: File[]) => {
    // Sadece resim dosyalarını kabul et
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    // Yeni fotoğrafları ekle
    const newPhotos = imageFiles.map((file, index) => ({
      id: Date.now() + index,
      url: URL.createObjectURL(file),
      isSelected: false
    }));
    
    setPhotos(prevPhotos => [...prevPhotos, ...newPhotos]);
  };
  
  const handleDeletePhoto = (id: number) => {
    setPhotos(prevPhotos => prevPhotos.filter(photo => photo.id !== id));
  };
  
  const handleSelectPhoto = (id: number) => {
    setPhotos(prevPhotos => prevPhotos.map(photo => 
      photo.id === id ? { ...photo, isSelected: !photo.isSelected } : photo
    ));
  };
  
  return (
    <div className="photos-tab">
      <div className="photos-header">
        <h2>FOTOĞRAFLAR</h2>
        <div className="photos-actions">
          <button className="photo-upload-button">
            FOTOĞRAF GÖNDER
          </button>
        </div>
      </div>
      
      <div className="photos-section">
        <div className="section-header">
          <h3>ARAÇ FOTOĞRAFLARI</h3>
        </div>
        
        <div className="photos-container">
          {photos.map(photo => (
            <div 
              key={photo.id} 
              className="photo-item"
            >
              <div className="car-icon-badge">
                <span className="car-icon">🚗</span>
              </div>
              <div className="photo-container">
                <img src={photo.url} alt="Araç fotoğrafı" />
              </div>
              <div className="photo-actions">
                <button className="photo-action-btn delete-btn" onClick={() => handleDeletePhoto(photo.id)}>
                  <span className="action-icon">🗑️</span>
                </button>
                <button className="photo-action-btn refresh-btn">
                  <span className="action-icon">🔄</span>
                </button>
                <button className="photo-action-btn view-btn">
                  <span className="action-icon">🔍</span>
                </button>
              </div>
            </div>
          ))}
          
          <div className="add-photo-container">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileSelect}
              id="add-more-photos"
              className="file-input"
            />
            <label htmlFor="add-more-photos" className="add-photo-btn">
              <span className="add-icon">+</span>
              <span>Fotoğraf Ekle</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotosTab; 