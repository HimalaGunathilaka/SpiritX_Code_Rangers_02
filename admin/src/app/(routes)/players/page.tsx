'use client';

import { useEffect, useState } from 'react';
import Modal from '@/components/Modal';
import AddNewPlayer from '@/components/AddNewPlayer';
import EditPlayer from '@/components/EditPlayer';
import Link from 'next/link';
import { set } from 'mongoose';

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

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [modalOption, setModalOption] = useState<string | null>(null);
  const [editingPlayer, setEditingPlayer] = useState<Player | null>(null);

  const [notification, setNotification] = useState<string | null>(null);
  const [failnotification, setFailNotification] = useState<string | null>(null);

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

  const handleDelete = async (id: string) => {

    
    if (!confirm('Are you sure you want to delete this player?')) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`/api/players/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        setFailNotification('Failed to delete player');
        setTimeout(() => {
          setFailNotification(null);
        }, 5000); // Clear the notification after 5 seconds
        throw new Error('Failed to delete player');
      }
      
      setNotification('Player deleted successfully!');
      setTimeout(() => {
        setNotification(null);
      }, 5000); // Clear the notification after 3 seconds

      await fetchPlayers();
    } catch (err) {
      console.error(err);
      // alert('Failed to delete player');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-80 text-lg font-medium text-gray-700 bg-gray-50 rounded-xl shadow-inner">

        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-12 w-12 text-green-600 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span className="animate-pulse text-gray-700">Loading players...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64 text-lg font-medium text-gray-700 bg-red-50 rounded-2xl p-6 shadow-md">
        <svg className="w-8 h-8 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      
      {failnotification && (
        <div className="fixed top-12 right-12 mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg shadow-lg transition-transform transform translate-x-0 ease-in-out duration-300">
          <img src="/x.svg" alt="cross" className="h-5 w-5 inline-block mr-2" />
          {failnotification}
        </div>
      )}
      
      {notification && (
        <div className="fixed top-12 right-12 mb-4 p-4 text-sm text-green-700 bg-green-100 rounded-lg shadow-lg transition-transform transform translate-x-0 ease-in-out duration-300">
          <img src="/check.svg" alt="checkmark" className="h-5 w-5 inline-block mr-2" />
          {notification}
        </div>
      )}
      
      <div className="sm:flex sm:items-center sm:justify-between mb-10 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            Cricket Players
          </h1>
          <p className="mt-3 text-sm text-gray-600 font-medium">
            Manage players participating in the tournament
          </p>
        </div>
        <div className="mt-5 sm:mt-0">
          <button
            onClick={() => {setIsModalOpen(true); setModalOption('add')}}
            className="inline-flex items-center rounded-md bg-green-600 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-green-500 transition-all duration-200"
          >
            Add New Player
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow-lg sm:rounded-lg bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-green-50">
                    <tr>
                      <th className="py-4 pl-8 pr-3 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Name
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        University
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Role
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Innings
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Runs
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Balls Faced
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Wickets
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Overs
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Runs Conceded
                      </th>
                      <th className="px-3 py-4 text-left text-xs font-bold uppercase tracking-wider text-green-700">
                        Status
                      </th>
                      <th className="relative py-4 pl-3 pr-8 text-green-700">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-100">
                    {players.map((player, index) => (
                      <tr 
                        key={player._id}
                        className={`hover:bg-gray-100 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      >
                        <td className="whitespace-nowrap py-4 pl-8 pr-3 text-sm font-medium text-gray-800">
                          {player.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {player.university}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-gray-800">
                            {player.category}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {player.inningsplayed}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {player.totalruns}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {player.ballsfaced}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {player.wickets}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {player.overbowled}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                          {player.runsconceded}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            player.available 
                              ? 'bg-green-100 text-gray-800' 
                              : 'bg-red-100 text-gray-800'
                          }`}>
                            {player.available ? 'Available' : 'Unavailable'}
                          </span>
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-8 text-right text-sm font-medium">
                          <div className="flex justify-end space-x-3">
                            <button
                              onClick={() => {setIsModalOpen(true); setModalOption('edit'); setEditingPlayer(player);}}
                              className="inline-flex items-center px-3 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-900 transition-colors duration-150"
                            >
                              Edit
                            </button>
                            <button
                              className="inline-flex items-center px-3 py-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-800 transition-colors duration-150"
                              onClick={() => handleDelete(player._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {players.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                    </svg>
                    <p className="text-lg text-gray-600 font-medium mb-2">No players found</p>
                    <p className="text-sm text-gray-500">Add your first player to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => {setIsModalOpen(false); fetchPlayers();}}>
        {modalOption === 'edit' && editingPlayer && 
          <EditPlayer player={editingPlayer} onClose={() => {setIsModalOpen(false); fetchPlayers();}} />
        }
        {modalOption === 'add' &&
          <AddNewPlayer onClose={() => {setIsModalOpen(false); fetchPlayers(); } }/>
        }
      </Modal>
    </div>
  );
}