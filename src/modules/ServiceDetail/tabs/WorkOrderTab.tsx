import React, { useState } from 'react';
import { Customer, ServiceInfo, VehicleInfoField, DeliveredByField } from '../types';
import './WorkOrderTab.css';
import { CarAcceptanceForm } from '../../Forms';

// Usta/teknisyen bilgilerini tutan interface
interface Technician {
  id: number;
  name: string;
  type: string;
  avatar: string;
}

// Araç bilgilerini tutan interface
interface VehicleFormData {
  plate: string;
  modelYear: string;
  brand: string;
  model: string;
  series: string;
  engineSize: string;
  chassisNo: string;
  engineNo: string;
  fuelType: string;
  color: string;
  ownerName: string;
  ownerPhone: string;
  ownerNote: string;
  inspectionDate: string;
  insuranceStatus: string;
  policyNumber: string;
  insuranceCompany: string;
  insuranceStartDate: string;
  kasko: string;
}

// Yeni usta form verileri
interface NewTechnicianFormData {
  name: string;
  type: string;
  avatar: File | null;
}

interface WorkOrderTabProps {
  serviceInfo: ServiceInfo;
  onCustomerChange: (field: keyof Customer, value: string) => void;
  onVehicleChange: (field: VehicleInfoField, value: string) => void;
  onServiceChange: (field: keyof ServiceInfo, value: string) => void;
  onDeliveredByChange: (field: DeliveredByField, value: string) => void;
  onSaveChanges: () => void;
  onAddTechnician: () => void;
  newTechnician: string;
  setNewTechnician: (value: string) => void;
  technicianType: string;
  setTechnicianType: (value: string) => void;
  customerRequest: string;
  setCustomerRequest: (value: string) => void;
  vehicleNote: string;
  setVehicleNote: (value: string) => void;
  specifications: string;
  setSpecifications: (value: string) => void;
  deliveryNote: string;
  setDeliveryNote: (value: string) => void;
  onSaveNotes: () => void;
}

const WorkOrderTab: React.FC<WorkOrderTabProps> = ({
  serviceInfo,
  onCustomerChange,
  onVehicleChange,
  onServiceChange,
  onDeliveredByChange,
  onSaveChanges,
  onAddTechnician,
  newTechnician,
  setNewTechnician,
  technicianType,
  setTechnicianType,
  customerRequest,
  setCustomerRequest,
  vehicleNote,
  setVehicleNote,
  specifications,
  setSpecifications,
  deliveryNote,
  setDeliveryNote,
  onSaveNotes
}) => {
  // Araç modal değişkenleri
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showDetailedInfo, setShowDetailedInfo] = useState(false);
  const [vehicleFormData, setVehicleFormData] = useState<VehicleFormData>({
    plate: '',
    modelYear: '',
    brand: '',
    model: '',
    series: '',
    engineSize: '',
    chassisNo: '',
    engineNo: '',
    fuelType: '',
    color: '',
    ownerName: '',
    ownerPhone: '',
    ownerNote: '',
    inspectionDate: '',
    insuranceStatus: '',
    policyNumber: '',
    insuranceCompany: '',
    insuranceStartDate: '',
    kasko: ''
  });
  
  // Usta modal değişkenleri
  const [showTechnicianModal, setShowTechnicianModal] = useState(false);
  const [showNewTechnicianForm, setShowNewTechnicianForm] = useState(false);
  const [newTechnicianFormData, setNewTechnicianFormData] = useState<NewTechnicianFormData>({
    name: '',
    type: '',
    avatar: null
  });
  
  // Atanmış teknisyenler dizisi
  const [assignedTechnicians, setAssignedTechnicians] = useState<Technician[]>([]);
  
  // Örnek teknisyenler (gerçek uygulamada API'dan alınacak)
  const [technicians, setTechnicians] = useState<Technician[]>([
    { id: 1, name: 'HÜSEYİN İPEK', type: 'KAPORTA USTASI', avatar: 'https://via.placeholder.com/50' },
    { id: 2, name: 'UFUK DEMİREL', type: 'KAPORTA USTASI', avatar: 'https://via.placeholder.com/50' },
    { id: 3, name: 'CAFER DOĞAN', type: 'MEKANİK USTASI', avatar: 'https://via.placeholder.com/50' },
    { id: 4, name: 'CEMAL SAPÇEKER', type: 'ELEKTRİK USTASI', avatar: 'https://via.placeholder.com/50' },
    { id: 5, name: 'ALİ İNAN', type: 'KAPORTA USTASI', avatar: 'https://via.placeholder.com/50' },
    { id: 6, name: 'YASİN', type: 'MEKANİK USTASI', avatar: 'https://via.placeholder.com/50' },
  ]);
  
  // Araç kabul formu modalı için state
  const [showCarAcceptanceForm, setShowCarAcceptanceForm] = useState(false);
  
  // Modal açma-kapama fonksiyonları
  const toggleVehicleModal = () => {
    setShowVehicleModal(!showVehicleModal);
    if (!showVehicleModal) {
      resetVehicleForm();
    }
  };
  
  const resetVehicleForm = () => {
    setVehicleFormData({
      plate: '',
      modelYear: '',
      brand: '',
      model: '',
      series: '',
      engineSize: '',
      chassisNo: '',
      engineNo: '',
      fuelType: '',
      color: '',
      ownerName: '',
      ownerPhone: '',
      ownerNote: '',
      inspectionDate: '',
      insuranceStatus: '',
      policyNumber: '',
      insuranceCompany: '',
      insuranceStartDate: '',
      kasko: ''
    });
    setShowDetailedInfo(false);
  };
  
  // Araç form değişiklikleri ve kaydetme
  const handleVehicleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setVehicleFormData({
      ...vehicleFormData,
      [name]: value
    });
  };
  
  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Araç eklendi: ${vehicleFormData.plate}`);
    onVehicleChange('plate', vehicleFormData.plate);
    onVehicleChange('model', `${vehicleFormData.brand} ${vehicleFormData.model}`);
    setShowVehicleModal(false);
  };
  
  // Usta modal fonksiyonları
  const toggleTechnicianModal = () => {
    setShowTechnicianModal(!showTechnicianModal);
    if (!showTechnicianModal) {
      resetNewTechnicianForm();
    }
  };
  
  const resetNewTechnicianForm = () => {
    setNewTechnicianFormData({
      name: '',
      type: '',
      avatar: null
    });
    setShowNewTechnicianForm(false);
  };
  
  // Yeni usta form değişiklikleri
  const handleNewTechnicianFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewTechnicianFormData({
      ...newTechnicianFormData,
      [name]: value
    });
  };
  
  // Usta resmi yükleme
  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewTechnicianFormData({
        ...newTechnicianFormData,
        avatar: e.target.files[0]
      });
    }
  };
  
  // Yeni usta kaydetme
  const handleSaveNewTechnician = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Usta ekle
    const newTech: Technician = {
      id: technicians.length + 1,
      name: newTechnicianFormData.name,
      type: newTechnicianFormData.type,
      avatar: newTechnicianFormData.avatar ? URL.createObjectURL(newTechnicianFormData.avatar) : 'https://via.placeholder.com/50'
    };
    
    setTechnicians([...technicians, newTech]);
    resetNewTechnicianForm();
    alert(`Yeni usta eklendi: ${newTechnicianFormData.name}`);
  };
  
  // Listeden usta seçme
  const handleSelectTechnician = (technician: Technician) => {
    // Aynı ustanın tekrar eklenmesini önleyelim
    if (!assignedTechnicians.some(tech => tech.id === technician.id)) {
      setAssignedTechnicians([...assignedTechnicians, technician]);
    }
    // Modal kapatılmasın, başka usta da eklenebilsin
  };
  
  // Ustayı kaldır
  const handleRemoveTechnician = (technicianId: number) => {
    setAssignedTechnicians(assignedTechnicians.filter(tech => tech.id !== technicianId));
  };
  
  // Usta kaydetme (Manuel olarak eklenen)
  const handleAddManualTechnician = () => {
    if (newTechnician && technicianType) {
      const newTech: Technician = {
        id: Date.now(), // Benzersiz ID oluştur
        name: newTechnician,
        type: technicianType,
        avatar: 'https://via.placeholder.com/50'
      };
      
      setAssignedTechnicians([...assignedTechnicians, newTech]);
      
      // Form alanlarını temizle
      setNewTechnician("");
      setTechnicianType("");
    }
  };
  
  // İş Emri sekmesinin diğer işleyicileri
  const handleCustomerRequestChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCustomerRequest(e.target.value);
  };

  const handleVehicleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVehicleNote(e.target.value);
  };

  const handleSpecificationsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSpecifications(e.target.value);
  };

  const handleDeliveryNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDeliveryNote(e.target.value);
  };

  // Araç kabul formu toggle
  const toggleCarAcceptanceForm = () => {
    setShowCarAcceptanceForm(!showCarAcceptanceForm);
  };

  return (
    <div className="work-order-tab">
      {/* Araç Ekleme Modalı */}
      {showVehicleModal && (
        <div className="vehicle-modal-overlay">
          <div className="vehicle-modal">
            <div className="vehicle-modal-header">
              <h3 className="vehicle-modal-title">YENİ ARAÇ EKLE</h3>
              <button 
                className="vehicle-modal-close" 
                onClick={toggleVehicleModal}
              >
                KAPAT X
              </button>
            </div>
            <div className="vehicle-modal-body">
              <form className="vehicle-modal-form" onSubmit={handleAddVehicle}>
                <div className="modal-form-group">
                  <label>* PLAKA</label>
                  <input
                    type="text"
                    name="plate"
                    value={vehicleFormData.plate}
                    onChange={handleVehicleFormChange}
                    required
                  />
                </div>
                
                <div className="modal-form-group">
                  <label>* MODEL YILI</label>
                  <input
                    type="text"
                    name="modelYear"
                    value={vehicleFormData.modelYear}
                    onChange={handleVehicleFormChange}
                    required
                  />
                </div>
                
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>* MARKA</label>
                    <select
                      name="brand"
                      value={vehicleFormData.brand}
                      onChange={handleVehicleFormChange}
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="BMW">BMW</option>
                      <option value="Mercedes">Mercedes</option>
                      <option value="Audi">Audi</option>
                      <option value="Volkswagen">Volkswagen</option>
                      <option value="Toyota">Toyota</option>
                      <option value="Honda">Honda</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label>MODEL</label>
                    <select
                      name="model"
                      value={vehicleFormData.model}
                      onChange={handleVehicleFormChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="3 Serisi">3 Serisi</option>
                      <option value="5 Serisi">5 Serisi</option>
                      <option value="7 Serisi">7 Serisi</option>
                      <option value="X5">X5</option>
                    </select>
                  </div>
                </div>
                
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>SERİ</label>
                    <select
                      name="series"
                      value={vehicleFormData.series}
                      onChange={handleVehicleFormChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="320i">320i</option>
                      <option value="320d">320d</option>
                      <option value="330i">330i</option>
                      <option value="520d">520d</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label>MOTOR HACMİ</label>
                    <select
                      name="engineSize"
                      value={vehicleFormData.engineSize}
                      onChange={handleVehicleFormChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="1.6">1.6</option>
                      <option value="2.0">2.0</option>
                      <option value="3.0">3.0</option>
                      <option value="4.0">4.0</option>
                    </select>
                  </div>
                </div>
                
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>* ŞASE NO</label>
                    <input
                      type="text"
                      name="chassisNo"
                      value={vehicleFormData.chassisNo}
                      onChange={handleVehicleFormChange}
                      required
                    />
                  </div>
                  <div className="modal-form-group">
                    <label>MOTOR NO</label>
                    <input
                      type="text"
                      name="engineNo"
                      value={vehicleFormData.engineNo}
                      onChange={handleVehicleFormChange}
                    />
                  </div>
                </div>
                
                <div className="modal-form-row">
                  <div className="modal-form-group">
                    <label>YAKIT TÜRÜ</label>
                    <select
                      name="fuelType"
                      value={vehicleFormData.fuelType}
                      onChange={handleVehicleFormChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="Benzin">Benzin</option>
                      <option value="Dizel">Dizel</option>
                      <option value="Benzin + LPG">Benzin + LPG</option>
                      <option value="Elektrik">Elektrik</option>
                      <option value="Hibrit">Hibrit</option>
                    </select>
                  </div>
                  <div className="modal-form-group">
                    <label>RENK</label>
                    <select
                      name="color"
                      value={vehicleFormData.color}
                      onChange={handleVehicleFormChange}
                    >
                      <option value="">Seçiniz</option>
                      <option value="Beyaz">Beyaz</option>
                      <option value="Siyah">Siyah</option>
                      <option value="Gri">Gri</option>
                      <option value="Kırmızı">Kırmızı</option>
                      <option value="Mavi">Mavi</option>
                    </select>
                  </div>
                </div>
                
                <div className="modal-form-group detailed-info-toggle">
                  <button 
                    type="button" 
                    className="detailed-info-button"
                    onClick={() => setShowDetailedInfo(!showDetailedInfo)}
                  >
                    DETAYLI BİLGİ GÖSTER {showDetailedInfo ? '▲' : '▼'}
                  </button>
                </div>
                
                {showDetailedInfo && (
                  <div className="detailed-info-section">
                    <div className="modal-form-group">
                      <label>* RUHSAT SAHİBİ</label>
                      <input
                        type="text"
                        name="ownerName"
                        value={vehicleFormData.ownerName}
                        onChange={handleVehicleFormChange}
                      />
                    </div>
                    
                    <div className="modal-form-group">
                      <label>* RUHSAT NUMARASI</label>
                      <input
                        type="text"
                        name="ownerPhone"
                        value={vehicleFormData.ownerPhone}
                        onChange={handleVehicleFormChange}
                      />
                    </div>
                    
                    <div className="modal-form-group">
                      <label>RUHSAT NOTU</label>
                      <textarea
                        name="ownerNote"
                        value={vehicleFormData.ownerNote}
                        onChange={handleVehicleFormChange}
                        rows={3}
                      ></textarea>
                    </div>
                    
                    <div className="modal-section-header">MUAYENE BİLGİLERİ</div>
                    
                    <div className="modal-form-group">
                      <label>MUAYENE BİTİŞ TARİHİ</label>
                      <input
                        type="date"
                        name="inspectionDate"
                        value={vehicleFormData.inspectionDate}
                        onChange={handleVehicleFormChange}
                      />
                    </div>
                    
                    <div className="modal-section-header">SİGORTA BİLGİLERİ</div>
                    
                    <div className="modal-form-group">
                      <label>SİGORTA DURUMU</label>
                      <select
                        name="insuranceStatus"
                        value={vehicleFormData.insuranceStatus}
                        onChange={handleVehicleFormChange}
                      >
                        <option value="">Seçiniz</option>
                        <option value="var">Var</option>
                        <option value="yok">Yok</option>
                      </select>
                    </div>
                    
                    <div className="modal-form-group">
                      <label>POLİÇE NUMARASI</label>
                      <input
                        type="text"
                        name="policyNumber"
                        value={vehicleFormData.policyNumber}
                        onChange={handleVehicleFormChange}
                      />
                    </div>
                    
                    <div className="modal-form-row">
                      <div className="modal-form-group">
                        <label>SİGORTA FİRMASI</label>
                        <input
                          type="text"
                          name="insuranceCompany"
                          value={vehicleFormData.insuranceCompany}
                          onChange={handleVehicleFormChange}
                        />
                      </div>
                      <div className="modal-form-group">
                        <label>BİTİŞ TARİHİ</label>
                        <input
                          type="date"
                          name="insuranceStartDate"
                          value={vehicleFormData.insuranceStartDate}
                          onChange={handleVehicleFormChange}
                        />
                      </div>
                    </div>
                    
                    <div className="modal-section-header">KASKO BİLGİLERİ</div>
                    
                    <div className="modal-form-group">
                      <label>KASKO DURUMU</label>
                      <select
                        name="kasko"
                        value={vehicleFormData.kasko}
                        onChange={handleVehicleFormChange}
                      >
                        <option value="">Seçiniz</option>
                        <option value="var">Var</option>
                        <option value="yok">Yok</option>
                      </select>
                    </div>
                  </div>
                )}
                
                <div className="vehicle-modal-footer">
                  <button type="submit" className="modal-add-button">
                    EKLE
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Usta Ekleme Modalı */}
      {showTechnicianModal && (
        <div className="technician-modal-overlay">
          <div className="technician-modal">
            <div className="technician-modal-header">
              <h3 className="technician-modal-title">USTA EKLE</h3>
              <button 
                className="technician-modal-close" 
                onClick={toggleTechnicianModal}
              >
                KAPAT X
              </button>
            </div>
            <div className="technician-modal-body">
              {!showNewTechnicianForm ? (
                <>
                  <div className="technician-list">
                    <div className="technician-search">
                      <input 
                        type="text" 
                        placeholder="Usta ara..." 
                        className="technician-search-input"
                      />
                    </div>
                    {technicians.map(technician => {
                      const isSelected = assignedTechnicians.some(tech => tech.id === technician.id);
                      
                      return (
                        <div 
                          key={technician.id} 
                          className={`technician-list-item ${isSelected ? 'selected' : ''}`}
                          onClick={() => handleSelectTechnician(technician)}
                        >
                          <div className="technician-avatar-container">
                            <img 
                              src={technician.avatar} 
                              alt={technician.name} 
                              className="technician-avatar-img"
                            />
                          </div>
                          <div className="technician-list-info">
                            <div className="technician-list-name">{technician.name}</div>
                            <div className="technician-list-type">{technician.type}</div>
                          </div>
                          {isSelected && <div className="technician-selected-icon">✓</div>}
                          <button 
                            className="technician-list-action"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Düzenleme için ileride fonksiyon eklenebilir
                            }}
                          >
                            <span className="edit-icon">🖊️</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                  <div className="technician-modal-actions">
                    <button 
                      className="new-technician-button"
                      onClick={() => setShowNewTechnicianForm(true)}
                    >
                      YENİ USTA EKLE
                    </button>
                    <button 
                      className="modal-done-button"
                      onClick={toggleTechnicianModal}
                    >
                      TAMAM
                    </button>
                  </div>
                </>
              ) : (
                <form className="new-technician-form" onSubmit={handleSaveNewTechnician}>
                  <div className="modal-form-group">
                    <label>* USTA ADI SOYADI</label>
                    <input
                      type="text"
                      name="name"
                      value={newTechnicianFormData.name}
                      onChange={handleNewTechnicianFormChange}
                      required
                    />
                  </div>
                  
                  <div className="modal-form-group">
                    <label>* BÖLÜMÜ</label>
                    <select
                      name="type"
                      value={newTechnicianFormData.type}
                      onChange={handleNewTechnicianFormChange}
                      required
                    >
                      <option value="">Seçiniz</option>
                      <option value="KAPORTA USTASI">KAPORTA USTASI</option>
                      <option value="MEKANİK USTASI">MEKANİK USTASI</option>
                      <option value="ELEKTRİK USTASI">ELEKTRİK USTASI</option>
                      <option value="BOYA USTASI">BOYA USTASI</option>
                      <option value="GENEL USTA">GENEL USTA</option>
                    </select>
                  </div>
                  
                  <div className="modal-form-group">
                    <label>FOTOĞRAF</label>
                    <div className="technician-avatar-upload">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        id="technician-avatar-input"
                        className="technician-avatar-input"
                      />
                      <label htmlFor="technician-avatar-input" className="technician-avatar-label">
                        {newTechnicianFormData.avatar ? (
                          <div className="avatar-preview">
                            <img 
                              src={URL.createObjectURL(newTechnicianFormData.avatar)} 
                              alt="Usta Avatarı" 
                            />
                          </div>
                        ) : (
                          <div className="avatar-placeholder">
                            <span className="avatar-placeholder-icon">📷</span>
                            <span className="avatar-placeholder-text">FOTOĞRAF SEÇ</span>
                          </div>
                        )}
                      </label>
                    </div>
                  </div>
                  
                  <div className="new-technician-actions">
                    <button 
                      type="button" 
                      className="cancel-button"
                      onClick={() => setShowNewTechnicianForm(false)}
                    >
                      İPTAL
                    </button>
                    <button type="submit" className="save-button">
                      KAYDET
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Araç Kabul Formu */}
      {showCarAcceptanceForm && (
        <CarAcceptanceForm
          onClose={() => setShowCarAcceptanceForm(false)}
          initialData={{
            customerInfo: {
              name: serviceInfo.customer.name.split(' ')[0] || '',
              surname: serviceInfo.customer.name.split(' ').slice(1).join(' ') || '',
              phone: serviceInfo.customer.phone || '',
              email: serviceInfo.customer.email || '',
              address: ''
            },
            vehicleInfo: {
              brand: serviceInfo.customer.vehicleInfo?.model?.split(' ')[0] || '',
              model: serviceInfo.customer.vehicleInfo?.model?.split(' ').slice(1).join(' ') || '',
              modelYear: '',
              chassisNo: '',
              engineNo: '',
              mileage: serviceInfo.customer.vehicleInfo?.km || '',
              fuelType: '',
              fuelLevel: serviceInfo.customer.vehicleInfo?.fuelLevel || '',
              plate: serviceInfo.customer.vehicleInfo?.plate || '',
              paperFE: '',
              paperFEDate: ''
            },
            requests: customerRequest || '',
            serviceNotes: vehicleNote || '',
            specifications: specifications || ''
          }}
        />
      )}

      {/* 3 Kart Yan Yana */}
      <div className="work-order-cards">
        {/* Müşteri Bilgileri Kartı */}
        <div className="work-order-card">
          <h3>MÜŞTERİ BİLGİLERİ</h3>
          <div className="card-content">
            <div className="info-row">
              <label>ADI SOYADI</label>
              <input
                type="text"
                className="input-field"
                value={serviceInfo.customer.name}
                onChange={(e) => onCustomerChange('name', e.target.value)}
              />
            </div>
            <div className="info-row">
              <label>TELEFON</label>
              <input
                type="text"
                className="input-field"
                value={serviceInfo.customer.phone}
                onChange={(e) => onCustomerChange('phone', e.target.value)}
              />
            </div>
            <div className="info-row">
              <label>MAIL ADRESİ</label>
              <input
                type="email"
                className="input-field"
                value={serviceInfo.customer.email}
                onChange={(e) => onCustomerChange('email', e.target.value)}
              />
            </div>
            <div className="info-row">
              <label>IBAN</label>
              <input
                type="text"
                className="input-field"
                value={serviceInfo.customer.iban || ''}
                onChange={(e) => onCustomerChange('iban', e.target.value)}
              />
            </div>
            <div className="card-actions">
              <button className="card-action-button">FATURA BİLGİLERİ</button>
            </div>
          </div>
        </div>

        {/* Servis Bilgileri Kartı */}
        <div className="work-order-card">
          <h3>SERVİS BİLGİLERİ</h3>
          <div className="card-content">
            <div className="vehicle-action">
              <button className="vehicle-action-button" onClick={toggleVehicleModal}>
                ARAÇ EKLE
              </button>
            </div>
            <div className="info-row">
              <label>ARAÇ</label>
              <div className="input-group">
                <input
                  type="text"
                  className="input-field"
                  placeholder="Model"
                  value={serviceInfo.customer.vehicleInfo?.model || ''}
                  onChange={(e) => onVehicleChange('model', e.target.value)}
                />
                <input
                  type="text"
                  className="input-field"
                  placeholder="Plaka"
                  value={serviceInfo.customer.vehicleInfo?.plate || ''}
                  onChange={(e) => onVehicleChange('plate', e.target.value)}
                />
              </div>
            </div>
            <div className="info-row">
              <label>SERVİS DURUMU</label>
              <select
                className="select-field"
                value={serviceInfo.status}
                onChange={(e) => onServiceChange('status', e.target.value as any)}
              >
                <option value="open">Açık</option>
                <option value="in-progress">İşlemde</option>
                <option value="completed">Tamamlandı</option>
                <option value="cancelled">İptal Edildi</option>
              </select>
            </div>
            <div className="info-row">
              <label>SERVİS TÜRÜ</label>
              <select
                className="select-field"
                value={serviceInfo.serviceType}
                onChange={(e) => onServiceChange('serviceType', e.target.value)}
              >
                <option value="Mekanik Servis">Mekanik Servis</option>
                <option value="Elektrik Servis">Elektrik Servis</option>
                <option value="Kaporta/Boya">Kaporta/Boya</option>
                <option value="Periyodik Bakım">Periyodik Bakım</option>
              </select>
            </div>
            <div className="info-row two-column">
              <div className="info-col">
                <label>FATURA NO</label>
                <input
                  type="text"
                  className="input-field"
                  value={serviceInfo.invoiceNo || ''}
                  onChange={(e) => onServiceChange('invoiceNo', e.target.value)}
                />
              </div>
              <div className="info-col">
                <label>FATURA TARİH</label>
                <input
                  type="date"
                  className="input-field"
                  value={serviceInfo.invoiceDate ? serviceInfo.invoiceDate.split('.').reverse().join('-') : ''}
                  onChange={(e) => onServiceChange('invoiceDate', e.target.value.split('-').reverse().join('.'))}
                />
              </div>
            </div>
            <div className="info-row two-column">
              <div className="info-col">
                <label>İRSALİYE NO</label>
                <input
                  type="text"
                  className="input-field"
                  value={serviceInfo.waybillNo || ''}
                  onChange={(e) => onServiceChange('waybillNo', e.target.value)}
                />
              </div>
              <div className="info-col">
                <label>İRSALİYE TARİH</label>
                <input
                  type="date"
                  className="input-field"
                  value={serviceInfo.waybillDate ? serviceInfo.waybillDate.split('.').reverse().join('-') : ''}
                  onChange={(e) => onServiceChange('waybillDate', e.target.value.split('-').reverse().join('.'))}
                />
              </div>
            </div>
            <div className="info-row two-column">
              <div className="info-col">
                <label>SERVİS AÇILIŞ TARİHİ</label>
                <input
                  type="date"
                  className="input-field"
                  value={serviceInfo.createdAt ? serviceInfo.createdAt.split('.').reverse().join('-') : ''}
                  onChange={(e) => onServiceChange('createdAt', e.target.value.split('-').reverse().join('.'))}
                />
              </div>
              <div className="info-col">
                <label>SERVİS KAPANIŞ TARİHİ</label>
                <input
                  type="date"
                  className="input-field"
                  value={serviceInfo.closedAt ? serviceInfo.closedAt.split('.').reverse().join('-') : ''}
                  onChange={(e) => onServiceChange('closedAt', e.target.value.split('-').reverse().join('.'))}
                />
              </div>
            </div>
            <div className="info-row two-column">
              <div className="info-col">
                <label>ARAÇ KM</label>
                <input
                  type="text"
                  className="input-field"
                  value={serviceInfo.customer.vehicleInfo?.km || ''}
                  onChange={(e) => onVehicleChange('km', e.target.value)}
                />
              </div>
              <div className="info-col">
                <label>ARAÇ YAKIT DURUMU</label>
                <select
                  className="select-field"
                  value={serviceInfo.customer.vehicleInfo?.fuelLevel || ''}
                  onChange={(e) => onVehicleChange('fuelLevel', e.target.value)}
                >
                  <option value="">Seçiniz</option>
                  <option value="1/4">1/4</option>
                  <option value="2/4">2/4</option>
                  <option value="3/4">3/4</option>
                  <option value="4/4">4/4 (Dolu)</option>
                </select>
              </div>
            </div>
            <div className="info-row two-column">
              <div className="info-col">
                <label>SERVİSE GETİREN KİŞİ</label>
                <input
                  type="text"
                  className="input-field"
                  value={serviceInfo.deliveredBy?.name || ''}
                  onChange={(e) => onDeliveredByChange('name', e.target.value)}
                />
              </div>
              <div className="info-col">
                <label>SERVİSE GETİREN KİŞİ TEL</label>
                <input
                  type="text"
                  className="input-field"
                  value={serviceInfo.deliveredBy?.phone || ''}
                  onChange={(e) => onDeliveredByChange('phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ustalar Kartı */}
        <div className="work-order-card">
          <h3>USTALAR</h3>
          <div className="card-content">
            {/* Atanmış ustalar listesi */}
            <div className="assigned-technicians-list">
              {assignedTechnicians.length > 0 ? (
                assignedTechnicians.map(technician => (
                  <div key={technician.id} className="technician-card">
                    <div className="technician-avatar">
                      <img src={technician.avatar} alt={technician.name} />
                    </div>
                    <div className="technician-info">
                      <div className="technician-name">{technician.name}</div>
                      <div className="technician-type">{technician.type}</div>
                    </div>
                    <button 
                      className="technician-delete-button"
                      onClick={() => handleRemoveTechnician(technician.id)}
                    >
                      🗑️
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-technicians">
                  Henüz usta atanmadı
                </div>
              )}
            </div>
            <div className="card-actions technician-actions">
              <button 
                className="card-action-button"
                onClick={handleAddManualTechnician}
              >
                KAYDET
              </button>
              <button 
                className="card-action-button"
                onClick={toggleTechnicianModal}
              >
                USTA SEÇ
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Değişiklikleri kaydetme butonu */}
      <div className="save-changes">
        <button className="save-button" onClick={onSaveChanges}>
          DEĞİŞİKLİKLERİ KAYDET
        </button>
      </div>

      {/* Notlar Bölümü - 4 textbox yan yana */}
      <div className="notes-grid">
        {/* Müşteri Talebi */}
        <div className="note-box">
          <h3>MÜŞTERİNİN TALEBİ</h3>
          <div className="note-content-box">
            <textarea 
              placeholder="Müşterinin talebini yazın..."
              value={customerRequest}
              onChange={handleCustomerRequestChange}
              rows={5}
              className="note-textarea"
            />
          </div>
        </div>
        
        {/* Araç Notu */}
        <div className="note-box">
          <h3>ARAÇ NOTU</h3>
          <div className="note-content-box">
            <textarea 
              placeholder="Araç ile ilgili notu yazın..."
              value={vehicleNote}
              onChange={handleVehicleNoteChange}
              rows={5}
              className="note-textarea"
            />
          </div>
        </div>
        
        {/* Şatname */}
        <div className="note-box">
          <h3>ŞARTNAME</h3>
          <div className="note-content-box">
            <textarea 
              placeholder="Şartname bilgilerini yazın..."
              value={specifications}
              onChange={handleSpecificationsChange}
              rows={5}
              className="note-textarea"
            />
          </div>
        </div>
        
        {/* Araç Teslim Notu */}
        <div className="note-box">
          <h3>ARAÇ TESLİM NOTU</h3>
          <div className="note-content-box">
            <textarea 
              placeholder="Araç teslim notunu yazın..."
              value={deliveryNote}
              onChange={handleDeliveryNoteChange}
              rows={5}
              className="note-textarea"
            />
          </div>
        </div>
      </div>
      
      {/* Notları Kaydet Butonu */}
      <div className="save-changes">
        <button className="save-button" onClick={onSaveNotes}>
          NOTLARI KAYDET
        </button>
      </div>

      {/* İşlem Butonları */}
      <div className="service-action-buttons">
        <button className="action-btn close-btn" onClick={() => alert('Servis kapatılacak')}>
          <span className="btn-icon">🔒</span>
          <span className="btn-text">SERVİSİ KAPAT</span>
        </button>
        
        <button className="action-btn delete-btn" onClick={() => alert('Servis silinecek')}>
          <span className="btn-icon">🗑️</span>
          <span className="btn-text">SERVİSİ SİL</span>
        </button>
        
        <button className="action-btn qr-btn" onClick={() => alert('QR oluşturulacak')}>
          <span className="btn-icon">📱</span>
          <span className="btn-text">SERVİS QR OLUŞTUR</span>
        </button>
        
        <button className="action-btn form-btn" onClick={toggleCarAcceptanceForm}>
          <span className="btn-icon">📄</span>
          <span className="btn-text">ARAÇ KABUL FORMU</span>
        </button>
        
        <button className="action-btn form-btn" onClick={() => alert('Araç teslim formu açılacak')}>
          <span className="btn-icon">📝</span>
          <span className="btn-text">ARAÇ TESLİM FORMU</span>
        </button>
        
        <button className="action-btn reminder-btn" onClick={() => alert('Hatırlatma eklenecek')}>
          <span className="btn-icon">⏰</span>
          <span className="btn-text">HATIRLATMA EKLE</span>
        </button>
        
        <button className="action-btn sms-btn" onClick={() => alert('SMS gönderilecek')}>
          <span className="btn-icon">✉️</span>
          <span className="btn-text">SMS GÖNDER</span>
        </button>
      </div>
    </div>
  );
};

export default WorkOrderTab; 