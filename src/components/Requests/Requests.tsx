import React from 'react';
import './Requests.css';

interface Request {
  id: number;
  name: string;
  date: string;
  time: string;
  type: string;
}

const Requests: React.FC = () => {
  // Örnek veri
  const requests: Request[] = [
    { 
      id: 1, 
      name: 'UFUK DEMİREL', 
      date: '09-11-2024',
      time: '17:20',
      type: 'silme'
    },
    { 
      id: 2, 
      name: 'UFUK DEMİREL', 
      date: '02-09-2024',
      time: '17:02',
      type: 'silme'
    },
    { 
      id: 3, 
      name: 'EDA', 
      date: '13-06-2024',
      time: '00:40',
      type: 'düzenleme'
    },
    { 
      id: 4, 
      name: 'EDA', 
      date: '12-06-2024',
      time: '15:26',
      type: 'silme'
    },
  ];

  return (
    <div className="requests-container">
      <div className="requests-header">
        <h2>TALEPLER</h2>
        <button className="talepler-button">GİDER EKLE</button>
      </div>
      <div className="requests-list">
        {requests.map((request) => (
          <div key={request.id} className="request-item">
            <div className="request-content">
              <div className="request-info">
                <div className="request-name">{request.name}</div>
                <div className="request-type">
                  <span className={`request-badge ${request.type}`}>
                    {request.type === 'silme' && 'SİLME TALEBİ'}
                    {request.type === 'düzenleme' && 'DÜZENLEME TALEBİ'}
                  </span>
                </div>
              </div>
              <div className="request-date">
                <div>{request.date}</div>
                <div className="time">{request.time}</div>
              </div>
            </div>
            <div className="request-actions">
              <button className="action-button">🔍</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests; 