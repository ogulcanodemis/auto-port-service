import React, { useState } from 'react';
import './PricingTab.css';

interface Product {
  id: number;
  code: string;
  name: string;
  unitPrice: number;
  quantity: number;
  taxRate: number;
  discountRate: number;
  totalPrice: number;
}

const PricingTab: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { 
      id: 1, 
      code: 'wy405', 
      name: 'Yağ Filtresi', 
      unitPrice: 1282.50, 
      quantity: 1, 
      taxRate: 20, 
      discountRate: 0, 
      totalPrice: 1282.50 
    },
    { 
      id: 2, 
      code: 'hf101', 
      name: 'Hava Filtresi', 
      unitPrice: 950.00, 
      quantity: 1, 
      taxRate: 20, 
      discountRate: 0, 
      totalPrice: 950.00 
    }
  ]);
  
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'totalPrice'>>({
    code: '',
    name: '',
    unitPrice: 0,
    quantity: 1,
    taxRate: 20,
    discountRate: 0,
  });
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Omit<Product, 'id' | 'totalPrice'>>({
    code: '',
    name: '',
    unitPrice: 0,
    quantity: 1,
    taxRate: 20,
    discountRate: 0,
  });
  
  // Genel İskonto Modal State
  const [showDiscountModal, setShowDiscountModal] = useState(false);
  const [newTotalPrice, setNewTotalPrice] = useState<string>('');
  
  // KDV tutarını hesapla
  const calculateTax = (price: number, taxRate: number): number => {
    return price * (taxRate / 100);
  };
  
  // İskonto tutarını hesapla
  const calculateDiscount = (price: number, discountRate: number): number => {
    return price * (discountRate / 100);
  };
  
  // Ürünün toplam tutarını hesapla
  const calculateTotalPrice = (unitPrice: number, quantity: number, taxRate: number, discountRate: number): number => {
    const basePrice = unitPrice * quantity;
    const discountAmount = calculateDiscount(basePrice, discountRate);
    const priceAfterDiscount = basePrice - discountAmount;
    const taxAmount = calculateTax(priceAfterDiscount, taxRate);
    
    return priceAfterDiscount + taxAmount;
  };
  
  // Genel toplamları hesapla
  const calculateSummary = () => {
    let subTotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;
    let grandTotal = 0;
    
    products.forEach(product => {
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
  
  // Yeni ürün ekleme
  const handleAddProduct = () => {
    const totalPrice = calculateTotalPrice(
      newProduct.unitPrice,
      newProduct.quantity,
      newProduct.taxRate,
      newProduct.discountRate
    );
    
    const newProductWithId: Product = {
      ...newProduct,
      id: products.length + 1,
      totalPrice
    };
    
    setProducts([...products, newProductWithId]);
    
    // Formu temizle
    setNewProduct({
      code: '',
      name: '',
      unitPrice: 0,
      quantity: 1,
      taxRate: 20,
      discountRate: 0,
    });
    
    setShowAddForm(false);
  };
  
  // Ürün silme
  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
  };
  
  // Ürün düzenleme modunu açma
  const handleEditClick = (product: Product) => {
    setEditingProductId(product.id);
    setEditFormData({
      code: product.code,
      name: product.name,
      unitPrice: product.unitPrice,
      quantity: product.quantity,
      taxRate: product.taxRate,
      discountRate: product.discountRate,
    });
  };
  
  // Düzenlemeyi iptal etme
  const handleCancelEdit = () => {
    setEditingProductId(null);
  };
  
  // Düzenlenen ürünü kaydetme
  const handleSaveEdit = () => {
    if (editingProductId === null) return;
    
    const totalPrice = calculateTotalPrice(
      editFormData.unitPrice,
      editFormData.quantity,
      editFormData.taxRate,
      editFormData.discountRate
    );
    
    const updatedProducts = products.map(product => {
      if (product.id === editingProductId) {
        return {
          ...product,
          code: editFormData.code,
          name: editFormData.name,
          unitPrice: editFormData.unitPrice,
          quantity: editFormData.quantity,
          taxRate: editFormData.taxRate,
          discountRate: editFormData.discountRate,
          totalPrice
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    setEditingProductId(null);
  };
  
  // Düzenleme formunda değişiklik
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Sayısal değerler için doğru dönüşüm
    if (name === 'unitPrice' || name === 'quantity' || name === 'taxRate' || name === 'discountRate') {
      setEditFormData({
        ...editFormData,
        [name]: name === 'quantity' ? parseInt(value) : parseFloat(value)
      });
    } else {
      setEditFormData({
        ...editFormData,
        [name]: value
      });
    }
  };
  
  // Para formatı
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('tr-TR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  };
  
  // Genel İskonto Uygulama
  const applyGeneralDiscount = () => {
    if (!newTotalPrice || parseFloat(newTotalPrice.replace(/\./g, '').replace(',', '.')) <= 0) {
      return;
    }
    
    const targetTotal = parseFloat(newTotalPrice.replace(/\./g, '').replace(',', '.'));
    
    if (targetTotal >= summary.grandTotal) {
      alert('Yeni toplam fiyat, mevcut fiyattan büyük veya eşit olamaz!');
      return;
    }
    
    // Tam olarak kullanıcının istediği toplam fiyata ulaşabilmek için sabit bir hesaplama kullanıyoruz
    
    // İndirimsiz halde ürünlerin toplam fiyatı (KDV dahil)
    let noDiscountTotal = 0;
    const noDiscountProducts = products.map(product => {
      const noDiscountPrice = calculateTotalPrice(product.unitPrice, product.quantity, product.taxRate, 0);
      noDiscountTotal += noDiscountPrice;
      return { ...product, noDiscountPrice };
    });
    
    // İndirim oranı = (indirimsiz toplam - hedef toplam) / indirimsiz toplam * 100
    const discountPercent = ((noDiscountTotal - targetTotal) / noDiscountTotal) * 100;
    
    // Her ürüne aynı indirim oranını uygula
    const updatedProducts = noDiscountProducts.map(product => {
      const totalPrice = product.noDiscountPrice * (1 - discountPercent / 100);
      return {
        ...product,
        discountRate: discountPercent,
        totalPrice
      };
    });
    
    setProducts(updatedProducts);
    setShowDiscountModal(false);
    setNewTotalPrice('');
  };
  
  // İndirim Kaldırma
  const removeDiscount = () => {
    const updatedProducts = products.map(product => {
      const totalPrice = calculateTotalPrice(
        product.unitPrice,
        product.quantity,
        product.taxRate,
        0 // İskontoyu sıfırla
      );
      
      return {
        ...product,
        discountRate: 0,
        totalPrice
      };
    });
    
    setProducts(updatedProducts);
    setShowDiscountModal(false);
    setNewTotalPrice('');
  };
  
  // Decimal inputu kontrol et
  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Sadece sayılar, virgül ve nokta kabul et
    if (/^[0-9.,]*$/.test(value)) {
      setNewTotalPrice(value);
    }
  };
  
  return (
    <div className="pricing-tab">
      <div className="pricing-header">
        <h2>Ücretlendirme</h2>
        <div className="pricing-actions">
          <button 
            className="add-product-button" 
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingProductId(null); // Düzenleme modunu kapat
            }}
            disabled={editingProductId !== null} // Düzenleme sırasında yeni ürün eklemeyi devre dışı bırak
          >
            {showAddForm ? 'İptal' : 'Ürün Ekle'}
          </button>
        </div>
      </div>
      
      {/* Document Action Buttons */}
      <div className="document-actions">
        <button 
          className="print-form-button"
          disabled={editingProductId !== null || products.length === 0}
          onClick={() => alert('Form yazdırılıyor...')}
        >
          Form Yazdır
        </button>
        <button 
          className="proforma-button"
          disabled={editingProductId !== null || products.length === 0}
          onClick={() => alert('Proforma fatura oluşturuluyor...')}
        >
          Proforma Fatura
        </button>
        <button 
          className="create-invoice-button"
          disabled={editingProductId !== null || products.length === 0}
          onClick={() => alert('Fatura oluşturuluyor...')}
        >
          Fatura Oluştur
        </button>
      </div>
      
      {showAddForm && (
        <div className="product-form">
          <h3>Yeni Ürün/Parça Ekle</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>Ürün Kodu</label>
              <input 
                type="text" 
                value={newProduct.code}
                onChange={(e) => setNewProduct({...newProduct, code: e.target.value})}
                placeholder="Ürün kodu"
              />
            </div>
            <div className="form-group">
              <label>Ürün Adı</label>
              <input 
                type="text" 
                value={newProduct.name}
                onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                placeholder="Ürün adı"
              />
            </div>
            <div className="form-group">
              <label>Birim Fiyat (₺)</label>
              <input 
                type="number" 
                value={newProduct.unitPrice}
                onChange={(e) => setNewProduct({...newProduct, unitPrice: parseFloat(e.target.value)})}
                placeholder="0.00"
                min="0"
                step="0.01"
              />
            </div>
            <div className="form-group">
              <label>Miktar</label>
              <input 
                type="number" 
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({...newProduct, quantity: parseInt(e.target.value)})}
                placeholder="1"
                min="1"
              />
            </div>
            <div className="form-group">
              <label>KDV (%)</label>
              <input 
                type="number" 
                value={newProduct.taxRate}
                onChange={(e) => setNewProduct({...newProduct, taxRate: parseFloat(e.target.value)})}
                placeholder="20"
                min="0"
                max="100"
              />
            </div>
            <div className="form-group">
              <label>İskonto (%)</label>
              <input 
                type="number" 
                value={newProduct.discountRate}
                onChange={(e) => setNewProduct({...newProduct, discountRate: parseFloat(e.target.value)})}
                placeholder="0"
                min="0"
                max="100"
              />
            </div>
          </div>
          <div className="form-actions">
            <button onClick={handleAddProduct} className="save-product-button">Ürün Ekle</button>
          </div>
        </div>
      )}
      
      <div className="pricing-table-container">
        <div className="pricing-invoice-info">
          <div className="invoice-field">
            <label>Fatura No:</label>
            <span className="invoice-value">F-12345</span>
          </div>
          <div className="invoice-field">
            <label>Fatura Tarihi:</label>
            <span className="invoice-value">12.11.2023</span>
          </div>
          <div className="invoice-field">
            <label>Ödeme Şekli:</label>
            <select className="payment-method">
              <option value="cash">Nakit</option>
              <option value="credit">Kredi Kartı</option>
              <option value="transfer">Havale/EFT</option>
            </select>
          </div>
        </div>
        
        <table className="pricing-table">
          <thead>
            <tr>
              <th>Ürün Kodu</th>
              <th>Ürün Adı</th>
              <th>Birim Fiyat</th>
              <th>Miktar</th>
              <th>KDV %</th>
              <th>İskonto %</th>
              <th>Toplam Fiyat</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product.id} className={editingProductId === product.id ? 'editable-row' : ''}>
                  <td className={editingProductId === product.id ? 'editable-cell' : ''}>
                    {editingProductId === product.id ? (
                      <input
                        type="text"
                        name="code"
                        value={editFormData.code}
                        onChange={handleEditInputChange}
                      />
                    ) : (
                      product.code
                    )}
                  </td>
                  <td className={editingProductId === product.id ? 'editable-cell' : ''}>
                    {editingProductId === product.id ? (
                      <input
                        type="text"
                        name="name"
                        value={editFormData.name}
                        onChange={handleEditInputChange}
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td className={editingProductId === product.id ? 'editable-cell' : ''}>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        name="unitPrice"
                        value={editFormData.unitPrice}
                        onChange={handleEditInputChange}
                        min="0"
                        step="0.01"
                      />
                    ) : (
                      `${formatCurrency(product.unitPrice)} ₺`
                    )}
                  </td>
                  <td className={editingProductId === product.id ? 'editable-cell' : ''}>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        name="quantity"
                        value={editFormData.quantity}
                        onChange={handleEditInputChange}
                        min="1"
                      />
                    ) : (
                      product.quantity
                    )}
                  </td>
                  <td className={editingProductId === product.id ? 'editable-cell' : ''}>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        name="taxRate"
                        value={editFormData.taxRate}
                        onChange={handleEditInputChange}
                        min="0"
                        max="100"
                      />
                    ) : (
                      `%${product.taxRate}`
                    )}
                  </td>
                  <td className={editingProductId === product.id ? 'editable-cell' : ''}>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        name="discountRate"
                        value={editFormData.discountRate}
                        onChange={handleEditInputChange}
                        min="0"
                        max="100"
                      />
                    ) : (
                      `%${product.discountRate}`
                    )}
                  </td>
                  <td className="total-column">
                    {editingProductId === product.id ? (
                      calculateTotalPrice(
                        editFormData.unitPrice,
                        editFormData.quantity,
                        editFormData.taxRate,
                        editFormData.discountRate
                      ).toFixed(2) + ' ₺'
                    ) : (
                      `${formatCurrency(product.totalPrice)} ₺`
                    )}
                  </td>
                  <td className="actions-column">
                    {editingProductId === product.id ? (
                      <div className="table-actions">
                        <button
                          className="save-product-button"
                          onClick={handleSaveEdit}
                        >
                          ✓
                        </button>
                        <button
                          className="cancel-edit-button"
                          onClick={handleCancelEdit}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <div className="table-actions">
                        <button 
                          className="edit-product" 
                          onClick={() => handleEditClick(product)}
                          disabled={editingProductId !== null} // Başka bir satır düzenleniyorken bu butonu devre dışı bırak
                        >
                          ✏️
                        </button>
                        <button 
                          className="delete-product" 
                          onClick={() => handleDeleteProduct(product.id)}
                          disabled={editingProductId !== null} // Düzenleme sırasında silmeyi devre dışı bırak
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="no-products">Henüz ürün eklenmemiş</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="pricing-summary">
        <div className="summary-card">
          <div className="summary-row">
            <span className="summary-label">Ara Toplam:</span>
            <span className="summary-value">{formatCurrency(summary.subTotal)} ₺</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">KDV Toplam:</span>
            <span className="summary-value">{formatCurrency(summary.totalTax)} ₺</span>
          </div>
          <div className="summary-row">
            <span className="summary-label">İskonto Toplam:</span>
            <span className="summary-value">-{formatCurrency(summary.totalDiscount)} ₺</span>
          </div>
          <div className="summary-row grand-total">
            <span className="summary-label">Genel Toplam:</span>
            <span className="summary-value">{formatCurrency(summary.grandTotal)} ₺</span>
          </div>
        </div>
        
        <div className="pricing-actions bottom-actions">
          <button 
            className="general-discount-button"
            disabled={editingProductId !== null || products.length === 0} // Düzenleme sırasında genel iskontoyu devre dışı bırak
            onClick={() => setShowDiscountModal(true)}
          >
            Genel İskonto
          </button>
          <div className="checkbox-field">
            <input 
              type="checkbox" 
              id="tevkifatli-fatura" 
              disabled={editingProductId !== null} // Düzenleme sırasında devre dışı bırak
            />
            <label htmlFor="tevkifatli-fatura">Tevkifatlı Fatura</label>
          </div>
          <div className="checkbox-field">
            <input 
              type="checkbox" 
              id="bilancoya-goster" 
              disabled={editingProductId !== null} // Düzenleme sırasında devre dışı bırak
            />
            <label htmlFor="bilancoya-goster">Bilançoyu Göster</label>
          </div>
        </div>
      </div>
      
      {/* Genel İskonto Modal */}
      {showDiscountModal && (
        <div className="discount-modal-overlay">
          <div className="discount-modal">
            <div className="discount-modal-header">
              <h3>GENEL İSKONTO</h3>
              <button className="close-modal" onClick={() => {
                setShowDiscountModal(false);
                setNewTotalPrice('');
              }}>
                İPTAL
              </button>
            </div>
            <div className="discount-modal-body">
              <div className="current-total">
                <span>Mevcut Genel Toplam:</span>
                <span className="total-amount">{formatCurrency(summary.grandTotal)} TL</span>
              </div>
              <div className="new-total-input">
                <label>YENİ GENEL TOPLAM</label>
                <div className="input-with-currency">
                  <span className="currency-prefix">TL</span>
                  <input 
                    type="text" 
                    value={newTotalPrice}
                    onChange={handlePriceInput}
                    placeholder={formatCurrency(summary.grandTotal)}
                  />
                </div>
              </div>
              <div className="discount-modal-actions">
                <button className="apply-discount" onClick={applyGeneralDiscount}>
                  UYGULA
                </button>
                <button className="remove-discount" onClick={removeDiscount}>
                  İNDİRİMİ KALDIR
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingTab; 