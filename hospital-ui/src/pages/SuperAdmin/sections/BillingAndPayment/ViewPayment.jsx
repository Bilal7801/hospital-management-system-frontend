import React, { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  DollarSign,
  Calendar,
  User,
  Stethoscope,
  Building2,
  CreditCard,
  FileText,
  BadgeCheck,
} from 'lucide-react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import api from '../../../../api/axios';

const ViewPayment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const normalizePayment = (data) => {
    if (!data) return null;

    return {
      id: data.id ?? '-',
      patientName: data.patientName ,
      patientId: data.patientId ,
      doctorName: data.doctorName || data.doctor || '-',
      doctorId: data.doctorId ?? data.doctor?.id ?? '-',
      departmentName: data.departmentName || data.department || '-',
      departmentId: data.departmentId ?? data.department?.id ?? '-',
      amount:
        typeof data.amount === 'number'
          ? data.amount
          : Number(String(data.amount || '0').replace(/[^0-9.-]+/g, '')) || 0,
      paymentMethod: data.paymentMethod || data.method || '-',
      paymentDate: data.paymentDate || data.date || '-',
      status: data.status || '-',
      notes: data.notes || '-',
      appointmentId: data.appointmentId ?? '-',
    };
  };

  useEffect(() => {
    const fetchPayment = async () => {
      try {
        setLoading(true);
        setError('');

        let merged = null;

        if (location.state) {
          merged = normalizePayment(location.state);
        }

        if (!merged || !merged.patientName || merged.patientName === '-') {
          const res = await api.get(`/superadmin/billing/payments/${id}`);
          merged = normalizePayment(res.data);
        }

        setPayment(merged);
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            err?.response?.data ||
            'Failed to load payment details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
  }, [id, location.state]);

  const formatDate = (value) => {
    if (!value || value === '-') return '-';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleString();
  };

  const formatCurrency = (value) => {
    const numberValue = Number(value || 0);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
    }).format(numberValue);
  };

  const getStatusClasses = (status) => {
    if (status === 'Completed') {
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    }
    if (status === 'Pending') {
      return 'bg-orange-50 text-orange-600 border-orange-100';
    }
    if (status === 'Refunded') {
      return 'bg-red-50 text-red-600 border-red-100';
    }
    return 'bg-gray-100 text-gray-600 border-gray-200';
  };

  if (loading) {
    return (
      <div className="p-6 max-w-5xl mx-auto min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-gray-500 text-sm font-semibold">
          <Loader2 className="w-5 h-5 animate-spin" />
          Loading payment details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto min-h-screen">
        <button
          onClick={() => navigate('/dashboard/billing/payments')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payments
        </button>

        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="p-6 max-w-5xl mx-auto min-h-screen">
        <button
          onClick={() => navigate('/dashboard/billing/payments')}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Payments
        </button>

        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-500">
          No payment found.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto min-h-screen">
      <button
        onClick={() => navigate('/dashboard/billing/payments')}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 cursor-pointer mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Payments
      </button>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payment Details</h2>
          <p className="text-sm text-gray-400 mt-1">
            View full transaction information
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${getStatusClasses(
            payment.status
          )}`}
        >
          <BadgeCheck className="w-4 h-4" />
          {payment.status || '-'}
        </span>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-3 rounded-xl">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Patient
              </p>
              <p className="text-base font-bold text-gray-900 mt-1">
                {payment.patientName}
              </p>
              <p className="text-sm text-gray-500">ID: {payment.patientId}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-green-50 p-3 rounded-xl">
              <Stethoscope className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Doctor
              </p>
              <p className="text-base font-bold text-gray-900 mt-1">
                {payment.doctorName}
              </p>
              <p className="text-sm text-gray-500">ID: {payment.doctorId}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="bg-purple-50 p-3 rounded-xl">
              <Building2 className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Department
              </p>
              <p className="text-base font-bold text-gray-900 mt-1">
                {payment.departmentName}
              </p>
              <p className="text-sm text-gray-500">ID: {payment.departmentId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-5">
            Payment Information
          </h3>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <DollarSign className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Amount
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {formatCurrency(payment.amount)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <CreditCard className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Payment Method
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {payment.paymentMethod}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <Calendar className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Payment Date
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  {formatDate(payment.paymentDate)}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-gray-50 p-2 rounded-lg">
                <FileText className="w-4 h-4 text-gray-500" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                  Notes
                </p>
                <p className="text-sm text-gray-700 mt-1 leading-6">
                  {payment.notes || 'No notes available.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-5">
            Transaction Reference
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Payment ID
              </p>
              <p className="text-sm font-bold text-gray-900 mt-1">{payment.id}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Appointment ID
              </p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {payment.appointmentId}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wider text-gray-400 font-semibold">
                Current Status
              </p>
              <p className="text-sm font-bold text-gray-900 mt-1">
                {payment.status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPayment;