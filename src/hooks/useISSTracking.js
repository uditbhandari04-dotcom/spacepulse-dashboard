import { useState, useEffect, useRef, useCallback } from 'react';
import { getISSLocation, getNearestPlace } from '../services/issService';
import { calculateDistance, calculateSpeed } from '../utils/haversine';

export const useISSTracking = (pollingInterval = 15000) => {
  const [data, setData] = useState({
    current: null,
    history: [],
    speed: 0,
    nearestPlace: 'Loading...',
    error: null,
    loading: true,
  });
  
  const timerRef = useRef(null);
  const isFirstLoad = useRef(true);

  const fetchUpdate = useCallback(async () => {
    try {
      const location = await getISSLocation();
      const place = await getNearestPlace(location.latitude, location.longitude);
      
      setData(prev => {
        let speed = prev.speed;
        if (prev.current) {
          const dist = calculateDistance(
            prev.current.latitude, prev.current.longitude,
            location.latitude, location.longitude
          );
          const timeDiff = location.timestamp - prev.current.timestamp;
          speed = calculateSpeed(dist, timeDiff);
        }

        const newHistory = [...prev.history, location].slice(-15);
        
        return {
          current: location,
          history: newHistory,
          speed: speed > 0 ? speed : prev.speed, // Fallback to prev speed if calc fails
          nearestPlace: place,
          error: null,
          loading: false,
        };
      });
    } catch (err) {
      setData(prev => ({ ...prev, error: 'Failed to fetch ISS data', loading: false }));
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
