"use client";
import { Search, Filter, DollarSign, ArrowLeft, Info } from "lucide-react";
import { PlayerCard, SelectedPlayerCard } from "./components";
import { useEffect, useState, MouseEvent, use } from "react";
import { set } from "mongoose";

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
  const [selectedPlayers, setSelectedPlayers] = useState<Player[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [remainingBudget, setRemainingBudget] = useState<number>(100000);
  const playersPerPage = 10;
  const [budget, setBudget] = useState<number>(0);
  const[newSelectedPlayers, setNewSelectedPlayers] = useState<Player[]>([]);
  const userid = "67cc39310e8e5d2de616a75a";

  // make API call to fetch selected players of user
  useEffect(() => {
    async function fetchSelectedPlayers() {
      try {
        const response = await fetch(`http://localhost:3000/api/user?id=${userid}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        
        const selectedPlayers = data.team.map((player: Player) => ({
          _id: player._id,
          name: player.name,
          university: player.university,
          value: player.value,
          category: player.category,
        }));
        console.log(selectedPlayers);
        setSelectedPlayers(selectedPlayers);
        setRemainingBudget(data.budget);
        setBudget(data.budget);
        
      } catch (error) {
        console.error("Error fetching selected players:", error);
      }
    }

    fetchSelectedPlayers();
  }, []);


  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("http://localhost:3000/api/playerstatus", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPlayers(data);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }

    fetchPlayers();
  }, []);

  const filteredPlayers = players.filter((player) => {
    if (selectedCategory === "All") {
      return true;
    } else if (selectedCategory === "Batsmen") {
      return player.category === "Batsman";
    } else if (selectedCategory === "Bowlers") {
      return player.category === "Bowler";
    } else if (selectedCategory === "All-Rounders") {
      return player.category === "All-Rounder";
    }
    return false;
  });

  const indexOfLastPlayer = currentPage * playersPerPage;
  const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
  const currentPlayers = filteredPlayers.slice(
    indexOfFirstPlayer,
    indexOfLastPlayer
  );

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleAddPlayer = (playerId: string) => {
    const player = players.find((p) => p._id === playerId);
    if (player && remainingBudget < player.value) {
      alert("You do not have enough budget to select this player.");
      return;
    }
    if (player) {
      setSelectedPlayers((prevSelected) => [...prevSelected, player]);
      setNewSelectedPlayers((prevSelected) => [...prevSelected, player]);
      setRemainingBudget((prevBudget) =>
        parseFloat((Number(prevBudget) - Number(player.value)).toFixed(2))
      );
    }
  };

  const handleRemovePlayer = (playerId: string) => {
    const player = players.find((p) => p._id === playerId);
    if (player) {
      setSelectedPlayers((prevSelected) =>
        prevSelected.filter((p) => p._id !== playerId)
      );
      setNewSelectedPlayers((prevSelected) =>
        prevSelected.filter((p) => p._id !== playerId)
      );
      setRemainingBudget((prevBudget) =>
        parseFloat((Number(prevBudget) + Number(player.value)).toFixed(2))
      );
    }
  };

  async function handleSaveTeam(event: MouseEvent<HTMLButtonElement>): Promise<void> {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userid,
          playerIds: newSelectedPlayers.map((player) => player._id),
          budget: remainingBudget,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save team");
      }

      const data = await response.json();
      alert("Team saved successfully!");
    } catch (error) {
      console.error("Error saving team:", error);
      alert("There was an error saving your team. Please try again.");
    }
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b p-4 sticky top-0 z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-bold">Create Your Team</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                Budget: ${remainingBudget.toFixed(2)} / ${budget.toFixed(2)}
              </div>
                <button 
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                onClick={handleSaveTeam}
                >
                Save Team
                </button>
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
                <p className="text-sm text-gray-500">
                  Choose 11 players within your budget to create your team
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search players..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              
              </div>

              <div>
                <div className="flex border-b mb-6">
                  <button
                    className={`py-2 px-4 text-center focus:outline-none border-b-2 ${
                      selectedCategory === "All"
                        ? "border-green-500 text-green-700 font-medium"
                        : "border-transparent hover:text-green-700"
                    }`}
                    onClick={() => {
                      setSelectedCategory("All");
                      setCurrentPage(1);
                    }}
                  >
                    All
                  </button>
                  <button
                    className={`py-2 px-4 text-center focus:outline-none border-b-2 ${
                      selectedCategory === "Batsmen"
                        ? "border-green-500 text-green-700 font-medium"
                        : "border-transparent hover:text-green-700"
                    }`}
                    onClick={() => {
                      setSelectedCategory("Batsmen");
                      setCurrentPage(1);
                    }}
                  >
                    Batsmen
                  </button>
                  <button
                    className={`py-2 px-4 text-center focus:outline-none border-b-2 ${
                      selectedCategory === "Bowlers"
                        ? "border-green-500 text-green-700 font-medium"
                        : "border-transparent hover:text-green-700"
                    }`}
                    onClick={() => {
                      setSelectedCategory("Bowlers");
                      setCurrentPage(1);
                    }}
                  >
                    Bowlers
                  </button>
                  <button
                    className={`py-2 px-4 text-center focus:outline-none border-b-2 ${
                      selectedCategory === "All-Rounders"
                        ? "border-green-500 text-green-700 font-medium"
                        : "border-transparent hover:text-green-700"
                    }`}
                    onClick={() => {
                      setSelectedCategory("All-Rounders");
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
                      selected={selectedPlayers.some((p) => p._id === player._id)}
                      onAdd={() => {
                        if (selectedPlayers.length >= 11) {
                          alert("You cannot select more than 11 players.");
                        } else {
                          handleAddPlayer(player._id);
                        }
                      }}
                      onRemove={() => {
                        handleRemovePlayer(player._id);
                      }}
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
                <p className="text-sm text-gray-500">
                  Selected players ({selectedPlayers.length}/11)
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Budget
                  </h3>
                  <div className="flex justify-between text-sm mb-1">
                    <span>${remainingBudget.toFixed(2)} / ${budget.toFixed(2)}</span>
                    <span>{((remainingBudget / budget) * 100).toFixed(2)}% remaining</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${((remainingBudget / budget) * 100).toFixed(2)}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Team Composition
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">Batsmen</p>
                      <p className="font-medium">
                        {
                          selectedPlayers.filter((player) => player.category === "Batsman").length
                        }
                        /4
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">Bowlers</p>
                      <p className="font-medium">
                        {
                          selectedPlayers.filter((player) => player.category === "Bowler").length
                        }
                        /3
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="text-xs text-gray-500">All-Rounders</p>
                      <p className="font-medium">
                        {
                          selectedPlayers.filter((player) => player.category === "All-Rounder").length
                        }
                        /3
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Selected Players
                  </h3>
                  <div className="space-y-2">
                    {selectedPlayers.map((player) => (
                      <SelectedPlayerCard
                        key={player._id}
                        name={player.name}
                        university={player.university}
                        type={player.category}
                        price={player.value}
                      />
                    ))}
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