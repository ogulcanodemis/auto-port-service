import React, { useState } from 'react';
import './PaymentTab.css';

interface Payment {
  id: number;
  amount: number;
  date: string;
  time?: string;
  type: string;
  isMailOrder?: boolean;
  note: string;
  imageSrc?: string;
}

interface PaymentFormData {
  amount: string;
  date: string;
  time: string;
  type: string;
  isMailOrder: boolean;
  note: string;
  image: File | null;
}

interface SMSPlanData {
  startDate: string;
  interval: string;
  message: string;
}

const PaymentTab: React.FC = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSMSModal, setShowSMSModal] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [paymentFormData, setPaymentFormData] = useState<PaymentFormData>({
    amount: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    type: 'nakit',
    isMailOrder: false,
    note: '',
    image: null
  });
  const [smsFormData, setSMSFormData] = useState<SMSPlanData>({
    startDate: new Date().toISOString().split('T')[0],
    interval: '1',
    message: `Sayın Ufuk Demirel, 34 CC 987 plakalı aracınızın 10-12-2024 tarihine ait servisten kalan 6.730,00 TL tutarındaki bakiye ödemesini yapabilirsiniz.`
  });

  // Toplam servis ücreti (gerçek uygulamada bu değer bir API'dan gelecek)
  const serviceFee = 7632.00;
  
  // Alınan toplam ödeme miktarı
  const totalReceived = payments.reduce((sum, payment) => sum + payment.amount, 0);
  
  // Kalan ödeme miktarı
  const remainingPayment = serviceFee - totalReceived;

  // Ödeme modal'ını göster/gizle
  const togglePaymentModal = () => {
    setShowPaymentModal(!showPaymentModal);
    // Modal kapatıldığında form verilerini sıfırla
    if (showPaymentModal) {
      resetPaymentForm();
    }
  };

  // SMS modal'ını göster/gizle
  const toggleSMSModal = () => {
    setShowSMSModal(!showSMSModal);
    // Modal kapatıldığında form verilerini sıfırla
    if (showSMSModal) {
      resetSMSForm();
    }
  };

  // Form verilerini sıfırla
  const resetPaymentForm = () => {
    setPaymentFormData({
      amount: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      type: 'nakit',
      isMailOrder: false,
      note: '',
      image: null
    });
  };

  // SMS form verilerini sıfırla
  const resetSMSForm = () => {
    setSMSFormData({
      startDate: new Date().toISOString().split('T')[0],
      interval: '1',
      message: `Sayın Ufuk Demirel, 34 CC 987 plakalı aracınızın 10-12-2024 tarihine ait servisten kalan 6.730,00 TL tutarındaki bakiye ödemesini yapabilirsiniz.`
    });
  };

  // Ödeme form input değişikliklerini takip et
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      setPaymentFormData({
        ...paymentFormData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else {
      setPaymentFormData({
        ...paymentFormData,
        [name]: value
      });
    }
  };

  // SMS form input değişikliklerini takip et
  const handleSMSInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSMSFormData({
      ...smsFormData,
      [name]: value
    });
  };

  // Resim yükleme işlemi
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPaymentFormData({
        ...paymentFormData,
        image: e.target.files[0]
      });
    }
  };

  // Yeni ödeme ekle
  const handleAddPayment = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Geçerli bir miktar olup olmadığını kontrol et
    const amount = parseFloat(paymentFormData.amount);
    if (isNaN(amount) || amount <= 0) {
      alert('Lütfen geçerli bir ödeme miktarı girin.');
      return;
    }

    // Yeni ödeme oluştur
    const newPayment: Payment = {
      id: payments.length + 1,
      amount: amount,
      date: paymentFormData.date,
      time: paymentFormData.time,
      type: paymentFormData.type,
      isMailOrder: paymentFormData.isMailOrder,
      note: paymentFormData.note,
      imageSrc: paymentFormData.image ? URL.createObjectURL(paymentFormData.image) : undefined
    };

    // Ödemelere ekle
    setPayments([...payments, newPayment]);
    
    // Modal'ı kapat ve formu sıfırla
    setShowPaymentModal(false);
    resetPaymentForm();
  };

  // SMS Planla işlevi
  const handleSMSPlan = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Gerçek uygulamada burada SMS planlaması için bir API çağrısı yapılacak
    alert(`SMS planlandı: Başlangıç tarihi: ${smsFormData.startDate}, Gün aralığı: ${smsFormData.interval}`);
    
    // Modal'ı kapat
    setShowSMSModal(false);
  };

  // Para birimi formatı
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', { style: 'decimal', minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);
  };

  return (
    <div className="payment-tab">
      <div className="payment-header">
        <h2>Ödeme</h2>
        <div className="payment-actions">
          <button className="payment-add-button" onClick={togglePaymentModal}>
            Ödeme Ekle
          </button>
          <button className="payment-sms-button" onClick={toggleSMSModal}>
            SMS Planla
          </button>
        </div>
      </div>

      {/* Ödeme Özeti */}
      <div className="payment-summary">
        <div className="payment-summary-card">
          <div className="payment-summary-header">SERVİS ÜCRETİ</div>
          <div className="payment-summary-content service-fee">
            {formatCurrency(serviceFee)} TL
          </div>
        </div>

        <div className="payment-summary-card">
          <div className="payment-summary-header">ALINAN ÖDEME</div>
          <div className="payment-summary-content received-payment">
            {formatCurrency(totalReceived)} TL
          </div>
        </div>

        <div className="payment-summary-card">
          <div className="payment-summary-header">KALAN ÖDEME</div>
          <div className="payment-summary-content remaining-payment">
            {formatCurrency(remainingPayment)} TL
          </div>
        </div>
      </div>

      {/* Ödeme Modal Popup */}
      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="payment-modal-header">
              <h3 className="payment-modal-title">ÖDEME EKLE</h3>
              <button 
                className="payment-modal-close" 
                onClick={togglePaymentModal}
              >
                X
              </button>
            </div>
            <div className="payment-modal-body">
              <form className="payment-modal-form" onSubmit={handleAddPayment}>
                <div className="modal-form-group">
                  <label>ÖDEME TUTARI</label>
                  <input
                    type="text"
                    name="amount"
                    placeholder="₺"
                    value={paymentFormData.amount}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>ÖDEME TARİHİ</label>
                    <input
                      type="date"
                      name="date"
                      value={paymentFormData.date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label>ÖDEME SAATİ</label>
                    <input
                      type="time"
                      name="time"
                      value={paymentFormData.time}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="modal-form-group">
                  <label>ÖDEME TÜRÜ</label>
                  <select
                    name="type"
                    value={paymentFormData.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="nakit">Nakit</option>
                    <option value="krediKarti">Kredi Kartı</option>
                    <option value="havale">Havale/EFT</option>
                    <option value="cek">Çek</option>
                    <option value="diger">Diğer</option>
                  </select>
                  
                  <div className="modal-checkbox-group">
                    <input
                      type="checkbox"
                      id="mailOrder"
                      name="isMailOrder"
                      checked={paymentFormData.isMailOrder}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="mailOrder">MAIL ORDER</label>
                  </div>
                </div>
                
                <div className="modal-form-group">
                  <label>ÖDEME NOTU</label>
                  <input
                    type="text"
                    name="note"
                    value={paymentFormData.note}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="modal-image-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                  <div className="modal-image-placeholder">
                    {paymentFormData.image ? 
                      paymentFormData.image.name : 
                      "RESİM EKLE (OPSİYONEL)"}
                  </div>
                </div>
                
                <div className="payment-modal-footer">
                  <button type="submit" className="modal-add-button">
                    EKLE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* SMS Planlama Modal Popup */}
      {showSMSModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal sms-modal">
            <div className="payment-modal-header">
              <h3 className="payment-modal-title">ÖDEME BİLDİRİM SMS | PLANLA</h3>
              <button 
                className="payment-modal-close" 
                onClick={toggleSMSModal}
              >
                X
              </button>
            </div>
            <div className="payment-modal-body">
              <form className="payment-modal-form" onSubmit={handleSMSPlan}>
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>BAŞLANGIÇ TARİHİ</label>
                    <input
                      type="date"
                      name="startDate"
                      value={smsFormData.startDate}
                      onChange={handleSMSInputChange}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label>KAÇ GÜN ARALIKLA</label>
                    <input
                      type="number"
                      name="interval"
                      min="1"
                      max="30"
                      value={smsFormData.interval}
                      onChange={handleSMSInputChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="modal-form-group">
                  <label>SMS İÇERİĞİ</label>
                  <textarea
                    name="message"
                    value={smsFormData.message}
                    onChange={handleSMSInputChange}
                    rows={4}
                    required
                    className="sms-content-textarea"
                  ></textarea>
                </div>
                
                <div className="sms-info-message">
                  Servis Bakiyesi "0"a Olana Kadar Veya Emeğe Eşdeğer Ödememe Kadar Belirlediğiniz Tarihden İtibaren Belirlediğiniz Gün Aralığında Otomatik Sms Atılır
                </div>
                
                <div className="payment-modal-footer">
                  <button type="submit" className="modal-add-button sms-add-button">
                    EKLE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Ödeme Tablosu */}
      <div className="payment-table-container">
        <table className="payment-table">
          <thead>
            <tr>
              <th>TUTAR</th>
              <th>TARİH</th>
              <th>ÖDEME TÜRÜ</th>
              <th>ÖDEME NOTU</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map(payment => (
                <tr key={payment.id}>
                  <td>{formatCurrency(payment.amount)} TL</td>
                  <td>
                    {payment.date} 
                    {payment.time && ` ${payment.time}`}
                  </td>
                  <td>
                    {payment.type === 'nakit' && 'Nakit'}
                    {payment.type === 'krediKarti' && 'Kredi Kartı'}
                    {payment.type === 'havale' && 'Havale/EFT'}
                    {payment.type === 'cek' && 'Çek'}
                    {payment.type === 'diger' && 'Diğer'}
                    {payment.isMailOrder && ' (Mail Order)'}
                  </td>
                  <td>{payment.note}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="no-payments">
                  Henüz ödeme kaydı bulunmuyor.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTab;