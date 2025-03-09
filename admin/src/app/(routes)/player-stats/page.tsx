'use client';

import React from 'react';
import { useState, useEffect } from 'react';

interface Player {
  _id: string;
  name: string;
  university: string;
  category: string;
  totalruns: number;
  ballsfaced: number;
  inningsplayed: number;
  wickets: number;
  overbowled: number;
  runsconceded: number;
  available: boolean;
}

interface PlayerStats{
  battingStrikeRate: number | null;
  bowlingStrikeRate: number | null;
  battingAverage: number | null;
  economyRate: number | null;
  points: number | null;
  value: number | null;
}


export default function PlayerStatsPage() {

  const [players, setPlayers] = useState<Player[]>([]);

  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [selectedPlayerStats, setSelectedPlayerStats] = useState<PlayerStats>({
    battingStrikeRate: null,
    bowlingStrikeRate: null,
    battingAverage: null,
    economyRate: null,
    points: null,
    value: null,
  });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await fetch('/api/players');
      if (!response.ok) {
        throw new Error('Failed to fetch players');
      }
      const data = await response.json();
      setPlayers(data);
    } catch (err) {
      setError('Failed to load players');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!selectedPlayer) return;
    
    // Batting Strike Rate
    const calbattingStrikeRate = (selectedPlayer.totalruns / selectedPlayer.ballsfaced) * 100;

    // Bowling Strike Rate
    const calbowlingStrikeRate = selectedPlayer.overbowled * 6 / selectedPlayer.wickets;

    // Batting Average
    const calbattingAverage = selectedPlayer.totalruns / selectedPlayer.inningsplayed;

    // Economy Rate
    const caleconomyRate = selectedPlayer.runsconceded / selectedPlayer.overbowled;

    // Points
    const calpoints = (calbattingStrikeRate / 5) + (calbattingAverage * 0.8) + (500 / calbowlingStrikeRate) + (140 / caleconomyRate);

    // Value
    let calvalue = (9 * calpoints + 100) * 1000;
    calvalue = Math.round(calvalue / 50000) * 50000;

    setSelectedPlayerStats({
      battingStrikeRate: calbattingStrikeRate === Infinity ? null : calbattingStrikeRate || null,
      bowlingStrikeRate: calbowlingStrikeRate === Infinity ? null : calbowlingStrikeRate || null,
      battingAverage: calbattingAverage === Infinity ? null : calbattingAverage || null,
      economyRate: caleconomyRate === Infinity ? null : caleconomyRate || null,
      points: calpoints === Infinity ? null : calpoints || null,
      value: calvalue === Infinity ? null : calvalue || null,
    });

  }, [selectedPlayer]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = players.filter(player =>
      player.name.toLowerCase().includes(term) ||
      player.university.toLowerCase().includes(term) ||
      player.category.toLowerCase().includes(term)
    );
    setFilteredPlayers(filtered);
  };

  const exportToCSV = () => {
    if (!selectedPlayer) {
      alert('Please select a player to export data.');
      return;
    }

    const csvData = [
      ['Name', selectedPlayer.name],
      ['University', selectedPlayer.university],
      ['Category', selectedPlayer.category],
      ['Total Runs', selectedPlayer.totalruns],
      ['Balls Faced', selectedPlayer.ballsfaced],
      ['Innings Played', selectedPlayer.inningsplayed],
      ['Wickets', selectedPlayer.wickets],
      ['Overs Bowled', selectedPlayer.overbowled],
      ['Runs Conceded', selectedPlayer.runsconceded],
      ['Batting Strike Rate', selectedPlayerStats.battingStrikeRate?.toFixed(2) || 'N/A'],
      ['Bowling Strike Rate', selectedPlayerStats.bowlingStrikeRate?.toFixed(2) || 'N/A'],
      ['Batting Average', selectedPlayerStats.battingAverage?.toFixed(2) || 'N/A'],
      ['Economy Rate', selectedPlayerStats.economyRate?.toFixed(2) || 'N/A'],
      ['Points', selectedPlayerStats.points?.toFixed(2) || 'N/A'],
      ['Value', selectedPlayerStats.value ? `Rs. ${selectedPlayerStats.value.toLocaleString("en-IN").replace(/,/g, ' ')}` : 'N/A'],
      ['Generated At', new Date().toLocaleString().replace(',', ' ')],
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + csvData.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedPlayer.name}_stats.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Player Statistics</h1>
        <div className="flex space-x-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
            Generate Report
          </button>
          <button 
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 cursor-pointer"
            onClick={exportToCSV}
          >
            Export Data
          </button>
        </div>
      </div>

      {/* Player Selection */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Player</label>
            <select 
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-900 h-8 p-1"
              onChange={(e) => {
                setSelectedPlayerStats({
                  battingStrikeRate: null,
                  bowlingStrikeRate: null,
                  battingAverage: null,
                  economyRate: null,
                  points: null,
                  value: null,
                });
                const player = players.find((p) => p._id === e.target.value);
                setSelectedPlayer(player || null);
              }}
            >
              <option 
                value={''}
                className="text-gray-700"
              >Select Player</option>
              {players.map((player) => (
                <option 
                  key={player._id} 
                  className="text-gray-900"
                  value={player._id}
                >
                  {player.name}
                </option>
              ))}
            </select>
          </div>
          
            <div className="relative">
            <label className="block text-sm font-medium text-gray-700">Search Player</label>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-900 h-8 p-1"
              placeholder="Search by name, university, or category"
            />
            {searchTerm && (
              <div>
              {/* <div className="relative"></div> */}
              <ul className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto w-full">
                {filteredPlayers.map((player) => (
                <li
                  key={player._id}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-900"
                  onClick={() => {
                  setSelectedPlayer(player);
                  setSearchTerm('');
                  setFilteredPlayers([]);
                  }}
                >
                  {player.name} - {player.university} - {player.category}
                </li>
                ))}
              </ul>
              </div>
            )}
            </div>
        
        </div>
      </div>

      {/* Player Information */}
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center space-x-6">
        <img src="/profile.svg" alt="Player Profile" className="w-24 h-24 rounded-full mr-6 flex-1" style={{ flexBasis: '50%' }} />
        <div className="flex-1" style={{ flexBasis: '50%' }}>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Player Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 mr-5">Name</span>
              <span className="text-sm font-medium text-gray-900">{selectedPlayer? selectedPlayer.name : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 mr-5">University</span>
              <span className="text-sm font-medium text-gray-900">{selectedPlayer? selectedPlayer.university : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 mr-5">Category</span>
              <span className="text-sm font-medium text-gray-900">{selectedPlayer? selectedPlayer.category : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 mr-5">Value</span>
              <span className="text-sm font-medium text-gray-900">Rs. {selectedPlayerStats.value ? selectedPlayerStats.value.toLocaleString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 mr-5">Points</span>
              <span className="text-sm font-medium text-gray-900">{selectedPlayerStats.points ? selectedPlayerStats.points.toFixed(2) : 'N/A'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Batting Strike Rate</h3>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            {selectedPlayerStats.battingStrikeRate ? selectedPlayerStats.battingStrikeRate.toFixed(2) : 'N/A'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Bawling Strike Rate</h3>
          <p className="mt-2 text-3xl font-semibold text-green-600">
            {selectedPlayerStats.bowlingStrikeRate ? selectedPlayerStats.bowlingStrikeRate.toFixed(2) : 'N/A'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Batting Average</h3>
          <p className="mt-2 text-3xl font-semibold text-blue-600">
            {selectedPlayerStats.battingAverage ? selectedPlayerStats.battingAverage.toFixed(2) : 'N/A'}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500">Economy Rate</h3>
          <p className="mt-2 text-3xl font-semibold text-purple-600">
            {selectedPlayerStats.economyRate ? selectedPlayerStats.economyRate.toFixed(2) : 'N/A'}
          </p>
        </div>
      </div>

      {/* Performance Chart */}
      {/* <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Performance Trend</h3>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">Performance chart will be displayed here</p>
        </div>
      </div> */}

      {/* Detailed Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Match Statistics I</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Innings</span>
              <span className="text-sm font-medium text-gray-900">{selectedPlayer?.inningsplayed}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Total Runs</span>
              <span className="text-sm font-medium text-green-600">{selectedPlayer?.totalruns}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Balls Faced</span>
              <span className="text-sm font-medium text-red-600">{selectedPlayer?.ballsfaced}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Match Statistics II</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Wickets</span>
              <span className="text-sm font-medium text-gray-900">{selectedPlayer?.wickets}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Overs</span>
              <span className="text-sm font-medium text-green-600">{selectedPlayer?.overbowled}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500">Runs Conceded</span>
              <span className="text-sm font-medium text-red-600">{selectedPlayer?.runsconceded}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 