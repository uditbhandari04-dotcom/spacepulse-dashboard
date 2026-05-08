import React from 'react';
import { Card } from '../Card';
import { Navigation, Compass, MapPin, Zap, Clock, Activity, CloudSun, ArrowUp } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, subvalue, colorClass }) => (
  <Card className="flex items-start gap-4">
    <div className={`p-3 rounded-xl ${colorClass}`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider truncate">{label}</p>
      <h3 className="text-xl font-bold mt-1 truncate">{value}</h3>
      {subvalue && <p className="text-xs text-slate-400 mt-1 truncate">{subvalue}</p>}
    </div>
  </Card>
);

export const ISSStats = ({ current, speed, nearestPlace, historyCount, altitude, visibility }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        icon={Navigation}
        label="Current Coordinates"
        value={`${current?.latitude.toFixed(2)}°, ${current?.longitude.toFixed(2)}°`}
        subvalue="Lat / Lon"
        colorClass="bg-blue-500"
      />
      <StatCard 
        icon={Zap}
        label="Orbital Velocity"
        value={`${Math.round(speed || 27600).toLocaleString()} km/h`}
        subvalue="Live Telemetry"
        colorClass="bg-orange-500"
      />
      <StatCard 
        icon={ArrowUp}
        label="Altitude"
        value={`${Math.round(altitude || 408).toFixed(1)} km`}
        subvalue="Above Sea Level"
        colorClass="bg-emerald-500"
      />
      <StatCard 
        icon={CloudSun}
        label="Visibility"
        value={visibility === 'day' ? 'Daylight' : 'Eclipsed'}
        subvalue="Current Phase"
        colorClass="bg-purple-500"
      />
      <StatCard 
        icon={MapPin}
        label="Nearest Location"
        value={nearestPlace}
        subvalue="Geocoded"
        colorClass="bg-rose-500"
      />
      <StatCard 
        icon={Activity}
        label="Station Health"
        value="Operational"
        subvalue={`Sync: ${historyCount}pts`}
        colorClass="bg-indigo-500"
      />
      <StatCard 
        icon={Clock}
        label="Last Sync"
        value={current ? new Date(current.timestamp * 1000).toLocaleTimeString() : '---'}
        subvalue="Satellite UTC"
        colorClass="bg-slate-700"
      />
      <StatCard 
        icon={Compass}
        label="Orbit Path"
        value="Low Earth Orbit"
        subvalue="Inclination 51.6°"
        colorClass="bg-cyan-600"
      />
    </div>
  );
};
