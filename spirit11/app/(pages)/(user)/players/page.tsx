'use client';
import { useState } from 'react';
import PlayerCard, { PlayerInfo } from '@/components/player-card';
import { Search, Filter, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

interface PlayerStats {
  points: number;
  batStrikeRate: number;
  batAverage: number;
  bowlStrikeRate: number;
  economy: number;
}

export default function PlayerSearch() {
  // Mock data for players
  const [players, setPlayers] = useState<PlayerInfo[]>([
    {
      id: 1,
      name: "Amal Perera",
      university: "University of Moratuwa",
      role: "batsman",
      price: 1500,
      stats: {
        batStrikeRate: 142.8,
        batAverage: 52.1,
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
    {
      id: 3,
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
      id: 4,
      name: "Sunil Bandara",
      university: "University of Kelaniya",
      role: "batsman",
      price: 800,
      stats: {
        batStrikeRate: 118.2,
        batAverage: 32.5,
        bowlStrikeRate: 0,
        economy: 0,
      }
    },
    {
      id: 5,
      name: "Nuwan Silva",
      university: "University of Colombo",
      role: "bowler",
      price: 1100,
      stats: {
        batStrikeRate: 95.2,
        batAverage: 18.4,
        bowlStrikeRate: 22.3,
        economy: 7.2,
      }
    },
    {
      id: 6,
      name: "Lasith Kumara",
      university: "University of Jaffna",
      role: "bowler",
      price: 1300,
      stats: {
        batStrikeRate: 68.5,
        batAverage: 12.3,
        bowlStrikeRate: 19.1,
        economy: 6.8,
      }
    },
    {
      id: 7,
      name: "Pradeep Jayawardena",
      university: "University of Ruhuna",
      role: "bowler",
      price: 900,
      stats: {
        batStrikeRate: 65.2,
        batAverage: 15.7,
        bowlStrikeRate: 24.5,
        economy: 7.5,
      }
    },
    {
      id: 8,
      name: "Tharindu Mendis",
      university: "University of Sri Jayewardenepura",
      role: "bowler",
      price: 850,
      stats: {
        batStrikeRate: 62.8,
        batAverage: 14.2,
        bowlStrikeRate: 25.6,
        economy: 7.8,
      }
    },
    {
      id: 9,
      name: "Chamara Jayasuriya",
      university: "University of Ruhuna",
      role: "all-rounder",
      price: 1250,
      stats: {
        batStrikeRate: 128.5,
        batAverage: 28.5,
        bowlStrikeRate: 27.2,
        economy: 8.1,
      }
    },
    {
      id: 10,
      name: "Roshan Peiris",
      university: "University of Kelaniya",
      role: "all-rounder",
      price: 1150,
      stats: {
        batStrikeRate: 120.8,
        batAverage: 26.8,
        bowlStrikeRate: 28.4,
        economy: 8.3,
      }
    },
    {
      id: 11,
      name: "Kusal Mendis",
      university: "University of Sri Jayewardenepura",
      role: "wicket-keeper",
      price: 1050,
      stats: {
        batStrikeRate: 132.6,
        batAverage: 35.8,
        bowlStrikeRate: 0,
        economy: 0,
      }
    },
    {
      id: 12,
      name: "Sahan Perera",
      university: "University of Moratuwa",
      role: "wicket-keeper",
      price: 980,
      stats: {
        batStrikeRate: 128.5,
        batAverage: 32.4,
        bowlStrikeRate: 0,
        economy: 0,
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string | null>(null);
  const [filterUniversity, setFilterUniversity] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const playersPerPage = 5;

  // Get unique universities for filter dropdown
  const universities = [...new Set(players.map(player => player.university))];
  
  // Get unique roles for filter dropdown
  const roles = [...new Set(players.map(player => player.role))];

  // Filter and sort players
  const filteredPlayers = players.filter(player => {
    // Search term filter
    const matchesSearchTerm = player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              player.university.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Role filter
    const matchesRole = filterRole ? player.role === filterRole : true;
    
    // University filter
    const matchesUniversity = filterUniversity ? player.university === filterUniversity : true;
    
    return matchesSearchTerm && matchesRole && matchesUniversity;
  });
  
  // Sort players
  const sortedPlayers = [...filteredPlayers].sort((a, b) => {
    if (!sortBy) return 0;
    
    let valueA, valueB;
    
    if (sortBy === 'name') {
      valueA = a.name;
      valueB = b.name;
    } else if (sortBy === 'price') {
      valueA = a.price;
      valueB = b.price;
    } 
    else if (sortBy === 'batAverage') {
      valueA = a.stats.batAverage;
      valueB = b.stats.batAverage;
    } else if (sortBy === 'economy') {
      // For players without economy (like batsmen), use a high value for sorting
      valueA = a.stats.economy || 999;
      valueB = b.stats.economy || 999;
    } else {
      return 0;
    }
    
    if (sortDirection === 'asc') {
      return typeof valueA === 'string' 
        ? valueA.localeCompare(valueB as string) 
        : (valueA as number) - (valueB as number);
    } else {
      return typeof valueA === 'string'
        ? String(valueB).localeCompare(String(valueA))
        : (valueB as number) - (valueA as number);
    }
  });
  
  // Pagination
  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = sortedPlayers.slice(indexOfFirstPlayer, indexOfLastPlayer);
  const totalPages = Math.ceil(sortedPlayers.length / playersPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  const handleSortChange = (criteria: string | null) => {
    if (sortBy === criteria) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(criteria);
      setSortDirection('desc');
    }
  };
  
  const resetFilters = () => {
    setSearchTerm('');
    setFilterRole(null);
    setFilterUniversity(null);
    setSortBy(null);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handleAddToTeam = (playerId: number) => {
    // Handle adding player to team logic here
    console.log(`Adding player ${playerId} to team`);
    // You could implement a call to an API or update state
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
              <h1 className="text-xl font-bold">Player Directory</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="pb-3">
            <h2 className="text-xl font-semibold">Search Players</h2>
            <p className="text-sm text-gray-500">Browse through all available players</p>
          </div>
          
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search players by name or university..." 
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <button 
              className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </button>
          </div>
          
          {/* Advanced Filters */}
          {isFilterOpen && (
            <div className="mb-6 p-4 border rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Player Role</label>
                  <select
                    value={filterRole || ''}
                    onChange={e => {
                      setFilterRole(e.target.value || null);
                      setCurrentPage(1);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Roles</option>
                    {roles.map(role => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                  <select
                    value={filterUniversity || ''}
                    onChange={e => {
                      setFilterUniversity(e.target.value || null);
                      setCurrentPage(1);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">All Universities</option>
                    {universities.map(university => (
                      <option key={university} value={university}>{university}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                  <select
                    value={sortBy || ''}
                    onChange={e => {
                      handleSortChange(e.target.value || null);
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    <option value="">Featured</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="points">Points</option>
                    <option value="batAverage">Batting Average</option>
                    <option value="economy">Economy Rate</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button 
                  onClick={resetFilters}
                  className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Results Info */}
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-gray-500">
              Showing {indexOfFirstPlayer + 1}-{Math.min(indexOfLastPlayer, filteredPlayers.length)} of {filteredPlayers.length} players
            </p>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Sort:</span>
              <button 
                className={`text-sm px-2 py-1 rounded ${sortBy === 'points' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => handleSortChange('points')}
              >
                Points {sortBy === 'points' && (
                  sortDirection === 'desc' ? <ChevronDown className="inline h-3 w-3" /> : <ChevronUp className="inline h-3 w-3" />
                )}
              </button>
              <button 
                className={`text-sm px-2 py-1 rounded ${sortBy === 'price' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100'}`}
                onClick={() => handleSortChange('price')}
              >
                Price {sortBy === 'price' && (
                  sortDirection === 'desc' ? <ChevronDown className="inline h-3 w-3" /> : <ChevronUp className="inline h-3 w-3" />
                )}
              </button>
            </div>
          </div>
          
          {/* Player List */}
          <div className="space-y-4">
            {currentPlayers.length > 0 ? (
              currentPlayers.map(player => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onAddToTeam={handleAddToTeam}
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No players match your search criteria.</p>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <nav className="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                  disabled={currentPage === 1}
                  className={`relative inline-flex items-center px-2 py-2 rounded-l-md border ${
                    currentPage === 1 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Previous</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                    className={`relative inline-flex items-center px-4 py-2 border ${
                      currentPage === i + 1
                        ? 'bg-green-50 border-green-500 text-green-600 z-10'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button
                  onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                  disabled={currentPage === totalPages}
                  className={`relative inline-flex items-center px-2 py-2 rounded-r-md border ${
                    currentPage === totalPages
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  <span className="sr-only">Next</span>
                  <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
