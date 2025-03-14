"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// Define interfaces outside the component
interface Player {
  _id: string;
  name: string;
  university: string;
  value: string;
  category: string;
  totalruns: number;
  ballsfaced: number;
  inningsplayed: number;
  wickets: number;
  overbowled: number;
  runsconceded: number;
  available: boolean;
}

interface User {
  _id: string;
  name: string;
  password: string;
  teamname: string;
  team: Player[];
  budget: number;
  createdAt: string;
  updatedAt: string;
}

// Constants for mock data
const UPCOMING_MATCHES = [
  {
    id: 1,
    team1: "University of Colombo",
    team2: "University of Peradeniya",
    date: "Today, 2:00 PM",
    venue: "Colombo Cricket Ground"
  },
  {
    id: 2,
    team1: "University of Moratuwa",
    team2: "University of Kelaniya",
    date: "Tomorrow, 10:00 AM",
    venue: "Moratuwa University Stadium"
  }
];

export default function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/login');
    },
  });

  // Initialize all state variables at the top level
  const [userData, setUserData] = useState<User | null>(null);
  const [totalValue, setTotalValue] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [activeTab, setActiveTab] = useState("team");

  // Fetch user data effect
  useEffect(() => {
    const fetchUserData = async () => {
      if (!session?.user?.id) return;
      
      try {
        const response = await fetch(`/api/user/${session.user.id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include' // Include credentials for authentication
        });
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch user data');
        }
        
        const data: User = await response.json();
        const mappedData: User = {
          ...data,
          team: Array.isArray(data.team) ? data.team.map(player => ({
            ...player,
            value: player.value?.toString() || "0"
          })) : []
        };
        setUserData(mappedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error appropriately
        if (error instanceof Error) {
          console.error(error.message);
        }
      }
    };

    if (status === 'authenticated') {
      fetchUserData();
    }
  }, [session, status]);

  // Calculate total value and points effect
  useEffect(() => {
    if (userData) {
      const calculatedTotalValue = userData.team.reduce((acc, player) => acc + parseFloat(player.value), 0);
      setTotalValue(calculatedTotalValue);
      const calculatedTotalPoints = ((calculatedTotalValue/1000) -100)/9;
      setTotalPoints(calculatedTotalPoints);
    }
  }, [userData]);

  // Loading state
  if (status === 'loading' || !userData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  const userTeam = {
    name: userData.name || "Team Name",
    teamname: userData.teamname || "Team Name",
    points: Math.max(0, totalPoints).toFixed(2),
    rank: 2,
    players: userData?.team.length ?? 0,
    budget: userData.budget || 0
  };

  // Mock data for dashboard
  const teamPlayers = [
    {
      id: 1,
      name: "Kumar Sangakkara",
      role: "Batsman",
      university: "University of Colombo",
      stats: { runs: 845, average: 52.8, strikeRate: 134.2 },
      image: "/players/player1.jpg"
    },
    {
      id: 2,
      name: "Muttiah Muralitharan",
      role: "Bowler",
      university: "University of Peradeniya",
      stats: { wickets: 24, economy: 6.2, average: 18.4 },
      image: "/players/player2.jpg"
    },
    {
      id: 3,
      name: "Angelo Mathews",
      role: "All-Rounder",
      university: "University of Moratuwa",
      stats: { runs: 320, wickets: 12, average: 28.5 },
      image: "/players/player3.jpg"
    },
    {
      id: 4,
      name: "Dinesh Chandimal",
      role: "Wicket Keeper",
      university: "University of Kelaniya",
      stats: { runs: 295, dismissals: 15, average: 32.6 },
      image: "/players/player4.jpg"
    },
    {
      id: 5,
      name: "Lasith Malinga",
      role: "Bowler",
      university: "University of Sri Jayewardenepura",
      stats: { wickets: 18, economy: 7.1, average: 22.3 },
      image: "/players/player5.jpg"
    }
  ];

  const upcomingMatches = [
    {
      id: 1,
      team1: "University of Colombo",
      team2: "University of Peradeniya",
      date: "Today, 2:00 PM",
      venue: "Colombo Cricket Ground"
    },
    {
      id: 2,
      team1: "University of Moratuwa",
      team2: "University of Kelaniya",
      date: "Tomorrow, 10:00 AM",
      venue: "Moratuwa University Stadium"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100" onClick={() => window.history.back()}>
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
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">{userData?.name.charAt(0)}</span>
              </div>
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
                <a href="#" className="bg-gray-100 text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <svg className="mr-4 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Dashboard
                </a>
                <a href="/team" className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 group flex items-center px-2 py-2 text-base font-medium rounded-md">
                  <svg className="mr-4 h-6 w-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  Teams
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
              {/* User Profile Section */}
              <div className="bg-white shadow rounded-lg p-6 flex items-center">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600">
                  {userData?.name.charAt(0)}
                </div>
                <div className="ml-6">
                  <h2 className="text-xl font-bold text-gray-900">{userData?.name}</h2>
                  <div className="flex items-center text-gray-500 space-x-4">
                    <p>@{userData?.name}</p>
                    <span>•</span>
                    
                    <span>•</span>
                    
                  </div>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="mt-8">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Overview</h2>
                <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {/* Card 1 */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Available Budget
                            </dt>
                           
                          </dl>
                          <dd>
                              <div className="text-lg font-medium text-gray-900">
                                Rs.{((userData?.budget ?? 0) )}
                              </div>
                            </dd>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              My Team
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                {userTeam.teamname}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Total Points
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                {userTeam.points}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                          <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div className="ml-5 w-0 flex-1">
                          <dl>
                            <dt className="text-sm font-medium text-gray-500 truncate">
                              Rank
                            </dt>
                            <dd>
                              <div className="text-lg font-medium text-gray-900">
                                #{userTeam.rank}
                              </div>
                            </dd>
                          </dl>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs for Team Details and Team Selection */}
              <div className="mt-8 bg-white shadow rounded-lg">
                <div className="border-b">
                  <div className="flex">
                    <button 
                      onClick={() => setActiveTab("team")} 
                      className={`py-4 px-6 text-center focus:outline-none ${
                        activeTab === "team" 
                          ? "border-b-2 border-green-500 text-green-600 font-medium" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      My Team
                    </button>
                    <button 
                      onClick={() => setActiveTab("select")} 
                      className={`py-4 px-6 text-center focus:outline-none ${
                        activeTab === "select" 
                          ? "border-b-2 border-green-500 text-green-600 font-medium" 
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Select Team
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  {activeTab === "team" ? (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Team Details</h3>
                        <p className="mt-1 text-sm text-gray-500">Current team information and statistics</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Budget Allocation</h4>
                          <div className="bg-gray-50 p-4 rounded-md">
                            <div className="flex justify-between text-sm mb-1 text-gray-900">
                                <span>Rs.{totalValue} / Rs.{((userData?.budget ?? 0) + totalValue).toLocaleString()}</span>
                              <span>{Math.round((totalValue/ ((userData?.budget ?? 0) + totalValue)) * 100)}% used</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-green-500 h-2 rounded-full" 
                                style={{ width: `${((((userData?.budget ?? 0) + totalValue)-totalValue)/ ((userData?.budget ?? 0) + totalValue)) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Team Composition</h4>
                            <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-xs text-gray-500">Batsmen</p>
                              <p className="font-medium">{userData?.team.filter(player => player.category === "Batsman").length}/4</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-xs text-gray-500">Bowlers</p>
                              <p className="font-medium">{userData?.team.filter(player => player.category === "Bowler").length}/3</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded-md">
                              <p className="text-xs text-gray-500">All-Rounders</p>
                              <p className="font-medium">{userData?.team.filter(player => player.category === "All-Rounder").length}/3</p>
                            </div>
                            
                            </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h4 className="text-sm font-medium text-gray-500 mb-3">Team Roster</h4>
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                          <table className="min-w-full divide-y divide-gray-300">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Player</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Role</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">University</th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Stats</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {userData?.team.map((player) => (
                                <tr key={player._id}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gray-200">
                                    {/* Player image placeholder */}
                                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-gray-500 font-medium">
                                      {player.name.substring(0, 2)}
                                    </div>
                                    </div>
                                    <div className="ml-4">
                                    <div className="font-medium text-gray-900">{player.name}</div>
                                    </div>
                                  </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    player.category === "Batsman" ? "bg-blue-100 text-blue-800" : 
                                    player.category === "Bowler" ? "bg-green-100 text-green-800" :
                                    player.category === "All-Rounder" ? "bg-purple-100 text-purple-800" :
                                    "bg-yellow-100 text-yellow-800"
                                  }`}>
                                    {player.category}
                                  </span>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {player.university}
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  {player.category === "Batsman" && (
                                    <div>
                                    <div>{player.totalruns} runs</div>
                                    <div className="text-xs">BF: {player.ballsfaced} | Innings: {player.inningsplayed}</div>
                                    </div>
                                  )}
                                  {player.category === "Bowler" && (
                                    <div>
                                    <div>{player.wickets} wickets</div>
                                    <div className="text-xs">Overs: {player.overbowled} | Runs Conceded: {player.runsconceded}</div>
                                    </div>
                                  )}
                                  {player.category === "All-Rounder" && (
                                    <div>
                                    <div>{player.totalruns} runs, {player.wickets} wickets</div>
                                    <div className="text-xs">Innings: {player.inningsplayed} | Overs: {player.overbowled}</div>
                                    </div>
                                  )}
                                  {player.category === "Wicket Keeper" && (
                                    <div>
                                    <div>{player.totalruns} runs</div>
                                    <div className="text-xs">Innings: {player.inningsplayed}</div>
                                    </div>
                                  )}
                                  </td>
                                </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                        <div className="mt-4 text-right">
                          <Link href="/team" className="text-sm text-green-600 hover:text-green-500">
                            View full team details →
                          </Link>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-6">
                        <h3 className="text-lg font-medium text-gray-900">Select Your Team</h3>
                        <p className="mt-1 text-sm text-gray-900">Choose players for upcoming matches</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Upcoming Matches</h4>
                        <div className="space-y-4">
                          {upcomingMatches.map(match => (
                            <div key={match.id} className="bg-gray-50 p-4 rounded-md">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-semibold">
                                      {match.team1.split(' ').map(word => word[0]).join('')}
                                    </div>
                                    <span className="mx-2 text-sm">vs</span>
                                    <div className="w-8 h-8 rounfded-full bg-green-100 flex items-center justify-center text-green-700 text-xs font-semibold">
                                      {match.team2.split(' ').map(word => word[0]).join('')}
                                    </div>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">{match.team1} vs {match.team2}</p>
                                    <p className="text-xs text-gray-900">{match.venue}</p>
                                  </div>
                                </div>
                                <div>
                                  <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                    {match.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Link 
                          href="/create-team" 
                          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
                        >
                          Create New Team
                        </Link>
                        <Link 
                          href="/players" 
                          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
                        >
                          Browse Players
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* AI Assistant */}
              <div className="mt-8 bg-white shadow rounded-lg">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Spiriter AI Assistant</h3>
                  </div>
                  <p className="mb-4 text-sm text-gray-500">
                    Get personalized recommendations for your team selection and strategy.
                  </p>
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    onClick={() => router.push('/bot')}
                  >
                    <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    Chat with Spiriter
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
