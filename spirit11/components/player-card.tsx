'use client';
import { useState } from 'react';

interface PlayerStats {
//   points: number;
  batStrikeRate: number;
  batAverage: number;
  bowlStrikeRate: number;
  economy: number;
}

export interface PlayerInfo {
  id: number;
  name: string;
  university: string;
  role: string;
  price: number;
  stats: PlayerStats;
}

interface PlayerCardProps {
  player: PlayerInfo;
  onAddToTeam?: (playerId: number) => void;
}

export default function PlayerCard({ player, onAddToTeam }: PlayerCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  
  const getRoleColor = (role: string) => {
    switch (role) {
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
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getRoleColor(player.role)}`}>
                  {player.role.charAt(0).toUpperCase() + player.role.slice(1)}
                </span>
              </div>
              <p className="text-sm text-gray-500">{player.university}</p>
            </div>
          </div>

          <div className="flex items-center mt-4 md:mt-0">
            <div className="grid grid-cols-3 gap-3 mr-4">
              {/* <div className="text-center">
                <p className="text-xs text-gray-500">Points</p>
                <p className="font-medium">{player.stats.points}</p>
              </div> */}
              <div className="text-center">
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-medium">${player.price}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Bat Avg</p>
                <p className="font-medium">{player.stats.batAverage}</p>
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
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Points</p>
                <p className="font-medium text-lg">{player.stats.points}</p>
              </div> */}
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Bat Strike Rate</p>
                <p className="font-medium text-lg">{player.stats.batStrikeRate}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Batting Average</p>
                <p className="font-medium text-lg">{player.stats.batAverage}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Bowl Strike Rate</p>
                <p className="font-medium text-lg">{player.stats.bowlStrikeRate || '-'}</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-xs text-gray-500">Economy</p>
                <p className="font-medium text-lg">{player.stats.economy || '-'}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-between">
              <a 
                href={`/user/${player.id}`}
                className="text-green-600 hover:text-green-800 text-sm font-medium"
              >
                View Full Profile
              </a>
              <button
                onClick={() => onAddToTeam && onAddToTeam(player.id)}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                Add to Team
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
