import React from 'react';
import ServicesList from '../../components/Services/ServicesList';
import AppointmentsList from '../../components/Appointments/AppointmentsList';
import Calendar from '../../components/Calendar/Calendar';
import Notifications from '../../components/Notifications/Notifications';
import Requests from '../../components/Requests/Requests';
import DailyOperations from '../../components/DailyOperations/DailyOperations';
import './Dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="dashboard-left">
          <ServicesList />
          <Notifications />
          <Requests />
        </div>
        <div className="dashboard-right">
          <AppointmentsList />
          <Calendar />
          <DailyOperations />
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 