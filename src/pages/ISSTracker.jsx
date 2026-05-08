import React from 'react';
import { useISSTracking } from '../hooks/useISSTracking';
import { ISSMap } from '../components/iss/ISSMap';
import { ISSStats } from '../components/iss/ISSStats';
import { Astronauts } from '../components/iss/Astronauts';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ISSTracker = () => {
  const { current, history, speed, nearestPlace, error, loading, refresh } = useISSTracking();

  if (loading && !current) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-nasa-blue border-t-nasa-red rounded-full animate-spin mb-4" />
        <p className="text-slate-500 animate-pulse">Establishing Satellite Connection...</p>
      </div>
    );
  }

  if (error && !current) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connection Lost</h2>
        <p className="text-slate-500 mb-6 max-w-md">{error}</p>
        <button 
          onClick={refresh}
          className="flex items-center gap-2 px-6 py-3 bg-nasa-blue text-white rounded-xl hover:bg-nasa-blue/90 transition-all shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          Reconnect to Station
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1400px] mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            ISS Live <span className="text-nasa-red">Tracking</span>
          </h1>
          <p className="text-slate-500 mt-2">Real-time telemetry and orbital path of the International Space Station.</p>
        </div>
        <button 
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/20 transition-all self-start md:self-center"
        >
          <RefreshCw className="w-4 h-4" />
          Force Sync
        </button>
      </div>

      <ISSStats 
        current={current} 
        speed={speed} 
        nearestPlace={nearestPlace} 
        historyCount={history.length} 
      />

      <div className="grid grid-cols-1 gap-8">
        <ISSMap current={current} history={history} />
      </div>

      <Astronauts />
    </motion.div>
  );
};

export default ISSTracker;
