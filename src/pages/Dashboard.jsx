import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../components/Card';
import { Rocket, Satellite, Globe, Users } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="max-w-[1400px] mx-auto">
      <header className="mb-12">
        <motion.h1 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-5xl font-black tracking-tighter uppercase"
        >
          Commander <span className="text-nasa-red">Dashboard</span>
        </motion.h1>
        <p className="text-slate-500 mt-2 text-lg">Welcome back, Captain. Systems are operational.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: Satellite, label: 'Active Satellites', value: '4,281', color: 'bg-blue-500' },
          { icon: Rocket, label: 'Current Missions', value: '12', color: 'bg-orange-500' },
          { icon: Users, label: 'Personnel in Space', value: '7', color: 'bg-emerald-500' },
          { icon: Globe, label: 'Ground Stations', value: '24', color: 'bg-purple-500' },
        ].map((stat, i) => (
          <Card key={i} delay={i * 0.1}>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                <h3 className="text-2xl font-black mt-1">{stat.value}</h3>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 min-h-[400px]">
          <h2 className="text-xl font-bold mb-6">Mission Telemetry</h2>
          <div className="flex items-center justify-center h-64 border-2 border-dashed border-white/10 rounded-2xl">
            <p className="text-slate-400">Telemetry Feed Initializing...</p>
          </div>
        </Card>
        
        <div className="space-y-8">
          <Card>
            <h2 className="text-xl font-bold mb-4">Launch Schedule</h2>
            <div className="space-y-4">
              {[
                { name: 'Artemis II', date: 'Sept 2025', status: 'On Track' },
                { name: 'SpaceX Crew-9', date: 'Aug 2024', status: 'Pre-flight' }
              ].map((launch, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5">
                  <div>
                    <p className="font-bold">{launch.name}</p>
                    <p className="text-xs text-slate-500">{launch.date}</p>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/20 text-emerald-500 rounded-full uppercase">
                    {launch.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-nasa-blue text-white overflow-hidden relative">
            <div className="relative z-10">
              <h2 className="text-xl font-bold mb-2">Solar Flare Alert</h2>
              <p className="text-sm opacity-80 mb-4">Class X flare detected in Region 3664. Monitor radiation levels.</p>
              <button className="px-4 py-2 bg-white text-nasa-blue rounded-lg text-xs font-bold uppercase tracking-wider">
                View Report
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
