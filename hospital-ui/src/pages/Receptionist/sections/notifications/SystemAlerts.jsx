import React, { useState, useEffect } from 'react';
import { AlertTriangle, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const SystemAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSystemAlerts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/receptionist/notifications', {
          params: { type: 'System' }
        });

        setAlerts(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load system alerts");
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSystemAlerts();
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
        <AlertTriangle className="w-4 h-4 text-amber-600" />
        Global System Notifications
      </h3>

      {alerts.length > 0 ? (
        alerts.map((alert) => (
          <div 
            key={alert.id} 
            className="p-5 border border-amber-100 bg-amber-50 rounded-2xl text-sm flex gap-4 items-start hover:bg-amber-100 transition-all"
          >
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-bold text-amber-900">{alert.title}</p>
              <p className="text-amber-800 mt-2 leading-relaxed">{alert.message}</p>
              <p className="text-xs text-amber-700 mt-3">
                {new Date(alert.createdAt).toLocaleString('en-GB')}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-16 text-gray-400 border border-dashed border-gray-200 rounded-xl">
          No system-wide alerts at the moment.
        </div>
      )}
    </div>
  );
};

export default SystemAlerts;