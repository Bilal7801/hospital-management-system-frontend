import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, KeyRound, ArrowRight, Loader2 } from 'lucide-react';
import api from '../../api/axios'; // Import your axios instance

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Calling your .NET backend endpoint
      await api.post('/Auth/forgot-password', { email });
      setIsSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[450px] bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden transition-all">
        
        {/* Header Section */}
        <div className="pt-10 pb-6 px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-2xl mb-4 border border-blue-200">
            <KeyRound className="text-blue-600 w-8 h-8" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
            {isSubmitted ? "Check your email" : "Forgot Password?"}
          </h2>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed px-4">
            {isSubmitted 
              ? `We've sent a password reset link to ${email}. Please check your inbox.`
              : "Enter your email address and we'll send you a link to reset your password."
            }
          </p>
        </div>

        <div className="p-8 pt-2">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
              {error}
            </div>
          )}

          {!isSubmitted ? (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                    placeholder="name@hospital.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-200/50 group cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send Reset Link
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setIsSubmitted(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Didn't receive email? Try again
              </button>
            </div>  
          )}

          {/* Back to Login Link */}
          <button 
            onClick={() => navigate('/')}
            className="w-full mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Sign In
          </button>
        </div>

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200 text-center">
          <p className="text-xs text-gray-400 uppercase tracking-widest font-medium">
            HMS Security Protocol
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;