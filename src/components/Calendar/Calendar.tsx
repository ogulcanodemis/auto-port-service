import React, { useState } from 'react';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [currentMonth] = useState('KASIM');
  const [currentYear] = useState(2024);
  
  // Demo olarak sabit günler
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const weekdays = ['PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT', 'PZR'];

  // 9 günlük bir aralık
  const startDay = 4;
  const visibleDays = days.slice(startDay - 1, startDay + 8);
  
  // Aktif gün olarak 9 (örnek)
  const activeDay = 9;
  
  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <h2>TAKVİM</h2>
        <div className="month-navigation">
          <button className="month-nav-button">◀</button>
          <div className="current-month">
            {currentMonth} {currentYear}
          </div>
          <button className="month-nav-button">▶</button>
        </div>
      </div>
      <div className="calendar-body">
        <div className="calendar-days">
          <div className="week-days">
            {weekdays.map((day, index) => (
              <div key={index} className="week-day">{day}</div>
            ))}
          </div>
          <div className="month-days">
            {visibleDays.map((day) => (
              <div 
                key={day} 
                className={`day-cell ${day === activeDay ? 'active' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="not-ekle-button">
        <button>NOT EKLE</button>
      </div>
    </div>
  );
};

export default Calendar; 