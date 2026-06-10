import React, { useState, useEffect } from 'react';
import { CreditCard, XCircle, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import api from '../../../../api/axios';

const PaymentAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPaymentAlerts = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await api.get('/receptionist/notifications', {
          params: { type: 'Payment' }
        });

        setAlerts(response.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load payment alerts");
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentAlerts();
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
        <CreditCard className="w-4 h-4 text-emerald-600" />
        Payment Transaction Alerts
      </h3>

      {alerts.length > 0 ? (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div 
              key={alert.id} 
              className="p-4 border border-gray-100 rounded-xl bg-gray-50 flex justify-between items-center hover:bg-gray-100 transition-all"
            >
              <div className="flex-1">
                <p className="font-bold text-gray-800">{alert.title}</p>
                {alert.message && (
                  <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                )}
                <p className="text-[10px] text-gray-500 mt-2">
                  {new Date(alert.createdAt).toLocaleDateString('en-GB')}
                </p>
              </div>

              <div>
                {alert.status === 'Success' || alert.status?.toLowerCase() === 'completed' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500" />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-400 border border-dashed border-gray-200 rounded-xl">
          No payment alerts at the moment.
        </div>
      )}
    </div>
  );
};

export default PaymentAlerts;