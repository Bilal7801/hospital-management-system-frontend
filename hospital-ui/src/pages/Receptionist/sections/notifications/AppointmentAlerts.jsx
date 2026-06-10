import React, { useState, useEffect } from 'react';
import { CalendarClock, CheckCircle, Clock, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const AppointmentAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/receptionist/notifications', {
          params: { type: 'Appointment' }   // Filter only Appointment alerts
        });

        setAlerts(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load appointment alerts");
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center text-red-600">
        <AlertCircle className="w-8 h-8 mx-auto mb-3" />
        {error}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-blue-600" />
        Upcoming Appointment Reminders
      </h3>

      {alerts.length > 0 ? (
        alerts.map(alert => (
          <div key={alert.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all">
            <div className="flex-1">
              <p className="font-bold text-gray-800">{alert.patientName || 'Unknown Patient'}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} 
                • {alert.alertType}
              </p>
              {alert.message && (
                <p className="text-xs text-gray-600 mt-2 line-clamp-2">{alert.message}</p>
              )}
            </div>

            <div className="flex flex-col items-end">
              <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                alert.status === 'Sent' || alert.status === 'Read' 
                  ? 'bg-emerald-100 text-emerald-700' 
                  : 'bg-amber-100 text-amber-700'
              }`}>
                {alert.status || 'Pending'}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-12 text-gray-400">
          No appointment alerts at the moment.
        </div>
      )}
    </div>
  );
};

export default AppointmentAlerts;