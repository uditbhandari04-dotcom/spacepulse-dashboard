import React, { useState, useEffect } from 'react';
import { getAstronauts } from '../../services/issService';
import { Card } from '../Card';
import { Users, Rocket } from 'lucide-react';

export const Astronauts = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAstronauts()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="animate-pulse h-40 glass rounded-2xl" />;

  return (
    <div className="mt-12">
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-nasa-blue" />
        <h2 className="text-2xl font-bold">People in Space ({data?.number})</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data?.people.map((person, index) => (
          <Card key={index} delay={index * 0.1}>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-slate-100 dark:bg-white/10">
                <Rocket className="w-5 h-5 text-nasa-red" />
              </div>
              <div>
                <h4 className="font-bold">{person.name}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">{person.craft}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
