import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ServiceDetail.css';
import { Customer, ServiceInfo, TabType, VehicleInfoField, DeliveredByField } from './types';

// Tab bileşenlerini import et
import WorkOrderTab from './tabs/WorkOrderTab';
import PricingTab from './tabs/PricingTab';
import InsuranceTab from './tabs/InsuranceTab';
import CustomerServicesTab from './tabs/CustomerServicesTab';
import PaymentTab from './tabs/PaymentTab';
import PhotosTab from './tabs/PhotosTab';

const ServiceDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<TabType>('work-order');
  const [serviceInfo, setServiceInfo] = useState<ServiceInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newNote, setNewNote] = useState<string>('');
  const [newTask, setNewTask] = useState<string>('');
  const [newComplaint, setNewComplaint] = useState<string>('');
  const [newTechnicianNote, setNewTechnicianNote] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  
  // Yeni teknisyen ekleme için state
  const [newTechnician, setNewTechnician] = useState<string>('');
  const [technicianType, setTechnicianType] = useState<string>('');
  
  // Yeni 4 metin kutusu için state değişkenleri
  const [customerRequest, setCustomerRequest] = useState<string>('');
  const [vehicleNote, setVehicleNote] = useState<string>('');
  const [specifications, setSpecifications] = useState<string>('');
  const [deliveryNote, setDeliveryNote] = useState<string>('');
  
  // Örnek servis verileri
  useEffect(() => {
    // Gerçek bir uygulamada bu veriler API'dan getirilirdi
    const mockService: ServiceInfo = {
      id: id || '12345',
      customer: {
        id: 1,
        name: 'Ufuk Demirel',
        phone: '534 953 35 35',
        email: 'ufukdemirel@gmail.com',
        companyName: 'Karnaval Yazılım',
        iban: 'TR12 0001 2345 6789 0123 4567 89',
        vehicleInfo: {
          model: 'BMW 320i',
          plate: '34 UC 458',
          km: '125600',
          fuelLevel: '3/4'
        }
      },
      serviceType: 'Mekanik Servis',
      status: 'open',
      createdAt: new Date().toLocaleDateString('tr-TR'),
      closedAt: '',
      estimatedCompletionDate: '15.11.2023',
      complaint: 'Araç çalıştığında titreşim ve yolda giderken anormal ses geliyor.',
      technicianNotes: 'Ön balatalarda aşınma tespit edildi. Motor kulakları kontrol edilmeli.',
      approvalInfo: {
        approved: true,
        approvedBy: 'Ufuk Demirel',
        approvedDate: '10.11.2023'
      },
      assignedTechnician: 'Mehmet Usta',
      estimatedCost: '4.250,00 TL',
      notes: [
        'Müşteri akşam 18:00\'de arayacak.',
        'Ön balata değişimi gerekebilir.'
      ],
      tasks: [
        { id: 1, description: 'Yağ değişimi', completed: false },
        { id: 2, description: 'Filtre değişimi', completed: false },
        { id: 3, description: 'Akü kontrolü', completed: false }
      ],
      usedParts: [
        { id: 1, name: 'Motor Yağı (5W30)', quantity: 5, price: '1.200,00 TL' },
        { id: 2, name: 'Yağ Filtresi', quantity: 1, price: '350,00 TL' },
        { id: 3, name: 'Hava Filtresi', quantity: 1, price: '420,00 TL' }
      ],
      invoiceNo: '7678572',
      invoiceDate: '10.12.2023',
      waybillNo: '276378527',
      waybillDate: '10.12.2023',
      deliveredBy: {
        name: 'Ufuk Demirel',
        phone: '534 953 35 35'
      }
    };

    // API isteğini simüle ediyoruz
    setTimeout(() => {
      setServiceInfo(mockService);
      setLoading(false);
    }, 500);
  }, [id]);

  // Müşteri bilgileri güncelleme işleyicisi
  const handleCustomerChange = (field: keyof Customer, value: string) => {
    if (!serviceInfo) return;
    
    setServiceInfo({
      ...serviceInfo,
      customer: {
        ...serviceInfo.customer,
        [field]: value
      }
    });
  };

  // Araç bilgileri güncelleme işleyicisi
  const handleVehicleChange = (field: VehicleInfoField, value: string) => {
    if (!serviceInfo || !serviceInfo.customer.vehicleInfo) return;
    
    setServiceInfo({
      ...serviceInfo,
      customer: {
        ...serviceInfo.customer,
        vehicleInfo: {
          ...serviceInfo.customer.vehicleInfo,
          [field]: value
        }
      }
    });
  };

  // Servis bilgileri güncelleme işleyicisi
  const handleServiceChange = (field: keyof ServiceInfo, value: string) => {
    if (!serviceInfo) return;
    
    setServiceInfo({
      ...serviceInfo,
      [field]: value
    });
  };

  // Servis getiren kişi bilgileri güncelleme işleyicisi
  const handleDeliveredByChange = (field: DeliveredByField, value: string) => {
    if (!serviceInfo) return;
    
    setServiceInfo({
      ...serviceInfo,
      deliveredBy: {
        ...serviceInfo.deliveredBy || { name: '', phone: '' },
        [field]: value
      }
    });
  };

  // Teknisyen ekleme işleyicisi
  const handleAddTechnician = () => {
    if (!newTechnician.trim() || !serviceInfo) return;
    
    setServiceInfo({
      ...serviceInfo,
      assignedTechnician: newTechnician
    });
    
    setNewTechnician('');
    setTechnicianType('');
  };

  const handleAddNote = () => {
    if (!newNote.trim() || !serviceInfo) return;
    
    setServiceInfo({
      ...serviceInfo,
      notes: [...serviceInfo.notes, newNote]
    });
    setNewNote('');
  };

  const handleAddTask = () => {
    if (!newTask.trim() || !serviceInfo) return;
    
    const newTaskObj = {
      id: serviceInfo.tasks.length + 1,
      description: newTask,
      completed: false
    };
    
    setServiceInfo({
      ...serviceInfo,
      tasks: [...serviceInfo.tasks, newTaskObj]
    });
    setNewTask('');
  };

  const handleToggleTask = (taskId: number) => {
    if (!serviceInfo) return;
    
    setServiceInfo({
      ...serviceInfo,
      tasks: serviceInfo.tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    });
  };

  const handleComplaintChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!serviceInfo) return;
    setNewComplaint(e.target.value);
  };

  const saveComplaint = () => {
    if (!serviceInfo || !newComplaint.trim()) return;
    setServiceInfo({
      ...serviceInfo,
      complaint: newComplaint
    });
    setNewComplaint('');
  };

  const handleTechnicianNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!serviceInfo) return;
    setNewTechnicianNote(e.target.value);
  };

  const saveTechnicianNote = () => {
    if (!serviceInfo || !newTechnicianNote.trim()) return;
    setServiceInfo({
      ...serviceInfo,
      technicianNotes: serviceInfo.technicianNotes 
        ? `${serviceInfo.technicianNotes}\n${newTechnicianNote}`
        : newTechnicianNote
    });
    setNewTechnicianNote('');
  };

  // Notları kaydetme işleyicisi
  const saveNotes = () => {
    if (!serviceInfo) return;
    
    // API'ya kaydetme işlemi burada yapılacak
    alert('Notlar kaydedildi');
  };

  // Değişiklikleri kaydetme işleyicisi
  const handleSaveChanges = () => {
    // Gerçek bir uygulamada burada API'ya değişiklikleri gönderecek kod olacaktı
    setIsEditing(false);
    alert('Değişiklikler kaydedildi!');
  };

  if (loading) {
    return <div className="loading">Yükleniyor...</div>;
  }

  if (!serviceInfo) {
    return <div className="error">Servis bilgisi bulunamadı.</div>;
  }

  return (
    <div className="service-detail-container">
      {/* Müşteri ve Araç Bilgileri */}
      <div className="service-header">
        <div className="customer-info">
          <div className="info-section">
            <h2>{serviceInfo.customer.name}</h2>
            <p><strong>Telefon:</strong> {serviceInfo.customer.phone}</p>
            <p><strong>E-posta:</strong> {serviceInfo.customer.email}</p>
            {serviceInfo.customer.companyName && (
              <p><strong>Firma:</strong> {serviceInfo.customer.companyName}</p>
            )}
          </div>
          
          <div className="info-section">
            <h3>Araç Bilgisi</h3>
            <p><strong>Model:</strong> {serviceInfo.customer.vehicleInfo?.model}</p>
            <p><strong>Plaka:</strong> {serviceInfo.customer.vehicleInfo?.plate}</p>
            <p><strong>KM:</strong> {serviceInfo.customer.vehicleInfo?.km}</p>
          </div>
          
          <div className="info-section service-status">
            <h3>Servis Bilgisi</h3>
            <p><strong>Servis No:</strong> #{serviceInfo.id}</p>
            <p><strong>Servis Türü:</strong> {serviceInfo.serviceType}</p>
            <p><strong>Durum:</strong> <span className={`status ${serviceInfo.status}`}>
              {serviceInfo.status === 'open' && 'Açık'}
              {serviceInfo.status === 'in-progress' && 'İşlemde'}
              {serviceInfo.status === 'completed' && 'Tamamlandı'}
              {serviceInfo.status === 'cancelled' && 'İptal Edildi'}
            </span></p>
            <p><strong>Açılış:</strong> {serviceInfo.createdAt}</p>
          </div>
        </div>
      </div>

      {/* Sekmeler */}
      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'work-order' ? 'active' : ''}`}
          onClick={() => setActiveTab('work-order')}
        >
          İş Emri
        </button>
        <button 
          className={`tab ${activeTab === 'pricing' ? 'active' : ''}`}
          onClick={() => setActiveTab('pricing')}
        >
          Ücretlendirme
        </button>
        <button 
          className={`tab ${activeTab === 'insurance' ? 'active' : ''}`}
          onClick={() => setActiveTab('insurance')}
        >
          Sigorta/Kasko
        </button>
        <button 
          className={`tab ${activeTab === 'customer-services' ? 'active' : ''}`}
          onClick={() => setActiveTab('customer-services')}
        >
          Müşteri Servisleri
        </button>
        <button 
          className={`tab ${activeTab === 'payment' ? 'active' : ''}`}
          onClick={() => setActiveTab('payment')}
        >
          Ödeme
        </button>
        <button 
          className={`tab ${activeTab === 'photos' ? 'active' : ''}`}
          onClick={() => setActiveTab('photos')}
        >
          Fotoğraflar
        </button>
      </div>

      {/* Sekme İçeriği */}
      <div className="tab-content">
        {activeTab === 'work-order' && (
          <WorkOrderTab 
            serviceInfo={serviceInfo}
            onCustomerChange={handleCustomerChange}
            onVehicleChange={handleVehicleChange}
            onServiceChange={handleServiceChange}
            onDeliveredByChange={handleDeliveredByChange}
            onSaveChanges={handleSaveChanges}
            onAddTechnician={handleAddTechnician}
            newTechnician={newTechnician}
            setNewTechnician={setNewTechnician}
            technicianType={technicianType}
            setTechnicianType={setTechnicianType}
            customerRequest={customerRequest}
            setCustomerRequest={setCustomerRequest}
            vehicleNote={vehicleNote}
            setVehicleNote={setVehicleNote}
            specifications={specifications}
            setSpecifications={setSpecifications}
            deliveryNote={deliveryNote}
            setDeliveryNote={setDeliveryNote}
            onSaveNotes={saveNotes}
          />
        )}

        {activeTab === 'pricing' && <PricingTab />}
        {activeTab === 'insurance' && <InsuranceTab />}
        {activeTab === 'customer-services' && <CustomerServicesTab />}
        {activeTab === 'payment' && <PaymentTab />}
        {activeTab === 'photos' && <PhotosTab />}
      </div>
    </div>
  );
};

export default ServiceDetail; 