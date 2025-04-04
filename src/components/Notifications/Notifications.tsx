import React from 'react';
import './Notifications.css';

interface Notification {
  id: number;
  plate: string;
  model: string;
  message: string;
  date: string;
  status: string;
}

const Notifications: React.FC = () => {
  // Örnek veri
  const notifications: Notification[] = [
    { 
      id: 1, 
      plate: '34 ERS 7894', 
      model: 'BMW 5 SERIES', 
      message: '5 GÜN',
      date: '15-11-2024',
      status: 'şüpheli'
    },
    { 
      id: 2, 
      plate: '34 ABC 123', 
      model: 'LAND ROVER FREELANDER', 
      message: '14 GÜN',
      date: '27-11-2024',
      status: 'müşteri'
    },
  ];

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <h2>BİLDİRİMLER</h2>
      </div>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className={`notification-item ${notification.status}`}>
            <div className="notification-content">
              <div className="notification-vehicle">
                <div className="notification-plate">{notification.plate}</div>
                <div className="notification-model">{notification.model}</div>
              </div>
              <div className="notification-info">
                <div className="notification-date">{notification.date}</div>
                <div className="notification-message">{notification.message}</div>
              </div>
            </div>
            <div className="notification-actions">
              <button className="action-button">🔍</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications; 