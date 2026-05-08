import React from 'react';
import { Card } from '../Card';
import { Navigation, Compass, MapPin, Zap, Clock, Activity } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, subvalue, colorClass }) => (
  <Card className="flex items-start gap-4">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div>
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">{label}</p>
      <h3 className="text-xl font-bold mt-1">{value}</h3>
      {subvalue && <p className="text-xs text-slate-400 mt-1">{subvalue}</p>}
    </div>
  </Card>
);

export const ISSStats = ({ current, speed, nearestPlace, historyCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard 
        icon={Navigation}
        label="Current Position"
        value={`${current?.latitude.toFixed(2)}°, ${current?.longitude.toFixed(2)}°`}
        subvalue="Latitude / Longitude"
        colorClass="bg-blue-500"
      />
      <StatCard 
        icon={Zap}
        label="Current Speed"
        value={`${Math.round(speed || 27600).toLocaleString()} km/h`}
        subvalue="Calculated Velocity"
        colorClass="bg-orange-500"
      />
      <StatCard 
        icon={MapPin}
        label="Nearest Location"
        value={nearestPlace}
        subvalue="Reverse Geocoded"
        colorClass="bg-emerald-500"
      />
      <StatCard 
        icon={Activity}
        label="Tracking Status"
        value="Live Polling"
        subvalue={`Buffer: ${historyCount} positions`}
        colorClass="bg-purple-500"
      />
      <StatCard 
        icon={Clock}
        label="Last Update"
        value={current ? new Date(current.timestamp * 1000).toLocaleTimeString() : '---'}
        subvalue="Satellite Time"
        colorClass="bg-indigo-500"
      />
      <StatCard 
        icon={Compass}
        label="Orbit Path"
        value="Low Earth Orbit"
        subvalue="Altitude ~408 km"
        colorClass="bg-rose-500"
      />
    </div>
  );
};
