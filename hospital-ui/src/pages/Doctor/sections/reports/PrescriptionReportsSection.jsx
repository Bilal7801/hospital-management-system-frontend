import React, { useState, useEffect } from 'react';
import { BarChart4, Loader2 } from 'lucide-react';
import api from '../../../../api/axios';

const PrescriptionReportsSection = () => {
  const [topMedications, setTopMedications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper function to process, aggregate, and sort medications safely
  const processAndAggregateData = (rawData) => {
    const frequencyMap = {};
    
    // Defensive check: Ensure rawData is always handled as an array
    const dataArray = Array.isArray(rawData) ? rawData : [];

    dataArray.forEach((item) => {
      if (!item || !item.drug) return;

      // Safely parse tracking volume to a real number, fallback to 1 if missing/invalid
      const itemVolume = Number(item.trackingVolume);
      const volumeToAdd = isNaN(itemVolume) ? 1 : itemVolume;

      try {
        const parsed = JSON.parse(item.drug);
        if (Array.isArray(parsed)) {
          parsed.forEach((med) => {
            const rawName = med.MedicineName?.trim();
            if (!rawName) return;

            const normalizedKey = rawName.toLowerCase();

            if (!frequencyMap[normalizedKey]) {
              frequencyMap[normalizedKey] = {
                drugName: rawName,
                count: 0,
                classification: item.class || 'N/A'
              };
            }
            frequencyMap[normalizedKey].count += volumeToAdd;
          });
        }
      } catch (e) {
        // Fallback if the database record contains a plain text name instead of a JSON array
        const rawName = item.drug.trim();
        if (rawName) {
          const normalizedKey = rawName.toLowerCase();
          if (!frequencyMap[normalizedKey]) {
            frequencyMap[normalizedKey] = {
              drugName: rawName,
              count: 0,
              classification: item.class || 'N/A'
            };
          }
          frequencyMap[normalizedKey].count += volumeToAdd;
        }
      }
    });

    // Convert aggregated map to a sorted array (highest counts first)
    return Object.values(frequencyMap)
      .sort((a, b) => b.count - a.count)
      .map((med, index) => ({
        rank: `#${index + 1}`,
        drug: med.drugName,
        class: med.classification,
        trackingVolume: med.count ?? 0, // Fallback to 0 if count is missing
        trend: index === 0 ? 'Spike (Top Choice)' : 'Stable'
      }));
  };

  // Fetch and aggregate prescription data
  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        setLoading(true);
        const res = await api.get('/doctor/reports/prescriptions');
        
        // Aggregate duplicates and sort before setting state
        const aggregatedData = processAndAggregateData(res.data.data || []);
        setTopMedications(aggregatedData);
      } catch (err) {
        console.error("Failed to load prescriptions", err);
        // Fallback mock data with duplicates to test the aggregation locally if server fails
        const mockRawData = [
          { drug: '[{"MedicineName":"tiday 5mg"}]', class: 'Antidiabetic', trackingVolume: 10 },
          { drug: '[{"MedicineName":"tiday 5mg"}]', class: 'Antidiabetic', trackingVolume: 15 },
          { drug: '[{"MedicineName":"amoxillian 500mg"}]', class: 'Antibiotic', trackingVolume: 8 },
          { drug: '[{"MedicineName":"tiday 10mg"}]', class: 'Antidiabetic', trackingVolume: 5 },
          { drug: '[{"MedicineName":"amoxillian 500mg"}]', class: 'Antibiotic', trackingVolume: 12 },
        ];
        setTopMedications(processAndAggregateData(mockRawData));
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-50 text-purple-700 rounded-lg">
            <BarChart4 className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Pharmaceutical Distribution Analytics</h4>
            <p className="text-[11px] text-gray-400 font-medium">Tracking aggregated drug patterns across clinic prescriptions.</p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topMedications.map((item, index) => (
            <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col justify-between gap-4">
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md">
                  {item.rank} Most Prescribed
                </span>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                  item.trend?.includes('Spike') ? 'bg-amber-50 text-amber-700 border-amber-100 animate-pulse' : 'bg-gray-50 text-gray-400 border-gray-100'
                }`}>
                  {item.trend}
                </span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm capitalize">{item.drug}</h4>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">
                  Classification Subclass: <strong className="text-gray-600 font-semibold">{item.class}</strong>
                </p>
              </div>
              <div className="border-t pt-2 mt-2 flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>System Dispensations:</span>
                <strong className="text-gray-900 font-bold">
                  {/* (item.trackingVolume ?? 0) acts as an absolute shield against undefined properties */}
                  {(item.trackingVolume ?? 0).toLocaleString()} units
                </strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionReportsSection;