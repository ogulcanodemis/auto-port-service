import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceCreate.css';

interface Customer {
  id: number;
  name: string;
  phone: string;
  email: string;
  companyName: string;
}

const ServiceCreate: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Yeni müşteri ve servis için state'ler
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerCompany, setNewCustomerCompany] = useState('');
  const [km, setKm] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  
  // Form alanlarını doldurmak için örnek bir müşteri
  const exampleCustomer: Customer = {
    id: 1,
    name: 'Ufuk Demirel',
    phone: '534 953 35 35',
    email: 'ufukdemirel@gmail.com',
    companyName: 'Karnaval Yazılım'
  };

  // Müşteri araması 
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Müşteri aranıyor...");
    // Burada gerçek uygulamada API'dan müşteri aranacak
    alert('Müşteri arandı: ' + searchTerm);
  };

  // Servis oluşturma
  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Burada gerçek bir uygulamada API'ya servis oluşturma isteği gönderilir
    // ve başarılı yanıt alındığında yönlendirme yapılır
    
    // Şimdilik demo amaçlı yönlendirme yapalım
    // Normalde API'dan dönen servis ID'si kullanılır
    const demoServiceId = '12345';
    
    // Servis detay sayfasına yönlendir
    navigate(`/servis/${demoServiceId}`);
  };

  // Fotoğraf yükleme
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="service-create-container">
      <div className="service-create-content">
        
        {/* Müşteri Arama Bölümü - Mevcut müşteriler için */}
        <div className="search-section">
          <h2>Müşteri Ara</h2>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Müşteri adı, telefonu veya plakası..."
              className="search-input"
            />
            <div className="divider">veya</div>
            <button type="submit" className="search-button">ARA</button>
          </form>
        </div>

        {/* Müşteri ve Servis Oluşturma Formu - Yeni müşteriler için */}
        <div className="create-service-form">
          <h2>Müşteri Ve Servis Oluştur</h2>
          <form onSubmit={handleCreateService}>
            <div className="form-group">
              <div className="form-row">
                <div className="form-field">
                  <label>* MÜŞTERİ ADI SOYADI</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                      placeholder="Müşteri adı ve soyadı"
                      required
                    />
                    <span className="icon">👤</span>
                  </div>
                </div>
              </div>

              <div className="form-row two-column">
                <div className="form-field">
                  <label>* MÜŞTERİ TEL</label>
                  <input
                    type="text"
                    value={newCustomerPhone}
                    onChange={(e) => setNewCustomerPhone(e.target.value)}
                    placeholder="534 953 35 36"
                    required
                  />
                </div>
                <div className="form-field">
                  <label>MÜŞTERİ MAIL</label>
                  <div className="input-with-icon">
                    <input
                      type="email"
                      value={newCustomerEmail}
                      onChange={(e) => setNewCustomerEmail(e.target.value)}
                      placeholder="ornek@mail.com"
                    />
                    <span className="icon">✉️</span>
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>FİRMA ADI VE ÜNVANI</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      value={newCustomerCompany}
                      onChange={(e) => setNewCustomerCompany(e.target.value)}
                      placeholder="Firma adı"
                    />
                    <span className="icon">🏢</span>
                  </div>
                </div>
              </div>

              <div className="form-row two-column">
                <div className="form-field">
                  <label>FOTOĞRAF</label>
                  <div className="photo-upload">
                    {photo ? (
                      <div className="photo-preview">
                        <img src={URL.createObjectURL(photo)} alt="Yüklenen Fotoğraf" />
                      </div>
                    ) : (
                      <div className="photo-placeholder">
                        <span>RESİM EKLEMEK İÇİN TIKLAYIN</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="photo-input"
                    />
                  </div>
                </div>
                <div className="form-field">
                  <label>ARAÇ KM</label>
                  <input
                    type="text"
                    value={km}
                    onChange={(e) => setKm(e.target.value)}
                    placeholder="125600"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label>SERVİS TÜRÜ</label>
                  <select
                    value={serviceType}
                    onChange={(e) => setServiceType(e.target.value)}
                    required
                  >
                    <option value="">Seçiniz...</option>
                    <option value="mekanik">Mekanik Servis</option>
                    <option value="elektrik">Elektrik Servis</option>
                    <option value="kaporta">Kaporta/Boya</option>
                    <option value="bakim">Periyodik Bakım</option>
                  </select>
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="create-button">SERVİS AÇ</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ServiceCreate; 