'use client';

import React from 'react';

export default function PlayerStatsPage() {
  const playerStats = [
    {
      id: 1,
      name: 'John Doe',
      totalMatches: 45,
      wins: 32,
      losses: 13,
      winRate: '71.1%',
      avgScore: 245,
      highestScore: 312,
      tournaments: 5,
      tournamentWins: 3,
      recentPerformance: [
        { date: '2024-03-01', score: 278, result: 'W' },
        { date: '2024-02-28', score: 245, result: 'W' },
        { date: '2024-02-27', score: 189, result: 'L' },
        { date: '2024-02-26', score: 312, result: 'W' },
        { date: '2024-02-25', score: 234, result: 'W' },
      ],
    },
    // Add more player stats as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Player Statistics</h1>
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Generate Report
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Export Data
          </button>
        </div>
      </div>

      {/* Player Selection */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Player</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>John Doe</option>
              <option>Jane Smith</option>
              <option>Mike Johnson</option>
              <option>Sarah Williams</option>
              <option>David Brown</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Time Period</label>
            <select className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>All Time</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Matches</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">45</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Win Rate</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">71.1%</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">245</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Tournament Wins</h3>
          <p className="mt-2 text-3xl font-semibold text-purple-600">3</p>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trend</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Performance chart will be displayed here</p>
        </div>
      </div>

      {/* Recent Matches */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Matches</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {playerStats[0].recentPerformance.map((match, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    match.result === 'W' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {match.result}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Match #{index + 1}</p>
                    <p className="text-sm text-gray-500">{match.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Score: {match.score}</p>
                  <p className={`text-sm ${
                    match.result === 'W' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {match.result === 'W' ? 'Victory' : 'Defeat'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Match Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Matches</span>
              <span className="text-sm font-medium text-gray-900">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Wins</span>
              <span className="text-sm font-medium text-green-600">32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Losses</span>
              <span className="text-sm font-medium text-red-600">13</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Win Rate</span>
              <span className="text-sm font-medium text-blue-600">71.1%</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Score Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Average Score</span>
              <span className="text-sm font-medium text-gray-900">245</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Highest Score</span>
              <span className="text-sm font-medium text-green-600">312</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Lowest Score</span>
              <span className="text-sm font-medium text-red-600">189</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Score Range</span>
              <span className="text-sm font-medium text-blue-600">123</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 