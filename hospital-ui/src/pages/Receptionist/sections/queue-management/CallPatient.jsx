import React, { useState, useEffect, useCallback } from 'react';
import { Volume2, ChevronRight, AlertCircle, PlayCircle, Loader2, CheckCircle, UserCheck, LayoutDashboard, Bell } from 'lucide-react';
import api from '../../../../api/axios';

const CallPatient = () => {
  // Selection State
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState('');
  const [selectedDoctorName, setSelectedDoctorName] = useState('');

  // Main Data States aligned with your C# response structure
  const [currentServing, setCurrentServing] = useState(null);
  const [upNextList, setUpNextList] = useState([]);
  
  // Notifications
  const [notifications, setNotifications] = useState([]);

  // UI & Processing States
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);
  const [isActionPending, setIsActionPending] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });

  // 1. Fetch active doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setIsLoadingDoctors(true);
        const response = await api.get('/receptionist/queue-management/doctors');
        const doctorData = response.data || [];
        setDoctors(doctorData);
        
        if (doctorData.length > 0) {
          const firstDocId = doctorData[0].doctorId || doctorData[0].DoctorId;
          const firstDocName = doctorData[0].doctorName || doctorData[0].DoctorName;
          setSelectedDoctorId(firstDocId ? firstDocId.toString() : '');
          setSelectedDoctorName(firstDocName || '');
        }
      } catch (error) {
        console.error("Failed loading doctor directory for audio console:", error);
        setFeedback({ type: 'error', message: 'Could not load terminal desks directory.' });
      } finally {
        setIsLoadingDoctors(false);
      }
    };
    fetchDoctors();
  }, []);

  // 2. Core State Sync
  const fetchQueueState = useCallback(async (quietLoad = false) => {
    if (!selectedDoctorId) return;
    if (!quietLoad) setIsActionPending(true);

    try {
      const servingResponse = await api.get(`/receptionist/queue-management/current-serving/${selectedDoctorId}`);
      
      if (servingResponse.data && !servingResponse.data.message) {
        setCurrentServing(servingResponse.data);
      } else {
        setCurrentServing(null);
      }

      const queueResponse = await api.get('/receptionist/queue-management/live-queue');
      const allActiveTokens = queueResponse.data || [];

      const doctorWaitingPipeline = allActiveTokens.filter(item => {
        const itemDoc = item.doc || item.Doc;
        const itemState = item.state || item.State;
        return itemDoc === selectedDoctorName && itemState === "Waiting Room";
      });

      setUpNextList(doctorWaitingPipeline);
    } catch (error) {
      console.error("Queue state terminal sync failure:", error);
      if (!quietLoad) {
        setFeedback({
          type: 'error',
          message: 'Unable to stream data feeds from target terminal desk context.'
        });
      }
    } finally {
      setIsActionPending(false);
    }
  }, [selectedDoctorId, selectedDoctorName]);

  useEffect(() => {
    if (selectedDoctorId) {
      fetchQueueState(false);
    }
  }, [selectedDoctorId, fetchQueueState]);

  useEffect(() => {
    if (!selectedDoctorId) return;
    const interval = setInterval(() => fetchQueueState(true), 15000);
    return () => clearInterval(interval);
  }, [selectedDoctorId, fetchQueueState]);

  const handleDoctorChange = (e) => {
    const docId = e.target.value;
    setSelectedDoctorId(docId);
    const matched = doctors.find(d => (d.doctorId || d.DoctorId)?.toString() === docId);
    setSelectedDoctorName(matched ? (matched.doctorName || matched.DoctorName) : '');
    setCurrentServing(null);
    setUpNextList([]);
    setNotifications([]); 
  };

  // 3. Action: Progress Terminal Workflow
  const handleAdvanceQueue = async () => {
    if (!selectedDoctorId) return;
    
    setIsActionPending(true);
    setFeedback({ type: '', message: '' });

    try {
      const response = await api.post(`/receptionist/queue-management/call-next/${selectedDoctorId}`);
      const data = response.data;

      if (data.token) {
        setFeedback({
          type: 'success',
          message: `Dispatched successfully. Now calling Token Sequence: ${data.token}`
        });
        triggerVoiceAnnouncement(data.token, data.patient);
      } else {
        setFeedback({
          type: 'success',
          message: data.message || 'Pipeline complete. No remaining patients waiting.'
        });
      }
      
      // Small delay for smooth UX
      await new Promise(resolve => setTimeout(resolve, 800));
      await fetchQueueState(true);
    } catch (error) {
      const apiMessage = error.response?.data?.message || 'Pipeline sequence expansion error.';
      setFeedback({ type: 'error', message: apiMessage });
    } finally {
      setIsActionPending(false);
    }
  };

  // 4. Natural Voice Announcement
  const triggerVoiceAnnouncement = (token, patientName) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();

      let spokenToken = (token || 'TKN-000').toUpperCase();
      
      if (spokenToken.startsWith('TKN-')) {
        spokenToken = spokenToken.replace('TKN-', '');
        spokenToken = spokenToken.replace(/(\d)/g, (digit) => {
          const words = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
          return words[parseInt(digit)] + ' ';
        }).trim();
      }

      const announcementText = `Token Number ${spokenToken}, ${patientName || 'Patient'}, please proceed to the consultation room.`;
      
      const utterance = new SpeechSynthesisUtterance(announcementText);
      utterance.rate = 0.90;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRepeatAudio = () => {
    if (!currentServing) return;
    const tokenNum = currentServing.token || currentServing.Token;
    const patientName = currentServing.patient || currentServing.Patient;
    triggerVoiceAnnouncement(tokenNum, patientName);
    setFeedback({
      type: 'success',
      message: `Audio frequency cycle re-triggered locally for token ${tokenNum}.`
    });
  };

  if (isLoadingDoctors) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 shadow-sm flex flex-col items-center justify-center space-y-3">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Syncing Audio Console Desks Directory...</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Upper Terminal Desk Context Selection Board */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-50 rounded-lg text-blue-600 border border-blue-100">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-700">Active Terminal Console Target</h4>
            <p className="text-[11px] text-gray-400">Select the specific room station queue you want to manipulate</p>
          </div>
        </div>
        <div className="w-full sm:w-72">
          <select
            value={selectedDoctorId}
            onChange={handleDoctorChange}
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 bg-gray-50 text-gray-800 font-bold cursor-pointer transition-all"
          >
            {doctors.length === 0 && <option value="">No Active Stations Configured</option>}
            {doctors.map((doc) => {
              const dId = doc.doctorId || doc.DoctorId;
              const dName = doc.doctorName || doc.DoctorName;
              const deptName = doc.departmentName || doc.DepartmentName || 'General OPD';
              return (
                <option key={dId} value={dId}>
                  {dName} Terminal Desk — ({deptName})
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 space-y-2 max-h-52 overflow-y-auto">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-amber-100">
              <Bell className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium text-amber-800">{notif.message}</p>
                <p className="text-xs text-amber-600 mt-1">{notif.time}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Control Layout Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Terminal Deck Console Controller */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-gray-100 pb-3">
            <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-blue-600" />
              Live Desk Operator Audio Console
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">Control live terminal status tracks, dispatch audio alerts, and clear local queues</p>
          </div>

          {feedback.message && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 text-xs font-semibold tracking-wide ${
              feedback.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {feedback.type === 'success' ? <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />}
              <div>{feedback.message}</div>
            </div>
          )}

          {currentServing ? (
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 animate-fade-in">
              <div className="space-y-1">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-blue-600 bg-blue-100/60 border border-blue-200/50 px-2 py-0.5 rounded-md">
                  Actively Dispatched & Called Case
                </span>
                <h2 className="text-xl font-extrabold text-gray-800 flex items-center gap-2 mt-1">
                  <span className="text-blue-600">{currentServing.token || currentServing.Token}</span> — {currentServing.patient || currentServing.Patient}
                </h2>
                <p className="text-xs text-gray-500 font-semibold">
                  Practitioner Terminal Matrix: <span className="text-gray-700 font-bold">{currentServing.doc || currentServing.Doc}</span> | <span className="text-blue-600 font-bold">{currentServing.desk || currentServing.Desk}</span>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRepeatAudio}
                  disabled={isActionPending}
                  className="bg-blue-600 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer disabled:bg-blue-400"
                >
                  <PlayCircle className="w-3.5 h-3.5" /> Repeat Audio
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 border border-gray-200 border-dashed rounded-xl p-8 text-center space-y-2">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mx-auto text-gray-400">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-gray-700">Audio Desk Engine Idling</h4>
              <p className="text-[11px] text-gray-400 max-w-md mx-auto">
                No active token is currently being called at this terminal desk. Click the master advance button below to call the next patient.
              </p>
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-gray-100">
            <span className="text-[10px] text-gray-400 font-bold bg-gray-50 px-2 py-1 rounded border border-gray-200/60">
              * Note: Advancing automatically marks unreturned patients as Absent.
            </span>
            <button
              onClick={handleAdvanceQueue}
              disabled={isActionPending || upNextList.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs tracking-wide uppercase px-5 py-3 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center gap-2 cursor-pointer disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
            >
              {isActionPending ? (
                <>
                  Processing Core Channels... <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  Advance Terminal Workflow to Next Token
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sequential Upcoming Triage Pipeline Box */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5 border-b border-gray-100 pb-2.5">
              <AlertCircle className="w-4 h-4 text-blue-600" />
              Desk Pipeline Lineup ({upNextList.length})
            </h4>

            <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
              {upNextList.length === 0 ? (
                <p className="text-[11px] text-gray-400 font-medium text-center py-6">No patients waiting in desk buffer matrix.</p>
              ) : (
                upNextList.map((next, idx) => {
                  const tokenNum = next.token || next.Token;
                  const ptName = next.name || next.Name;
                  const waitTime = next.wait || next.Wait;
                  return (
                    <div key={idx} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors">
                      <div className="space-y-0.5">
                        <span className="text-xs font-bold text-blue-600 tracking-wide block">{tokenNum}</span>
                        <span className="text-xs font-bold text-gray-800 block truncate max-w-[130px]">{ptName}</span>
                      </div>
                      <span className="text-[9px] font-extrabold uppercase bg-white border border-gray-200 text-gray-400 px-2 py-0.5 rounded-md shadow-sm">
                        {waitTime} Wait
                      </span>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <p className="text-[10px] text-gray-400 font-semibold leading-normal pt-4 border-t border-gray-50 mt-4">
            This panel controls native speech synthesis streams and synchronizes digital signage channels in real time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CallPatient;