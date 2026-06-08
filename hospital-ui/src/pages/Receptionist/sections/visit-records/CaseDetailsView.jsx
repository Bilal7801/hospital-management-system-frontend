import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, FileText, Calendar, User, ShieldCheck, 
  FileSpreadsheet, Loader2, AlertCircle, Eye, Download, X 
} from 'lucide-react';
import api from '../../../../api/axios';

const CaseDetailsView = ({ caseId, onBack }) => {
  const [caseData, setCaseData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State to manage the blurred preview modal overlay
  const [previewFile, setPreviewFile] = useState(null); 
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    if (!caseId) return;

    const fetchCaseDetails = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/receptionist/visit-records/case/${caseId}`);
        const data = response.data.data || response.data;
        setCaseData(data);
      } catch (err) {
        console.error("Error loading case details:", err);
        setError("Failed to load case details. Please check your connection or backend server.");
      } finally {
        setLoading(false);
      }
    };

    fetchCaseDetails();
  }, [caseId]);

  // Point URLs to C# backend host (Port 7203) instead of your React frontend host
  const getFullUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    
    const apiBase = api.defaults.baseURL || 'https://localhost:7203';
    const backendHost = apiBase.replace(/\/api\/?$/, ''); 
    
    let cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${backendHost}${cleanPath}`;
  };

  // Open the document inside our blurred viewport overlay state
  const handleOpenPreview = (doc) => {
    if (!doc.filePath) {
      alert("No file path available for preview");
      return;
    }
    const fileUrl = getFullUrl(doc.filePath);
    const isImage = ['PNG', 'JPG', 'JPEG', 'GIF', 'WEBP'].includes(doc.fileType?.toUpperCase());
    
    setPreviewFile({
      url: fileUrl,
      name: doc.fileName,
      isImage: isImage,
      type: doc.fileType
    });
  };

  // Modern cross-origin safe Blob file downloader
  const handleDownload = async (doc) => {
    if (!doc.filePath) return;
    
    try {
      setDownloadingId(doc.id || doc.fileName);
      const url = getFullUrl(doc.filePath);
      
      // Fetch data stream directly bypassing standard cross-origin download blockades
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response error during download");
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = doc.fileName || 'medical-document';
      
      document.body.appendChild(link);
      link.click();
      
      // Clean up memory space
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error("Direct download failed, falling back to window stream:", err);
      window.open(getFullUrl(doc.filePath), '_blank');
    } finally {
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-12 flex flex-col items-center justify-center min-h-[400px] space-y-3">
        <Loader2 className="w-9 h-9 animate-spin text-blue-600" />
        <p className="text-sm font-medium text-slate-500">Retrieving case records...</p>
      </div>
    );
  }

  if (error || !caseData) {
    return (
      <div className="bg-white rounded-xl border border-slate-200/80 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
        <div className="p-3 bg-red-50 rounded-full text-red-600 mb-3">
          <AlertCircle className="w-6 h-6" />
        </div>
        <p className="font-semibold text-slate-900">{error || "Case file not found"}</p>
        <button 
          onClick={onBack} 
          className="mt-4 px-4 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors text-sm cursor-pointer"
        >
          ← Go Back to Records
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 space-y-6 text-slate-800 relative">
      
      {/* Upper Navigation Header */}
      <div className="border-b border-slate-100 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack} 
            className="p-2 text-slate-500 hover:bg-slate-50 hover:text-slate-900 rounded-xl transition-colors border border-slate-200/40 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h3 className="font-bold text-lg text-slate-900 tracking-tight">Case Overview</h3>
            <p className="text-xs text-slate-400 font-medium">Record ID: #{caseData.noteId || caseId}</p>
          </div>
        </div>
      </div>

      {/* Metadata Metrics Block */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm bg-slate-50/70 p-5 rounded-2xl border border-slate-100">
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Patient</span>
          <span className="font-bold text-slate-800 flex items-center gap-1.5">
            <User className="w-4 h-4 text-slate-400" /> {caseData.patientName}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Assigned Practitioner</span>
          <span className="font-semibold text-slate-700">
            {caseData.doctorName ? `Dr. ${caseData.doctorName}` : 'Unassigned'}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Encounter Date</span>
          <span className="font-semibold text-slate-700 flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-slate-400" />
            {new Date(caseData.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
          </span>
        </div>
        <div className="space-y-0.5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Classification</span>
          <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-md bg-blue-50 text-blue-700 border border-blue-100 table-cell capitalize">
            {caseData.noteType || 'General Consultation'}
          </span>
        </div>
      </div>

      {/* Clinical Notes Summary Container */}
      <div className="border border-slate-200/70 rounded-2xl p-5 bg-white shadow-sm space-y-2">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          Clinical Encounter Notes
        </h4>
        <p className="text-slate-600 text-sm whitespace-pre-wrap leading-relaxed bg-slate-50/40 p-4 rounded-xl border border-slate-100">
          {caseData.noteText || "No note entries registered for this instance."}
        </p>
      </div>

      {/* Attachments Section */}
      <div className="border border-slate-200/70 rounded-2xl p-5 bg-white shadow-sm space-y-4">
        <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Validated Medical Artifacts & Uploads
        </h4>
        
        {caseData.documents && caseData.documents.length > 0 ? (
          <div className="space-y-3">
            {caseData.documents.map((doc, idx) => {
              const isImage = ['PNG', 'JPG', 'JPEG', 'GIF', 'WEBP'].includes(doc.fileType?.toUpperCase());

              return (
                <div key={idx} className="flex flex-col sm:flex-row justify-between sm:items-center p-4 bg-white border border-slate-200/80 rounded-xl gap-4 hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-3.5">
                    
                    {/* Visual Thumbnails */}
                    {isImage ? (
                      <img 
                        src={getFullUrl(doc.filePath)} 
                        alt={doc.fileName} 
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 bg-slate-50 shadow-sm shrink-0"
                        onError={(e) => { 
                          e.target.onerror = null; 
                          e.target.src = "https://placehold.co/48?text=Image"; 
                        }} 
                      />
                    ) : (
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                        <FileSpreadsheet className="w-6 h-6" />
                      </div>
                    )}

                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate max-w-xs md:max-w-md">{doc.fileName}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-400 font-medium">{doc.documentType || 'Attachment'}</span>
                        <span className="text-[10px] px-1.5 py-0.2 bg-slate-100 rounded font-bold text-slate-500 uppercase">{doc.fileType}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Panel */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button 
                      onClick={() => handleOpenPreview(doc)}
                      className="px-4 py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg flex items-center gap-1.5 hover:bg-slate-50 transition-colors text-xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" /> View
                    </button>
                    <button 
                      onClick={() => handleDownload(doc)}
                      disabled={downloadingId === (doc.id || doc.fileName)}
                      className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg flex items-center gap-1.5 hover:bg-blue-700 transition-colors text-xs shadow-sm disabled:opacity-50 cursor-pointer"
                    >
                      {downloadingId === (doc.id || doc.fileName) ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Download className="w-3.5 h-3.5" />
                      )}
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-10 border border-dashed border-slate-200 rounded-xl bg-slate-50/30">
            <p className="text-sm text-slate-400 font-medium">No external source files attached to this case record.</p>
          </div>
        )}
      </div>

      {/* Modern Blur screen Viewer Modal Overlay */}
      {previewFile && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          
          {/* Modal Header Controls Bar */}
          <div className="w-full max-w-4xl bg-slate-900 text-white px-5 py-3 rounded-t-2xl flex items-center justify-between border-b border-slate-800 shadow-xl">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Document Preview</p>
              <p className="text-sm font-bold truncate text-slate-200">{previewFile.name}</p>
            </div>
            
            {/* Dedicated Exit/Back Button */}
            <button 
              onClick={() => setPreviewFile(null)}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg border border-slate-700/60 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" /> Back to Case
            </button>
          </div>

          {/* Modal Asset Viewport Surface */}
          <div className="w-full max-w-4xl bg-slate-900/40 border-x border-b border-slate-800/80 p-4 sm:p-6 rounded-b-2xl flex items-center justify-center min-h-[300px] max-h-[80vh] overflow-y-auto shadow-2xl">
            {previewFile.isImage ? (
              <img 
                src={previewFile.url} 
                alt={previewFile.name} 
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md border border-slate-800/40 bg-slate-950/20"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-center p-8 text-white max-w-sm">
                <div className="p-4 bg-slate-800 rounded-2xl text-blue-400 mb-4 border border-slate-700/50">
                  <FileSpreadsheet className="w-12 h-12" />
                </div>
                <h5 className="font-bold text-base mb-1">Non-Image Asset File Type ({previewFile.type})</h5>
                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  This document type cannot be directly previewed inside the browser canvas window.
                </p>
                <a 
                  href={previewFile.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="w-full py-2 bg-blue-600 text-white rounded-lg text-xs font-bold hover:bg-blue-700 transition-colors block shadow-md"
                >
                  Open in New Tab Window
                </a>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default CaseDetailsView;