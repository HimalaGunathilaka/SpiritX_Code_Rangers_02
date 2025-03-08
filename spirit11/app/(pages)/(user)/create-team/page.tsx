'use client';
import { useState } from 'react';
import { DollarSign, ArrowLeft, Info, Search, Filter } from "lucide-react";
import PlayerCard, { PlayerInfo } from '@/components/player-card';

export default function CreateTeam() {
  const [players, setPlayers] = useState<PlayerInfo[]>([
    {
      id: 1,
      name: "Kasun Rajapaksa",
      university: "University of Colombo",
      role: "batsman",
      price: 1200,
      stats: {
        batStrikeRate: 138.5,
        batAverage: 45.2,
        bowlStrikeRate: 0,
        economy: 0,
      }
    },
    {
      id: 2,
      name: "Dinesh Fernando",
      university: "University of Peradeniya",
      role: "batsman",
      price: 950,
      stats: {
        batStrikeRate: 125.3,
        batAverage: 38.7,
        bowlStrikeRate: 0,
        economy: 0,
      }
    },
    // More players can be added here
  ]);

  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([2]);

  const handleAddToTeam = (playerId: number) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter(id => id !== playerId));
    } else {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => window.history.back()}>
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">Create Your Team</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Budget: $8,500 / $10,000
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md">Save Team</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Player Selection */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="pb-3">
                <h2 className="text-xl font-semibold">Select Players</h2>
                <p className="text-sm text-gray-500">Choose 11 players within your budget to create your team</p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input 
                    type="text" 
                    placeholder="Search players..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <button className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
              </div>

              <div>
                <div className="flex border-b mb-6">
                  <button className="py-2 px-4 text-center focus:outline-none border-b-2 border-green-500 text-green-700 font-medium">
                    Batsmen
                  </button>
                  <button className="py-2 px-4 text-center focus:outline-none border-b-2 border-transparent hover:text-green-700">
                    Bowlers
                  </button>
                  <button className="py-2 px-4 text-center focus:outline-none border-b-2 border-transparent hover:text-green-700">
                    All-Rounders
                  </button>
                  <button className="py-2 px-4 text-center focus:outline-none border-b-2 border-transparent hover:text-green-700">
                    Wicket Keepers
                  </button>
                </div>

                <div className="space-y-4">
                  {players.map(player => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      onAddToTeam={handleAddToTeam}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Team Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="pb-3">
                <h2 className="text-xl font-semibold">Your Team</h2>
                <p className="text-sm text-gray-500">Selected players (2/11)</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Budget</h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>$2,000 / $10,000</span>
                    <span>80% remaining</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "20%" }}></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Team Composition</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">Batsmen</p>
                      <p className="font-medium">1/4</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">Bowlers</p>
                      <p className="font-medium">0/3</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">All-Rounders</p>
                      <p className="font-medium">0/3</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">Wicket Keepers</p>
                      <p className="font-medium">1/1</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Selected Players</h3>
                  <div className="space-y-2">
                    <SelectedPlayerCard
                      name="Dinesh Fernando"
                      university="University of Peradeniya"
                      type="Batsman"
                      price={950}
                    />
                    <SelectedPlayerCard
                      name="Kusal Mendis"
                      university="University of Sri Jayewardenepura"
                      type="Wicket Keeper"
                      price={1050}
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md">
                    Select Captain & Vice Captain
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="pb-3">
                <h2 className="text-xl font-semibold flex items-center">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  Team Tips
                </h2>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Select players from universities playing in upcoming matches
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Balance your team with both in-form batsmen and bowlers
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Choose all-rounders for maximum points potential
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  Pick players with consistent performance over the tournament
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface SelectedPlayerCardProps {
  name: string;
  university: string;
  type: string;
  price: number;
}

function SelectedPlayerCard({ name, university, type, price }: SelectedPlayerCardProps) {
  return (
    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-md">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-gray-500">{university}</p>
        </div>
      </div>
      <div className="text-right">
        <span className="inline-block px-2 py-0.5 text-xs border border-gray-300 rounded-full mb-1">{type}</span>
        <p className="text-xs font-medium">${price}</p>
      </div>
    </div>
  )
}

