import React, { useState, useRef } from 'react';
import { CustomerInfo, VehicleInfo, TevkifatliInvoiceProduct, TevkifatliInvoiceFormData, FormSettings } from '../types';
import './TevkifatliInvoiceForm.css';

interface TevkifatliInvoiceFormProps {
  customerInfo?: CustomerInfo;
  vehicleInfo?: VehicleInfo;
  products: TevkifatliInvoiceProduct[];
  onClose: () => void;
  initialSettings?: Partial<FormSettings>;
}

// Varsayılan ayarlar
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

const TevkifatliInvoiceForm: React.FC<TevkifatliInvoiceFormProps> = ({
  customerInfo = defaultCustomerInfo,
  vehicleInfo = defaultVehicleInfo,
  products,
  onClose,
  initialSettings = {}
}) => {
  const [formData, setFormData] = useState<TevkifatliInvoiceFormData>({
    customerInfo,
    vehicleInfo,
    products,
    invoiceNumber: `TVK-${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
    invoiceDate: new Date().toLocaleDateString('tr-TR'),
    paymentMethod: 'Havale/EFT',
    paymentDueDate: new Date(new Date().setDate(new Date().getDate() + 30)).toLocaleDateString('tr-TR'),
    notes: 'Bu tevkifatlı fatura KDV tevkifat uygulaması kapsamında düzenlenmiştir.',
    taxOffice: '',
    taxNumber: '',
    createdBy: 'Sistem Kullanıcısı',
    settings: { ...defaultSettings, ...initialSettings }
  });
  
  const [showSettings, setShowSettings] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

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
          <title>Tevkifatlı Fatura - ${formData.invoiceNumber}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 20px;
              color: #333;
            }
            
            .tevkifatli-invoice-print {
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
            
            .invoice-title {
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
          <div class="tevkifatli-invoice-print">
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
  
  // Tevkifat tutarını hesapla
  const calculateTevkifat = (taxAmount: number, tevkifatRate: number): number => {
    return taxAmount * tevkifatRate;
  };
  
  // Ürünlerin genel toplamlarını hesapla
  const calculateSummary = () => {
    let subTotal = 0;
    let totalTax = 0;
    let totalTevkifat = 0;
    let totalDiscount = 0;
    let grandTotal = 0;
    
    formData.products.forEach(product => {
      const basePrice = product.unitPrice * product.quantity;
      subTotal += basePrice;
      totalDiscount += calculateDiscount(basePrice, product.discountRate);
      const priceAfterDiscount = basePrice - calculateDiscount(basePrice, product.discountRate);
      const taxAmount = calculateTax(priceAfterDiscount, product.taxRate);
      totalTax += taxAmount;
      totalTevkifat += calculateTevkifat(taxAmount, product.tevkifatRate);
      
      // Satıcı tarafından alınan KDV = Toplam KDV - Tevkifat miktarı
      const sellerTax = taxAmount - calculateTevkifat(taxAmount, product.tevkifatRate);
      
      // Fatura toplamı = Mal/Hizmet Tutarı + Satıcı KDV'si
      grandTotal += priceAfterDiscount + sellerTax;
    });
    
    return { subTotal, totalTax, totalTevkifat, totalDiscount, grandTotal };
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
    <div className="tevkifatli-invoice-overlay">
      <div className="tevkifatli-invoice-container">
        <div className="tevkifatli-invoice-header">
          <h2>Tevkifatlı Fatura</h2>
          <div className="form-header-actions">
            <button className="settings-button" onClick={toggleSettings}>
              {showSettings ? 'Faturayı Göster' : 'Ayarlar'}
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
            <div className="settings-content">
              <p>Tevkifatlı fatura için ayarları buradan düzenleyebilirsiniz.</p>
              {/* Burada ayarlar içeriği yer alacak (Quotation Form'dakine benzer) */}
            </div>
          </div>
        ) : (
          <div className="tevkifatli-invoice-preview" ref={formRef}>
            <div className="company-header">
              <img src="/logo.png" alt="Logo" className="company-logo" />
              <div className="company-name">AUTO PORT SERVICE</div>
              <div className="company-contact">
                Adres: Atatürk Mah. İstanbul Cad. No:123 İstanbul | Tel: (0212) 123 45 67 | E-posta: info@autoportservice.com
              </div>
            </div>
            
            <div className="invoice-title">TEVKİFATLI FATURA</div>
            
            <div className="info-section">
              <div className="info-box">
                <div className="info-title">Fatura Bilgileri</div>
                <div className="info-row">
                  <div className="info-label">Fatura No:</div>
                  <div className="info-value">{formData.invoiceNumber}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Fatura Tarihi:</div>
                  <div className="info-value">{formData.invoiceDate}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Ödeme Yöntemi:</div>
                  <div className="info-value">{formData.paymentMethod}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Son Ödeme Tarihi:</div>
                  <div className="info-value">{formData.paymentDueDate}</div>
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
                  <div className="info-label">Vergi Dairesi:</div>
                  <div className="info-value">{formData.taxOffice}</div>
                </div>
                <div className="info-row">
                  <div className="info-label">Vergi No / TC:</div>
                  <div className="info-value">{formData.taxNumber}</div>
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
                  <div className="info-label">Plaka:</div>
                  <div className="info-value">{formData.vehicleInfo.plate}</div>
                </div>
              </div>
            )}
            
            {formData.settings.showSalesLines && (
              <table className="products-table">
                <thead>
                  <tr>
                    {formData.settings.showLineNumbers && <th style={{ width: '5%' }}>#</th>}
                    {formData.settings.showProductCode && <th style={{ width: '10%' }}>Ürün Kodu</th>}
                    {formData.settings.showProductName && <th style={{ width: '25%' }}>Ürün Adı</th>}
                    {formData.settings.showUnitPrice && <th style={{ width: '10%' }}>Birim Fiyat</th>}
                    {formData.settings.showQuantity && <th style={{ width: '7%' }}>Miktar</th>}
                    {formData.settings.showVAT && <th style={{ width: '7%' }}>KDV %</th>}
                    {formData.settings.showDiscount && <th style={{ width: '8%' }}>İsk. %</th>}
                    <th style={{ width: '8%' }}>Tevkifat</th>
                    {formData.settings.showTotalPrice && <th style={{ width: '12%' }}>Toplam</th>}
                  </tr>
                </thead>
                <tbody>
                  {formData.products.map((product, index) => {
                    const basePrice = product.unitPrice * product.quantity;
                    const discountAmount = calculateDiscount(basePrice, product.discountRate);
                    const priceAfterDiscount = basePrice - discountAmount;
                    const taxAmount = calculateTax(priceAfterDiscount, product.taxRate);
                    const tevkifatAmount = calculateTevkifat(taxAmount, product.tevkifatRate);
                    const sellerTax = taxAmount - tevkifatAmount;
                    
                    return (
                      <tr key={product.id}>
                        {formData.settings.showLineNumbers && <td>{index + 1}</td>}
                        {formData.settings.showProductCode && <td>{product.code}</td>}
                        {formData.settings.showProductName && <td>{product.name}</td>}
                        {formData.settings.showUnitPrice && <td>{formatCurrency(product.unitPrice)} ₺</td>}
                        {formData.settings.showQuantity && <td>{product.quantity}</td>}
                        {formData.settings.showVAT && <td>%{product.taxRate}</td>}
                        {formData.settings.showDiscount && <td>%{product.discountRate}</td>}
                        <td>%{(product.tevkifatRate * 100).toFixed(0)}</td>
                        {formData.settings.showTotalPrice && <td>{formatCurrency(priceAfterDiscount + sellerTax)} ₺</td>}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
            
            <div className="summary-box">
              {formData.settings.showSubtotal && (
                <div className="summary-row">
                  <div className="summary-label">Mal/Hizmet Toplamı:</div>
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
                  <div className="summary-label">Toplam KDV:</div>
                  <div className="summary-value">{formatCurrency(summary.totalTax)} ₺</div>
                </div>
              )}
              
              <div className="summary-row">
                <div className="summary-label">Tevkifat Toplam:</div>
                <div className="summary-value">{formatCurrency(summary.totalTevkifat)} ₺</div>
              </div>
              
              <div className="summary-row">
                <div className="summary-label">Tahsil Edilen KDV:</div>
                <div className="summary-value">{formatCurrency(summary.totalTax - summary.totalTevkifat)} ₺</div>
              </div>
              
              <div className="summary-row grand-total">
                <div className="summary-label">Genel Toplam:</div>
                <div className="summary-value">{formatCurrency(summary.grandTotal)} ₺</div>
              </div>
            </div>
            
            <div className="tevkifat-note">
              <strong>Tevkifat Açıklaması:</strong> Bu faturadaki KDV'nin bir kısmı, KDV tevkifat uygulaması kapsamında alıcı tarafından beyan edilecektir.
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
                    <div className="signature-name">Satıcı İmza/Kaşe</div>
                  </div>
                )}
                
                {formData.settings.showCustomerSignature && (
                  <div className="signature-box">
                    <div className="signature-line"></div>
                    <div className="signature-name">Alıcı İmza/Kaşe</div>
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
                  <div style={{ fontSize: '12px', marginTop: '5px' }}>Fatura Kodu: {formData.invoiceNumber}</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TevkifatliInvoiceForm; 