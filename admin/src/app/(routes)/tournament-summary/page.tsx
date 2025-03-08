'use client';

import React from 'react';

export default function TournamentSummaryPage() {
  const tournaments = [
    {
      id: 1,
      name: 'Spring Championship 2024',
      date: '2024-03-15',
      status: 'Active',
      players: 32,
      prizePool: 5000,
      winner: 'John Doe',
      standings: [
        { position: 1, player: 'John Doe', points: 245, wins: 5, losses: 1 },
        { position: 2, player: 'Jane Smith', points: 238, wins: 4, losses: 2 },
        { position: 3, player: 'Mike Johnson', points: 232, wins: 4, losses: 2 },
        { position: 4, player: 'Sarah Williams', points: 228, wins: 3, losses: 3 },
        { position: 5, player: 'David Brown', points: 225, wins: 3, losses: 3 },
      ],
    },
    // Add more tournaments as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Tournament Summary</h1>
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Create Tournament
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Export Results
          </button>
        </div>
      </div>

      {/* Tournament Filters */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Tournament Status</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>All Tournaments</option>
              <option>Active</option>
              <option>Completed</option>
              <option>Upcoming</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Date Range</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>All Time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Prize Pool</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>All Prize Pools</option>
              <option>$1,000 - $5,000</option>
              <option>$5,000 - $10,000</option>
              <option>$10,000+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Tournament List */}
      <div className="space-y-6">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="bg-white rounded-lg shadow">
            {/* Tournament Header */}
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{tournament.name}</h3>
                  <p className="text-sm text-gray-500">Date: {tournament.date}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    tournament.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {tournament.status}
                  </span>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{tournament.players} Players</p>
                    <p className="text-sm text-gray-500">Prize Pool: ${tournament.prizePool}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tournament Standings */}
            <div className="p-6">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Current Standings</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wins</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Losses</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tournament.standings.map((standing) => (
                      <tr key={standing.position}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{standing.position}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {standing.player}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {standing.points}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                          {standing.wins}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                          {standing.losses}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Tournament Actions */}
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="flex justify-end space-x-4">
                <button className="text-sm text-blue-600 hover:text-blue-900">View Details</button>
                <button className="text-sm text-green-600 hover:text-green-900">Edit Tournament</button>
                <button className="text-sm text-red-600 hover:text-red-900">End Tournament</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tournament Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tournament Overview</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Tournaments</span>
              <span className="text-sm font-medium text-gray-900">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Active Tournaments</span>
              <span className="text-sm font-medium text-green-600">3</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Completed Tournaments</span>
              <span className="text-sm font-medium text-blue-600">8</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Upcoming Tournaments</span>
              <span className="text-sm font-medium text-purple-600">1</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Prize Pool Distribution</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Prize Pool</span>
              <span className="text-sm font-medium text-gray-900">$45,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Average Prize Pool</span>
              <span className="text-sm font-medium text-green-600">$3,750</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Highest Prize Pool</span>
              <span className="text-sm font-medium text-blue-600">$10,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Players</span>
              <span className="text-sm font-medium text-purple-600">384</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Tournament Performance</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Average Players</span>
              <span className="text-sm font-medium text-gray-900">32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Completion Rate</span>
              <span className="text-sm font-medium text-green-600">92%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Active Players</span>
              <span className="text-sm font-medium text-blue-600">96</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Tournament Duration</span>
              <span className="text-sm font-medium text-purple-600">7 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 