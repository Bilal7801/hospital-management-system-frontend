import React, { useState, useEffect } from 'react';
import { Stethoscope, AlertCircle, Loader2 } from 'lucide-react';
import api from '../../../../api/axios';

const ScheduleAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchScheduleAlerts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/receptionist/notifications', {
          params: { type: 'Schedule' }
        });

        setAlerts(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load schedule alerts");
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchScheduleAlerts();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 flex items-center justify-center min-h-[200px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
      <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
        <Stethoscope className="w-4 h-4 text-blue-600" />
        Doctor Schedule Change Alerts
      </h3>

      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <div 
            key={alert.id} 
            className="p-5 border border-rose-100 bg-rose-50 rounded-2xl text-sm flex gap-4 items-start hover:bg-rose-100 transition-all"
          >
            <AlertCircle className="w-6 h-6 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-rose-800">{alert.title}</p>
              <p className="text-rose-700 mt-1 leading-relaxed">{alert.message}</p>
              <p className="text-xs text-rose-600 mt-3">
                {new Date(alert.createdAt).toLocaleDateString('en-GB')} • {alert.priority || 'High'}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16 text-gray-400 border border-dashed border-gray-200 rounded-xl">
          No schedule change alerts at the moment.
        </div>
      )}
    </div>
  );
};

export default ScheduleAlerts;