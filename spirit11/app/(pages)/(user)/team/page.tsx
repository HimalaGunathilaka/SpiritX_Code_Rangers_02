"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface Player {
  id: number;
  name: string;
  role: string;
  team: string;
  price: number;
  stats: string;
}

interface Team {
  name: string;
  points: number;
  rank: number;
  captain: Player;
  viceCaptain: Player;
  players: Player[];
}

export default function Team() {
  const router = useRouter();
  
  // Mock data for team
  const [team, setTeam] = useState<Team>({
    name: "",
    points: 0,
    rank: 0,
    captain: { id: 0, name: "", role: "", team: "", price: 0, stats: "" },
    viceCaptain: { id: 0, name: "", role: "", team: "", price: 0, stats: "" },
    players: []
  });

  const [deletedPlayers, setDeletedPlayers] = useState<number[]>([]);

  useEffect(() => {
    async function fetchTeam() {
      const response = await fetch('http://localhost:3000/api/user?id=67cc39310e8e5d2de616a75a', {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      const players = data.team.map((player: any, index: number) => ({
        id: player._id,
        name: player.name,
        role: player.category.toLowerCase(),
        team: player.university,
        price: parseFloat(player.value),
        stats: `Runs: ${player.totalruns}, Wickets: ${player.wickets}`
      }));
      setTeam({
        name: "Cricket Titans",
        points: 0,
        rank: 42,
        captain: players[0],
        viceCaptain: players[1],
        players: players
      });
    }
    fetchTeam();
  }, []);

  // Group players by role
  const batsmen = team.players.filter(player => player.role === "batsman");
  const bowlers = team.players.filter(player => player.role === "bowler");
  const allRounders = team.players.filter(player => player.role === "all-rounder");
  const wicketKeepers = team.players.filter(player => player.role === "wicket-keeper");

  // Calculate total team value
  const totalValue = team.players.reduce((sum, player) => sum + player.price, 0);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-full hover:bg-gray-100"
                onClick={() => window.history.back()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 pt-16">
          <div className="flex-1 flex flex-col min-h-0 border-r border-gray-200 bg-white">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <nav className="mt-5 px-2 space-y-1">
                <a href="/user" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <svg className="mr-4 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </a>
                <a href="/team" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <svg className="mr-4 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Team
                </a>
                <a href="/leaderboard" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <svg className="mr-4 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Leaderboard
                </a>
                <a href="/players" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <svg className="mr-4 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Players
                </a>
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="md:pl-64 flex flex-col flex-1">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="md:flex md:items-center md:justify-between">
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl font-semibold text-gray-900">My Team: {team.name}</h1>
                </div>
                <div className="mt-4 flex md:mt-0 md:ml-4">
                    <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    onClick={() => router.push('/create-team')}
                    >
                    <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add players
                    </button>
                </div>
              </div>
            </div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* Team Overview */}
              <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-6">
                <div className="px-4 py-5 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Team Overview
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Current performance and statistics.
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Total Points
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {team.points}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Current Rank
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        #{team.rank}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Team Value
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        Rs.{totalValue.toLocaleString()}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Captain
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {team.captain.name} ({team.captain.role})
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Vice Captain
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {team.viceCaptain.name} ({team.viceCaptain.role})
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg leading-6 font-medium text-gray-900">Team Players</h2>
                </div>
                <div className="mt-2 overflow-hidden shadow sm:rounded-md">
                  <ul className="divide-y divide-gray-200 bg-white">
                    {team.players.map((player) => (
                      <li key={player.id}>
                      <div className="block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
                            {player.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">{player.name}</div>
                            {player.id === team.captain.id && (
                              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Captain
                              </span>
                            )}
                            {player.id === team.viceCaptain.id && (
                              <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Vice Captain
                              </span>
                            )}
                            </div>
                            <div className="text-sm text-gray-500">{player.team}</div>
                          </div>
                          </div>
                          <div className="flex items-center">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            player.role === 'batsman' ? 'bg-blue-100 text-blue-800' :
                            player.role === 'bowler' ? 'bg-green-100 text-green-800' :
                            player.role === 'all-rounder' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          } mr-2`}>
                            {player.role}
                          </span>
                          <span className="text-sm font-medium text-gray-900 mr-2">
                            Rs.{player.price.toLocaleString()}
                          </span>
                          <button
                            className="px-2 py-1 text-white bg-red-700 hover:bg-red-500 rounded"
                            onClick={() => setTeam(prevTeam => ({
                            ...prevTeam,
                            players: prevTeam.players.filter(p => p.id !== player.id)
                            }))}
                          >
                            Remove
                          </button>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {player.stats}
                        </div>
                        </div>
                      </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PlayerBubbleProps {
  player: Player;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

function PlayerBubble({ player, isCaptain, isViceCaptain }: PlayerBubbleProps) {
  return (
    <div className="relative">
      <div className={`h-14 w-14 rounded-full ${
        player.role === 'batsman' ? 'bg-blue-100 border-blue-500' :
        player.role === 'bowler' ? 'bg-green-100 border-green-500' :
        player.role === 'all-rounder' ? 'bg-purple-100 border-purple-500' :
        'bg-yellow-100 border-yellow-500'
      } border-2 flex items-center justify-center`}>
        <span className="text-xs font-medium text-center">
          {player.name.split(' ').map(n => n[0]).join('')}
        </span>
      </div>
      {isCaptain && (
        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-yellow-400 border border-white flex items-center justify-center">
          <span className="text-xs font-bold text-white">C</span>
        </div>
      )}
      {isViceCaptain && (
        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-500 border border-white flex items-center justify-center">
          <span className="text-xs font-bold text-white">V</span>
        </div>
      )}
      <div className="mt-1 text-xs text-center font-medium truncate w-14">
        {player.name.split(' ')[0]}
      </div>
    </div>
  );
}

