'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

interface Player {
  _id: string;
  name: string;
  university: string;
  category: string;
  totalruns: number;
  wickets: number;
  inningsplayed: number;
}

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

    try {
      const response = await fetch(`/api/players/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete player');
      }
      await fetchPlayers();
    } catch (err) {
      console.error(err);
      alert('Failed to delete player');
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Players</h1>
          <p className="mt-1 text-sm text-gray-700">
            Manage players participating in the tournament
          </p>
        </div>
        <div className="mt-3 sm:mt-0">
          <Link
            href="/players/new"
            className="inline-flex items-center rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            <PlusIcon className="h-3.5 w-3.5 mr-1" aria-hidden="true" />
            Add Player
          </Link>
        </div>
      </div>

      <div className="mt-6 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="py-3 pl-4 pr-3 text-left text-xs font-medium text-gray-900 sm:pl-6">
                      Name
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">
                      University
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">
                      Role
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">
                      Innings
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">
                      Runs
                    </th>
                    <th className="px-3 py-3 text-left text-xs font-medium text-gray-900">
                      Wickets
                    </th>
                    <th className="relative py-3 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {players.map((player) => (
                    <tr key={player._id}>
                      <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                        {player.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {player.university}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {player.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {player.inningsplayed}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {player.totalruns}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2 text-sm text-gray-500">
                        {player.wickets}
                      </td>
                      <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link
                          href={`/players/${player._id}`}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          Edit
                        </Link>
                        <button
                          className="text-red-600 hover:text-red-900"
                          onClick={() => handleDelete(player._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 