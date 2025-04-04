import React from 'react';
import './DailyOperations.css';

interface Operation {
  id: number;
  title: string;
  type: string;
  note?: string;
}

const DailyOperations: React.FC = () => {
  // Örnek veri
  const operations: Operation[] = [
    { 
      id: 1, 
      title: 'TUTAR', 
      type: 'tutar',
      note: 'NOT'
    }
  ];

  return (
    <div className="operations-container">
      <div className="operations-header">
        <h2>GÜNLÜK İŞLETME GİDERLERİ</h2>
        <button className="gider-ekle-button">GİDER EKLE</button>
      </div>
      <div className="operations-table">
        <div className="operations-table-header">
          <div className="column-title">TUTAR</div>
          <div className="column-type">TÜR</div>
          <div className="column-note">NOT</div>
        </div>
        <div className="operations-table-body">
          {operations.map((operation) => (
            <div key={operation.id} className="operation-row">
              <div className="column-title">{operation.title}</div>
              <div className="column-type">{operation.type}</div>
              <div className="column-note">{operation.note}</div>
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

export default DailyOperations; 