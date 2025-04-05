import React, { useState, useRef, useEffect } from 'react';
import { CustomerInfo, VehicleInfo, QuotationProduct, QuotationFormData, FormSettings } from '../types';
import './QuotationForm.css';

interface QuotationFormProps {
  customerInfo?: CustomerInfo;
  vehicleInfo?: VehicleInfo;
  products: QuotationProduct[];
  onClose: () => void;
  initialSettings?: Partial<FormSettings>;
}

// Ayar kategorileri için tip tanımları
type SettingCategory = 'general' | 'productTable' | 'summary' | 'signatures';

// Şablon seçenekleri için tip tanımı
type SettingPreset = '' | 'full' | 'basic' | 'minimal' | 'custom';

const defaultSettings: FormSettings = {
  showQR: true,
  showInsuranceInfo: false,
  showCustomerRequests: false,
  showServiceNote: true,
  showSpecifications: false,
  showEmployeeSignature: true,
  showCustomerSignature: true,
  showFuelLevel: false,
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
  showServicePhotos: false
};

// Ayar şablonları tanımları
const presetSettings = {
  full: {
    ...defaultSettings
  },
  basic: {
    ...defaultSettings,
    showQR: false,
    showInsuranceInfo: false,
    showCustomerRequests: false,
    showSpecifications: false,
    showFuelLevel: false,
    showSubtotalPrice: false,
    showNonDiscountedSubtotal: false,
    showServicePhotos: false
  },
  minimal: {
    ...defaultSettings,
    showQR: false,
    showInsuranceInfo: false,
    showCustomerRequests: false,
    showServiceNote: false,
    showSpecifications: false,
    showFuelLevel: false,
    showLineNumbers: false,
    showProductCode: false,
    showVAT: false,
    showDiscount: false,
    showSubtotalPrice: false,
    showNonDiscountedSubtotal: false,
    showGeneralDiscount: false,
    showVATTotal: false,
    showServicePhotos: false
  }
};

// Ayar kategorilerine göre ayarları gruplama
const categorySettings: Record<SettingCategory, (keyof FormSettings)[]> = {
  general: ['showQR', 'showCustomerRequests', 'showServiceNote'],
  productTable: [
    'showSalesLines', 
    'showLineNumbers', 
    'showProductCode', 
    'showProductName', 
    'showUnitPrice', 
    'showQuantity', 
    'showVAT', 
    'showDiscount', 
    'showTotalPrice'
  ],
  summary: [
    'showSubtotal', 
    'showVATTotal', 
    'showGeneralDiscount', 
    'showNonDiscountedSubtotal'
  ],
  signatures: [
    'showEmployeeSignature', 
    'showCustomerSignature'
  ]
};

const defaultCustomerInfo: CustomerInfo = {
  name: '',
  surname: '',
  phone: '',
  email: '',
  address: ''
};

const defaultVehicleInfo: VehicleInfo = {
  brand: '',
  model: '',
  year: '',
  plate: '',
  vin: '',
  color: '',
  km: ''
};

const QuotationForm: React.FC<QuotationFormProps> = ({
  customerInfo = defaultCustomerInfo,
  vehicleInfo = defaultVehicleInfo,
  products,
  onClose,
  initialSettings = {}
}) => {
  const [formData, setFormData] = useState<QuotationFormData>({
    customerInfo,
    vehicleInfo,
    products,
    quotationNumber: `TEK-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    quotationDate: new Date().toLocaleDateString('tr-TR'),
    validUntil: new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString('tr-TR'),
    paymentMethod: 'Nakit',
    notes: 'Bu teklif formunda belirtilen fiyatlar 30 gün geçerlidir. Stok durumuna göre değişiklik gösterebilir.',
    createdBy: 'Sistem Kullanıcısı',
    settings: { ...defaultSettings, ...initialSettings }
  });

  const [showSettings, setShowSettings] = useState(false);
  const [currentPreset, setCurrentPreset] = useState<SettingPreset>('');
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      customerInfo,
      vehicleInfo,
      products
    }));
  }, [customerInfo, vehicleInfo, products]);

  // Bir kategorideki tüm ayarların seçili olup olmadığını kontrol etme
  const isAllCheckedInCategory = (category: SettingCategory): boolean => {
    return categorySettings[category].every(setting => formData.settings[setting]);
  };

  // Kategorideki tüm ayarları seçme/seçimi kaldırma
  const handleSelectAllInCategory = (category: SettingCategory) => {
    const shouldCheck = !isAllCheckedInCategory(category);
    
    const updatedSettings = { ...formData.settings };
    categorySettings[category].forEach(setting => {
      updatedSettings[setting] = shouldCheck;
    });
    
    setFormData(prev => ({
      ...prev,
      settings: updatedSettings
    }));
    
    // Özel ayar şablonu seçili olduğunu belirt
    setCurrentPreset('custom');
  };

  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      customerInfo: {
        ...prev.customerInfo,
        [name]: value
      }
    }));
  };

  const handleVehicleInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      vehicleInfo: {
        ...prev.vehicleInfo,
        [name]: value
      }
    }));
  };

  const handleFormDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      settings: {
        ...prev.settings,
        [name]: checked
      }
    }));
    
    // Ayarlarda manuel değişiklik yapıldığında özel şablona geç
    setCurrentPreset('custom');
  };

  // Şablon değişikliği
  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SettingPreset;
    setCurrentPreset(value);
    
    if (value && value !== 'custom') {
      setFormData(prev => ({
        ...prev,
        settings: { ...presetSettings[value] }
      }));
    }
  };

  // Ayarları kaydetme (sadece göstermelik, gerçekte yerel kayıt yapılabilir)
  const saveSettings = () => {
    // localStorage'a kaydetme mantığı buraya eklenebilir
    alert('Ayarlar kaydedildi!');
  };

  // Ayarları sıfırlama
  const resetSettings = () => {
    setFormData(prev => ({
      ...prev,
      settings: { ...defaultSettings }
    }));
    setCurrentPreset('');
  };

  const toggleSettings = () => {
    setShowSettings(!showSettings);
  };

  const printForm = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Tarayıcınız pop-up pencerelere izin vermiyor. Lütfen pop-up ayarlarınızı kontrol edin.');
      return;
    }

    const formContent = formRef.current?.innerHTML || '';
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Teklif Formu - ${formData.quotationNumber}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            
            .quotation-form-print {
              width: 100%;
              max-width: 800px;
              margin: 0 auto;
            }
            
            .company-header {
              text-align: center;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 1px solid #ddd;
            }
            
            .company-logo {
              max-width: 150px;
              margin-bottom: 10px;
            }
            
            .company-name {
              font-size: 22px;
              font-weight: bold;
              margin: 5px 0;
            }
            
            .company-contact {
              font-size: 12px;
              color: #666;
            }
            
            .quotation-header {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            
            .quotation-title {
              font-size: 20px;
              font-weight: bold;
              margin: 0 0 10px 0;
              text-align: center;
              width: 100%;
            }
            
            .info-section {
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
            }
            
            .info-box {
              width: 48%;
              border: 1px solid #ddd;
              padding: 10px;
              border-radius: 5px;
            }
            
            .info-title {
              font-weight: bold;
              margin-bottom: 5px;
              border-bottom: 1px solid #eee;
              padding-bottom: 5px;
            }
            
            .info-row {
              display: flex;
              margin-bottom: 5px;
            }
            
            .info-label {
              width: 40%;
              font-weight: 500;
              color: #555;
            }
            
            .info-value {
              width: 60%;
            }
            
            .products-table {
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 20px;
            }
            
            .products-table th {
              background-color: #f5f5f5;
              padding: 8px;
              text-align: left;
              font-weight: 600;
              border: 1px solid #ddd;
            }
            
            .products-table td {
              padding: 8px;
              border: 1px solid #ddd;
            }
            
            .products-table .total-row {
              font-weight: bold;
            }
            
            .summary-box {
              width: 40%;
              margin-left: auto;
              border: 1px solid #ddd;
              padding: 10px;
              border-radius: 5px;
            }
            
            .summary-row {
              display: flex;
              justify-content: space-between;
              margin-bottom: 5px;
            }
            
            .summary-label {
              font-weight: 500;
            }
            
            .summary-value {
              font-weight: 600;
            }
            
            .grand-total {
              font-size: 16px;
              font-weight: 700;
              margin-top: 5px;
              border-top: 1px solid #ddd;
              padding-top: 5px;
            }
            
            .notes-section {
              margin: 20px 0;
              padding: 10px;
              border: 1px solid #ddd;
              border-radius: 5px;
            }
            
            .notes-title {
              font-weight: bold;
              margin-bottom: 5px;
            }
            
            .signature-section {
              display: flex;
              justify-content: space-between;
              margin-top: 40px;
            }
            
            .signature-box {
              width: 45%;
              text-align: center;
            }
            
            .signature-line {
              width: 100%;
              border-bottom: 1px solid #333;
              margin-bottom: 10px;
              height: 40px;
            }
            
            .signature-name {
              font-weight: 500;
            }
            
            /* Print-specific styles */
            @media print {
              body {
                padding: 0;
                font-size: 12px;
              }
              
              .no-print {
                display: none !important;
              }
              
              .page-break {
                page-break-before: always;
              }
            }
          </style>
        </head>
        <body>
          <div class="quotation-form-print">
            ${formContent}
          </div>
          <script>
            window.onload = () => {
              setTimeout(() => {
                window.print();
                setTimeout(() => {
                  window.close();
                }, 500);
              }, 300);
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  // KDV tutarını hesapla
  const calculateTax = (price: number, taxRate: number): number => {
    return price * (taxRate / 100);
  };
  
  // İskonto tutarını hesapla
  const calculateDiscount = (price: number, discountRate: number): number => {
    return price * (discountRate / 100);
  };
  
  // Ürünlerin genel toplamlarını hesapla
  const calculateSummary = () => {
    let subTotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;
    let grandTotal = 0;
    
    formData.products.forEach(product => {
      const basePrice = product.unitPrice * product.quantity;
      subTotal += basePrice;
      totalDiscount += calculateDiscount(basePrice, product.discountRate);
      const priceAfterDiscount = basePrice - calculateDiscount(basePrice, product.discountRate);
      totalTax += calculateTax(priceAfterDiscount, product.taxRate);
      grandTotal += product.totalPrice;
    });
    
    return { subTotal, totalTax, totalDiscount, grandTotal };
  };

  const summary = calculateSummary();

  // Para formatı
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="quotation-form-overlay">
      <div className="quotation-form-container">
        <div className="quotation-form-header">
          <h2>Teklif Formu</h2>
          <div className="form-header-actions">
            <button className="settings-button" onClick={toggleSettings}>
              {showSettings ? 'Teklif Göster' : 'Ayarlar'}
            </button>
            <button className="print-button" onClick={printForm}>
              Yazdır
            </button>
            <button className="close-button" onClick={onClose}>
              Kapat
            </button>
          </div>
        </div>

        {showSettings ? (
          <div className="form-settings-panel">
            <h3>
              Form Ayarları
              <span className="close-settings" onClick={toggleSettings}>×</span>
            </h3>
            <div className="settings-grid">
              <div className="settings-group">
                <h4>
                  Genel
                  <button 
                    className="select-all-btn"
                    onClick={() => handleSelectAllInCategory('general')}
                  >
                    {isAllCheckedInCategory('general') ? 'Hiçbirini Seçme' : 'Tümünü Seç'}
                  </button>
                </h4>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showQR"
                      checked={formData.settings.showQR}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showQR">
                    QR Kod Göster
                    <span className="info-tooltip" title="Formun alt kısmında QR kod gösterilir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showCustomerRequests"
                      checked={formData.settings.showCustomerRequests}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showCustomerRequests">
                    Müşteri Talepleri
                    <span className="info-tooltip" title="Müşteri talepleri bölümünü gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showServiceNote"
                      checked={formData.settings.showServiceNote}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showServiceNote">
                    Servis Notu
                    <span className="info-tooltip" title="Servis notu bölümünü gösterir">ⓘ</span>
                  </label>
                </div>
              </div>
              
              <div className="settings-group">
                <h4>
                  Ürün Tablosu
                  <button 
                    className="select-all-btn"
                    onClick={() => handleSelectAllInCategory('productTable')}
                  >
                    {isAllCheckedInCategory('productTable') ? 'Hiçbirini Seçme' : 'Tümünü Seç'}
                  </button>
                </h4>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showSalesLines"
                      checked={formData.settings.showSalesLines}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showSalesLines">
                    Satış Satırları
                    <span className="info-tooltip" title="Ürün satırlarını gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showLineNumbers"
                      checked={formData.settings.showLineNumbers}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showLineNumbers">
                    Satır Numaraları
                    <span className="info-tooltip" title="Ürün tablosunda satır numaralarını gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showProductCode"
                      checked={formData.settings.showProductCode}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showProductCode">
                    Ürün Kodu
                    <span className="info-tooltip" title="Ürün kodlarını gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showProductName"
                      checked={formData.settings.showProductName}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showProductName">
                    Ürün Adı
                    <span className="info-tooltip" title="Ürün adlarını gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showUnitPrice"
                      checked={formData.settings.showUnitPrice}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showUnitPrice">
                    Birim Fiyat
                    <span className="info-tooltip" title="Birim fiyatları gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showQuantity"
                      checked={formData.settings.showQuantity}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showQuantity">
                    Miktar
                    <span className="info-tooltip" title="Ürün miktarlarını gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showVAT"
                      checked={formData.settings.showVAT}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showVAT">
                    KDV
                    <span className="info-tooltip" title="KDV oranlarını gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showDiscount"
                      checked={formData.settings.showDiscount}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showDiscount">
                    İskonto
                    <span className="info-tooltip" title="İskonto bilgilerini gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showTotalPrice"
                      checked={formData.settings.showTotalPrice}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showTotalPrice">
                    Toplam Fiyat
                    <span className="info-tooltip" title="Toplam fiyatları gösterir">ⓘ</span>
                  </label>
                </div>
              </div>
              
              <div className="settings-group">
                <h4>
                  Toplam Bilgileri
                  <button 
                    className="select-all-btn"
                    onClick={() => handleSelectAllInCategory('summary')}
                  >
                    {isAllCheckedInCategory('summary') ? 'Hiçbirini Seçme' : 'Tümünü Seç'}
                  </button>
                </h4>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showSubtotal"
                      checked={formData.settings.showSubtotal}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showSubtotal">
                    Ara Toplam
                    <span className="info-tooltip" title="Ara toplam bilgisini gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showVATTotal"
                      checked={formData.settings.showVATTotal}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showVATTotal">
                    KDV Toplam
                    <span className="info-tooltip" title="Toplam KDV tutarını gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showGeneralDiscount"
                      checked={formData.settings.showGeneralDiscount}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showGeneralDiscount">
                    Genel İskonto
                    <span className="info-tooltip" title="Genel iskonto bilgisini gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showNonDiscountedSubtotal"
                      checked={formData.settings.showNonDiscountedSubtotal}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showNonDiscountedSubtotal">
                    İskontosuz Ara Toplam
                    <span className="info-tooltip" title="İskonto uygulanmadan önceki ara toplamı gösterir">ⓘ</span>
                  </label>
                </div>
              </div>
              
              <div className="settings-group">
                <h4>
                  İmzalar
                  <button 
                    className="select-all-btn"
                    onClick={() => handleSelectAllInCategory('signatures')}
                  >
                    {isAllCheckedInCategory('signatures') ? 'Hiçbirini Seçme' : 'Tümünü Seç'}
                  </button>
                </h4>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showEmployeeSignature"
                      checked={formData.settings.showEmployeeSignature}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showEmployeeSignature">
                    Personel İmzası
                    <span className="info-tooltip" title="Personel imza alanını gösterir">ⓘ</span>
                  </label>
                </div>
                <div className="setting-item">
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      name="showCustomerSignature"
                      checked={formData.settings.showCustomerSignature}
                      onChange={handleSettingsChange}
                    />
                    <span className="slider"></span>
                  </label>
                  <label htmlFor="showCustomerSignature">
                    Müşteri İmzası
                    <span className="info-tooltip" title="Müşteri imza alanını gösterir">ⓘ</span>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="settings-actions">
              <div className="settings-preset-selector">
                <select onChange={handlePresetChange} value={currentPreset}>
                  <option value="">Ayar Şablonları</option>
                  <option value="full">Tam Detaylı</option>
                  <option value="basic">Temel</option>
                  <option value="minimal">Minimal</option>
                  <option value="custom">Özel</option>
                </select>
              </div>
              <button className="settings-action-btn reset-settings-btn" onClick={resetSettings}>
                Sıfırla
              </button>
              <button className="settings-action-btn save-settings-btn" onClick={saveSettings}>
                Ayarları Kaydet
              </button>
            </div>
          </div>
        ) : (
          <div className="quotation-form-preview" ref={formRef}>
            <div className="company-header">
              <img src="/logo.png" alt="Logo" className="company-logo" />
              <div className="company-name">AUTO PORT SERVICE</div>
              <div className="company-contact">
                Adres: Atatürk Mah. İstanbul Cad. No:123 İstanbul | Tel: (0212) 123 45 67 | E-posta: info@autoportservice.com
              </div>
            </div>
            
            <div className="quotation-title">TEKLİF FORMU</div>
            
            <div className="info-section">
              <div className="info-box">
                <div className="info-title">Teklif Bilgileri</div>
                <div className="info-row">
                  <div className="info-label">Teklif No:</div>
                  <div className="info-value">{formData.quotationNumber}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Teklif Tarihi:</div>
                  <div className="info-value">{formData.quotationDate}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Geçerlilik Tarihi:</div>
                  <div className="info-value">{formData.validUntil}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Ödeme Şekli:</div>
                  <div className="info-value">{formData.paymentMethod}</div>
                </div>
              </div>
              
              <div className="info-box">
                <div className="info-title">Müşteri Bilgileri</div>
                <div className="info-row">
                  <div className="info-label">Müşteri:</div>
                  <div className="info-value">{formData.customerInfo.name} {formData.customerInfo.surname}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Telefon:</div>
                  <div className="info-value">{formData.customerInfo.phone}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">E-posta:</div>
                  <div className="info-value">{formData.customerInfo.email}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Adres:</div>
                  <div className="info-value">{formData.customerInfo.address}</div>
                </div>
              </div>
            </div>
            
            {formData.vehicleInfo.brand && (
              <div className="info-box" style={{ marginBottom: '20px' }}>
                <div className="info-title">Araç Bilgileri</div>
                <div className="info-row">
                  <div className="info-label">Marka/Model:</div>
                  <div className="info-value">{formData.vehicleInfo.brand} {formData.vehicleInfo.model}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Yıl:</div>
                  <div className="info-value">{formData.vehicleInfo.year}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Plaka:</div>
                  <div className="info-value">{formData.vehicleInfo.plate}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Renk:</div>
                  <div className="info-value">{formData.vehicleInfo.color}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">KM:</div>
                  <div className="info-value">{formData.vehicleInfo.km}</div>
                </div>
              </div>
            )}
            
            {formData.settings.showSalesLines && (
              <table className="products-table">
                <thead>
                  <tr>
                    {formData.settings.showLineNumbers && <th style={{ width: '5%' }}>#</th>}
                    {formData.settings.showProductCode && <th style={{ width: '15%' }}>Ürün Kodu</th>}
                    {formData.settings.showProductName && <th style={{ width: '30%' }}>Ürün Adı</th>}
                    {formData.settings.showUnitPrice && <th style={{ width: '12%' }}>Birim Fiyat</th>}
                    {formData.settings.showQuantity && <th style={{ width: '8%' }}>Miktar</th>}
                    {formData.settings.showVAT && <th style={{ width: '10%' }}>KDV %</th>}
                    {formData.settings.showDiscount && <th style={{ width: '10%' }}>İsk. %</th>}
                    {formData.settings.showTotalPrice && <th style={{ width: '15%' }}>Toplam</th>}
                  </tr>
                </thead>
                <tbody>
                  {formData.products.map((product, index) => (
                    <tr key={product.id}>
                      {formData.settings.showLineNumbers && <td>{index + 1}</td>}
                      {formData.settings.showProductCode && <td>{product.code}</td>}
                      {formData.settings.showProductName && <td>{product.name}</td>}
                      {formData.settings.showUnitPrice && <td>{formatCurrency(product.unitPrice)} ₺</td>}
                      {formData.settings.showQuantity && <td>{product.quantity}</td>}
                      {formData.settings.showVAT && <td>%{product.taxRate}</td>}
                      {formData.settings.showDiscount && <td>%{product.discountRate}</td>}
                      {formData.settings.showTotalPrice && <td>{formatCurrency(product.totalPrice)} ₺</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            
            <div className="summary-box">
              {formData.settings.showSubtotal && (
                <div className="summary-row">
                  <div className="summary-label">Ara Toplam:</div>
                  <div className="summary-value">{formatCurrency(summary.subTotal)} ₺</div>
                </div>
              )}
              
              {formData.settings.showGeneralDiscount && (
                <div className="summary-row">
                  <div className="summary-label">İskonto Toplam:</div>
                  <div className="summary-value">-{formatCurrency(summary.totalDiscount)} ₺</div>
                </div>
              )}
              
              {formData.settings.showVATTotal && (
                <div className="summary-row">
                  <div className="summary-label">KDV Toplam:</div>
                  <div className="summary-value">{formatCurrency(summary.totalTax)} ₺</div>
                </div>
              )}
              
              <div className="summary-row grand-total">
                <div className="summary-label">Genel Toplam:</div>
                <div className="summary-value">{formatCurrency(summary.grandTotal)} ₺</div>
              </div>
            </div>
            
            {formData.notes && (
              <div className="notes-section">
                <div className="notes-title">Notlar:</div>
                <div>{formData.notes}</div>
              </div>
            )}
            
            {(formData.settings.showEmployeeSignature || formData.settings.showCustomerSignature) && (
              <div className="signature-section">
                {formData.settings.showEmployeeSignature && (
                  <div className="signature-box">
                    <div className="signature-line"></div>
                    <div className="signature-name">Yetkili İmza</div>
                  </div>
                )}
                
                {formData.settings.showCustomerSignature && (
                  <div className="signature-box">
                    <div className="signature-line"></div>
                    <div className="signature-name">Müşteri İmza</div>
                  </div>
                )}
              </div>
            )}
            
            {formData.settings.showQR && (
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <div style={{ display: 'inline-block', padding: '10px', border: '1px solid #ddd' }}>
                  <div style={{ width: '80px', height: '80px', backgroundColor: '#f5f5f5', margin: '0 auto' }}>
                    {/* QR Code placeholder */}
                  </div>
                  <div style={{ fontSize: '12px', marginTop: '5px' }}>Teklif Kodu: {formData.quotationNumber}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotationForm; 