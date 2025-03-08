'use client';
import { Search, Filter, DollarSign, ArrowLeft, Info } from "lucide-react";
import { PlayerCard, SelectedPlayerCard } from "./components";
import { useEffect, useState } from 'react';


export default function CreateTeam() {
  // fetch available players
  interface Player {
    _id: string;
    name: string;
    university: string;
    value: number;
    category: string;
  }


  const [players, setPlayers] = useState<Player[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const playersPerPage = 10;

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch('http://localhost:3000/api/playerstatus', {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error('Error fetching players:', error);
      }
    }

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter(player => {
    if (selectedCategory === 'All') {
      return true;
    } else if (selectedCategory === 'Batsmen') {
      return player.category === 'Batsman';
    } else if (selectedCategory === 'Bowlers') {
      return player.category === 'Bowler';
    } else if (selectedCategory === 'All-Rounders') {
      return player.category === 'All-Rounder';
    }
    return false;
  });

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
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
                  <button
                    className={`py-2 px-4 text-center focus:outline-none border-b-2 ${selectedCategory === 'All' ? 'border-green-500 text-green-700 font-medium' : 'border-transparent hover:text-green-700'}`}
                    onClick={() => {
                      setSelectedCategory('All');
                      setCurrentPage(1);
                    }}
                  >
                    All
                  </button>
                  <button
                    className={`py-2 px-4 text-center focus:outline-none border-b-2 ${selectedCategory === 'Batsmen' ? 'border-green-500 text-green-700 font-medium' : 'border-transparent hover:text-green-700'}`}
                    onClick={() => {
                      setSelectedCategory('Batsmen');
                      setCurrentPage(1);
                    }}
                  >
                    Batsmen
                  </button>
                  <button
                    className={`py-2 px-4 text-center focus:outline-none border-b-2 ${selectedCategory === 'Bowlers' ? 'border-green-500 text-green-700 font-medium' : 'border-transparent hover:text-green-700'}`}
                    onClick={() => {
                      setSelectedCategory('Bowlers');
                      setCurrentPage(1);
                    }}
                  >
                    Bowlers
                  </button>
                  <button
                    className={`py-2 px-4 text-center focus:outline-none border-b-2 ${selectedCategory === 'All-Rounders' ? 'border-green-500 text-green-700 font-medium' : 'border-transparent hover:text-green-700'}`}
                    onClick={() => {
                      setSelectedCategory('All-Rounders');
                      setCurrentPage(1);
                    }}
                  >
                    All-Rounders
                  </button>
                </div>

                <div className="space-y-4">

                  {currentPlayers.map((player) => (
                    <PlayerCard
                      key={player._id}
                      name={player.name}
                      university={player.university}
                      value={player.value}
                      category={player.category}
                      selected={false}
                    />

                  ))}
                </div>
                {indexOfLastPlayer < filteredPlayers.length && (
                  <div className="flex justify-center mt-4">
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                      onClick={handleLoadMore}
                    >
                      Load More
                    </button>
                  </div>
                )}
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