import React from 'react';
import './ServicesList.css';

interface Service {
  id: number;
  plate: string;
  model: string;
  customer: string;
  status: string;
  type: string;
}

const ServicesList: React.FC = () => {
  // Örnek veri
  const services: Service[] = [
    { id: 1, plate: '34 BB 856', model: 'BMW 5 SERİES', customer: 'ESRA GAYİP', status: 'PERİYODİK BAKIM SERVİSTE', type: 'bakım' },
    { id: 2, plate: '20 ADŞ 896', model: 'MERCEDES-BENZ CLA', customer: 'AHMET ASLAN', status: 'PERİYODİK BAKIM SERVİSTE', type: 'bakım' },
    { id: 3, plate: '60 KLM 34', model: 'AUDI A4', customer: 'ALİ İNAN', status: 'KAPORTA HASAR SERVİSTE', type: 'hasar' },
    { id: 4, plate: '34 MNK 567', model: 'BMW 3 SERİES', customer: 'SELAMİ TAŞBAŞI', status: 'MEKANİK SERVİS SERVİSTE', type: 'mekanik' },
    { id: 5, plate: '23 AA 568', model: 'AUDI A3', customer: 'YUSUF TÜRK', status: 'PERİYODİK BAKIM SERVİSTE', type: 'bakım' },
    { id: 6, plate: '06 ADN 568', model: 'HONDA CR-V', customer: 'MEHMET PARLAK', status: 'MEKANİK SERVİS SERVİSTE', type: 'mekanik' },
    { id: 7, plate: '43 CC 456', model: 'HYUNDAI i30', customer: 'MELTEM SAYIN', status: 'PERİYODİK BAKIM SERVİSTE', type: 'bakım' },
  ];

  return (
    <div className="services-container">
      <div className="services-header">
        <h2>SERVİSLER</h2>
      </div>
      <div className="services-table">
        <div className="services-table-header">
          <div className="column-araç">ARAÇ</div>
          <div className="column-müşteri">MÜŞTERİ</div>
          <div className="column-durum">DURUM</div>
          <div className="column-actions"></div>
        </div>
        <div className="services-table-body">
          {services.map((service) => (
            <div key={service.id} className="service-row">
              <div className="column-araç">
                <div className="car-icon">🚗</div>
                <div className="car-details">
                  <div className="car-plate">{service.plate}</div>
                  <div className="car-model">{service.model}</div>
                </div>
              </div>
              <div className="column-müşteri">{service.customer}</div>
              <div className="column-durum">
                <span className={`status-badge ${service.type}`}>
                  {service.status}
                </span>
              </div>
              <div className="column-actions">
                <button className="action-button">🔍</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesList; 