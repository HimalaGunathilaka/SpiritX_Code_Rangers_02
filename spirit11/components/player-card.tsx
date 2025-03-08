'use client';
import { useState } from 'react';

interface PlayerInfo {
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

export default function PlayerCard({ player }: { player: PlayerInfo }) {
  const [showDetails, setShowDetails] = useState(false);
  
  // Calculate stats based on PlayerInfo data
  const batStrikeRate = player.ballsfaced > 0 ? ((player.totalruns / player.ballsfaced) * 100).toFixed(2) : 0;
  const batAverage = player.inningsplayed > 0 ? (player.totalruns / player.inningsplayed).toFixed(2) : 0;
  const bowlStrikeRate = player.wickets > 0 ? ((player.overbowled * 6) / player.wickets).toFixed(2) : 0;
  const economy = player.overbowled > 0 ? (player.runsconceded / player.overbowled).toFixed(2) : 0;

  const getRoleColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'batsman':
        return 'bg-blue-100 text-blue-800';
      case 'bowler':
        return 'bg-green-100 text-green-800';
      case 'all-rounder':
        return 'bg-purple-100 text-purple-800';
      case 'wicket-keeper':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border rounded-lg">
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center">
                <h3 className="font-medium">{player.name}</h3>
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getRoleColor(player.category)}`}>
                  {player.category.charAt(0).toUpperCase() + player.category.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500">{player.university}</p>
            </div>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <div className="grid grid-cols-3 gap-3 mr-4">
              <div className="text-center">
                <p className="text-xs text-gray-500">Total Runs</p>
                <p className="font-medium">{player.totalruns}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Innings</p>
                <p className="font-medium">{player.inningsplayed}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Wickets</p>
                <p className="font-medium">{player.wickets}</p>
              </div>
            </div>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="px-4 py-2 border border-green-500 text-green-600 rounded-md hover:bg-green-50"
            >
              {showDetails ? 'Hide Details' : 'View Details'}
            </button>
          </div>
        </div>
        
        {/* Expanded details section */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Bat Strike Rate</p>
                <p className="font-medium text-lg">{batStrikeRate}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Batting Average</p>
                <p className="font-medium text-lg">{batAverage}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Bowl Strike Rate</p>
                <p className="font-medium text-lg">{bowlStrikeRate}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Economy</p>
                <p className="font-medium text-lg">{economy}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <a 
                href={`/user/${player._id}`}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                View Full Profile
              </a>
              <div className="text-sm text-gray-500">
                Status: <span className={player.available ? "text-green-600" : "text-red-600"}>
                  {player.available ? "Available" : "Not Available"}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}