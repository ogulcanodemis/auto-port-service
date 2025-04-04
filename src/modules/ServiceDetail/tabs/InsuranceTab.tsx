import React, { useState } from 'react';
import './InsuranceTab.css';

interface InsuranceData {
  // Poliçe Bilgileri
  muayeneBilgisi: string;
  policeNo: string;
  sigortaFirmasi: string;
  bitisTarihi: string;
  kaskoBilgisi: string;
  
  // Onarım ve Ekspertiz
  policeTipi: string;
  dosyaNo: string;
  ekspertizFirmasi: string;
  yetkiliKisi: string;
  ekspertizTelefon: string;
  ekspertizMail: string;
  not: string;
}

const InsuranceTab: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [insuranceData, setInsuranceData] = useState<InsuranceData>({
    // Varsayılan başlangıç değerleri
    muayeneBilgisi: 'Muayene bilgisi mevcut değil',
    policeNo: '67827867827',
    sigortaFirmasi: 'Vega',
    bitisTarihi: '00-00-0000',
    kaskoBilgisi: 'Araç kaskosu yok',
    
    policeTipi: 'trafikSigortasi',
    dosyaNo: '',
    ekspertizFirmasi: '',
    yetkiliKisi: '',
    ekspertizTelefon: '',
    ekspertizMail: '',
    not: ''
  });
  
  // Form değişikliklerini izleme
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setInsuranceData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Düzenleme işlemleri
  const handleEdit = () => {
    setIsEditing(true);
  };
  
  const handleCancel = () => {
    setIsEditing(false);
    // Değişiklikleri iptal et (başlangıç durumuna dönülebilir)
  };
  
  const handleSave = () => {
    setIsEditing(false);
    // Gerçek uygulamada burada bir API çağrısı yapılabilir
    alert('Sigorta bilgileri kaydedildi.');
  };

  return (
    <div className="insurance-tab">
      <div className="insurance-header">
        <h2>Sigorta/Kasko Bilgileri</h2>
        <div className="insurance-actions">
          {isEditing ? (
            <>
              <button className="insurance-save-button" onClick={handleSave}>Kaydet</button>
              <button className="insurance-cancel-button" onClick={handleCancel}>İptal</button>
            </>
          ) : (
            <button className="insurance-edit-button" onClick={handleEdit}>Düzenle</button>
          )}
        </div>
      </div>
      
      <div className="insurance-sections">
        {/* Poliçe Bilgileri Bölümü */}
        <div className="insurance-section">
          <div className="insurance-section-header">POLİÇE BİLGİLERİ</div>
          <div className="insurance-section-content">
            {/* Muayene Bilgileri */}
            <div className="form-row">
              <div className="form-group">
                <label>MUAYENE BİLGİLERİ</label>
                <input 
                  type="text" 
                  name="muayeneBilgisi" 
                  value={insuranceData.muayeneBilgisi} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            {/* Sigorta Bilgileri */}
            <div className="form-row">
              <div className="form-group">
                <label>POLİÇE NUMARASI</label>
                <input 
                  type="text" 
                  name="policeNo" 
                  value={insuranceData.policeNo} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="form-row two-column">
              <div className="form-group">
                <label>SİGORTA FİRMASI</label>
                <input 
                  type="text" 
                  name="sigortaFirmasi" 
                  value={insuranceData.sigortaFirmasi} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
              <div className="form-group">
                <label>BİTİŞ TARİHİ</label>
                <input 
                  type="text" 
                  name="bitisTarihi" 
                  value={insuranceData.bitisTarihi} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            {/* Kasko Bilgileri */}
            <div className="form-row">
              <div className="form-group">
                <label>KASKO BİLGİLERİ</label>
                <input 
                  type="text" 
                  name="kaskoBilgisi" 
                  value={insuranceData.kaskoBilgisi} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Onarım ve Ekspertiz Bölümü */}
        <div className="insurance-section">
          <div className="insurance-section-header">ONARIM VE EKSPERTİZ</div>
          <div className="insurance-section-content">
            <div className="form-row">
              <div className="form-group">
                <label>ONARIM POLİÇESİ</label>
                <select
                  name="policeTipi"
                  value={insuranceData.policeTipi}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="policy-type-select"
                >
                  <option value="trafikSigortasi">Trafik Sigortası</option>
                  <option value="kasko">Kasko</option>
                  <option value="hayatSigortasi">Hayat Sigortası</option>
                  <option value="digerSigortalar">Diğer Sigortalar</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>DOSYA NO</label>
                <input 
                  type="text" 
                  name="dosyaNo" 
                  value={insuranceData.dosyaNo} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>EKSPERTİZ FİRMASI</label>
                <input 
                  type="text" 
                  name="ekspertizFirmasi" 
                  value={insuranceData.ekspertizFirmasi} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>YETKİLİ KİŞİ</label>
                <input 
                  type="text" 
                  name="yetkiliKisi" 
                  value={insuranceData.yetkiliKisi} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>EKSPERTİZ TELEFON</label>
                <input 
                  type="text" 
                  name="ekspertizTelefon" 
                  value={insuranceData.ekspertizTelefon} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>EKSPERTİZ MAIL</label>
                <input 
                  type="email" 
                  name="ekspertizMail" 
                  value={insuranceData.ekspertizMail} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>NOT</label>
                <textarea 
                  name="not" 
                  value={insuranceData.not} 
                  onChange={handleInputChange} 
                  disabled={!isEditing}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceTab; 