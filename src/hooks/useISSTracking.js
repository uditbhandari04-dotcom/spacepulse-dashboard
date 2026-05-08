import { useState, useEffect, useRef, useCallback } from 'react';
import { getISSLocation, getNearestPlace } from '../services/issService';

export const useISSTracking = (pollingInterval = 10000) => {
  const [data, setData] = useState({
    current: null,
    history: [],
    speed: 0,
    altitude: 0,
    visibility: '',
    nearestPlace: 'Loading...',
    error: null,
    loading: true,
  });
  
  const timerRef = useRef(null);

  const fetchUpdate = useCallback(async () => {
    try {
      const location = await getISSLocation();
      const place = await getNearestPlace(location.latitude, location.longitude);
      
      setData(prev => {
        const newHistory = [...prev.history, location].slice(-30);
        
        return {
          current: location,
          history: newHistory,
          speed: location.velocity,
          altitude: location.altitude,
          visibility: location.visibility,
          nearestPlace: place,
          error: null,
          loading: false,
        };
      });
    } catch (err) {
      console.error('Fetch error:', err);
      setData(prev => ({ ...prev, error: 'Failed to fetch ISS telemetry', loading: false }));
    }
  }, []);

  useEffect(() => {
    fetchUpdate();
    timerRef.current = setInterval(fetchUpdate, pollingInterval);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [fetchUpdate, pollingInterval]);

  return { ...data, refresh: fetchUpdate };
};
