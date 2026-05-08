import React from 'react';
import { useISSTracking } from '../hooks/useISSTracking';
import { ISSMap } from '../components/iss/ISSMap';
import { ISSStats } from '../components/iss/ISSStats';
import { Astronauts } from '../components/iss/Astronauts';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ISSTracker = () => {
  const { current, history, speed, nearestPlace, altitude, visibility, error, loading, refresh } = useISSTracking();

  if (loading && !current) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-nasa-blue border-t-nasa-red rounded-full animate-spin mb-4" />
        <p className="text-slate-500 animate-pulse font-bold tracking-widest uppercase text-xs">Securing Satellite Uplink...</p>
      </div>
    );
  }

  if (error && !current) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Uplink Failed</h2>
        <p className="text-slate-500 mb-6 max-w-md">{error}</p>
        <button 
          onClick={refresh}
          className="flex items-center gap-2 px-6 py-3 bg-nasa-blue text-white rounded-xl hover:bg-nasa-blue/90 transition-all shadow-lg font-bold"
        >
          <RefreshCw className="w-5 h-5" />
          Retry Connection
        </button>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1600px] mx-auto px-4 py-8"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase">
            ISS Live <span className="text-nasa-red underline decoration-4 underline-offset-8">Tracking</span>
          </h1>
          <p className="text-slate-500 mt-4 font-medium italic">Mission Elapsed Time: {Math.floor(Date.now()/1000 - 910600000)}s (est)</p>
        </div>
        <button 
          onClick={refresh}
          className="flex items-center gap-2 px-4 py-2 glass rounded-xl hover:bg-white/20 transition-all self-start md:self-center font-bold text-xs uppercase tracking-tighter"
        >
          <RefreshCw className="w-4 h-4" />
          Manual Sync
        </button>
      </div>

      <ISSStats 
        current={current} 
        speed={speed} 
        nearestPlace={nearestPlace} 
        historyCount={history.length}
        altitude={altitude}
        visibility={visibility}
      />

      <div className="grid grid-cols-1 gap-8">
        <ISSMap current={current} history={history} />
      </div>

      <Astronauts />
    </motion.div>
  );
};

export default ISSTracker;
