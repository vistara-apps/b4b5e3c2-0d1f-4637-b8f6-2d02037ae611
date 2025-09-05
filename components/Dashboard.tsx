'use client';

import { BarChart3, Users, MapPin, FileText, TrendingUp } from 'lucide-react';
import { SAMPLE_STATS } from '@/lib/constants';

export function Dashboard() {
  const stats = [
    {
      label: 'Total Recordings',
      value: SAMPLE_STATS.totalRecordings.toLocaleString(),
      icon: BarChart3,
      color: 'text-blue-400',
      change: '+12.3%'
    },
    {
      label: 'Active Users',
      value: SAMPLE_STATS.activeUsers.toLocaleString(),
      icon: Users,
      color: 'text-green-400',
      change: '+23.7%'
    },
    {
      label: 'States Supported',
      value: SAMPLE_STATS.statesSupported.toString(),
      icon: MapPin,
      color: 'text-purple-400',
      change: 'All 50'
    },
    {
      label: 'Scripts Available',
      value: SAMPLE_STATS.scriptsAvailable.toString(),
      icon: FileText,
      color: 'text-pink-400',
      change: 'Multi-lang'
    }
  ];

  const additionalStats = [
    {
      label: 'Incidents Recorded',
      value: SAMPLE_STATS.incidentsRecorded.toLocaleString(),
      icon: BarChart3,
      color: 'text-orange-400'
    },
    {
      label: 'Summaries Generated',
      value: SAMPLE_STATS.summariesGenerated.toLocaleString(),
      icon: FileText,
      color: 'text-cyan-400'
    },
    {
      label: 'Daily Rights Access',
      value: SAMPLE_STATS.rightsAccessedDaily.toLocaleString(),
      icon: Users,
      color: 'text-yellow-400'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <div className="text-xs text-green-400 font-medium">
                {stat.change}
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {additionalStats.map((stat, index) => (
          <div key={index} className="metric-card">
            <div className="flex items-center justify-between mb-2">
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
              <TrendingUp className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-xl font-bold text-white mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-300">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Growth Indicator */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-white mb-1">Monthly Growth</h3>
            <p className="text-sm text-gray-300">User engagement this month</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">
              +{SAMPLE_STATS.monthlyGrowth}%
            </div>
            <div className="text-sm text-gray-300">vs last month</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card p-4">
        <h3 className="font-medium text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <button className="btn-secondary text-sm py-3">
            View My Rights
          </button>
          <button className="btn-secondary text-sm py-3">
            Practice Scripts
          </button>
          <button className="btn-secondary text-sm py-3">
            Recent Incidents
          </button>
          <button className="btn-secondary text-sm py-3">
            Share App
          </button>
        </div>
      </div>
    </div>
  );
}
