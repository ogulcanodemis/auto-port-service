import React, { useState } from 'react';
import { FormData, FormSettings } from '../types';
import './CarAcceptanceForm.css';

interface CarAcceptanceFormProps {
  initialData?: Partial<FormData>;
  onClose: () => void;
}

// Varsayılan form ayarları
const defaultSettings: FormSettings = {
  showQR: true,
  showInsuranceInfo: true,
  showCustomerRequests: true,
  showServiceNote: true,
  showSpecifications: true,
  showEmployeeSignature: true,
  showCustomerSignature: true,
  showFuelLevel: true,
  showSalesLines: true,
  showLineNumbers: true,
  showProductCode: true,
  showProductName: true,
  showUnitPrice: true,
  showQuantity: true,
  showVAT: true,
  showDiscount: true,
  showSubtotalPrice: true,
  showTotalPrice: true,
  showNonDiscountedSubtotal: true,
  showGeneralDiscount: true,
  showSubtotal: true,
  showVATTotal: true,
  showServicePhotos: true
};

const CarAcceptanceForm: React.FC<CarAcceptanceFormProps> = ({ initialData, onClose }) => {
  // Form verileri state'i
  const [formData, setFormData] = useState<FormData>({
    formType: 'carAcceptance',
    customerInfo: {
      name: initialData?.customerInfo?.name || '',
      surname: initialData?.customerInfo?.surname || '',
      phone: initialData?.customerInfo?.phone || '',
      email: initialData?.customerInfo?.email || '',
      address: initialData?.customerInfo?.address || '',
    },
    vehicleInfo: {
      brand: initialData?.vehicleInfo?.brand || '',
      model: initialData?.vehicleInfo?.model || '',
      year: initialData?.vehicleInfo?.year || '',
      modelYear: initialData?.vehicleInfo?.modelYear || '',
      plate: initialData?.vehicleInfo?.plate || '',
      vin: initialData?.vehicleInfo?.vin || '',
      chassisNo: initialData?.vehicleInfo?.chassisNo || '',
      engineNo: initialData?.vehicleInfo?.engineNo || '',
      color: initialData?.vehicleInfo?.color || '',
      km: initialData?.vehicleInfo?.km || '',
      mileage: initialData?.vehicleInfo?.mileage || '',
      fuelType: initialData?.vehicleInfo?.fuelType || '',
      fuelLevel: initialData?.vehicleInfo?.fuelLevel || '½',
      paperFE: initialData?.vehicleInfo?.paperFE || '',
      paperFEDate: initialData?.vehicleInfo?.paperFEDate || '',
    },
    insuranceInfo: {
      company: initialData?.insuranceInfo?.company || '',
      policyNumber: initialData?.insuranceInfo?.policyNumber || '',
      claimNumber: initialData?.insuranceInfo?.claimNumber || '',
      expiryDate: initialData?.insuranceInfo?.expiryDate || '',
    },
    requests: initialData?.requests || '',
    serviceNotes: initialData?.serviceNotes || '',
    specifications: initialData?.specifications || '',
    createdAt: initialData?.createdAt || new Date().toLocaleDateString('tr-TR'),
    createdBy: initialData?.createdBy || 'Sistem',
    settings: initialData?.settings || { ...defaultSettings },
  });

  // Ayarlar paneli görünürlüğü
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);

  // Form yazdırma fonksiyonu
  const handlePrint = () => {
    window.print();
  };

  // Ayarlar panelini aç/kapat
  const toggleSettingsPanel = () => {
    setShowSettingsPanel(prev => !prev);
  };

  // Ayarları güncelleme fonksiyonu
  const updateSettings = (key: keyof FormSettings, value: boolean) => {
    setFormData(prevData => ({
      ...prevData,
      settings: {
        ...prevData.settings,
        [key]: value
      }
    }));
  };

  return (
    <div className="form-modal-overlay">
      <div className="form-modal">
        <div className="form-modal-content">
          {/* Form Başlığı ve Butonlar */}
          <div className="form-modal-header">
            <h2>Araç Kabul Formu</h2>
            <div className="form-modal-actions">
              <button 
                className="form-action-btn settings-btn" 
                onClick={toggleSettingsPanel}
                title="Form Ayarları"
              >
                ⚙️ Ayarlar
              </button>
              <button 
                className="form-action-btn print-btn" 
                onClick={handlePrint}
                title="Yazdır"
              >
                🖨️ Yazdır
              </button>
              <button className="form-action-btn qr-btn" title="QR Kodu">🔍 QR</button>
              <button className="form-action-btn pdf-btn" title="PDF İndir">📄 PDF</button>
              <button className="form-action-btn whatsapp-btn" title="WhatsApp ile Gönder">📱 WhatsApp</button>
              <button className="form-action-btn mail-btn" title="E-posta ile Gönder">✉️ Mail</button>
              <button className="form-action-btn close-btn" onClick={onClose} title="Kapat">❌ Kapat</button>
            </div>
          </div>

          {/* Ayarlar Paneli */}
          {showSettingsPanel && (
            <div className="form-settings-panel">
              <div className="settings-header">
                <h3>Form Ayarları</h3>
                <button className="settings-close-btn" onClick={toggleSettingsPanel}>✕</button>
              </div>
              <div className="settings-body">
                {/* Genel Ayarlar */}
                <div className="settings-group">
                  <h4>Genel Görünüm</h4>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showQR" 
                      checked={formData.settings.showQR} 
                      onChange={e => updateSettings('showQR', e.target.checked)}
                    />
                    <label htmlFor="showQR">SERVİS QR GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showInsuranceInfo" 
                      checked={formData.settings.showInsuranceInfo} 
                      onChange={e => updateSettings('showInsuranceInfo', e.target.checked)}
                    />
                    <label htmlFor="showInsuranceInfo">SİGORTA BİLGİLERİ</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showCustomerRequests" 
                      checked={formData.settings.showCustomerRequests} 
                      onChange={e => updateSettings('showCustomerRequests', e.target.checked)}
                    />
                    <label htmlFor="showCustomerRequests">MÜŞTERİ TALEPLERİ</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showServiceNote" 
                      checked={formData.settings.showServiceNote} 
                      onChange={e => updateSettings('showServiceNote', e.target.checked)}
                    />
                    <label htmlFor="showServiceNote">SERVİS NOTU</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showSpecifications" 
                      checked={formData.settings.showSpecifications} 
                      onChange={e => updateSettings('showSpecifications', e.target.checked)}
                    />
                    <label htmlFor="showSpecifications">ŞARTNAME</label>
                  </div>
                </div>

                {/* İmza ve Özel Alanlar */}
                <div className="settings-group">
                  <h4>İmzalar ve Araç Bilgileri</h4>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showEmployeeSignature" 
                      checked={formData.settings.showEmployeeSignature} 
                      onChange={e => updateSettings('showEmployeeSignature', e.target.checked)}
                    />
                    <label htmlFor="showEmployeeSignature">PERSONEL İMZA ALANI</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showCustomerSignature" 
                      checked={formData.settings.showCustomerSignature} 
                      onChange={e => updateSettings('showCustomerSignature', e.target.checked)}
                    />
                    <label htmlFor="showCustomerSignature">MÜŞTERİ İMZA ALANI</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showFuelLevel" 
                      checked={formData.settings.showFuelLevel} 
                      onChange={e => updateSettings('showFuelLevel', e.target.checked)}
                    />
                    <label htmlFor="showFuelLevel">ARAÇ YAKIT DURUMU</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showServicePhotos" 
                      checked={formData.settings.showServicePhotos} 
                      onChange={e => updateSettings('showServicePhotos', e.target.checked)}
                    />
                    <label htmlFor="showServicePhotos">SERVİS FOTOĞRAFLARI</label>
                  </div>
                </div>

                {/* Satış Satırları ve Sütunları */}
                <div className="settings-group">
                  <h4>Satış Satırları</h4>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showSalesLines" 
                      checked={formData.settings.showSalesLines} 
                      onChange={e => updateSettings('showSalesLines', e.target.checked)}
                    />
                    <label htmlFor="showSalesLines">SATIŞ SATIRLARI</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showLineNumbers" 
                      checked={formData.settings.showLineNumbers} 
                      onChange={e => updateSettings('showLineNumbers', e.target.checked)}
                    />
                    <label htmlFor="showLineNumbers">SATIR SAYISI GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showProductCode" 
                      checked={formData.settings.showProductCode} 
                      onChange={e => updateSettings('showProductCode', e.target.checked)}
                    />
                    <label htmlFor="showProductCode">ÜRÜN KODU SÜTUNU GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showProductName" 
                      checked={formData.settings.showProductName} 
                      onChange={e => updateSettings('showProductName', e.target.checked)}
                    />
                    <label htmlFor="showProductName">ÜRÜN ADI SÜTUNU GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showUnitPrice" 
                      checked={formData.settings.showUnitPrice} 
                      onChange={e => updateSettings('showUnitPrice', e.target.checked)}
                    />
                    <label htmlFor="showUnitPrice">BİRİM FİYAT SÜTUNU GÖSTER</label>
                  </div>
                </div>

                {/* Diğer Sütunlar */}
                <div className="settings-group">
                  <h4>Tablo Diğer Sütunlar</h4>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showQuantity" 
                      checked={formData.settings.showQuantity} 
                      onChange={e => updateSettings('showQuantity', e.target.checked)}
                    />
                    <label htmlFor="showQuantity">MİKTAR SÜTUNU GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showVAT" 
                      checked={formData.settings.showVAT} 
                      onChange={e => updateSettings('showVAT', e.target.checked)}
                    />
                    <label htmlFor="showVAT">KDV SÜTUNU GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showDiscount" 
                      checked={formData.settings.showDiscount} 
                      onChange={e => updateSettings('showDiscount', e.target.checked)}
                    />
                    <label htmlFor="showDiscount">İSKONTO SÜTUNU GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showSubtotalPrice" 
                      checked={formData.settings.showSubtotalPrice} 
                      onChange={e => updateSettings('showSubtotalPrice', e.target.checked)}
                    />
                    <label htmlFor="showSubtotalPrice">ARA TOPLAM FİYAT SÜTUNU GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showTotalPrice" 
                      checked={formData.settings.showTotalPrice} 
                      onChange={e => updateSettings('showTotalPrice', e.target.checked)}
                    />
                    <label htmlFor="showTotalPrice">TOPLAM FİYAT SÜTUNU GÖSTER</label>
                  </div>
                </div>

                {/* Toplamlar */}
                <div className="settings-group">
                  <h4>Toplamlar</h4>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showNonDiscountedSubtotal" 
                      checked={formData.settings.showNonDiscountedSubtotal} 
                      onChange={e => updateSettings('showNonDiscountedSubtotal', e.target.checked)}
                    />
                    <label htmlFor="showNonDiscountedSubtotal">İSKONTOSUZ ARA TOPLAM GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showGeneralDiscount" 
                      checked={formData.settings.showGeneralDiscount} 
                      onChange={e => updateSettings('showGeneralDiscount', e.target.checked)}
                    />
                    <label htmlFor="showGeneralDiscount">GENEL İSKONTO YU GÖSTER</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showSubtotal" 
                      checked={formData.settings.showSubtotal} 
                      onChange={e => updateSettings('showSubtotal', e.target.checked)}
                    />
                    <label htmlFor="showSubtotal">ARA TOPLAM</label>
                  </div>
                  <div className="settings-checkbox">
                    <input 
                      type="checkbox" 
                      id="showVATTotal" 
                      checked={formData.settings.showVATTotal} 
                      onChange={e => updateSettings('showVATTotal', e.target.checked)}
                    />
                    <label htmlFor="showVATTotal">KDV</label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Yazdırılabilir Form Alanı */}
          <div className="form-printable-area">
            {/* Form Başlığı */}
            <div className="form-header">
              <div className="form-logo">
                <h1>OTOPORT</h1>
                <div className="form-service-info">
                  <p>Servis No: SRV-2023-12345</p>
                  <p>Tarih: {formData.createdAt}</p>
                  <p>Oluşturan: {formData.createdBy}</p>
                </div>
              </div>
              {formData.settings.showQR && (
                <div className="form-qr-code">
                  <div className="qr-placeholder"></div>
                  <span className="form-service-status">Aktif</span>
                </div>
              )}
            </div>

            {/* Form Gövdesi */}
            <div className="form-body">
              {/* Müşteri Bilgileri */}
              <div className="form-section">
                <h3>MÜŞTERİ BİLGİLERİ</h3>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Ad Soyad</label>
                    <div className="field-value">
                      {formData.customerInfo.name} {formData.customerInfo.surname}
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Telefon</label>
                    <div className="field-value">{formData.customerInfo.phone}</div>
                  </div>
                  <div className="form-field">
                    <label>E-posta</label>
                    <div className="field-value">{formData.customerInfo.email}</div>
                  </div>
                  <div className="form-field">
                    <label>Adres</label>
                    <div className="field-value">{formData.customerInfo.address}</div>
                  </div>
                </div>
              </div>

              {/* Araç Bilgileri */}
              <div className="form-section">
                <h3>ARAÇ BİLGİLERİ</h3>
                <div className="form-grid">
                  <div className="form-field">
                    <label>Plaka</label>
                    <div className="field-value">{formData.vehicleInfo.plate}</div>
                  </div>
                  <div className="form-field">
                    <label>Marka</label>
                    <div className="field-value">{formData.vehicleInfo.brand}</div>
                  </div>
                  <div className="form-field">
                    <label>Model</label>
                    <div className="field-value">{formData.vehicleInfo.model}</div>
                  </div>
                  <div className="form-field">
                    <label>Model Yılı</label>
                    <div className="field-value">{formData.vehicleInfo.modelYear || formData.vehicleInfo.year}</div>
                  </div>
                  <div className="form-field">
                    <label>Şasi No</label>
                    <div className="field-value">{formData.vehicleInfo.chassisNo || formData.vehicleInfo.vin}</div>
                  </div>
                  <div className="form-field">
                    <label>Motor No</label>
                    <div className="field-value">{formData.vehicleInfo.engineNo}</div>
                  </div>
                  <div className="form-field">
                    <label>Kilometre</label>
                    <div className="field-value">{formData.vehicleInfo.mileage || formData.vehicleInfo.km}</div>
                  </div>
                  {formData.settings.showFuelLevel && (
                    <div className="form-field">
                      <label>Yakıt Durumu</label>
                      <div className="field-value">{formData.vehicleInfo.fuelLevel}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Sigorta Bilgileri */}
              {formData.settings.showInsuranceInfo && (
                <div className="form-section">
                  <h3>SİGORTA BİLGİLERİ</h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label>Sigorta Şirketi</label>
                      <div className="field-value">{formData.insuranceInfo.company}</div>
                    </div>
                    <div className="form-field">
                      <label>Poliçe No</label>
                      <div className="field-value">{formData.insuranceInfo.policyNumber}</div>
                    </div>
                    <div className="form-field">
                      <label>Hasar Dosya No</label>
                      <div className="field-value">{formData.insuranceInfo.claimNumber}</div>
                    </div>
                    <div className="form-field">
                      <label>Geçerlilik Tarihi</label>
                      <div className="field-value">{formData.insuranceInfo.expiryDate}</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Müşteri Talepleri */}
              {formData.settings.showCustomerRequests && formData.requests && (
                <div className="form-section">
                  <h3>MÜŞTERİ TALEPLERİ</h3>
                  <div className="form-note">
                    <p>{formData.requests || 'Belirtilmedi.'}</p>
                  </div>
                </div>
              )}

              {/* Servis Notu */}
              {formData.settings.showServiceNote && formData.serviceNotes && (
                <div className="form-section">
                  <h3>SERVİS NOTU</h3>
                  <div className="form-note">
                    <p>{formData.serviceNotes || 'Belirtilmedi.'}</p>
                  </div>
                </div>
              )}

              {/* Satış Satırları */}
              {formData.settings.showSalesLines && (
                <div className="form-section">
                  <h3>İŞ EMRİ SATIRLARI</h3>
                  <div className="form-table">
                    <table>
                      <thead>
                        <tr>
                          {formData.settings.showLineNumbers && <th style={{ width: '50px' }}>No</th>}
                          {formData.settings.showProductCode && <th style={{ width: '120px' }}>Ürün Kodu</th>}
                          {formData.settings.showProductName && <th>Ürün/Hizmet Adı</th>}
                          {formData.settings.showUnitPrice && <th style={{ width: '100px' }}>Birim Fiyat</th>}
                          {formData.settings.showQuantity && <th style={{ width: '80px' }}>Miktar</th>}
                          {formData.settings.showVAT && <th style={{ width: '70px' }}>KDV</th>}
                          {formData.settings.showDiscount && <th style={{ width: '80px' }}>İskonto</th>}
                          {formData.settings.showSubtotalPrice && <th style={{ width: '120px' }}>Ara Toplam</th>}
                          {formData.settings.showTotalPrice && <th style={{ width: '120px' }}>Toplam</th>}
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={9} className="no-items">Henüz satır eklenmedi.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Toplamlar */}
                  <div className="form-totals">
                    {formData.settings.showNonDiscountedSubtotal && (
                      <div className="total-row">
                        <span className="total-label">İskontosuz Ara Toplam:</span>
                        <span className="total-value">0,00 ₺</span>
                      </div>
                    )}
                    {formData.settings.showGeneralDiscount && (
                      <div className="total-row">
                        <span className="total-label">Genel İskonto:</span>
                        <span className="total-value">0,00 ₺</span>
                      </div>
                    )}
                    {formData.settings.showSubtotal && (
                      <div className="total-row">
                        <span className="total-label">Ara Toplam:</span>
                        <span className="total-value">0,00 ₺</span>
                      </div>
                    )}
                    {formData.settings.showVATTotal && (
                      <div className="total-row">
                        <span className="total-label">KDV:</span>
                        <span className="total-value">0,00 ₺</span>
                      </div>
                    )}
                    <div className="total-row grand-total">
                      <span className="total-label">Genel Toplam:</span>
                      <span className="total-value">0,00 ₺</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Servis Fotoğrafları */}
              {formData.settings.showServicePhotos && (
                <div className="form-section">
                  <h3>SERVİS FOTOĞRAFLARI</h3>
                  <div className="form-photos">
                    <div className="photos-grid">
                      <div className="photo-placeholder">Fotoğraf Eklenmedi</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Şartname Bilgileri */}
              {formData.settings.showSpecifications && formData.specifications && (
                <div className="form-section">
                  <h3>ŞARTNAME</h3>
                  <div className="form-note">
                    <p>{formData.specifications || 'Belirtilmedi.'}</p>
                  </div>
                </div>
              )}

              {/* İmza Alanları */}
              {(formData.settings.showEmployeeSignature || formData.settings.showCustomerSignature) && (
                <div className="form-signatures">
                  {formData.settings.showEmployeeSignature && (
                    <div className="signature-block">
                      <div className="signature-line"></div>
                      <div className="signature-name">Servis Görevlisi</div>
                    </div>
                  )}
                  {formData.settings.showCustomerSignature && (
                    <div className="signature-block">
                      <div className="signature-line"></div>
                      <div className="signature-name">Müşteri</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarAcceptanceForm; 