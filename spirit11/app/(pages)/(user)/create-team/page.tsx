'use client';
import { Search, Filter, DollarSign, User, ArrowLeft, Info } from "lucide-react"

export default function CreateTeam() {
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
                  <PlayerCard
                    name="Kasun Rajapaksa"
                    university="University of Colombo"
                    stats={{
                      points: 320,
                      batStrikeRate: 138.5,
                      batAverage: 45.2,
                      bowlStrikeRate: 0,
                      economy: 0,
                    }}
                    price={1200}
                    selected={false}
                  />
                  <PlayerCard
                    name="Dinesh Fernando"
                    university="University of Peradeniya"
                    stats={{
                      points: 280,
                      batStrikeRate: 125.3,
                      batAverage: 38.7,
                      bowlStrikeRate: 0,
                      economy: 0,
                    }}
                    price={950}
                    selected={true}
                  />
                  <PlayerCard
                    name="Amal Perera"
                    university="University of Moratuwa"
                    stats={{
                      points: 420,
                      batStrikeRate: 142.8,
                      batAverage: 52.1,
                      bowlStrikeRate: 0,
                      economy: 0,
                    }}
                    price={1500}
                    selected={false}
                  />
                  <PlayerCard
                    name="Sunil Bandara"
                    university="University of Kelaniya"
                    stats={{
                      points: 210,
                      batStrikeRate: 118.2,
                      batAverage: 32.5,
                      bowlStrikeRate: 0,
                      economy: 0,
                    }}
                    price={800}
                    selected={false}
                  />
                  
                  <PlayerCard
                    name="Nuwan Silva"
                    university="University of Colombo"
                    stats={{
                      points: 290,
                      batStrikeRate: 95.2,
                      batAverage: 18.4,
                      bowlStrikeRate: 22.3,
                      economy: 7.2,
                    }}
                    price={1100}
                    selected={false}
                  />
                  <PlayerCard
                    name="Lasith Kumara"
                    university="University of Jaffna"
                    stats={{
                      points: 350,
                      batStrikeRate: 68.5,
                      batAverage: 12.3,
                      bowlStrikeRate: 19.1,
                      economy: 6.8,
                    }}
                    price={1300}
                    selected={false}
                  />
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
  )
}

interface PlayerCardProps {
  name: string;
  university: string;
  stats: {
    points: number;
    batStrikeRate: number;
    batAverage: number;
    bowlStrikeRate: number;
    economy: number;
  };
  price: number;
  selected: boolean;
}

function PlayerCard({ name, university, stats, price, selected }: PlayerCardProps) {
  return (
    <div className={`bg-white border rounded-lg ${selected ? "border-green-500 border-2" : "border-gray-200"}`}>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-gray-500" />
            </div>
            <div>
              <h3 className="font-medium">{name}</h3>
              <p className="text-sm text-gray-500">{university}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center md:space-x-6 mt-4 md:mt-0">
            <div className="grid grid-cols-5 gap-3 w-full md:w-auto">
              <div className="text-center">
                <p className="text-xs text-gray-500">Points</p>
                <p className="font-medium">{stats.points}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Bat SR</p>
                <p className="font-medium">{stats.batStrikeRate}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Bat Avg</p>
                <p className="font-medium">{stats.batAverage}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Bowl SR</p>
                <p className="font-medium">{stats.bowlStrikeRate || '-'}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Economy</p>
                <p className="font-medium">{stats.economy || '-'}</p>
              </div>
            </div>

            <div className="flex flex-col items-center mt-4 md:mt-0 md:ml-4">
              <p className="text-xs text-gray-500">Price</p>
              <p className="font-medium">${price}</p>
            </div>

            <button
              className={`mt-4 md:mt-0 md:ml-4 px-4 py-2 rounded-md ${
                selected 
                  ? "border border-red-500 text-red-500 hover:bg-red-50" 
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {selected ? "Remove" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
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
          <User className="h-4 w-4 text-gray-500" />
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

