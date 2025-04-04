import React from 'react';
import './AppointmentsList.css';

interface Appointment {
  id: number;
  plate: string;
  model: string;
  customer: string;
  date: string;
  time: string;
  type: string;
}

const AppointmentsList: React.FC = () => {
  // Örnek veri
  const appointments: Appointment[] = [
    { id: 1, plate: 'FB 50 741', model: 'BMW 5 SERIES', customer: 'SAVAŞ DEMİR', date: '22-05-2024', time: '00:00', type: 'mekanik' },
    { id: 2, plate: '67 AA 852', model: 'BMW 3 SERIES', customer: 'AYŞE AYDIN', date: '22-05-2024', time: '15:30', type: 'elektrik' },
    { id: 3, plate: '57 FB 343', model: 'AUDI A4', customer: 'UFUK DEMİREL', date: '29-05-2024', time: '04:00', type: 'boya' },
    { id: 4, plate: '34 ZZ 457', model: 'AUDI A6', customer: 'ALİ KAYIKÇI', date: '30-05-2024', time: '12:04', type: 'elektrik' },
    { id: 5, plate: '34 ABC 123', model: 'MERCEDES E-CLASS', customer: 'UFUK DEMİREL', date: '03-09-2024', time: '05:00', type: 'bakım' },
    { id: 6, plate: '44 SX 785', model: 'OPEL ASTRA', customer: 'ÖZKAN TEPECİ', date: '18-09-2024', time: '13:30', type: 'elektrik' },
    { id: 7, plate: '56 KLM 768', model: 'AUDI Q3', customer: 'BAHAR ŞEN', date: '19-09-2024', time: '00:00', type: 'bakım' },
  ];

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h2>RANDEVULAR</h2>
      </div>
      <div className="appointments-table">
        <div className="appointments-table-header">
          <div className="column-araç">ARAÇ</div>
          <div className="column-müşteri">MÜŞTERİ</div>
          <div className="column-tarih">TARİH</div>
          <div className="column-tür">TÜR</div>
          <div className="column-actions"></div>
        </div>
        <div className="appointments-table-body">
          {appointments.map((appointment) => (
            <div key={appointment.id} className="appointment-row">
              <div className="column-araç">
                <div className="car-icon">🚗</div>
                <div className="car-details">
                  <div className="car-plate">{appointment.plate}</div>
                  <div className="car-model">{appointment.model}</div>
                </div>
              </div>
              <div className="column-müşteri">{appointment.customer}</div>
              <div className="column-tarih">
                <div>{appointment.date}</div>
                <div className="time">{appointment.time}</div>
              </div>
              <div className="column-tür">
                <span className={`type-badge ${appointment.type}`}>
                  {appointment.type === 'mekanik' && 'MEKANİK SERVİS'}
                  {appointment.type === 'elektrik' && 'ELEKTRİK SERVİS'}
                  {appointment.type === 'boya' && 'ARAÇ BOYAMA'}
                  {appointment.type === 'bakım' && 'PERİYODİK BAKIM'}
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

export default AppointmentsList; 